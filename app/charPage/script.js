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
    
    if (resJSON['rarity'] == 4) {
        for (let index = 0; index < 5; index++) {
            const raridade = document.getElementById('charRarity')
            const newIcon = document.createElement('i')
            if (index == 4) {
                newIcon.className = 'fi fi-rr-star'
            } else {
                newIcon.className = 'fi fi-sr-star'
            }
            raridade.appendChild(newIcon)
        }
    } else {
        for (let index = 0; index < 5; index++) {
            const raridade = document.getElementById('charRarity')
            const newIcon = document.createElement('i')
            newIcon.className = 'fi fi-sr-star'
            raridade.appendChild(newIcon)
        }
    }
    document.getElementById('charVision').innerText = resJSON['vision']
    document.getElementById('charWeapon').innerText = resJSON['weapon']
    document.getElementById('charNation').innerText = resJSON['nation']
    document.getElementById('charAffiliation').innerText = resJSON['affiliation']
    document.getElementById('charBirthday').innerText = resJSON['birthday']
    
    document.querySelector('.descriptionContainer').childNodes[3].childNodes[1].innerText = resJSON['name'] + ":"
    document.getElementById('charDescription').innerText = resJSON['description']
}


const returntoMain = document.getElementById('returntoMain')
returntoMain.addEventListener('click', () => {
    window.open('../main/index.html', '_self')
})