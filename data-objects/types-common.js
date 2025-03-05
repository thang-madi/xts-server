

// OK
// export class XTSType {
module.exports.XTSType = class XTSType {
    _type

    constructor(_type) {
        this._type = _type
        // this.fillEmptyDates()
    }

    writeJSON(deleteEmptyRef = false) {
        if (deleteEmptyRef) {
            this.clearEmptyRef()
        }
        return JSON.stringify(this, null, 4)
    }

    // fillEmptyDates() {
    //     const emptyFields = this.dateFields()
    //     const thisObject = this
    //     for (let field of emptyFields) {
    //         if (!thisObject[field]) {
    //             thisObject[field] = '0001-01-01'
    //         }
    //     }
    // }

    clearEmptyRef() {
        const thisObject = this
        for (const key of Object.keys(this)) {
            const propertyValue = thisObject[key]
            if (typeof propertyValue === 'object') {
                if (propertyValue.hasOwnProperty('_type') && propertyValue['_type'] === 'XTSObjectId' && propertyValue['id'] === '') {
                    thisObject[key] = undefined
                }
            }
        }
    }

    fillPropertyValues(propertyValues) {
        for (let key in propertyValues) {
            if (this.hasOwnProperty(key)) {
                this[key] = propertyValues[key]
            }
        }
    }
}

// OK
// export class XTSObjectId extends this.XTSType {
module.exports.XTSObjectId = class XTSObjectId extends this.XTSType {

    dataType = ''
    id = ''
    presentation = ''
    url = ''

    constructor(dataType) {
        super('XTSObjectId')
        if (dataType) {
            this.dataType = dataType
        }
    }
}

// OK
// export class XTSObject extends this.XTSType {
module.exports.XTSObject = class XTSObject extends this.XTSType {

    _isFullData = false
    objectId

    constructor(dataType) {
        super(dataType)
        this.objectId = new XTSObjectId(dataType)
    }
}

// OK
// export class XTSObjectRow extends this.XTSType {
module.exports.XTSObjectRow = class XTSObjectRow extends this.XTSType {

    _lineNumber = 0

    constructor(dataType) {
        super(dataType)
    }
}

// OK
// export class XTSRecordFilter extends this.XTSType {
module.exports.XTSRecordFilter = class XTSRecordFilter extends this.XTSType {

    constructor() {
        super('XTSRecordFilter')
    }

    addFilterItem(name, value) {
        this[name] = value
    }

    deleteFilterItem(name) {
        delete this[name]
    }

    clearFilter() {
        for (let key in this) {
            if (key !== '_type') {
                delete this[key]
            }
        }
    }
}

// OK
// export class XTSRecordKey extends this.XTSType {
module.exports.XTSRecordKey = class XTSRecordKey extends this.XTSType {

    dataType = ''
    filter = new XTSRecordFilter()
    period
    register

    constructor(dataType) {
        super('XTSRecordKey')
        if (dataType) {
            this.dataType = dataType
        }
    }
}

// OK
// export class XTSRecord extends this.XTSType {
module.exports.XTSRecord = class XTSRecord extends this.XTSType {

    // recordKey?:
    _dimensions = []

    constructor(_type) {
        super(_type)
    }
}

// OK
// export class XTSRecordSet extends this.XTSType {
module.exports.XTSRecordSet = class XTSRecordSet extends this.XTSType {

    dataType = ''
    filter = new XTSRecordFilter()
    records = []

    constructor(dataType) {
        super('XTSRecordSet')
        if (dataType) {
            this.dataType = dataType
        }
    }
}

// OK
// export class XTSCondition extends this.XTSType {
module.exports.XTSCondition = class XTSCondition extends this.XTSType {

    property = ''
    value = null
    comparisonOperator = null

    constructor() {
        super('XTSCondition')
    }
}

// OK
// export class XTSMessage extends this.XTSType {
module.exports.XTSMessage = class XTSMessage extends this.XTSType {

    _dbId = ''
    _msgId = ''

    constructor(_type) {
        super(_type)
    }
}

// OK
// export class XTSRequest extends XTSMessage {
module.exports.XTSRequest = class XTSRequest extends this.XTSMessage {

    constructor(_type) {
        super(_type)
    }
}

// OK
// export class XTSResponse extends XTSMessage {
module.exports.XTSResponse = class XTSResponse extends this.XTSMessage {

    constructor(_type) {
        super(_type)
    }
}

