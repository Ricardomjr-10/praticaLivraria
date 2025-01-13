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

app.post('/cadAutor', (req, res) => {
    const { nomeAutor } = req.body
    const sql = `INSERT INTO autor (nomeAutor) VALUES ('${nomeAutor}')`
    conexao.query(sql, (err, result) => {
        if (err) {
            res.send(err)
        } else {
            res.send('Autor cadastrado com sucesso!')
        }
    })
})
        

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

export default app