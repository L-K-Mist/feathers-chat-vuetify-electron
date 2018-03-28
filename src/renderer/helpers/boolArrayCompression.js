// This module takes an array of booleans and turns it into a single integer for lean messaging and storage of binary flags
module.exports = function (booleanArray) {
    var binaryDigitArray = [] // placeholder for an array of ones and zeros instead of true and falses
    booleanArray.forEach(function (item) { // go through each boolean in the array and...
        binaryDigitArray.push(Number(item)) // ... turn it into a number (either a 1 or a 0)
    })
    binaryString = binaryDigitArray.toString().replace(/,/g, "").split('').reverse().join('') // Take that array and turn it into a string without any commas; then with split-reverse-join make it such that the most important bits are first
    console.log(binaryString);

    binaryIntString = parseInt(binaryString, 2)
    return binaryIntString
}