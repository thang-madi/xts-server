const { getCollectionName } = require('./firebase');
const { getObjectListConditions } = require('./privileges')

// OK
module.exports.getObject = async function getObject(db, objectId) {
    try {
        const dataType = objectId['dataType'];
        const collectionName = getCollectionName(dataType);

        const docRef = db.collection(collectionName).doc(objectId.id);
        const doc = await docRef.get();
        return doc.data();
    } catch (error) {
        console.error("Error get document: ", error);
        return null;
    }
}

// OK
module.exports.createObject = async function createObject(db, object) {
    try {
        const dataType = object['_type'];
        const collectionName = getCollectionName(dataType);
        const docRef = db.collection(collectionName).doc(object.objectId.id);
        await docRef.set(object);
        const doc = await docRef.get();
        console.log('doc', doc.data());
        return doc.data();
    } catch (error) {
        console.error("Error creating document: ", error);
        return null;
    }
}

// OK
module.exports.updateObject = async function updateObject(db, object) {
    try {
        const dataType = object['_type'];
        const collectionName = getCollectionName(dataType);
        console.log('collectionName', collectionName);
        console.log('object.objectId.id', object.objectId.id);

        const docRef = db.collection(collectionName).doc(object.objectId.id);
        let doc = docRef.get()
        if (doc.exists) {
            await docRef.update(object);
        } else {
            await docRef.set(object);
        }

        // await docRef.update(object);
        doc = await docRef.get();
        return doc.data();
    } catch (error) {
        console.error("Error update document: ", error);
        return null;
    }
}

// OK
module.exports.deleteObject = async function deleteObject(db, objectId) {
    try {
        const dataType = objectId['dataType'];
        const collectionName = getCollectionName(dataType);
        console.log('collectionName', collectionName);
        const docRef = db.collection(collectionName).doc(objectId.id);
        await docRef.delete();
        return objectId;
    } catch (error) {
        console.error("Error delete document: ", error);
        return null;
    }
}

// Cần thêm điều kiện
module.exports.getObjectList = async function getObjectList(db, requestObject, claims) {
    try {
        // const privilege = getObjectListConditions(requestObject.dataType)
        const collectionName = getCollectionName(requestObject.dataType);
        const querySnapshot = await db.collection(collectionName).get();

        const items = [];
        querySnapshot.forEach(doc => {
            const item = {
                canHaveChildren: null,
                isFolder: null,
                parentId: null,
                object: doc.data(),
            }
            items.push(item);
        });
        return items;
    } catch (error) {
        console.error("Error get document: ", error);
        return null;
    }
}

// OK
module.exports.downloadObjectList = async function downloadObjectList(db, dataType) {
    try {
        const collectionName = getCollectionName(dataType);
        const querySnapshot = await db.collection(collectionName).get();

        const objects = [];
        querySnapshot.forEach(doc => {
            objects.push(doc.data());
        });
        return objects;
    } catch (error) {
        console.error("Error get document: ", error);
        return null;
    }
}
