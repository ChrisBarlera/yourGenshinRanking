const searchCharField = document.getElementById('searchCharField')
const urlBase = 'https://api.genshin.dev/characters/';
const submitButton = document.getElementById('submitButton');
const chararactersContainer = document.getElementById('chararactersContainer')
const charList = document.getElementsByClassName('containerItem')
var listJSON;
var listCount = charList.length - 1

getCharData(urlBase)

searchCharField.addEventListener('keypress', function (event) {
    if (event.key === "Enter") {
        submitButton.click()
    }
})
submitButton.addEventListener('click', () => {
    const character = mountCharString(searchCharField.value)
    if (listCount == 0) {
        addCharToContainer(character)
        listCount = 5
    } else {
        addCharToContainer(character)
    }
    listCount -= 1
})

/**
 * Based on a full URL, returns the character's JSON
 * @param {String} url 
 */
 function addCharToContainer(character) {
    var element = charList[listCount]
    const iNode = element.childNodes[3]
    const newNode = document.createElement('img')
    newNode.src = 'https://api.genshin.dev/characters/'+character+'/icon-big'
    element.replaceChild(newNode, iNode)
    element.childNodes[5].innerText = mountStringtoLabel(character)
}

/**
 * Based on URL, returns the character's JSON
 * @param {String} url 
 */
async function getCharData(url) {
    const response = await fetch(url)
    var resJSON = await response.json()
    listJSON = resJSON
}


/**
 * Normalizes character's text in input to make an API request
 * @param {String} inputValue
 */
function mountCharString(inputValue) {
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
 function mountStringtoLabel(inputValue) {
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
function replaceChar(baseString, index, strToInsert) {
    const firstHalf = baseString.substring(0, index)
    const secondHalf = baseString.substring(index + 1)
    const finalString = firstHalf + strToInsert + secondHalf
    return finalString
}