import conexao  from './conexao.js'  

const formAutor = document.getElementById('formAutor')
const formLivro = document.getElementById('formLivro')
const formFornecedor = document.getElementById('formFornecedor')
const formPeca = document.getElementById('formPeca')
const formMontagem = document.getElementById('formMontagem')

fetch('http://localhost:3000/autor')
.then(response => response.json())
.then(autores => {
    const autorSelect = document.getElementById('autorLivro')
    autores.forEach(autor => {
        const option = document.createElement('option')
        option.value = autor.id
        option.textContent = autor.nome
        autorSelect.appendChild(option)
    })
})

fetch('http://localhost:3000/fornecedor')
.then(response => response.json())
.then(fornecedores => {
    const fornecedorSelect = document.getElementById('fornecedorPeca')
    fornecedores.forEach(fornecedor => {
        const option = document.createElement('option')
        option.value = fornecedor.id
        option.textContent = fornecedor.cnpj
        fornecedorSelect.appendChild(option)
    })
})

fetch('http://localhost:3000/livro')
.then(response => response.json())
.then(livros => {
    const livroSelect = document.getElementById('livroMontagem')
    livros.forEach(livro => {
        const option = document.createElement('option')
        option.value = livro.id
        option.textContent = livro.titulo
        livroSelect.appendChild(option)
    })
})

fetch('http://localhost:3000/peca')
.then(response => response.json())
.then(pecas => {
    const pecaSelect = document.getElementById('pecasMontagem')
    pecas.forEach(peca => {
        const option = document.createElement('option')
        option.value = peca.id
        option.textContent = peca.nome
        pecaSelect.appendChild(option)
    })
})

fetch('http://localhost:3000/montagem')
.then(response => response.json())
.then(montagens => {
    const montagemSelect = document.getElementById('montagem')
    montagens.forEach(montagem => {
        const option = document.createElement('option')
        option.value = montagem.id
        option.textContent = montagem.nome
        montagemSelect.appendChild(option)
    })
})



// formAutor.addEventListener('submit', (event) => {
//     event.preventDefault()
//     cadastrarAutor()
// })

// formLivro.addEventListener('submit', (event) => {
//     event.preventDefault()
//     cadastrarLivro()
// })

// formFornecedor.addEventListener('submit', (event) => {
//     event.preventDefault()
//     cadastrarFornecedor()
// })

// formPeca.addEventListener('submit', (event) => {
//     event.preventDefault()
//     cadastrarPeca()
// })

// formMontagem.addEventListener('submit', (event) => {
//     event.preventDefault()
//     cadastrarMontagem()
// })

//  function cadastrarAutor() {
//     const nome = document.getElementById('nomeAutor').value
//     const sql = 'INSERT INTO autor (nome) VALUES (?)'
//      conexao.query(sql, [nome])
//     document.getElementById('mensagens').innerHTML = 'Autor cadastrado com sucesso!'
// }

// async function cadastrarLivro() {
//     const titulo = document.getElementById('tituloLivro').value
//     const autorId = document.getElementById('autorLivro').value
//     const sql = 'INSERT INTO livro (titulo, autor_id) VALUES (?, ?)'
//     await conexao.query(sql, [titulo, autorId])
//     document.getElementById('mensagens').innerHTML = 'Livro cadastrado com sucesso!'
// }

// async function cadastrarFornecedor() {
//     const cnpj = document.getElementById('cnpjFornecedor').value
//     const sql = 'INSERT INTO fornecedor (cnpj) VALUES (?)'
//     await conexao.query(sql, [cnpj])
//     document.getElementById('mensagens').innerHTML = 'Fornecedor cadastrado com sucesso!'
// }

// async function cadastrarPeca() {
//     const nome = document.getElementById('nomePeca').value
//     const fornecedorId = document.getElementById('fornecedorPeca').value
//     const sql = 'INSERT INTO peca (nome, fornecedor_id) VALUES (?, ?)'
//     await conexao.query(sql, [nome, fornecedorId])
//     document.getElementById('mensagens').innerHTML = 'Peça cadastrada com sucesso!'
// }

// async function cadastrarMontagem() {
//     const nome = document.getElementById('nomeMontagem').value
//     const livroId = document.getElementById('livroMontagem').value
//     const pecas = document.getElementById('pecasMontagem').value
//     const sql = 'INSERT INTO montagem (nome, livro_id, pecas) VALUES (?, ?, ?)'
//     await conexao.query(sql, [nome, livroId, pecas])
//     document.getElementById('mensagens').innerHTML = 'Montagem cadastrada com sucesso!'
// }


