
const { createXTSObject } = require("../data-objects/common-use");

module.exports.getObjectListConditions = function getObjectListConditions(dataType, claims) {

    const conditions = []

    // Company
    const conditionCompany = createXTSObject('XTSCondition')
    conditionCompany.property = 'company'
    conditionCompany.value = claims.company
    conditionCompany.comparisonOperator = '='

    // ObjectId
    const conditionObjectId = createXTSObject('XTSCondition')
    conditionObjectId.property = 'objectId'
    conditionObjectId.value = claims.company
    conditionObjectId.comparisonOperator = '='

    // Employee
    const conditionEmployee = createXTSObject('XTSCondition')
    conditionEmployee.property = 'employeeResponsible'
    conditionEmployee.value = claims.employee
    conditionEmployee.comparisonOperator = '='

    switch (dataType) {
        case 'XTSCounterparty':
            if (claims.company) {
                conditions.push(conditionCompany)
            }
            break;

        case 'XTSCompany':
            if (claims.company) {
                conditions.push(conditionObjectId)
            }
            break;

        case 'XTSOrder':
        case 'XTSSalesOrder':
        case 'XTSSalesInvoice':
        case 'XTSPurchaseOrder':
        case 'XTSSupplierInvoice':
        case 'XTSCashReceipt':
        case 'XTSCashPayment':
        case 'XTSPaymentReceipt':
        case 'XTSPaymentExpense':
            if (claims.company) {
                conditions.push(conditionCompany)
            }
            if (claims.employee) {
                conditions.push(conditionEmployee)
            }
            break;

        default:
            if (claims.company) {
                conditions.push(conditionCompany)
            }
            if (claims.employee) {
                conditions.push(conditionEmployee)
            }
            break;

    }

    return conditions
}

module.exports.getRecordFilter = function getRecordFilter(dataType, claims) {

    const recordFilter = createXTSObject('XTSRecordFilter')

    function insertFilter(recordFilter, fieldName, value) {
        recordFilter[fieldName] = value
    }

    switch (dataType) {
        case 'XTSCart':
            if (claims.company) {
                insertFilter(recordFilter, 'company', claims.company)
            }
            if (claims.customer) {
                insertFilter(recordFilter, 'customer', claims.customer)
            }
            break;

        default:

            break;

    }

    return recordFilter
}