//
// export class XTSCreateObjectRequest extends XTSRequest {
module.exports.XTSCreateObjectRequest = class XTSCreateObjectRequest extends this.XTSRequest {

    object
    fillingValues
    constructor() {
        super('XTSCreateObjectRequest')
    }
}

//
// export class XTSCreateObjectResponse extends XTSResponse {
module.exports.XTSCreateObjectResponse = class XTSCreateObjectResponse extends this.XTSResponse {

    object

    constructor() {
        super('XTSCreateObjectResponse')
    }
}

// OK
// export class XTSCreateObjectsRequest extends XTSRequest {
module.exports.XTSCreateObjectsRequest = class XTSCreateObjectsRequest extends this.XTSRequest {

    objects = []

    constructor() {
        super('XTSCreateObjectsRequest')
    }
}

// OK
// export class XTSCreateObjectsResponse extends XTSResponse {
module.exports.XTSCreateObjectsResponse = class XTSCreateObjectsResponse extends this.XTSResponse {

    objects = []

    constructor() {
        super('XTSCreateObjectsResponse')
    }
}

// OK
// export class XTSDeleteObjectsRequest extends XTSRequest {
module.exports.XTSDeleteObjectsRequest = class XTSDeleteObjectsRequest extends this.XTSRequest {

    objects = []

    constructor() {
        super('XTSDeleteObjectsRequest')
    }
}

// OK
// export class XTSDeleteObjectsResponse extends XTSResponse {
module.exports.XTSDeleteObjectsResponse = class XTSDeleteObjectsResponse extends this.XTSResponse {

    objectIds = []

    constructor() {
        super('XTSDeleteObjectsResponse')
    }
}

// OK
// export class XTSError extends XTSResponse {
module.exports.XTSError = class XTSError extends this.XTSResponse {

    description = ''
    subject = ''

    constructor() {
        super('XTSError')
    }
}

// OK
// export class XTSGetObjectListRequest extends XTSRequest {
module.exports.XTSGetObjectListRequest = class XTSGetObjectListRequest extends this.XTSRequest {

    dataType = ''
    columnSet = []
    sortBy = []
    positionFrom = 0
    positionTo = 0
    limit = 0
    conditions = []

    constructor(dataType) {
        super('XTSGetObjectListRequest')
        if (dataType) {
            this.dataType = dataType
        }
    }
}

// OK
// export class XTSGetObjectListResponse extends XTSResponse {
module.exports.XTSGetObjectListResponse = class XTSGetObjectListResponse extends this.XTSResponse {

    items = []

    constructor() {
        super('XTSGetObjectListResponse')
    }
}

// OK
// export class XTSObjectListItem extends this.XTSType {
module.exports.XTSObjectListItem = class XTSObjectListItem extends this.XTSType {

    canHaveChildren = false
    isFolder = false
    object
    parentId

    constructor() {
        super('XTSObjectListItem')
    }
}

// OK
// export class XTSGetObjectsRequest extends XTSRequest {
module.exports.XTSGetObjectsRequest = class XTSGetObjectsRequest extends this.XTSRequest {

    objectIds = []
    columnSet = []

    constructor() {
        super('XTSGetObjectsRequest')
    }
}

// OK
// export class XTSGetObjectsResponse extends XTSResponse {
module.exports.XTSGetObjectsResponse = class XTSGetObjectsResponse extends this.XTSResponse {

    objects = []

    constructor() {
        super('XTSGetObjectsResponse')
    }
}

// OK
// export class XTSUpdateObjectsRequest extends XTSRequest {
module.exports.XTSUpdateObjectsRequest = class XTSUpdateObjectsRequest extends this.XTSRequest {

    objects = []

    constructor() {
        super('XTSUpdateObjectsRequest')
    }
}

// OK
// export class XTSUpdateObjectsResponse extends XTSResponse {
module.exports.XTSUpdateObjectsResponse = class XTSUpdateObjectsResponse extends this.XTSResponse {

    objects = []

    constructor() {
        super('XTSUpdateObjectsResponse')
    }
}

// OK
// export class XTSDownloadObjectListRequest extends XTSRequest {
module.exports.XTSDownloadObjectListRequest = class XTSDownloadObjectListRequest extends this.XTSRequest {

    dataType = ''
    prefix = ''

    constructor() {
        super('XTSDownloadObjectListRequest')
    }
}

