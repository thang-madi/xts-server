
const NodeCache = require('node-cache');
const cacheXTS = new NodeCache({ stdTTL: 36000, checkperiod: 36100 });

const cacheCollectionName = 'cacheXTS';

// const admin = require('firebase-admin');
// admin.initializeApp();
// const db = admin.firestore();

async function getParameter(db, paramName) {

    // Kiểm tra giá trị trong cache
    let paramValue = cacheXTS.get(paramName);
    if (!paramValue) {
        console.log('Cache miss. Fetching from Firestore...');

        // Truy xuất giá trị từ Firestore nếu không có trong cache
        const paramDoc = await db.collection('parameters').doc(paramName).get();
        if (paramDoc.exists) {
            paramValue = paramDoc.data().value;
            // Lưu giá trị vào cache
            cacheXTS.set(paramName, paramValue);
        } else {
            console.log('Parameter not found in Firestore');
        }
    } else {
        console.log('Cache hit. Returning cached value...');
    }
    return paramValue;
}

// // Ví dụ sử dụng
// getParameter('myParam').then(value => {
//     console.log('Parameter value:', value);
// });
