const texto = document.getElementById('texto')
const botao = document.getElementById('botao')
const imagem = document.getElementById('imagem')


botao.addEventListener('click', () =>{
    let character = String(texto.value).toLowerCase()
    let url = 'https://api.genshin.dev/characters/'+ character 
    
    chardata = getCharData(url)
    console.log(chardata);
    imagem.src = "https://api.genshin.dev/characters/"+character+"/card"
})

const getCharData = async (url) => {
    const response = await fetch(url)
    const resJSON = await response.json()
    return resJSON;
}

// async function getCharData(url) {
//     fetch(url)
//     .then(async function (response) {
//         const resJSON = await response.json()
//         console.log(resJSON['vision']);
//         return resJSON
//     })
// }