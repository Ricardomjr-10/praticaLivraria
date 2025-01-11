import app from '../server.js'
import conexao from '../conexao.js'

const formAutor = document.getElementById('formAutor')
const formLivro = document.getElementById('formLivro')
const formFornecedor = document.getElementById('formFornecedor')
const formPeca = document.getElementById('formPeca')
const formMontagem = document.getElementById('formMontagem')

formAutor.addEventListener('submit', (event) => {
    event.preventDefault()
    cadastrarAutor()
})

formLivro.addEventListener('submit', (event) => {
    event.preventDefault()
    cadastrarLivro()
})

formFornecedor.addEventListener('submit', (event) => {
    event.preventDefault()
    cadastrarFornecedor()
})

formPeca.addEventListener('submit', (event) => {
    event.preventDefault()
    cadastrarPeca()
})

formMontagem.addEventListener('submit', (event) => {
    event.preventDefault()
    cadastrarMontagem()
})

async function cadastrarAutor() {
    const nome = document.getElementById('nomeAutor').value
    const sql = 'INSERT INTO autor (nome) VALUES (?)'
    await conexao.query(sql, [nome])
    document.getElementById('mensagens').innerHTML = 'Autor cadastrado com sucesso!'
}

async function cadastrarLivro() {
    const titulo = document.getElementById('tituloLivro').value
    const autorId = document.getElementById('autorLivro').value
    const sql = 'INSERT INTO livro (titulo, autor_id) VALUES (?, ?)'
    await conexao.query(sql, [titulo, autorId])
    document.getElementById('mensagens').innerHTML = 'Livro cadastrado com sucesso!'
}

async function cadastrarFornecedor() {
    const cnpj = document.getElementById('cnpjFornecedor').value
    const sql = 'INSERT INTO fornecedor (cnpj) VALUES (?)'
    await conexao.query(sql, [cnpj])
    document.getElementById('mensagens').innerHTML = 'Fornecedor cadastrado com sucesso!'
}

async function cadastrarPeca() {
    const nome = document.getElementById('nomePeca').value
    const fornecedorId = document.getElementById('fornecedorPeca').value
    const sql = 'INSERT INTO peca (nome, fornecedor_id) VALUES (?, ?)'
    await conexao.query(sql, [nome, fornecedorId])
    document.getElementById('mensagens').innerHTML = 'Peça cadastrada com sucesso!'
}

async function cadastrarMontagem() {
    const nome = document.getElementById('nomeMontagem').value
    const livroId = document.getElementById('livroMontagem').value
    const pecas = document.getElementById('pecasMontagem').value
    const sql = 'INSERT INTO montagem (nome, livro_id, pecas) VALUES (?, ?, ?)'
    await conexao.query(sql, [nome, livroId, pecas])
    document.getElementById('mensagens').innerHTML = 'Montagem cadastrada com sucesso!'
}

