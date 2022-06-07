import {mountCharString} from "../functions/strings.js"
import {mountStringtoLabel} from "../functions/strings.js"

const searchCharField = document.getElementById('searchCharField')
const submitButton = document.getElementById('submitButton');
const charList = document.getElementsByClassName('containerItem')
const namesList = document.querySelectorAll('.charName')
var listCount = charList.length - 1

namesList.forEach(name => {
    name.addEventListener('click', () => {
        const nameString = mountCharString(name.innerText)
        console.log(nameString)
        localStorage.setItem('characterName',nameString)
        window.open('../charPage/index.html')
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