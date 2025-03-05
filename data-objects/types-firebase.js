const { XTSObject, XTSObjectId, XTSObjectRow, XTSRecord, XTSRequest, XTSResponse, XTSType } = require("./types-common.js")


// OK
module.exports.XTSCreateCustomTokenRequest = class XTSCreateCustomTokenRequest extends XTSRequest {

    externalAccountData = null

    constructor() {
        super('XTSCreateCustomTokenRequest')
    }
}

// OK
module.exports.XTSCreateCustomTokenResponse = class XTSCreateCustomTokenResponse extends XTSResponse {

    customToken = null

    constructor() {
        super('XTSCreateCustomTokenResponse')
    }
}