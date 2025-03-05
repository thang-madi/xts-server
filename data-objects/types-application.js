
const { XTSObject, XTSObjectId, XTSObjectRow, XTSRecord, XTSRequest, XTSResponse, XTSType } = require("./types-common.js")


// OK
// export class XTSGetRelatedDocumentsRequest extends XTSRequest {
module.exports.XTSGetRelatedDocumentsRequest = class XTSGetRelatedDocumentsRequest extends XTSRequest {

    objectId = new XTSObjectId('')

    constructor() {
        super('XTSGetRelatedDocumentsRequest')
    }
}

// OK
// export class XTSGetRelatedDocumentsResponse extends XTSResponse {
module.exports.XTSGetRelatedDocumentsResponse = class XTSGetRelatedDocumentsResponse extends XTSResponse {

    documents = []

    constructor() {
        super('XTSGetRelatedDocumentsResponse')
    }
}

// OK
// export class XTSRelatedDocument extends XTSType {
module.exports.XTSRelatedDocument = class XTSRelatedDocument extends XTSType {

    document = new XTSObjectId('')
    operationKind = new XTSObjectId('')

    date = '0001-01-01T00:00:00'
    number = ''
    company = new XTSObjectId('XTSCompany')
    counterparty = new XTSObjectId('XTSCounterparty')
    documentCurrency = new XTSObjectId('XTSCurrency')
    documentAmount = 0
    structuralUnit = new XTSObjectId('XTSStructuralUnit')
    department = new XTSObjectId('XTSStructuralUnit')
    author = new XTSObjectId('XTSUser')
    employeeResponsible = new XTSObjectId('XTSEmployee')
    comment = ''

    constructor() {
        super('XTSRelatedDocument')
    }
}

// OK
// export class XTSProduct extends XTSObject {
module.exports.XTSProduct = class XTSProduct extends XTSObject {

    description = ''
    descriptionFull = ''
    sku = ''
    comment = ''
    productType = new XTSObjectId('XTSProductType')
    productCategory = new XTSObjectId('XTSProductCategory')
    measurementUnit = new XTSObjectId('XTSUOMClassifier')
    picture = new XTSObjectId('XTSProductAttachedFile')
    _uomCoefficient = 0
    _price = 0
    _priceKind = new XTSObjectId('XTSPriceKind')
    _vatRate = new XTSObjectId('XTSVATRate')
    _vatRateRate = 0
    _uoms = []
    _characteristics = []
    _prices = []
    _pictures = []

    constructor() {
        super('XTSProduct')
    }
}

// OK
// export class XTSProductUOMRow extends XTSObjectRow {
module.exports.XTSProductUOMRow = class XTSProductUOMRow extends XTSObjectRow {

    uom
    coefficient = 0

    constructor() {
        super('XTSProductUOMRow')
    }
}

// 
// export class XTSProductCharacteristic extends XTSObject {
module.exports.XTSProductCharacteristic = class XTSProductCharacteristic extends XTSObject {

    description = ''
    _price = 0

    constructor() {
        super('XTSProductCharacteristic')
    }
}

// OK
// export class XTSPriceRow extends XTSObjectRow {
module.exports.XTSPriceRow = class XTSPriceRow extends XTSObjectRow {
    product = new XTSObjectId('XTSProduct')
    characteristic = new XTSObjectId('XTSProductCharacteristic')
    priceKind = new XTSObjectId('XTSPriceKind')
    measurementUnit = new XTSObjectId('XTSUOMClassifier')
    price = 0

    constructor() {
        super('XTSPriceRow')
    }
}

// OK
// export class XTSFileRow extends XTSObjectRow {
module.exports.XTSFileRow = class XTSFileRow extends XTSObjectRow {

    file = new XTSObjectId('XTSFile')
    fileName = ''
    extension = ''
    size = 0

    constructor() {
        super('XTSFileRow')
    }
}

// OK
// export class XTSCounterparty extends XTSObject {
module.exports.XTSCounterparty = class XTSCounterparty extends XTSObject {

    code = ''
    description = ''
    descriptionFull = ''
    counterpartyKind = new XTSObjectId('XTSCounterpartyKind')
    gender = new XTSObjectId('XTSGender')
    employeeResponsible = new XTSObjectId('XTSEmployeeResponsible')
    dateOfBirth = '0001-01-01T00:00:00'
    comment = ''
    taxIdentifactionNumber = ''
    invalid = false
    mainInfo = ''
    customer = false
    vendor = false
    otherRelations = false
    phone = ''
    email = ''
    address = ''
    addressValue = ''
    picture = new XTSObjectId('XTSCounterpartyAttachedFile')

    margin = 0

    constructor() {
        super('XTSCounterparty')
    }
}

