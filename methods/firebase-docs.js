
const { DocumentReference } = require("firebase/firestore");

// const { createDoc, updateDoc, getDoc, deleteDoc, getDocList } = require("./firebase-methods");

// Interface

// OK
function getCollectionName(dataType, dbName) {

    let mapCollection = {};

    const mapCommon = {
        'XTSDatabase': 'databases',
        'XTSSubscription': 'subscriptions',
        // 'XTSExternalAccount': 'externalAccounts',
        'XTSUser': 'users',
        'XTSUserSession': 'userSessions', // Xem lại có cần không
    };

    console.log('dbName', dbName);
    switch (dbName) {
        case 'Retail':
            mapCollection = mapCollectionName_Retail();
            break;
        case 'XTS':
            mapCollection = {};
            break;
        default:
            break;
    }

    mapCollection = { ...mapCommon, ...mapCollection };
    console.log('mapCollection', mapCollection);
    console.log('dataType', dataType);
    return mapCollection[dataType];
}
module.exports.getCollectionName = getCollectionName;

// OK
function mapCollectionName_Retail() {
    return {
        // Catalog
        'XTSExternalAccount': 'externalAccounts',

        'XTSCounterparty': 'counterparties',
        'XTSStructuralUnit': 'structuralUnits',
        'XTSEmployee': 'employees',
        'XTSCurrency': 'currencies',
        'XTSIndividual': 'individuals',
        'XTSCompany': 'companies',
        'XTSProduct': 'products',
        'XTSMeasurementUnit': 'measurementUnits',
        'XTSUOMClassifier': 'uomClassifiers',

        // Information register
        'XTSCart': 'carts',

        // Document
        'XTSOrder': 'salesOrders',
        'XTSCashReceipt': 'cashReceipts',
        'XTSPaymentReceipt': 'paymentReceipts',
        'XTSPriceRegistration': 'priceRegistrations',
        'XTSSalesOrder': 'salesOrders',
        'XTSSalesInvoice': 'salesInvoices',
        'XTSSupplierInvoice': 'supplierInvoices',
    };
}

// OK
module.exports.getDocumentById = async function getDocumentById(db, collectionName, docId) {
    console.log('collectionName', collectionName);
    if (!collectionName || !docId) {
        console.error('Invalid collectionName or docId');
        return null;
    }

    try {
        const docRef = db.collection(collectionName).doc(docId);
        const docSnap = await docRef.get();

        if (docSnap.exists) {
            const data = docSnap.data();
            console.log("Document data:", data);
            return data;
        } else {
            console.log("Document not found. DocID:", docId);
            return null;
        }
    } catch (error) {
        console.error("Error:", error);
        return null;
    }
};

///////////////////////////////////////////
// Documents

function choiceParent(dataType, db, parent) {
    const rootDataTypes = [
        'XTSDatabase',
        'XTSSubscription',
        'XTSLogItem',
    ];
    return rootDataTypes.includes(dataType) && db || parent;
}

// OK
module.exports.getDoc = async function getDoc(db, parent, objectId) {

    if (!db) {
        console.error("Database is not defined.");
        return null;
        // } else if (!parent) {
        //     console.error("Parent is not defined.");
        //     return null;
    } else if (!objectId || !objectId.id || !objectId['dataType']) {
        console.error("Invalid objectId format.");
        return null;
    }

    const dataType = objectId['dataType'];
    const parentRef = choiceParent(dataType, db, parent);

    let parentDoc = null;
    if (parent) {
        parentDoc = await parent.get();
    }
    const dbName = parentDoc?.database?.name;

    try {
        const collectionName = getCollectionName(dataType, dbName);
        console.log('collectionName', collectionName);
        const docRef = parentRef.collection(collectionName).doc(objectId.id);
        const docSnapshot = await docRef.get();

        if (!docSnapshot.exists) {
            console.error("Document not found.");
            return null;
        }
        return docSnapshot.data();
    } catch (error) {
        console.error("Error get document: ", error);
        return null;
    }
}

// OK
module.exports.createDoc = async function createDoc(db, parent, object) {

    if (!db) {
        console.error("Database is not defined.");
        return null;
        // } else if (!parent) {
        //     console.error("Parent is not defined.");
        //     return null;
    } else if (!object || !object.objectId || !object.objectId.id || !object.objectId['_type'] || !object.objectId['dataType']) {
        console.error("Invalid objectId format.");
        return null;
    }

    const dataType = object.objectId['dataType'];
    const parentRef = choiceParent(dataType, db, parent);

    let parentDoc = null;
    if (parent) {
        parentDoc = await parent.get();
    }
    const dbName = parentDoc?.database?.name;

    try {
        // const dataType = object['_type'];
        // let dbName = null;
        // console.log('parent', parent);
        // if (parent instanceof DocumentReference) {
        //     // Đây là 1 subscription
        //     const subscription = await parent.get();
        //     dbName = subscription?.database.name;
        // }
        // console.log('dbName', dbName);
        const collectionName = getCollectionName(dataType, dbName);
        // console.log('collectionName', collectionName);
        // console.log('object.objectId', object.objectId);
        const docRef = parentRef.collection(collectionName).doc(object.objectId.id);
        await docRef.set(object);
        const docSnapshot = await docRef.get();
        console.log('doc', docSnapshot.data());
        return docSnapshot.data();
    } catch (error) {
        console.error("Error creating document: ", error);
        return null;
    }
}

