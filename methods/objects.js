const {
    createDoc, getDoc, updateDoc, getDocList, deleteDoc, downloadDocList,
} = require('./firebase-docs');

const {
    createDatabaseObject, updateDatabaseObject, getDatabaseObject, getDatabaseObjectList, deleteDatabaseObject,
    createSubscriptionObject, updateSubscriptionObject, getSubscriptionObject, getSubscriptionObjectList, deleteSubscriptionObject,
} = require('./firebase-db');

const { getObjectListConditions } = require('./privileges')

// OK
module.exports.getObject = async function getObject(db, subscription, objectId) {

    switch (objectId.dataType) {
        case 'XTSDatabase':
            responseObject.items = await getDatabaseObject(db, objectId)
            break;
        case 'XTSSubscription':
            responseObject.items = await getSubscriptionObject(db, objectId)
            break;
        default:
            responseObject.items = await getDoc(db, subscription, objectId)
            break;
    }
    // const doc = await getDoc(subscription, objectId)
    return doc;
}

// OK
module.exports.createObject = async function createObject(db, subscription, object) {

    let doc
    switch (object._type) {
        case 'XTSDatabase':
            doc = await createDatabaseObject(db, object)
            break;
        case 'XTSSubscription':
            console.log('createSubscriptionObject: ', object)
            doc = await createSubscriptionObject(db, object)
            break;
        default:
            doc = await createDoc(db, subscription, object)
            break;
    }
    // const doc = await createDoc(subscription, object);
    return doc;
}

// OK
module.exports.updateObject = async function updateObject(db, subscription, object) {

    let doc
    switch (object._type) {
        case 'XTSDatabase':
            doc = await updateDatabaseObject(db, object)
            break;
        case 'XTSSubscription':
            doc = await updateSubscriptionObject(db, object)
            break;
        default:
            doc = await updateDoc(db, subscription, object)
            break;
    }
    // const doc = await updateDoc(subscription, object);
    return doc;
}

// OK
module.exports.deleteObject = async function deleteObject(db, subscription, objectId) {

    let doc
    switch (objectId.dataType) {
        case 'XTSDatabase':
            doc = await deleteDatabaseObject(db, objectId)
            break;
        case 'XTSSubscription':
            doc = await deleteSubscriptionObject(db, objectId)
            break;
        default:
            doc = await deleteDoc(db, subscription, objectId)
            break;
    }
    // const doc = await deleteDoc(subscription, objectId);
    return doc;
}

// Ok
module.exports.getObjectList = async function getObjectList(db, subscription, requestObject, claims) {

    let docList
    switch (requestObject.dataType) {
        case 'XTSDatabase':
            docList = await getDatabaseObjectList(db, requestObject)
            break;
        case 'XTSSubscription':
            docList = await getSubscriptionObjectList(db, requestObject)
            break;
        default:
            docList = await getDocList(db, subscription, requestObject, claims)
            break;
    }
    // const docList = await getDocList(subscription, requestObject, claims);
    return docList;
}

// OK
module.exports.downloadObjectList = async function downloadObjectList(subscription, dataType) {

    const doc = await downloadDocList(db, subscription, dataType);
    return doc;
}
