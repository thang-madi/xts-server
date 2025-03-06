/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
*
* See a full list of supported triggers at https://firebase.google.com/docs/functions
*/
// import { createXTSObject } from "./types";
// import { getObject, createObject, updateObject, deleteObject, getObjectList } from "./methods-objects";
// import { getRecordSet, updateRecordSet } from "./methods-records";
// import { getExternalAccount } from "./methods-users";
// import { getFile } from "./methods-files";
// import { getDocumentById } from "./methods-documents";

// Standard's
const admin = require("firebase-admin");
const logger = require("firebase-functions/logger")
const { auth } = require("firebase-functions/v1")
const { onRequest, onCall, HttpsError } = require("firebase-functions/v2/https")

// Application's
// const { createXTSObject } = require("./common");
const { createXTSObject } = require("./data-objects/common-use");
const { getObject, createObject, updateObject, deleteObject, getObjectList } = require("./methods/objects");
const { getRecordSet, updateRecordSet } = require("./methods/records");
const { createCustomToken } = require("./methods/users");
const { getFile } = require("./methods/files");
const { getObjectListBE, callBackendServer } = require("./methods/backend");
const { getSubscriptionRef, getDatabaseObjectList, getSubscriptionObjectList } = require("./methods/firebase");

// Main
const serviceAccountId = 'firebase-adminsdk-fbsvc@fir-b73c8.iam.gserviceaccount.com'
const projectId = 'fir-b73c8'
admin.initializeApp({ serviceAccountId, projectId })

// exports.helloWorld = onRequest((request, response) => {
//     logger.info("Hello logs!", { structuredData: true })
//     response.send("Hello from Firebase!")
// })

// exports.userAdded = auth.user().onCreate(user => {
//     console.log('User created:', user.email)
//     // return Promise.resolve()
// })

// exports.testOnCall = onCall((callableRequestData, context) => {
//     console.log('data: ', callableRequestData.data)
//     return { new_data: 'ABC-123' }
// })

// Sau này có thể bỏ đi vì dùng XTSCreateCustomToken
exports.createCustomToken = onCall(async (requestData, context) => {

    const requestObject = createXTSObject('XTSCreateCustomToken')
    requestObject.externalAccountData = requestData.data
    const params = {
        serverCall: false,
        refreshData: false,
    }
    const responseObject = await requestProccessing(requestObject, params)
    return responseObject

})

// OK
exports.httpsCallableExecute = onCall(async (requestData, context) => {

    const claims = context.auth.token;
    const requestObject = requestData.data;
    const headers = context.rawRequest.headers;

    const refreshData = headers['refresh-data'];
    const params = {
        serverCall: false,
        refreshData,
    }
    switch (requestObject._type) {

        case 'XTSCreateCustomToken':
            responseObject = await requestProccessing(requestObject, params, claims);
            break;

        default:
            responseObject = await requestProccessing(requestObject, params, claims);
            break;
    }

    return responseObject;
    // console.log('customClaims 1', customClaims)

})

// OK
exports.httpsCallablePing = onCall(async (requestData, context) => {

    responseObject = {
        Result: 'Ping...'
    };
    return responseObject;
})

// File's

// OK
exports.printForm = onRequest(async (request, response) => {
    getFile(request, response, 'printForm')
})

// OK
exports.reportForm = onRequest(async (request, response) => {
    getFile(request, response, 'reportForm')
})

// Execute

