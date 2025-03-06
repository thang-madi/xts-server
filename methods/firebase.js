const { createDoc, updateDoc, getDoc, deleteDoc, getDocList } = require("./firebase-methods");

// Interface

// OK
function getCollectionName(dataType, dbName) {
    let mapCollection = {};

    const mapCommon = {
        'XTSDatabasse': 'databases',
        'XTSSubscription': 'subscriptions',
        'XTSExternalAccount': 'externalAccounts',
        'XTSUser': 'users',
        'XTSUserSession': 'userSessions', // Xem lại có cần không
    };

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

    return mapCollection[dataType];
}
module.exports.getCollectionName = getCollectionName;

// OK
function mapCollectionName_Retail() {
    return {
        // Catalog
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

// OK
async function getDoc(parent, objectId) {
    try {
        const dataType = objectId['dataType'];
        const dbName = parent?.database.name;
        const collectionName = getCollectionName(dataType, dbName);

        const docRef = parent.collection(collectionName).doc(objectId.id);
        const doc = await docRef.get();
        return doc.data();
    } catch (error) {
        console.error("Error get document: ", error);
        return null;
    }
}
module.exports.getDoc = getDoc;

// OK
async function createDoc(parent, object) {
    try {
        const dataType = object['_type'];
        const dbName = parent?.database.name;
        const collectionName = getCollectionName(dataType, dbName);
        const docRef = parent.collection(collectionName).doc(object.objectId.id);
        await docRef.set(object);
        const doc = await docRef.get();
        console.log('doc', doc.data());
        return doc.data();
    } catch (error) {
        console.error("Error creating document: ", error);
        return null;
    }
}
module.exports.createDoc = createDoc;

// OK
async function updateDoc(parent, object) {
    try {
        const dataType = object['_type'];
        const dbName = parent?.database.name;
        const collectionName = getCollectionName(dataType, dbName);
        console.log('collectionName', collectionName);
        console.log('object.objectId.id', object.objectId.id);

        const docRef = parent.collection(collectionName).doc(object.objectId.id);
        let doc = await docRef.get();
        if (doc.exists) {
            await docRef.update(object);
        } else {
            await docRef.set(object);
        }

        doc = await docRef.get();
        return doc.data();
    } catch (error) {
        console.error("Error update document: ", error);
        return null;
    }
}
module.exports.updateDoc = updateDoc;

// OK
async function deleteDoc(parent, objectId) {
    try {
        const dataType = objectId['dataType'];
        const dbName = parent?.database.name;
        const collectionName = getCollectionName(dataType, dbName);
        console.log('collectionName', collectionName);
        const docRef = parent.collection(collectionName).doc(objectId.id);
        await docRef.delete();
        return objectId;
    } catch (error) {
        console.error("Error delete document: ", error);
        return null;
    }
}
module.exports.deleteDoc = deleteDoc;

// Cần thêm điều kiện
async function getDocList(parent, requestObject, claims) {
    try {
        const dataType = requestObject.dataType;
        const dbName = parent?.database.name;
        const collectionName = getCollectionName(dataType, dbName);
        const querySnapshot = await parent.collection(collectionName).get();

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
        console.error("Error get document: ", error);
        return null;
    }
}
module.exports.getDocList = getDocList;

// OK
async function downloadDocList(parent, dataType) {
    try {
        const dbName = parent?.database.name;
        const collectionName = getCollectionName(dataType, dbName);
        const querySnapshot = await parent.collection(collectionName).get();

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
module.exports.downloadDocList = downloadDocList;

///////////////////////////////////////////
// DatabaseObjects

module.exports.getDatabaseObjectList = async function getDatabaseObjectList(db, object) {
    const databaseObject = await getDocList(db, object);
    return databaseObject;
};

module.exports.createDatabaseObject = async function createDatabaseObject(db, object) {
    const databaseObject = await createDoc(db, object);
    return databaseObject;
};

module.exports.updateDatabaseObject = async function updateDatabaseObject(db, object) {
    try {
        const databaseObject = await updateDoc(db, object);

        // Tìm kiếm các subscription liên quan    
        const collectionName = getCollectionName('XTSSubscription', db.database.name);
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
    const databaseObject = await getDoc(db, objectId);
    return databaseObject;
};

module.exports.deleteDatabaseObject = async function deleteDatabaseObject(db, objectId) {
    const doc = await deleteDoc(db, objectId);
    return doc;
};

///////////////////////////////////////////
// SubscriptionObjects

module.exports.getSubscriptionObjectList = async function getSubscriptionObjectList(db, object) {
    const docList = await getDocList(db, object);
    return docList;
};

module.exports.createSubscriptionObject = async function createSubscriptionObject(db, object, databaseObjectId) {
    const databaseObject = await getDoc(db, databaseObjectId);
    if (!databaseObject) {
        console.error("Database object not found. DatabaseObjectId:", databaseObjectId);
        return null;
    }
    object.database = databaseObject;
    const subscriptionObject = await createDoc(db, object);
    return subscriptionObject;
};

module.exports.updateSubscriptionObject = async function updateSubscriptionObject(db, object, databaseObjectId) {
    const databaseObject = await getDoc(db, databaseObjectId);
    if (!databaseObject) {
        console.error("Database object not found. DatabaseObjectId:", databaseObjectId);
        return null;
    }
    object.database = databaseObject;
    const subscriptionObject = await updateDoc(db, object);
    return subscriptionObject;
};

module.exports.getSubscriptionObject = async function getSubscriptionObject(db, objectId) {
    const subscriptionObject = await getDoc(db, objectId);
    return subscriptionObject;
};

module.exports.deleteSubscriptionObject = async function deleteSubscriptionObject(db, objectId) {
    const doc = await deleteDoc(db, objectId);
    return doc;
};

module.exports.getSubscriptionRef = async function getSubscriptionRef(db, objectId) {
    try {
        const dataType = objectId['dataType'];
        const collectionName = getCollectionName(dataType, db.database.name);

        const docRef = db.collection(collectionName).doc(objectId.id);
        return docRef;
    } catch (error) {
        console.error("Error get subscription: ", error);
        return null;
    }
};
