const fetch = require('node-fetch');

// constants
const config = {
    serviceURLs: {
        execute: 'https://xts-app.localto.net/dungbaby-service/hs/apps/execute',
        files: 'https://xts-app.localto.net/dungbaby-service/hs/apps/files',
        download: 'https://xts-app.localto.net/dungbaby-service/hs/apps/download'
    }
};

// OK
module.exports.getFile = async function getFile(request, response, type) {

    try {

        const queryParams = request.query;
        // const printFormId = queryParams['print-form-id'];
        const id = queryParams['id'];
        const dataType = queryParams['data-type'];
        const templateName = queryParams['template-name'];

        let serviceURL = config.serviceURLs.files
        switch (type) {
            case 'printForm':
                serviceURL = serviceURL + '?id=' + id + '&data-type=' + dataType + '&template-name=' + templateName
                break;

            case 'reportForm':
                serviceURL = serviceURL + '?report-id=' + id + '&report-params=' + reportParams
                break;

            default:
                throw new Error('Invalid type')
        }

        const fetchResponse = await fetch(serviceURL);

        response.status(fetchResponse.status);
        fetchResponse.headers.forEach((value, name) => {
            response.setHeader(name, value);
        });

        fetchResponse.body.pipe(response);
    } catch (error) {
        console.error("Error fetching file: ", error);
        response.status(500).send("Error fetching file")
    }
}