// OK
exports.execute = onRequest(async (request, response) => {

    response.set('Access-Control-Allow-Origin', '*')

    const headers = request.headers
    const authorization = headers.authorization;
    console.log('authorization', authorization)
    let idToken, email, password;
    if (authorization) {
        if (authorization.startsWith('Bearer ')) {  // Bearer token format
            idToken = authorization.split('Bearer ')[1]
            console.log('idToken', idToken)
        } else if (authorization.startsWith('Basic ')) {  // Basic token format
            const base64Credentials = authorization.split('Basic ')[1];
            const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
            [email, password] = credentials.split(':');
            if (email && password) {
                try {
                    // const userRecord = await admin.auth().getUserByEmail(email);

                    // Kiểm tra password
                    // Lưu ý: Firebase không lưu mật khẩu dưới dạng plaintext, bạn cần xác thực thông qua API đăng nhập
                    // Trong trường hợp này, bạn có thể sử dụng thư viện `firebase-admin` để kiểm tra email và password
                    const user = await admin.auth().getUserByEmail(email);

                    // Xác thực thành công
                    response.status(200).send(`User authenticated successfully: ${user.email}`);
                } catch (error) {
                    // Xác thực thất bại
                    response.status(401).send('Invalid email or password');
                    return
                }
            } else {
                response.status(400).send('Missing email or password');
                return
            }
        }
    }

    // console.log('headers.authorization', headers.authorization)
    let claims = {}

    switch (request.method) {
        case 'GET':

            response.send("ping Execute-GET...")
            break;

        case 'POST':

            let requestObject = request.body
            if (typeof requestObject === 'string') {
                requestObject = JSON.parse(requestObject)
            }

            if (idToken) {
                admin.auth().verifyIdToken(idToken)
                    .then((decodedToken) => {
                        claims = decodedToken
                    })
                    .catch((error) => {
                        response.send('Error: wrong idToken: ' + error)
                        return
                    });
            } else if (requestObject['_type'] !== 'XTSCreateCustomTokenRequest') {
                response.send('Error: absence idToken')
                return
            }

            console.log('claims', claims)

            const serverCall = request.headers['server-call'];
            const refreshData = request.headers['refresh-data'];
            const params = {
                serverCall,
                refreshData,
            }
            const responseObject = await requestProccessing(requestObject, params, claims);
            response.send(responseObject)
            console.log('requestObject', requestObject)
            console.log('responseObject', responseObject)

            break;

        default:

            response.send("running Execute...")
            break;
    }

})

// OK
exports.ping = onRequest(async (request, response) => {

    response.set('Access-Control-Allow-Origin', '*')
    response.send("Ping...")
})