// OK
// export class XTSCounterpartyContract extends XTSObject {
module.exports.XTSCounterpartyContract = class XTSCounterpartyContract extends XTSObject {

    code = ''
    description = ''
    priceKind = new XTSObjectId('XTSPriceKind')
    counterpartyPriceKind = new XTSObjectId('XTSCounterpartyPriceKind')
    settlementsCurrency = new XTSObjectId('XTSCurrency')
    comment = ''
    contractDate = '0001-01-01T00:00:00'
    contractNumber = ''
    contractKind = new XTSObjectId('XTSContractKind')
    company = new XTSObjectId('XTSCompany')

    constructor() {
        super('XTSCounterpartyContract')
    }
}

// OK
// export class XTSOrder extends XTSObject {
module.exports.XTSOrder = class XTSOrder extends XTSObject {

    date = '0001-01-01T00:00:00'
    number = ''

    operationKind = new XTSObjectId('XTSOperationKindsSalesOrder')
    orderKind = new XTSObjectId('XTSSalesOrderKind')
    priceKind = new XTSObjectId('XTSPriceKind')
    orderState = new XTSObjectId('XTSSalesOrderState')

    company = new XTSObjectId('XTSCompany')
    customer = new XTSObjectId('XTSCounterparty')
    contract = new XTSObjectId('XTSCounterpartyContract')
    documentCurrency = new XTSObjectId('XTSCurrency')
    documentAmount = 0
    vatTaxation = new XTSObjectId('XTSVATTaxation')
    rate = 1
    multiplicity = 1
    comment = ''
    author = new XTSObjectId('XTSUser')
    shipmentDate = '0001-01-01T00:00:00'
    deliveryAddress = ''
    deliveryAddressValue = ''
    cash = 0
    bankTransfer = 0
    postPayment = 0
    paymentNote = ''
    inventory = []
    externalAccount = new XTSObjectId('XTSExternalAccount')
    employeeResponsible = new XTSObjectId('XTSEmployee')
    _receiptableIncrease = 0
    _receiptableDecrease = 0
    _receiptableBalance = 0

    constructor() {
        super('XTSOrder')
    }
}

// OK
// export class XTSOrderProductRow extends XTSObjectRow {
module.exports.XTSOrderProductRow = class XTSOrderProductRow extends XTSObjectRow {

    _lineNumber = 0
    product = new XTSObjectId('XTSProduct')
    characteristic = new XTSObjectId('XTSProductCharacteristic')
    vatRate = new XTSObjectId('XTSVATRate')
    uom = new XTSObjectId('XTSMeasurementUnit')
    quantity = 1
    comment = ''
    price = 0
    amount = 0
    automaticDiscountAmount = 0
    discountsMarkupsAmount = 0
    vatAmount = 0
    total = 0

    _sku = ''
    _coefficient = 0
    _price = 0
    _vatRateRate = 0
    _picture = new XTSObjectId('XTSFile')

    constructor() {
        super('XTSOrderProductRow')
    }
}

// OK
// export class XTSUOMClassifier extends XTSObject {
module.exports.XTSUOMClassifier = class XTSUOMClassifier extends XTSObject {

    description = ''
    code = ''

    constructor() {
        super('XTSUOMClassifier')
    }
}

// OK
// export class XTSMeasurementUnit extends XTSObject {
module.exports.XTSMeasurementUnit = class XTSMeasurementUnit extends XTSObject {

    description = ''
    coefficient = 0

    constructor() {
        super('XTSMeasurementUnit')
    }
}

// OK
// export class XTSCompany extends XTSObject {
module.exports.XTSCompany = class XTSCompany extends XTSObject {

    description = ''
    phone = ''
    address = ''
    email = ''

    constructor() {
        super('XTSCompany')
    }
}

// OK
// export class XTSIndividual extends XTSObject {
module.exports.XTSIndividual = class XTSIndividual extends XTSObject {
    description = ''
    fullName = ''
    dateOfBirth = '0001-01-01T00:00:00'
    phone = ''
    email = ''
    address = ''

    constructor() {
        super('XTSIndividual')
    }
}

