var character = localStorage.getItem('characterName')
const urlBase = 'https://api.genshin.dev/characters/'
const url = urlBase + character
getCharData(url)
/**
 * Based on URL, returns the character's JSON
 * @param {String} url 
 */
async function getCharData(url) {
    const response = await fetch(url)
    const resJSON = await response.json()
    const card = document.getElementById('card')
    card.src = url + "/card"

    const nameTitle = document.getElementById('nameTitle')
    nameTitle.innerText = resJSON['name']

    const description = document.getElementById('description')
    description.innerText = resJSON['description']
}