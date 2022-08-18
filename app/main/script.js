if (sessionStorage.getItem('charactersContainer') != null) {
    document.getElementById('charactersContainer').innerHTML = sessionStorage.getItem('charactersContainer')
}
const searchCharField = document.getElementById('searchCharField')
const submitButton = document.getElementById('submitButton');
const olContainer = document.getElementById('charactersContainer')
const charList = document.querySelectorAll('.containerItem')
const namesList = document.querySelectorAll('.charName')
var listCount = charList.length - 1

containerBorderFocus(true)
containerBorderFocus(false)
function containerBorderFocus(clear) {
    if (clear) {
        charList.forEach(element => {
            element.style.border = ""
        });
    } else {
        charList[listCount].style.border = "2px solid rgb(100, 100, 100)"
    }
}

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

function getContainerItemPos(element) {
    pos = parseInt(element.children[0].innerText) - 1
    return pos
}

function isItemChild(element) {
    if (element.children.length == charList[0].children.length) {
        return false
    } else {
        return true
    }
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
    containerBorderFocus(true)
    listCount -= 1
    containerBorderFocus(false)
})

function addDragAndDrop() {
    charList.forEach(item => {
        item.children[3].addEventListener('dragstart', dragStart)
        item.addEventListener('dragover', dragOver)
        item.addEventListener('dragleave', dragLeave)
        item.addEventListener('drop', drop)
    })
}
addDragAndDrop()

function dragStart(ev) {
    let dragThingPos = getContainerItemPos(ev.target.parentNode)
    ev.dataTransfer.setData('text', dragThingPos.toString())
}

function dragOver(ev) {
    ev.preventDefault();
    if (isItemChild(ev.target)) {
        ev.target.parentNode.style.border = "3px solid rgb(100, 255, 229)"
    } else {
        ev.target.style.border = "3px solid rgb(100, 255, 229)"
    }
}

function dragLeave(ev) {
    if (isItemChild(ev.target)) {
        ev.target.parentNode.style.border = ""
    } else {
        ev.target.style.border = ""
    }
}

function drop(ev) {
    ev.preventDefault();
    var theElement = ev.target

    if (isItemChild(theElement)) {
        theElement = ev.target.parentNode
    }

    theElement.style.border = ""
    let dropzonePos = getContainerItemPos(theElement)
    let dragThingPos = parseInt(ev.dataTransfer.getData('text'))
    let draggingHTML = charList[dragThingPos].innerHTML
    let dropHTML = charList[dropzonePos].innerHTML
    charList[dropzonePos].innerHTML = draggingHTML
    charList[dragThingPos].innerHTML = dropHTML

    let auxdropzonePos = dropzonePos + 1
    let auxdragThingPos = dragThingPos + 1

    charList[dropzonePos].children[0].innerText = auxdropzonePos
    charList[dragThingPos].children[0].innerText = auxdragThingPos

    containerBorderFocus(false)
    addDragAndDrop()
}