// OK
async function requestProccessing(requestObject, params, claims) {

    let responseObject = null

    const db = admin.firestore()
    const subscriptionId = {
        _type: 'XTSObjectId',
        dataType: 'XTSSubscription',
        id: requestObject.dbId,
    }
    const subscription = await getSubscriptionRef(db, subscriptionId)

    // Nếu như request được gọi từ BE Server thì bỏ qua khối này.
    // Nếu gọi từ Client thì trước tiên sẽ gọi đến BE Server
    if (!params.serverCall) {

        switch (requestObject._type) {

            case 'XTSSignInRequest':
            case 'XTSSignOutRequest':
            case 'XTSGetUserSettingsRequest':
            case 'XTSUpdateUserConnectionRequest':

            case 'XTSCreateObjectRequest':
            case 'XTSCreateObjectsRequest':
            case 'XTSUpdateObjectsRequest':
            case 'XTSDeleteObjectsRequest':

            case 'XTSUpdateRecordSetRequest':
            case 'XTSUploadFileRequest':

            case 'XTSGetRelatedDocumentsRequest':
            case 'XTSGetReportDataRequest':

                responseObject = await callBackendServer(requestObject)
                break

            case 'XTSGetObjectsRequest':
            case 'XTSGetFilesRequest':

                if (params.refreshData) {
                    responseObject = await callBackendServer(requestObject)
                }
                break

            case 'XTSRefreshObjectListRequest':

                responseObject = await getObjectListBE(requestObject.dataType)
                break

            default:
                break;
        }
        // console.log('requestObject', requestObject)
    }

    switch (requestObject._type) {

        // User's
        case 'XTSSignInRequest':

            break;

        case 'XTSSignOutRequest':

            break;

        case 'XTSGetUserSettingsRequest':

            break;

        case 'XTSUpdateUserConnectionRequest':

            break;

        // Object's
        case 'XTSGetObjectListRequest':

            responseObject = createXTSObject('XTSGetObjectListResponse')
            // const conditions = []
            // if (Array.isArray(requestObject.conditions)) {
            //     for (let condition of requestObject.conditions) {
            //         conditions.push(condition)
            //     }
            // }
            responseObject.items = await getObjectList(db, subscription, requestObject, claims)
            break;

        case 'XTSDownloadObjectListRequest':
            response.setHeader('Content-Encoding', 'gzip');

            responseObject = createXTSObject('XTSDownloadObjectListResponse')
            responseObject.items = await getDownloadObjectList(subscription, requestObject.dataType)
            break;

        case 'XTSGetObjectsRequest':

            if (responseObject) {
                for (const object of responseObject.objects) {
                    await updateObject(db, subscription, object)
                }
            }
            responseObject = createXTSObject('XTSGetObjectsResponse')
            for (const objectId of requestObject.objectIds) {
                const newObject = await getObject(db, subscription, objectId)
                responseObject.objects.push(newObject)
            }
            break;

        case 'XTSCreateObjectRequest':

            if (params.serverCall) {
                responseObject = createXTSObject('XTSCreateObjectResponse')
                responseObject.object = await createObject(db, subscription, requestObject.object)
            } else if (responseObject) {
                await createObject(db, subscription, responseObject.object)
            }
            break;

        case 'XTSCreateObjectsRequest':

            if (params.serverCall) {
                responseObject = createXTSObject('XTSCreateObjectsResponse')
                for (const object of requestObject.objects) {
                    const newObject = await createObject(db, subscription, object)
                    responseObject.objects.push(newObject)
                }
            } else if (responseObject) {
                for (const object of responseObject.objects) {
                    await createObject(db, subscription, object)
                }
            }
            break;

        case 'XTSUpdateObjectsRequest':

            if (params.serverCall) {
                responseObject = createXTSObject('XTSUpdateObjectsResponse')
                console.log('requestObject', requestObject) // requestObject    
                for (const object of requestObject.objects) {
                    const updatedObject = await updateObject(db, subscription, object)
                    responseObject.objects.push(updatedObject)
                }
                console.log('responseObject', responseObject)
            } else if (responseObject) {
                // console.log('responseObject', responseObject)
                for (const object of responseObject.objects) {
                    await updateObject(db, subscription, object)
                }
            }
            break;

        case 'XTSDeleteObjectsRequest':

            if (params.serverCall) {
                responseObject = createXTSObject('XTSDeleteObjectsResponse')
                for (const objectId of requestObject.objectIds) {
                    const deletedObjectId = await deleteObject(db, subscription, objectId)
                    responseObject.objects.push(deletedObjectId)
                }
            } else if (responseObject) {
                for (const objectId of responseObject.objectIds) {
                    await deleteObject(db, subscription, objectId)
                }
            }
            break;

        // RecordSet's
        case 'XTSGetRecordSetRequest':

            responseObject = createXTSObject('XTSGetRecordSetResponse')
            responseObject.recordSet = await getRecordSet(subscription, requestObject.dataType, requestObject.filter)
            break;

        case 'XTSUpdateRecordSetRequest':

            if (params.serverCall) {
                responseObject = createXTSObject('XTSUpdateRecordSetResponse')
                responseObject.recordSet = await updateRecordSet(subscription, requestObject.recordSet)
            } else if (responseObject) {
                await updateRecordSet(subscription, responseObject.recordSet)
            }
            break;

        // File's
        case 'XTSGetFilesRequest':

            if (responseObject) {
                for (const object of responseObject.objects) {
                    await updateObject(db, subscription, object)
                }
            }

            const { fileIds, fileOwner, attributeName } = requestObject
            responseObject = createXTSObject('XTSGetFilesResponse')
            if (fileIds) {
                for (const fileId of requestObject.fileIds) {
                    const file = await getObject(db, subscription, fileId)
                    responseObject.files.push(file)
                }
            } else {
                const fileOwnerObject = await getObject(db, subscription, fileOwner)
                const file = await getObject(db, subscription, fileOwnerObject[attributeName])
                responseObject.files.push(file)
            }
            break;

        case 'XTSDeleteFilesRequest':

            if (params.serverCall) {
                responseObject = createXTSObject('XTSDeleteFilesResponse')
                for (const fileId of requestObject.fileIds) {
                    const deletedFileId = await deleteObject(db, subscription, fileId)
                    responseObject.fileIds.push(deletedFileId)
                }
            } else if (responseObject) {
                for (const fileId of responseObject.fileIds) {
                    await deleteObject(db, subscription, fileId)
                }
            }
            break;

        case 'XTSUploadFileRequest':

            if (params.serverCall) {
                // Không làm gì cả
            } else if (responseObject) {
                await createObject(db, subscription, responseObject.file)
            }
            break;

        // Report's
        case 'XTSGetReportDataRequest':

            break;

        // Additional's
        case 'XTSRefreshObjectListRequest':

            if (responseObject) {

                let count = 0
                for (const item of responseObject.items) {
                    await updateObject(db, subscription, item.object)
                    count = count + 1
                }
                responseObject = createXTSObject('XTSRefreshObjectListResponse')
                responseObject.count = count
            }
            break;

        // Firebase
        case 'XTSCreateCustomTokenRequest':     // Sau này có thể bỏ đi, vì dùng XTSSignInRequest
            responseObject = createCustomToken(subscription, requestObject)

        default:
            break;
    }

    return responseObject
}

