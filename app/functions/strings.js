/**
 * Normalizes character's text in input to make an API request
 * @param {String} inputValue
 */
export function mountCharString(inputValue) {
    inputValue = inputValue.toLowerCase()
    for (let index = 0; index < inputValue.length; index++) {
        const char = inputValue.charAt(index);
        if (char == ' ') {
            if (inputValue.substring(0, index) == 'viajante') {
                inputValue = 'traveler' + inputValue.substring(index)
            }
            inputValue = replaceChar(inputValue, index, '-')
        }
    }
    return inputValue
}

/**
 * Normalizes character's text in input to insert it into labels
 * @param {String} inputValue
 */
export function mountStringtoLabel(inputValue) {
    inputValue = inputValue.toLowerCase()

    for (let index = 0; index < inputValue.length; index++) {
        const char = inputValue.charAt(index);
        if (index == 0) {
            inputValue = replaceChar(inputValue, index, inputValue.charAt(index).toUpperCase())
        }
        if (char == ' ') {
            inputValue = replaceChar(inputValue, index+1, inputValue.charAt(index+1).toUpperCase())
        }
        if (char == '-') {
            inputValue = replaceChar(inputValue, index, ' ')
            inputValue = replaceChar(inputValue, index+1, inputValue.charAt(index+1).toUpperCase())
        }
    }
    return inputValue
}

/**
 * Replaces the char at a specific position with a given text
 * @param {String} baseString Base string that will have the char replaced
 * @param {Number} index Position to insert the String
 * @param {String} strToInsert String that will be inserted
 */
export function replaceChar(baseString, index, strToInsert) {
    const firstHalf = baseString.substring(0, index)
    const secondHalf = baseString.substring(index + 1)
    const finalString = firstHalf + strToInsert + secondHalf
    return finalString
}