// OK
// export class XTSCart extends XTSRecord {
module.exports.XTSCart = class XTSCart extends XTSRecord {

    recordKey

    date = ''
    externalAccount = new XTSObjectId('XTSExternalAccount')
    company = new XTSObjectId('XTSCompany')
    customer = new XTSObjectId('XTSCounterparty')
    product = new XTSObjectId('XTSProduct')
    characteristic = new XTSObjectId('XTSProductCharacteristic')
    uom = new XTSObjectId('XTSUOMClassifier')
    vatRate = new XTSObjectId('XTSVATRate')
    coefficient = 0
    quantity = 0
    price = 0
    amount = 0
    total = 0
    selected = false
    _picture = new XTSObjectId('XTSFile')

    constructor() {
        super('XTSCart')
    }
}

// OK
// export class XTSExternalAccount extends XTSObject {
module.exports.XTSExternalAccount = class XTSExternalAccount extends XTSObject {

    description = ''
    customer = new XTSObjectId('XTSCounterparty')
    user = new XTSObjectId('XTSUser')
    id = ''

    constructor() {
        super('XTSExternalAccount')
    }
}

// OK
// export class XTSConnectUserRequest extends XTSRequest {
module.exports.XTSConnectUserRequest = class XTSConnectUserRequest extends XTSRequest {

    externalAccount = new XTSObjectId('XTSExternalAccount')
    customer = new XTSObjectId('XTSConterparty')
    user = new XTSObjectId('XTSUser')

    constructor() {
        super('XTSConnectUserRequest')
    }
}

// OK
// export class XTSConnectUserResponse extends XTSResponse {
module.exports.XTSConnectUserResponse = class XTSConnectUserResponse extends XTSResponse {

    externalAccount = new XTSObjectId('XTSExternalAccount')
    customer = new XTSObjectId('XTSConterparty')
    employee = new XTSObjectId('XTSEmployee')
    user = new XTSObjectId('XTSUser')
    defaultValues

    constructor() {
        super('XTSConnectUserResponse')
    }
}

// OK
// export class XTSEmployee extends XTSObject {
module.exports.XTSEmployee = class XTSEmployee extends XTSObject {

    description = ''
    invalid = false
    individual = new XTSObjectId('XTSIndividual')
    parentCompany = new XTSObjectId('XTSCompany')
    headEmployee = new XTSObjectId('XTSEmployee')

    constructor() {
        super('XTSEmployee')
    }
}

// 
// export class XTSStructuralUnit extends XTSObject {
module.exports.XTSStructuralUnit = class XTSStructuralUnit extends XTSObject {

    description = ''
    structuralUnitType = new XTSObjectId('XTSStructuralUnitType')
    orderWarehouse = false
    company = new XTSObjectId('XTSCompany')
    financiallyLiablePerson = new XTSObjectId('XTSIndividual')
    invalid = false

    constructor() {
        super('XTSStructuralUnit')
    }
}

// 
// export class XTSCurrency extends XTSObject {
module.exports.XTSCurrency = class XTSCurrency extends XTSObject {

    code = ''
    description = ''
    descriptionFull = ''
    symbolicPresentation = ''
    mainCurrency = new XTSObjectId('XTSCurrency')
    markup = 1

    constructor() {
        super('XTSCurrency')
    }
}

// 
// export class XTSSalesInvoice extends XTSObject {
module.exports.XTSSalesInvoice = class XTSSalesInvoice extends XTSObject {

    date = '0001-01-01T00:00:00'
    number = ''

    operationKind = new XTSObjectId('XTSOperationKindsSalesInvoice')
    priceKind = new XTSObjectId('XTSPriceKind')
    // orderKind = new XTSObjectId('XTSSalesOrderKind')
    // orderState = new XTSObjectId('XTSSalesOrderState')

    company = new XTSObjectId('XTSCompany')
    counterparty = new XTSObjectId('XTSCounterparty')
    contract = new XTSObjectId('XTSCounterpartyContract')
    documentCurrency = new XTSObjectId('XTSCurrency')
    documentAmount = 0
    vatTaxation = new XTSObjectId('XTSVATTaxation')
    rate = 1
    multiplicity = 1
    comment = ''
    author = new XTSObjectId('XTSUser')
    deliveryAddress = ''
    deliveryAddressValue = ''
    structuralUnit = new XTSObjectId('XTSStructuralUnit')
    department = new XTSObjectId('XTSStructuralUnit')
    employeeResponsible = new XTSObjectId('XTSEmployee')
    documentBasis = new XTSObjectId('')
    docOrder = new XTSObjectId('XTSOrder')

    inventory = []

    constructor() {
        super('XTSSalesInvoice')
    }
}

