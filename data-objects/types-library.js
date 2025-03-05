const { XTSObject, XTSObjectId, XTSRequest, XTSResponse } = require('./types-common.js');

// OK
// export class XTSUser extends XTSObject
module.exports.XTSUser = class XTSUser extends XTSObject {

    individual = new XTSObjectId('XTSIndividual');
    description = '';
    phone = '';
    email = '';

    constructor() {
        super('XTSUser');
    }
};

// OK
// export class XTSFile extends XTSObject
module.exports.XTSFile = class XTSFile extends XTSObject {

    author = new XTSObjectId('XTSUser');
    fileOwner = new XTSObjectId('');
    description = '';
    creationDate = '1900-01-01T00:00:00';
    longDescription = '';
    size = 0;
    extension = '';

    constructor(_type = 'XTSFile') {
        super(_type);
    }
};

// OK
// export class XTSDownloadFileRequest extends XTSRequest
module.exports.XTSDownloadFileRequest = class XTSDownloadFileRequest extends XTSRequest {
    fileId = new XTSObjectId('XTSFile');

    constructor() {
        super('XTSDownloadFileRequest');
    }
};

// OK
// export class XTSDownloadFileResponse extends XTSResponse
module.exports.XTSDownloadFileResponse = class XTSDownloadFileResponse extends XTSResponse {

    file = new XTSFile();
    binaryData = '';

    constructor() {
        super('XTSDownloadFileResponse');
    }
};

// OK
// export class XTSGetFilesRequest extends XTSRequest
module.exports.XTSGetFilesRequest = class XTSGetFilesRequest extends XTSRequest {

    fileOwner = new XTSObjectId('');
    startWith = '';
    extension = '';

    constructor(dataType) {
        super('XTSGetFilesRequest');
    }
};

// OK
// export class XTSGetFilesResponse extends XTSResponse
module.exports.XTSGetFilesResponse = class XTSGetFilesResponse extends XTSResponse {

    files = [];

    constructor() {
        super('XTSGetFilesResponse');
    }
};

// OK
// export class XTSUploadFileRequest extends XTSRequest
module.exports.XTSUploadFileRequest = class XTSUploadFileRequest extends XTSRequest {

    file = new XTSFile();
    binaryData = '';
    startsWith = '';
    attributeName = '';
    copyToS3Storage = true;

    constructor() {
        super('XTSUploadFileRequest');
    }
};

// OK
// export class XTSUploadFileResponse extends XTSResponse
module.exports.XTSUploadFileResponse = class XTSUploadFileResponse extends XTSResponse {

    file = new XTSFile();

    constructor() {
        super('XTSUploadFileResponse');
    }
};

// OK
// export class XTSDeleteFilesRequest extends XTSRequest
module.exports.XTSDeleteFilesRequest = class XTSDeleteFilesRequest extends XTSRequest {

    fileIds = [];

    constructor() {
        super('XTSDeleteFilesRequest');
    }
};

// OK
// export class XTSDeleteFilesResponse extends XTSResponse
module.exports.XTSDeleteFilesResponse = class XTSDeleteFilesResponse extends XTSResponse {

    fileIds = [];

    constructor() {
        super('XTSDeleteFilesResponse');
    }
};
