if (sessionStorage.getItem('charactersContainer') != null) {
    document.getElementById('charactersContainer').innerHTML = sessionStorage.getItem('charactersContainer')
}
const searchCharField = document.getElementById('searchCharField')
const submitButton = document.getElementById('submitButton');
const charList = document.querySelectorAll('.containerItem')
const namesList = document.querySelectorAll('.charName')
var listCount = charList.length - 1

/**
 * Replaces the user icon with a character's icon
 * @param {String} character 
 */
function addCharToContainer(character) {
    var element = charList[listCount]
    const iNode = element.childNodes[3]
    const newNode = document.createElement('img')
    newNode.src = 'https://api.genshin.dev/characters/'+character+'/icon-big'
    element.replaceChild(newNode, iNode)
    element.childNodes[5].innerText = mountStringtoLabel(character)
}

function goToCharPage(charName) {
    const charactersContainer = document.getElementById('charactersContainer').innerHTML
    sessionStorage.setItem('characterName',charName)
    sessionStorage.setItem('charactersContainer',charactersContainer)
    window.open('../charPage/index.html','_self')
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


namesList.forEach(name => {
name.addEventListener('click', () => {
    const nameString = mountCharString(name.innerText)
    goToCharPage(nameString)
})
})

searchCharField.addEventListener('keypress', function (event) {
if (event.key === 'Enter') {
    submitButton.click()
    searchCharField.value = ''
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

function addDragAndDrop() {
    charList.forEach(item => {
        // item.children[3].addEventListener('ondragstart', drag)
        item.children[3].ondragstart = drag
        // item.addEventListener('ondragover', allowDrop)
        item.ondragover = allowDrop
        // item.addEventListener('ondrop', drop)
        item.ondrop = drop
    })
}
addDragAndDrop()

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.parentNode.innerHTML);
    console.log(ev.target.parentNode.innerHTML);
}

function allowDrop(ev) {
    ev.preventDefault()
    ev.target.classList.add('dragHover')
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");

    // var containerQtavaAntes = ev.target.innerHTML
    // containerDoDrag.innerHTML = containerQtavaAntes

    ev.target.innerHTML = data
    console.log(ev.target.innerHTML);
    ev.target.classList.remove('dragHover')
    addDragAndDrop()
}