const { getCollectionName } = require('./firebase.js');

module.exports.getRecordSet = async function getRecordSet(db, dataType, filter) {
    const records = [];
    const collectionName = getCollectionName(dataType);

    try {
        const collection = db.collection(collectionName);
        let query = collection;

        for (const key in filter) {
            const value = filter[key];
            switch (typeof value) {
                case 'boolean':
                case 'number':
                case 'string':
                    query = query.where(key, '==', value);
                    break;
                case 'object':
                    if (value.hasOwnProperty('_type') && value.dataType === 'XTSObjectId') {
                        query = query.where(`${key}.id`, '==', value.id);
                    }
                    break;
                default:
                    break;
            }
        }

        const querySnapshot = await query.get();
        if (!querySnapshot.empty) {
            querySnapshot.forEach(doc => {
                records.push(doc.data());
            });
        }
    } catch (error) {
        console.error("Error getting documents: ", error);
    }

    const recordSet = {
        dataType: dataType,
        filter: filter,
        records: records,
    };
    return recordSet;
}

// Cần thêm trường hợp chỉ xóa bỏ các record trùng recordKey
module.exports.updateRecordSet = async function updateRecordSet(db, recordSet) {
    const dataType = recordSet.dataType;
    const filter = recordSet.filter;
    const records = recordSet.records;

    const updatedRecords = [];
    const collectionName = getCollectionName(dataType);
    console.log('collectionName', collectionName);

    try {
        const collection = db.collection(collectionName);
        let query = collection;

        for (const key in filter) {
            if (key === '_type') {
                continue;
            }
            const value = filter[key];
            // console.log('value', value);
            switch (typeof value) {
                case 'string':
                case 'boolean':
                case 'number':
                    query = query.where(key, '==', value);
                    // console.log(`${key} ==`, value);
                    break;
                case 'object':
                    if (value === null) {
                        //
                    } else if (value.hasOwnProperty('_type') && value['_type'] === 'XTSObjectId') {
                        query = query.where(`${key}.id`, '==', value.id);
                        // console.log(`${key}.id ==`, value.id);
                    }
                    break;
                default:
                    break;
            }
        }

        const querySnapshot = await query.get();
        // console.log('Number of documents:', querySnapshot.size); // Đoạn mã để in ra số lượng phần tử trong querySnapshot

        const batch = db.batch();
        querySnapshot.forEach(doc => {
            // console.log('doc.id', doc.id);
            const docRef = collection.doc(doc.id);
            batch.delete(docRef);
        });

        records.forEach(record => {
            const docRef = collection.doc();
            batch.set(docRef, record);
            updatedRecords.push(record);
        });

        await batch.commit();
    } catch (error) {
        console.error("Error updating recordSet: ", error);
    }

    const updatedRecordSet = {
        dataType: dataType,
        filter: filter,
        records: updatedRecords,
    };

    return updatedRecordSet;
}
