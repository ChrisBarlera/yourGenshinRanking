var character = sessionStorage.getItem('characterName')
const urlBase = 'https://api.genshin.dev/characters/'
const urlWithChar = urlBase + character
const imageType = '/gacha-splash'
getCharData(urlWithChar)
/**
 * Based on URL, returns the character's JSON
 * @param {String} url 
 */
async function getCharData(url) {
    const response = await fetch(url)
    const resJSON = await response.json()

    document.getElementById('charImg').src = url + imageType
    document.getElementById('nameTitle').innerText = resJSON['name']
    document.getElementById('charDescription').innerText = resJSON['description']

    document.getElementById('charName').innerText = resJSON['name']
    document.getElementById('charVision').innerText = resJSON['vision']
    document.getElementById('charWeapon').innerText = resJSON['weapon']
    document.getElementById('charNation').innerText = resJSON['nation']
    document.getElementById('charAffiliation').innerText = resJSON['affiliation']
    document.getElementById('charBirthday').innerText = resJSON['birthday']

}


const returntoMain = document.getElementById('returntoMain')
returntoMain.addEventListener('click', () => {
    window.open('../main/index.html', '_self')
})