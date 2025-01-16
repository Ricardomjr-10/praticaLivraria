import express from 'express'
import conexao from './conexao.js'
import bodyParser from 'body-parser'



const app = express()

const PORT = process.env.PORT || 3000

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('./pucblic'))
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/allAutores', (req, res) => {
    conexao.query('SELECT * FROM autores', (err, result) => {
        if (err) {
            res.send(err)
        } else {
            res.send(result)
        }
    })
})

app.get('/allFornecedores', (req, res) => {
    conexao.query('SELECT * FROM fornecedores', (err, result) => {
        if (err) {
            res.send(err)
        } else {
            res.send(result)
        }
    })
})

app.get('/allLivros', (req, res) => {
    conexao.query('SELECT * FROM livros', (err, result) => {
        if (err) {
            res.send(err)
        } else {
            res.send(result)
        }
    })
})

app.get('/allPecas', (req, res) => {
    conexao.query('SELECT * FROM pecas', (err, result) => {
        if (err) {
            res.send(err)
        } else {
            res.send(result)
        }
    })
})

app.post('/cadAutor', (req, res) => {
    const { nomeAutor } = req.body
    const sql = `INSERT INTO autores (name) VALUES ('${nomeAutor}')`
    conexao.query(sql, (err, result) => {
        if (err) {
            res.send(err)
        } else {
            res.json('Autor cadastrado com sucesso!')
        }
    })
})



app.post('/cadLivro', (req, res) => {
    const { tituloLivro, autorLivro } = req.body
    const sql = `INSERT INTO livros (titulo, autor_id) VALUES ('${tituloLivro}', ${autorLivro})`
    conexao.query(sql, (err, result) => {
        if (err) {
            res.send(err)
        } else {
            res.json('Livro cadastrado com sucesso!')
        }
    })
})

app.post('/cadFornecedor', (req, res) => {
    const { nomeFornecedor, cnpjFornecedor , contaFornecedor, digitoVerificadorConta} = req.body
    const sql = `INSERT INTO fornecedores (name, cnpj, conta, digito_verificador) VALUES ('${nomeFornecedor}', '${cnpjFornecedor}', ${contaFornecedor}, ${digitoVerificadorConta})`
    conexao.query(sql, (err, result) => {
        if (err) {
            res.send(err)
        } else {
            res.json('Fornecedor cadastrado com sucesso!')
        }
    })
})

app.post('/cadPeca', (req, res) => {
    const { nomePeca, fornecedorPeca } = req.body
    const sql = `INSERT INTO pecas (name, fornecedor_id) VALUES ('${nomePeca}', ${fornecedorPeca})`
    conexao.query(sql, (err, result) => {
        if (err) {
            res.send(err)
        } else {
            res.json('Peca cadastrada com sucesso!')
        }
    })
})

app.post('/cadMontagem', (req, res) => {
    const { nomeMontagem, livroMontagem, pecasMontagem } = req.body
    const sql = `INSERT INTO montagem (name, livro_id, peca_id) VALUES ('${nomeMontagem}', ${livroMontagem}, ${pecasMontagem})`
    conexao.query(sql, (err, result) => {
        if (err) {
            res.send(err)
        } else {
            res.json('Montagem cadastrada com sucesso!')
        }
    })
})



app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

export default app