// OK
// export class XTSDownloadObjectListResponse extends XTSResponse {
module.exports.XTSDownloadObjectListResponse = class XTSDownloadObjectListResponse extends this.XTSResponse {

    objects = []

    constructor() {
        super('XTSDownloadObjectListResponse')
    }
}

// OK
// export class XTSDownloadObjectListRequest extends XTSRequest {
module.exports.XTSRefreshObjectListRequest = class XTSRefreshObjectListRequest extends this.XTSRequest {

    dataType = ''

    constructor() {
        super('XTSRefreshObjectListRequest')
    }
}

// OK
// export class XTSDownloadObjectListResponse extends XTSResponse {
module.exports.XTSRefreshObjectListResponse = class XTSRefreshObjectListResponse extends this.XTSResponse {

    count = 0

    constructor() {
        super('XTSRefreshObjectListResponse')
    }
}

// OK
// export class XTSSignInRequest extends XTSRequest {
module.exports.XTSSignInRequest = class XTSSignInRequest extends this.XTSRequest {

    deviceId = ''
    userToken = ''
    userName = ''
    password = ''
    telegramId = ''
    zaloId = ''
    phone = ''
    otp = ''
    deviceInfo = ''
    fullName = ''

    constructor() {
        super('XTSSignInRequest')
    }
}

// OK
// export class XTSSignInResponse extends XTSResponse {
module.exports.XTSSignInResponse = class XTSSignInResponse extends this.XTSResponse {

    deviceId = ''
    userToken = ''
    userName = ''
    phone = ''
    externalAccount
    externalAccountID = ''
    externalAccountOwner = ''
    user
    employee
    defaultValues
    fileStorage = ''

    constructor() {
        super('XTSSignInResponse')
    }
}

// OK
// export class XTSSignOutRequest extends XTSRequest {
module.exports.XTSSignOutRequest = class XTSSignOutRequest extends this.XTSRequest {

    deviceId = ''
    user
    externalAccount

    constructor() {
        super('XTSSignOutRequest')
    }
}

// OK
// export class XTSSignOutResponse extends XTSResponse {
module.exports.XTSSignOutResponse = class XTSSignOutResponse extends this.XTSResponse {

    externalAccount
    user
    customer

    constructor() {
        super('XTSSignOutResponse')
    }
}

// OK
// export class XTSGetRecordSetRequest extends XTSRequest {
module.exports.XTSGetRecordSetRequest = class XTSGetRecordSetRequest extends this.XTSRequest {

    dataType = ''
    filter

    constructor(dataType) {
        super('XTSGetRecordSetRequest')
        if (dataType) {
            this.dataType = dataType
        }
    }
}

// OK
// export class XTSGetRecordSetResponse extends XTSResponse {
module.exports.XTSGetRecordSetResponse = class XTSGetRecordSetResponse extends this.XTSResponse {

    recordSet

    constructor() {
        super('XTSGetRecordSetResponse')
    }
}

// OK
// export class XTSUpdateRecordSetRequest extends XTSRequest {
module.exports.XTSUpdateRecordSetRequest = class XTSUpdateRecordSetRequest extends this.XTSRequest {

    recordSet

    constructor(dataType) {
        super('XTSUpdateRecordSetRequest')
        if (dataType) {
            this.recordSet = new XTSRecordSet(dataType)
        }
    }
}

// OK
// export class XTSUpdateRecordSetResponse extends XTSResponse {
module.exports.XTSUpdateRecordSetResponse = class XTSUpdateRecordSetResponse extends this.XTSResponse {

    recordSet

    constructor() {
        super('XTSUpdateRecordSetResponse')
    }
}

// OK
// export class XTSGetReportDataRequest extends XTSRequest {
module.exports.XTSGetReportDataRequest = class XTSGetReportDataRequest extends this.XTSRequest {

    reportName = ''
    startDate = '0001-01-01T00:00:00'
    endDate = '0001-01-01T00:00:00'
    conditions = []

    constructor() {
        super('XTSGetReportDataRequest')
    }
}

// OK
// export class XTSGetReportDataResponse extends XTSResponse {
module.exports.XTSGetReportDataResponse = class XTSGetReportDataResponse extends this.XTSResponse {

    reportData = null

    constructor() {
        super('XTSGetReportDataResponse')
    }
}
