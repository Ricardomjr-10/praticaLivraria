//import conexao  from './conexao.js'  

const formAutor = document.getElementById('formAutor')
const formLivro = document.getElementById('formLivro')
const formFornecedor = document.getElementById('formFornecedor')
const formPeca = document.getElementById('formPeca')
const formMontagem = document.getElementById('formMontagem')
const selectAutor = document.getElementById('autorLivro')

formAutor.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(formAutor);
    const data = Object.fromEntries(formData);

    fetch('/cadAutor', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('mensagens').innerHTML = data
        console.log(data)
    })
})

fetch('/allAutores')
    .then(response => response.json())
    .then(data => {
        data.forEach(autor => {
            const option = document.createElement('option');
            option.value = autor.id;
            option.text = autor.name;
            selectAutor.appendChild(option);
        })
    })

formLivro.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(formLivro);
    const data = Object.fromEntries(formData);

    fetch('/cadLivro', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('mensagens').innerHTML = data
        console.log(data)
    })
})

formFornecedor.addEventListener('submit', event => {
    event.preventDefault()

    const formData = new FormData(formFornecedor)
    const data = Object.fromEntries(formData)

    fetch('/cadFornecedor', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('mensagens').innerHTML = data
        console.log(data)
    })
})

