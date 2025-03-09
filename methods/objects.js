const {
    createDoc, getDoc, updateDoc, getDocList, deleteDoc, downloadDocList,
} = require('./firebase-docs');

const {
    createDatabaseObject, updateDatabaseObject, getDatabaseObject, getDatabaseObjectList, deleteDatabaseObject,
    createSubscriptionObject, updateSubscriptionObject, getSubscriptionObject, getSubscriptionObjectList, deleteSubscriptionObject,
    createDataSectionObject, updateDataSectionObject, getDataSectionObject, getDataSectionObjectList, deleteDataSectionObject,
} = require('./firebase-db');

const { getObjectListConditions } = require('./privileges')

// OK
module.exports.getObject = async function getObject(db, dataSection, objectId) {

    switch (objectId.dataType) {
        case 'XTSDatabase':
            responseObject.items = await getDatabaseObject(db, objectId)
            break;
        case 'XTSSubscription':
            responseObject.items = await getSubscriptionObject(db, objectId)
            break;
        case 'XTSDataSestion':
            responseObject.items = await getDataSectionObject(db, objectId)
            break;
        default:
            responseObject.items = await getDoc(db, dataSection, objectId)
            break;
    }
    // const doc = await getDoc(dataSection, objectId)
    return doc;
}

// OK
module.exports.createObject = async function createObject(db, dataSection, object) {

    let doc
    switch (object._type) {
        case 'XTSDatabase':
            doc = await createDatabaseObject(db, object)
            break;
        case 'XTSSubscription':
            console.log('createSubscriptionObject: ', object)
            doc = await createSubscriptionObject(db, object)
            break;
        case 'XTSDataSection':
            console.log('createDataSectionObject: ', object)
            doc = await createDataSectionObject(db, object)
            break;
        default:
            doc = await createDoc(db, dataSection, object)
            break;
    }
    // const doc = await createDoc(dataSection, object);
    return doc;
}

// OK
module.exports.updateObject = async function updateObject(db, dataSection, object) {

    let doc
    switch (object._type) {
        case 'XTSDatabase':
            doc = await updateDatabaseObject(db, object)
            break;
        case 'XTSSubscription':
            doc = await updateSubscriptionObject(db, object)
            break;
        case 'XTSDataSection':
            doc = await updateDataSectionObject(db, object)
            break;
        default:
            doc = await updateDoc(db, dataSection, object)
            break;
    }
    // const doc = await updateDoc(dataSection, object);
    return doc;
}

// OK
module.exports.deleteObject = async function deleteObject(db, dataSection, objectId) {

    let doc
    switch (objectId.dataType) {
        case 'XTSDatabase':
            doc = await deleteDatabaseObject(db, objectId)
            break;
        case 'XTSSubscription':
            doc = await deleteSubscriptionObject(db, objectId)
            break;
        case 'XTSDataSection':
            doc = await deleteDataSectionObject(db, objectId);
            break;
        default:
            doc = await deleteDoc(db, dataSection, objectId)
            break;
    }
    // const doc = await deleteDoc(dataSection, objectId);
    return doc;
}

// Ok
module.exports.getObjectList = async function getObjectList(db, dataSection, requestObject, claims) {

    let docList
    switch (requestObject.dataType) {
        case 'XTSDatabase':
            docList = await getDatabaseObjectList(db, requestObject)
            break;
        case 'XTSSubscription':
            docList = await getSubscriptionObjectList(db, requestObject)
            break;
        case 'XTSDataSection':
            docList = await getDataSectionObjectList(db, requestObject)
            break;
        default:
            docList = await getDocList(db, dataSection, requestObject, claims)
            break;
    }
    // const docList = await getDocList(dataSection, requestObject, claims);
    return docList;
}

// OK
module.exports.downloadObjectList = async function downloadObjectList(dataSection, dataType) {

    const doc = await downloadDocList(db, dataSection, dataType);
    return doc;
}
