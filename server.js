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

app.post('/cadForncedor', (req, res) => {
    const { nomeFornecedor} = req.body
    const sql = `INSERT INTO fornecedores (name) VALUES ('${nomeFornecedor})`
    conexao.query(sql, (err, result) => {
        if (err) {
            res.send(err)
        } else {
            res.json('Fornecedor cadastrado com sucesso!')
        }
    })
})

app.get('/livros/autor/:id', (req, res) => {
    const { id } = req.params
    const sql = `SELECT * FROM livros WHERE autor_id = ${id}`
    conexao.query(sql, (err, result) => {
        if (err) {
            res.send(err)
        } else {
            res.send(result)
        }
    })
})
        

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

export default app