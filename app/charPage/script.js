const texto = document.getElementById('texto')
const botao = document.getElementById('botao')
const imagem = document.getElementById('imagem')


botao.addEventListener('click', () => {
    let character = String(texto.value).toLowerCase()
    let url = 'https://api.genshin.dev/characters/'+ character
    imagem.src = "https://api.genshin.dev/characters/"+character+"/card"
})

const getCharData = async (url) => {
    const response = await fetch(url)
    const resJSON = await response.json()
    return resJSON;
}