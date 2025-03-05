// const fetch = require('node-fetch');

const { configDevelopment } = require('../commons/constants');
const { createXTSObject } = require("../data-objects/common-use");

// const configDevelopment = require('../commons/constants').configDevelopment;
const configProduction = require('../commons/constants').configProduction;

// OK
function requestDataToBackend(requestObject) {

    const serviceURLs = configDevelopment.serviceURLs
    const url = serviceURLs.execute;
    const userName = serviceURLs.userName;
    const password = serviceURLs.password;

    const credentials = btoa(`${userName}:${password}`);
    const fetchInit = {
        method: 'POST',
        headers: {
            'Authorization': `Basic ${credentials}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(requestObject),
    };
    // console.log('url', url)

    return {
        url,
        fetchInit,
    }
}

// Đang dùng, nhưng dần sẽ bỏ đi
module.exports.forwardRequest = async function forwardRequest(request, response) {

    try {
        let requestObject = request.body

        const { url, fetchInit } = requestDataToBackend(requestObject)
        const fetchResponse = await fetch(url, fetchInit);
        const responseObject = await fetchResponse.json();
        // console.log('responseObject', responseObject)
        response.status(fetchResponse.status);
        // response.send(responseObject);
        // fetchResponse.headers.forEach((value, name) => {
        //     response.setHeader(name, value);
        // });
        // fetchResponse.body.pipe(response);

        // if (!fetchResponse.ok) {
        //     throw new Error(`HTTP error! status: ${fetchResponse.status}`);
        // }

        return responseObject;
    } catch (error) {
        console.error('Error calling service:', error);
        throw error;
    }
}

// OK
async function callBackendServer(requestObject) {

    try {
        const { url, fetchInit } = requestDataToBackend(requestObject)
        const fetchResponse = await fetch(url, fetchInit);

        if (!fetchResponse.ok) {
            throw new Error(`HTTP error! status: ${fetchResponse.status}`);
        }
        const responseObject = await fetchResponse.json();
        return responseObject;
    } catch (error) {
        console.error('Error calling service:', error);
        throw error;
    }
}

module.exports.callBackendServer = callBackendServer

// OK
module.exports.getObjectListBE = async function getObjectListBE(dataType) {

    const requestObject = createXTSObject('XTSGetObjectListRequest');
    requestObject.dataType = dataType;

    const responseObject = await callBackendServer(requestObject);

    return responseObject;
}

// Chỉ để tham khảo, sau này cần bỏ đi
module.exports.getObjectListBE2 = async function getObjectListBE(dataType) {

    try {

        // let requestObject = request.body
        const requestObject = createXTSObject('XTSGetObjectListRequest');
        requestObject.dataType = dataType;

        const { url, fetchInit } = requestDataToBackend(requestObject);

        const fetchResponse = await fetch(url, fetchInit);
        const responseObject = await fetchResponse.json();
        // response.status(fetchResponse.status);
        // console.error('responseObject:', responseObject);

        return responseObject;
    } catch (error) {
        console.error('Error calling service:', error);
        throw error;
    }
}