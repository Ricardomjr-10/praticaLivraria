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

app.get('/all', (req, res) => {
    conexao.query('SELECT * FROM livraria', (err, result) => {
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
    const sql = `INSERT INTO livros (title, author_id) VALUES ('${tituloLivro}', ${autorLivro})`
    conexao.query(sql, (err, result) => {
        if (err) {
            res.send(err)
        } else {
            res.json('Livro cadastrado com sucesso!')
        }
    })
})
        

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

export default app