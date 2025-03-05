
const admin = require("firebase-admin");

const { getDocumentById } = require('./firebase')
const { configProduction } = require('../commons/constants');
const { createXTSObject } = require('../data-objects/common-use')

// OK
async function getExternalAccount(db, externalAccountData) {

    // console.log('externalAccountData 1', externalAccountData)
    const { telegramId, zaloId, phone, deviceId, userToken, deviceInfo } = externalAccountData

    let externalAccountId = ''
    let externalAccountOwner = ''
    if (telegramId) {
        externalAccountId = telegramId
        externalAccountOwner = 'Telegram'
    } else if (zaloId) {
        externalAccountId = zaloId
        externalAccountOwner = 'Zalo'
    } else if (phone) {
        externalAccountId = phone
        externalAccountOwner = 'Phone'
    }

    // console.log('externalAccountData', externalAccountData)
    // console.log('externalAccountId', externalAccountId)
    // console.log('externalAccountOwner', externalAccountOwner)

    // const db = admin.firestore()
    const collectionExternalAccounts = db.collection("externalAccounts")
    const querySnapshot = await collectionExternalAccounts
        .where("id", "==", externalAccountId)
        .where("owner", "==", externalAccountOwner)
        .get()
    // console.log('externalAccountData 3', externalAccountData)
    if (querySnapshot.empty) {
        // Tạo mới externalAccount
        const newExternalAccount = {
            id: externalAccountId,
            owner: externalAccountOwner,
            user: null,
            createdAt: (new Date).toISOString(),
        }
        // console.log('externalAccountData 4', externalAccountData)
        const docRef = await collectionExternalAccounts.add(newExternalAccount);
        console.log("New externalAccount added with ID: ", docRef.id);

        const doc = await docRef.get();
        return doc.data();
    } else {
        const externalAccount = querySnapshot.docs[0].data()
        // console.log('externalAccount 5', externalAccount);
        return externalAccount;
    }
}

module.exports.getExternalAccount = getExternalAccount

// OK
exports.createCustomToken = async function createCustomToken(db, requestObject) {

    // Lấy uid của người dùng mặc định
    const uid = configProduction.uid
    const { externalAccountData } = requestObject
    // console.log('requestObject', requestObject)
    const externalAccount = await getExternalAccount(db, externalAccountData);
    // console.log('externalAccount 2', externalAccount);

    // const db = admin.firestore()
    const userProfile = await getDocumentById(db, 'userProfiles', externalAccount?.user?.id);
    console.log('userProfile 1', userProfile)

    const customClaims = {
        externalAccountId: externalAccount?.id,
        externalAccountOwner: externalAccount?.owner,
        customer: externalAccount?.customer,
        user: externalAccount?.user,
        company: userProfile?.company,
        // warehouse: { id: 'Warehouse-123', dataType: 'XTSStructuralUnit' },
        warehouse: userProfile?.warehouse,
        salesDepartment: userProfile?.salesDepartment,
        purchaseDepartment: userProfile?.purchaseDepartment,
        financeDepartment: userProfile?.financeDepartment,
        productionDepartment: userProfile?.productionDepartment,
    }

    try {
        const customToken = await admin.auth().createCustomToken(uid, customClaims)
        const responseObject = createXTSObject('XTSCreateCustomTokenResponse')
        responseObject.customToken = customToken
        console.log('responseObject 1', responseObject)
        return responseObject
    } catch (error) {
        console.log('customToken 2', error) // Log the error for debugging
        throw "Internal error: Unable to create custom token"
    }
}

