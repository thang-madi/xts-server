
const { DocumentReference } = require("firebase/firestore");
const { XTSIndividual, XTSCart } = require("../data-objects/types-application");

// const { createDoc, updateDoc, getDoc, deleteDoc, getDocList } = require("./firebase-methods");

// Interface

// OK
function getNameItem(dataType, dbName) {

    let mapCollection = {};

    const mapCommon = {
        XTSDatabase: {
            collectionName: 'databases',
            isCommon: null
        },
        XTSSubscription: {
            collectionName: 'subscriptions',
            isCommon: null
        },
        XTSDataSection: {
            collectionName: 'dataSections',
            isCommon: null
        },
        // 'XTSExternalAccount': 'externalAccounts',
        // XTSUser: 'users',
        // 'XTSUserSession': 'userSessions', // Xem lại có cần không
    };
    // console.log('dbName', dbName);
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
module.exports.getNameItem = getNameItem;

// OK
function mapCollectionName_Retail() {
    return {
        // Catalog
        XTSExternalAccount: {
            collectionName: 'externalAccounts',
            isCommon: false,
        },
        XTSCounterparty: {
            collectionName: 'counterparties',
            isCommon: false,
        },
        XTSStructuralUnit: {
            collectionName: 'structuralUnits',
            isCommon: false,
        },
        XTSEmployee: {
            collectionName: 'employees',
            isCommon: false,
        },
        XTSCurrency: {
            collectionName: 'currencies',
            isCommon: true,
        },
        XTSPriceKind: {
            collectionName: 'priceKinds',
            isCommon: true,
        },
        XTSIndividual: {
            collectionName: 'individuals',
            isCommon: true,
        },
        XTSCompany: {
            collectionName: 'companies',
            isCommon: false,
        },
        XTSProduct: {
            collectionName: 'products',
            isCommon: false,
        },
        XTSMeasurementUnit: {
            collectionName: 'measurementUnits',
            isCommon: true,
        },
        XTSUOMClassifier: {
            collectionName: 'uomClassifiers',
            isCommon: true,
        },

        // Information register
        XTSCart: {
            collectionName: 'carts',
            isCommon: false,
        },

        // Document
        XTSOrder: {
            collectionName: 'salesOrders',
            isCommon: false,
        },
        XTSCashReceipt: {
            collectionName: 'cashReceipts',
            isCommon: false,
        },
        XTSPaymentReceipt: {
            collectionName: 'paymentReceipts',
            isCommon: false,
        },
        XTSPriceRegistration: {
            collectionName: 'priceRegistrations',
            isCommon: false,
        },
        XTSSalesOrder: {
            collectionName: 'salesOrders',
            isCommon: false,

        },
        XTSSalesInvoice: {
            collectionName: 'salesInvoices',
            isCommon: false,
        },

        XTSSupplierInvoice: {
            collectionName: 'supplierInvoices',
            isCommon: false,
        },
    };
}

// 
async function getParentRef(db, dataSection, nameItem) {

    if (nameItem.isCommon === null) {
        return db;
    } else if (nameItem.isCommon === false) {
        return dataSection;
    } else {
        try {
            const dataSectionSnapshot = await dataSection.get();
            const commonSection = dataSectionSnapshot.data().commonSection;
            // console.log('dataSection.data()', dataSection.data());
            console.log('commonSection', commonSection);
            if (commonSection) {
                const commonSectionRef = db.collection('dataSections').doc(commonSection.id);
                const commonSectionSnapshot = await commonSectionRef.get();
                if (commonSectionSnapshot.exists) {
                    return commonSectionRef;
                } else {
                    return null;
                }
            }
        } catch (error) {
            console.error("Error get dataSection: ", error);
            return null;
        }
    }
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

// Sau này sẽ bỏ đi
// function choiceParent(dataType, db, parent) {
//     const rootDataTypes = [
//         'XTSDatabase',
//         'XTSSubscription',
//         'XTSDataSection',
//         'XTSLogItem',
//     ];
//     return rootDataTypes.includes(dataType) && db || parent;
// }

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
    // const parentRef = choiceParent(dataType, db, parent);

    // let parentDoc = null;
    // if (parent) {
    //     parentDoc = await parent.get();
    // }
    // const dbName = parentDoc?.database?.name;

    let dbName = null
    if (parent) {
        let parentDoc = await parent.get();
        if (parentDoc.exists) {
            parentDoc = parentDoc.data();
            dbName = parentDoc?.database?.name;
        }
    }
    const nameItem = getNameItem(dataType, dbName);
    const parentRef = await getParentRef(db, parent, nameItem);
    console.log('nameItem', nameItem);

    try {
        const docRef = parentRef.collection(nameItem.collectionName).doc(objectId.id);
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

    // const parentRef = choiceParent(dataType, db, parent);

    const dataType = object.objectId['dataType'];
    let dbName = null
    if (parent) {
        let parentDoc = await parent.get();
        if (parentDoc.exists) {
            parentDoc = parentDoc.data();
            dbName = parentDoc?.database?.name;
        }
    }
    const nameItem = getNameItem(dataType, dbName);
    const parentRef = await getParentRef(db, parent, nameItem);

    try {
        const docRef = parentRef.collection(nameItem.collectionName).doc(object.objectId.id);
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

    // const parentRef = choiceParent(dataType, db, parent);

    const dataType = object.objectId['dataType'];
    let dbName = null
    if (parent) {
        let parentDoc = await parent.get();
        if (parentDoc.exists) {
            parentDoc = parentDoc.data();
            dbName = parentDoc?.database?.name;
        }
    }
    const nameItem = getNameItem(dataType, dbName);
    console.log('dataType', dataType);
    console.log('dbName', dbName);
    console.log('nameItem', nameItem);
    console.log('object.objectId.id', object.objectId.id);
    const parentRef = await getParentRef(db, parent, nameItem);

    try {
        const docRef = parentRef.collection(nameItem.collectionName).doc(object.objectId.id);
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
    // const parentRef = choiceParent(dataType, db, parent);

    // let parentDoc = null;
    // if (parent) {
    //     parentDoc = await parent.get();
    // }
    // const dbName = parentDoc?.database?.name;
    let dbName = null
    if (parent) {
        let parentDoc = await parent.get();
        if (parentDoc.exists) {
            parentDoc = parentDoc.data();
            dbName = parentDoc?.database?.name;
        }
    }
    const nameItem = getNameItem(dataType, dbName);
    const parentRef = await getParentRef(db, parent, nameItem);

    try {
        // const dataType = objectId['dataType'];
        // const dbName = parent?.database.name;
        const nameItem = getNameItem(dataType, dbName);
        console.log('nameItem', nameItem);
        const docRef = parentRef.collection(nameItem.collectionName).doc(objectId.id);
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
    } else if (!requestObject || !requestObject['dataType']) {
        console.error("Invalid objectId format.");
        return null;
    }

    const dataType = requestObject['dataType'];
    // const dataType = objectId['dataType'];
    // const parentRef = choiceParent(dataType, db, parent);

    // let parentDoc = null;
    // if (parent) {
    //     parentDoc = await parent.get();
    // }
    // const dbName = parentDoc?.database?.name;
    let dbName = null
    if (parent) {
        let parentDoc = await parent.get();
        if (parentDoc.exists) {
            parentDoc = parentDoc.data();
            dbName = parentDoc?.database?.name;
        }
    }
    const nameItem = getNameItem(dataType, dbName);
    const parentRef = await getParentRef(db, parent, nameItem);

    try {
        // const dbName = parent?.database.name;
        // const nameItem = getNameItem(dataType, dbName);
        const querySnapshot = await parentRef.collection(nameItem.collectionName).get();

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

    // const parentRef = choiceParent(dataType, db, parent);

    // let parentDoc = null;
    // if (parent) {
    //     parentDoc = await parent.get();
    // }
    // const dbName = parentDoc?.database?.name;
    let dbName = null
    if (parent) {
        let parentDoc = await parent.get();
        if (parentDoc.exists) {
            parentDoc = parentDoc.data();
            dbName = parentDoc?.database?.name;
        }
    }
    const nameItem = getNameItem(dataType, dbName);
    const parentRef = await getParentRef(db, parent, nameItem);

    try {
        // const dbName = parent?.database.name;
        // const nameItem = getNameItem(dataType, dbName);
        const querySnapshot = await parentRef.collection(nameItem.collectionName).get();

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