// OK
module.exports.updateDoc = async function updateDoc(db, parent, object) {

    if (!db) {
        console.error("Database is not defined.");
        return null;
        // } else if (!parent) {
        //     console.error("Parent is not defined.");
        //     return null;
    } else if (!object || !object.objectId || !object.objectId.id || !object.objectId['_type']) {
        console.error("Invalid objectId format.");
        return null;
    }

    const dataType = object.objectId['dataType'];
    const parentRef = choiceParent(dataType, db, parent);

    let parentDoc = null;
    if (parent) {
        parentDoc = await parent.get();
        parentDoc = parentDoc.data();
    }
    const dbName = parentDoc?.database?.name;
    console.log('parentDoc', parentDoc)

    try {
        // const dataType = object['_type'];
        // const dbName = parent?.database.name;
        const collectionName = getCollectionName(dataType, dbName);
        console.log('dataType', dataType);
        console.log('dbName', dbName);
        console.log('collectionName', collectionName);
        console.log('object.objectId.id', object.objectId.id);

        const docRef = parentRef.collection(collectionName).doc(object.objectId.id);
        let docSnapshot = await docRef.get();
        if (docSnapshot.exists) {
            await docRef.update(object);
        } else {
            await docRef.set(object);
        }

        docSnapshot = await docRef.get();
        return docSnapshot.data();
    } catch (error) {
        console.error("Error update document: ", error);
        return null;
    }
}

// OK
module.exports.deleteDoc = async function deleteDoc(db, parent, objectId) {

    if (!db) {
        console.error("Database is not defined.");
        return null;
        // } else if (!parent) {
        //     console.error("Parent is not defined.");
        //     return null;
    } else if (!objectId || !objectId.id || !objectId['dataType']) {
        console.error("Invalid objectId format.");
        return null;
    }

    const dataType = objectId['dataType'];
    const parentRef = choiceParent(dataType, db, parent);

    let parentDoc = null;
    if (parent) {
        parentDoc = await parent.get();
    }
    const dbName = parentDoc?.database?.name;

    try {
        // const dataType = objectId['dataType'];
        // const dbName = parent?.database.name;
        const collectionName = getCollectionName(dataType, dbName);
        console.log('collectionName', collectionName);
        const docRef = parentRef.collection(collectionName).doc(objectId.id);
        await docRef.delete();
        return objectId;
    } catch (error) {
        console.error("Error delete document: ", error);
        return null;
    }
}

// Cần thêm điều kiện
module.exports.getDocList = async function getDocList(db, parent, requestObject, claims) {

    if (!db) {
        console.error("Database is not defined.");
        return null;
        // } else if (!parent) {
        //     console.error("Parent is not defined.");
        //     return null;
    } else if (!requestObject || !requestObject.id || !requestObject['dataType']) {
        console.error("Invalid objectId format.");
        return null;
    }

    const dataType = requestObject['dataType'];
    // const dataType = objectId['dataType'];
    const parentRef = choiceParent(dataType, db, parent);

    let parentDoc = null;
    if (parent) {
        parentDoc = await parent.get();
    }
    const dbName = parentDoc?.database?.name;

    try {
        // const dbName = parent?.database.name;
        const collectionName = getCollectionName(dataType, dbName);
        const querySnapshot = await parentRef.collection(collectionName).get();

        const items = [];
        querySnapshot.forEach(doc => {
            const item = {
                canHaveChildren: null,
                isFolder: null,
                parentId: null,
                object: doc.data(),
            };
            items.push(item);
        });
        return items;
    } catch (error) {
        console.error("Error get document list: ", error);
        return null;
    }
}

// OK
module.exports.downloadDocList = async function downloadDocList(db, parent, dataType) {

    if (!db) {
        console.error("Database is not defined.");
        return null;
        // } else if (!parent) {
        //     console.error("Parent is not defined.");
        //     return null;
    }

    const parentRef = choiceParent(dataType, db, parent);

    let parentDoc = null;
    if (parent) {
        parentDoc = await parent.get();
    }
    const dbName = parentDoc?.database?.name;

    try {
        // const dbName = parent?.database.name;
        const collectionName = getCollectionName(dataType, dbName);
        const querySnapshot = await parentRef.collection(collectionName).get();

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
