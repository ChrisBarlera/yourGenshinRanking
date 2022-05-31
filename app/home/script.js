const texto = document.getElementById('texto')
const botao = document.getElementById('botao')
const imagem = document.getElementById('imagem')
let output;

botao.addEventListener('click', () =>{
    let character = String(texto.value).toLowerCase()
    let url = 'https://api.genshin.dev/characters/'+ character 
    fetch(url)
        .then(res => res.json())
        .then((out) => {
            output = out
        })
    alert('poder: ' + output['vision'])
    imagem.src = "https://api.genshin.dev/characters/"+character+"/card"
})