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
   const { name } = req.body
   const sql = 'INSERT INTO autores (name) VALUES (?)'
   conexao.query(sql, [name], (err, result) => {
       if (err) {
           console.error('Erro ao cadastrar autor:', err)
           res.status(500).send('Erro ao cadastrar autor')
       } else {
           console.log('Autor cadastrado com sucesso!')
           res.send('Autor cadastrado com sucesso!')
       }
   })
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

export default app