// OK
// export class XTSSalesInvoiceInventory extends XTSObjectRow {
module.exports.XTSSalesInvoiceInventory = class XTSSalesInvoiceInventory extends XTSObjectRow {

    _lineNumber = 0
    product = new XTSObjectId('XTSProduct')
    characteristic = new XTSObjectId('XTSProductCharacteristic')
    vatRate = new XTSObjectId('XTSVATRate')
    uom = new XTSObjectId('XTSMeasurementUnit')
    quantity = 1
    comment = ''
    price = 0
    amount = 0
    automaticDiscountAmount = 0
    discountsMarkupsAmount = 0
    vatAmount = 0
    total = 0

    _sku = ''
    _coefficient = 0
    _price = 0
    _vatRateRate = 0
    _picture = new XTSObjectId('XTSFile')

    constructor() {
        super('XTSSalesInvoiceInventory')
    }
}

// 
// export class XTSSupplierInvoice extends XTSObject {
module.exports.XTSSupplierInvoice = class XTSSupplier extends XTSObject {

    date = '0001-01-01T00:00:00'
    number = ''
    posted = false

    operationKind = new XTSObjectId('XTSOperationKindsSupplierInvoice')
    counterpartyPriceKind = new XTSObjectId('XTSCounterpartyPriceKind')
    returnPriceKind = new XTSObjectId('XTSCounterpartyPriceKind')
    // orderKind = new XTSObjectId('XTSSalesOrderKind')
    // orderState = new XTSObjectId('XTSSalesOrderState')

    company = new XTSObjectId('XTSCompany')
    counterparty = new XTSObjectId('XTSCounterparty')
    contract = new XTSObjectId('XTSCounterpartyContract')
    documentCurrency = new XTSObjectId('XTSCurrency')
    documentAmount = 0
    vatTaxation = new XTSObjectId('XTSVATTaxation')
    rate = 1
    multiplicity = 1
    comment = ''
    author = new XTSObjectId('XTSUser')
    deliveryAddress = ''
    deliveryAddressValue = ''
    structuralUnit = new XTSObjectId('XTSStructuralUnit')
    department = new XTSObjectId('XTSStructuralUnit')
    employeeResponsible = new XTSObjectId('XTSEmployee')
    documentBasis = new XTSObjectId('')
    docOrder = new XTSObjectId('XTSOrder')

    inventory = []

    constructor() {
        super('XTSSupplierInvoice')
    }
}

// 
// export class XTSSupplierInvoiceInventory extends XTSObjectRow {
module.exports.XTSSupplierInvoiceInventory = class XTSSupplierInvoiceInventory extends XTSObjectRow {

    _lineNumber = 0
    product = new XTSObjectId('XTSProduct')
    characteristic = new XTSObjectId('XTSProductCharacteristic')
    vatRate = new XTSObjectId('XTSVATRate')
    uom = new XTSObjectId('XTSMeasurementUnit')
    quantity = 1
    comment = ''
    price = 0
    amount = 0
    discountsMarkupsAmount = 0
    vatAmount = 0
    total = 0

    _sku = ''
    _coefficient = 0
    _price = 0
    _vatRateRate = 0
    _picture = new XTSObjectId('XTSFile')

    constructor() {
        super('XTSSupplierInvoiceInventory')
    }
}

