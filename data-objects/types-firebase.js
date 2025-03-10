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

// OK
module.exports.XTSDatabase = class XTSDatabase extends XTSObject {

    description = ''
    name = ''
    dbId = ''
    parameters = {}

    constructor() {
        super('XTSDatabase')
    }
}

// OK
module.exports.XTSDataSection = class XTSDataSection extends XTSObject {

    description = ''
    database = new XTSObjectId('XTSDatabase')
    subscriber = new XTSObjectId('XTSUser')
    company = new XTSObjectId('XTSCompany')

    constructor() {
        super('XTSDataSection')
    }
}

// OK
module.exports.XTSSubscription = class XTSSubscription extends XTSObject {

    description = ''
    database = new XTSObjectId('XTSDatabase')
    subscriber = new XTSObjectId('XTSUser')

    constructor() {
        super('XTSSubscription')
    }
}

