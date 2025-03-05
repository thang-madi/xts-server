
// Interface
module.exports.getCollectionName = function getCollectionName(dataType) {

    const mapCollection = {
        // Catalog
        'XTSExternalAccount': 'externalAccounts',
        'XTSUser': 'users',
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
        'XTSUserSession': 'userSessions',       // Xem lại có cần không

        // Document
        'XTSOrder': 'salesOrders',
        'XTSCashReceipt': 'cashReceipts',
        'XTSPaymentReceipt': 'paymentReceipts',
        'XTSPriceRegistration': 'priceRegistrations',
        'XTSSalesOrder': 'salesOrders',
        'XTSSalesInvoice': 'salesInvoices',
        'XTSSupplierInvoice': 'supplierInvoices',
    }

    return mapCollection[dataType];
}

// OK
module.exports.getDocumentById = async function getDocumentById(db, collectionName, docId) {

    console.log('collectionName', collectionName)
    if (!collectionName || !docId) {
        return null
    }

    try {
        // const db = admin.firestore()
        const docRef = db.collection(collectionName).doc(docId)
        // console.log("docId: ", docId)

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
        console.error("Error:", error)
        return null
    }
}