// 
// export class XTSCashReceipt extends XTSObject {
module.exports.XTSCashReceipt = class XTSCashReceipt extends XTSObject {

    date = '0001-01-01T00:00:00'
    number = ''

    operationKind = new XTSObjectId('XTSOperationKindsCashReceipt')
    // orderKind = new XTSObjectId('XTSSalesOrderKind')
    // counterpartyPriceKind = new XTSObjectId('XTSCounterpartyPriceKind')
    // orderState = new XTSObjectId('XTSSalesOrderState')

    company = new XTSObjectId('XTSCompany')
    counterparty = new XTSObjectId('XTSCounterparty')
    cashCurrency = new XTSObjectId('XTSCurrency')
    documentAmount = 0
    accountingAmount = 0
    rate = 1
    multiplicity = 1
    comment = ''
    author = new XTSObjectId('XTSUser')
    structuralUnit = new XTSObjectId('XTSStructuralUnit')
    department = new XTSObjectId('XTSStructuralUnit')
    employeeResponsible = new XTSObjectId('XTSEmployee')
    cashAccount = new XTSObjectId('XTSPettyCash')
    cashFlowItem = new XTSObjectId('XTSCashFlowItem')
    documentBasis = new XTSObjectId('')

    // documentBasis = new XTSObjectId('XTS')
    // docOrder = new XTSObjectId('XTSPurchaseOrder')
    paymentDetails = []

    constructor() {
        super('XTSCashReceipt')
    }
}

// 
// export class XTSCashReceiptPaymentDetails extends XTSObjectRow {
module.exports.XTSCashReceiptPaymentDetails = class XTSCashReceiptPaymentDetails extends XTSObjectRow {

    _lineNumber = 0
    contract = new XTSObjectId('XTSCounterpartyContract')
    document = new XTSObjectId('')
    paymentAmount = 0
    settlementsAmount = 0
    rate = 0
    multiplicity = 0
    advanceFlag = false
    docOrder = new XTSObjectId('XTSOrder')

    constructor() {
        super('XTSCashReceiptPaymentDetails')
    }
}

// 
// export class XTSPaymentReceipt extends XTSObject {
module.exports.XTSPaymentReceipt = class XTSPaymentReceipt extends XTSObject {

    date = '0001-01-01T00:00:00'
    number = ''

    operationKind = new XTSObjectId('XTSOperationKindsPaymentReceipt')
    // orderKind = new XTSObjectId('XTSSalesOrderKind')
    // counterpartyPriceKind = new XTSObjectId('XTSCounterpartyPriceKind')
    // orderState = new XTSObjectId('XTSSalesOrderState')

    company = new XTSObjectId('XTSCompany')
    counterparty = new XTSObjectId('XTSCounterparty')
    cashCurrency = new XTSObjectId('XTSCurrency')
    documentAmount = 0
    accountingAmount = 0
    rate = 1
    multiplicity = 1
    comment = ''
    author = new XTSObjectId('XTSUser')
    bankAccount = new XTSObjectId('XTSPettyCash')
    cashFlowItem = new XTSObjectId('XTSCashFlowItem')
    documentBasis = new XTSObjectId('')

    // documentBasis = new XTSObjectId('XTS')
    // docOrder = new XTSObjectId('XTSPurchaseOrder')
    paymentDetails = []

    constructor() {
        super('XTSPaymentReceipt')
    }
}

// 
// export class XTSPaymentReceiptPaymentDetails extends XTSObjectRow {
module.exports.XTSPaymentReceiptPaymentDetails = class XTSPaymentReceiptPaymentDetails extends XTSObjectRow {

    _lineNumber = 0
    contract = new XTSObjectId('XTSCounterpartyContract')
    document = new XTSObjectId('')
    paymentAmount = 0
    settlementsAmount = 0
    rate = 0
    multiplicity = 0
    advanceFlag = false
    docOrder = new XTSObjectId('XTSOrder')

    constructor() {
        super('XTSPaymentReceiptPaymentDetails')
    }
}

// 
// export class XTSPriceRegistration extends XTSObject {
module.exports.XTSPriceRegistration = class XTSPriceRegistration extends XTSObject {

    date = '0001-01-01T00:00:00'
    number = ''

    author = new XTSObjectId('XTSUser')
    comment = ''
    documentBasis = new XTSObjectId('')

    inventory = []

    constructor() {
        super('XTSPriceRegistration')
    }
}

// 
// export class XTSPriceRegistrationInventory extends XTSObjectRow {
module.exports.XTSPriceRegistrationInventory = class XTSPriceRegistrationInventory extends XTSObjectRow {

    _lineNumber = 0
    product = new XTSObjectId('XTSProduct')
    characteristic = new XTSObjectId('XTSProductCharacteristic')
    uom = new XTSObjectId('XTSUOMClassifier')
    priceKind = new XTSObjectId('XTSPriceKind')
    price = 0
    priceOld = 0
    currency = new XTSObjectId('XTSCurrency')
    currencyOld = new XTSObjectId('XTSCurrency')

    constructor() {
        super('XTSPriceRegistrationInventory')
    }
}