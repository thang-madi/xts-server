

/////////////////////////////////////////////
// Date/Time format

// export function formatDateTime(date) {
module.exports.formatDateTime = function formatDateTime(date) {
    return `${formatDate(date)}T${formatTime(date)}`
}

// export function formatDate(date) {
module.exports.formatDate = function formatDate(date) {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')

    return `${year}-${month}-${day}`
}

// export function formatTime(date) {
module.exports.formatTime = function formatTime(date) {
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    const seconds = String(date.getSeconds()).padStart(2, '0')

    return `${hours}:${minutes}:${seconds}`
}

// export function isDate(string) {
module.exports.isDate = function isDate(string) {
    const regexDate = /^\d{4}-\d{2}-\d{2}$/
    const regexDateTime = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/

    return regexDateTime.test(string) || regexDate.test(string)
}

//////////////////////
// Currency format

// export function formatCurrency(number) {
module.exports.formatCurrency = function formatCurrency(number) {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(number)
}

// export function VND(number) {
module.exports.VND = function VND(number) {
    return `${number.toLocaleString('vi-VN')} ₫`
}

/////////////////////////////////////////////
// Random number

// export function getRandomInt(min, max) {
module.exports.getRandomInt = function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

/////////////////////////////////////////////
// Local storage


/////////////////////////////////////////////
// Clipboard

// export function copyToClipboard(textToCopy) {
module.exports.copyToClipboard = function copyToClipboard(textToCopy) {
    navigator.clipboard.writeText(textToCopy)
        .then(() => {
            // alert(`${textToCopy} đã được sao chép vào Clipboard!`)
        })
        .catch(err => {
            // console.error('Lỗi khi sao chép vào Clipboard:', err);
        })
}

/////////////////////////////////////////////
// String

// export function capitalizeFirstLetter(string) {
module.exports.capitalizeFirstLetter = function capitalizeFirstLetter(string) {
    return `${string.charAt(0).toUpperCase()}${string.slice(1)}`
}

