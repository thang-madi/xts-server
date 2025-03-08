
const { getCollectionName, createDoc, updateDoc, getDoc, deleteDoc, getDocList } = require("./firebase-docs")


///////////////////////////////////////////
// DatabaseObjects

module.exports.getDatabaseObjectList = async function getDatabaseObjectList(db, object) {
    const databaseObject = await getDocList(db, null, object);
    return databaseObject;
};

module.exports.createDatabaseObject = async function createDatabaseObject(db, object) {

    if (!object) {
        console.error("Object is empty. Object: ", object);
        return null;
    } else if (!object.objectId) {
        console.error("Object.objectId not found. Object: ", object);
        return null;
    }

    if (!object.objectId.id) {
        const { v4: uuidv4 } = require('uuid');
        object.objectId.id = uuidv4();
    }

    // console.log('createDatabaseObject 1:', object);
    const databaseObject = await createDoc(db, null, object);
    // console.log('createDatabaseObject 2:', databaseObject);
    return databaseObject;
};

module.exports.updateDatabaseObject = async function updateDatabaseObject(db, object) {

    if (!object) {
        console.error("Object is empty. Object: ", object);
        return null;
    } else if (!object.objectId) {
        console.error("Object.objectId not found. Object: ", object);
        return null;
    }

    try {
        const databaseObject = await updateDoc(db, null, object);

        // Tìm kiếm các subscription liên quan    
        const collectionName = getCollectionName('XTSSubscription', db?.database.name);
        const querySnapshot = await db.collection(collectionName)
            .where('database.objectId.id', '==', databaseObject.objectId.id)
            .get();

        // Cập nhật các subscription liên quan
        querySnapshot.forEach(async (doc) => {
            const subscription = doc.data();
            subscription.database = databaseObject;
            await db.collection(collectionName).doc(doc.id).update(subscription);
        });

        return databaseObject;
    } catch (error) {
        console.error("Error updating database object: ", error);
        return null;
    }
};

module.exports.getDatabaseObject = async function getDatabaseObject(db, objectId) {
    const databaseObject = await getDoc(db, null, objectId);
    return databaseObject;
};

module.exports.deleteDatabaseObject = async function deleteDatabaseObject(db, objectId) {
    const doc = await deleteDoc(db, null, objectId);
    return doc;
};


///////////////////////////////////////////
// SubscriptionObjects

module.exports.getSubscriptionObjectList = async function getSubscriptionObjectList(db, object) {
    const docList = await getDocList(db, null, object);
    return docList;
};

module.exports.createSubscriptionObject = async function createSubscriptionObject(db, object) {

    if (!object) {
        console.error("Object is empty. Object: ", object);
        return null;
    } else if (!object.objectId) {
        console.error("Object.objectId not found. Object: ", object);
        return null;
    }

    if (!object.objectId.id) {
        const { v4: uuidv4 } = require('uuid');
        object.objectId.id = uuidv4();
    }

    const databaseObject = await getDoc(db, null, object?.database?.objectId);
    console.log('databaseObject:', databaseObject);
    if (!databaseObject) {
        console.error("Database object not found. DatabaseObjectId:", object.database);
        return null;
    }
    // object.database = databaseObject;
    const newObject = { ...object, database: databaseObject };
    console.log('newObject:', newObject);
    const subscriptionObject = await createDoc(db, null, newObject);
    console.log('subscriptionObject:', subscriptionObject);
    return subscriptionObject;
};

module.exports.updateSubscriptionObject = async function updateSubscriptionObject(db, object) {

    if (!object) {
        console.error("Object is empty. Object: ", object);
        return null;
    } else if (!object.objectId) {
        console.error("Object.objectId not found. Object: ", object);
        return null;
    }

    const databaseObject = await getDoc(db, null, object.database);
    if (!databaseObject) {
        console.error("Database object not found. DatabaseObjectId:", object.database);
        return null;
    }
    object.database = databaseObject;
    const subscriptionObject = await updateDoc(db, null, object);
    return subscriptionObject;
};

module.exports.getSubscriptionObject = async function getSubscriptionObject(db, objectId) {
    const subscriptionObject = await getDoc(db, null, objectId);
    return subscriptionObject;
};

module.exports.deleteSubscriptionObject = async function deleteSubscriptionObject(db, objectId) {
    const doc = await deleteDoc(db, null, objectId);
    return doc;
};

module.exports.getSubscriptionRef = async function getSubscriptionRef(db, objectId) {

    // console.log('parent:', db);
    console.log('objectId:', objectId);

    if (!db) {
        // console.error("Parent is not defined.");
        // return null;
    }
    if (!objectId || !objectId['id'] || !objectId['dataType']) {
        console.error("Invalid objectId format.");
        return null;
    }

    try {
        const dataType = objectId['dataType'];
        // const collectionName = getCollectionName(dataType, db.database.name);
        const collectionName = getCollectionName(dataType);
        console.log('collectionName:', collectionName);

        const docRef = db.collection(collectionName).doc(objectId.id);
        const docSnapshot = await docRef.get();

        if (!docSnapshot.exists) {
            console.error("Subscription not found.");
            return null;
        }

        console.log("docRef:", docRef);
        return docRef;
    } catch (error) {
        console.error("Error get subscription: ", error);
        return null;
    }
};
