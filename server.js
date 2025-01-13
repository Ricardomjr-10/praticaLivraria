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

app.post('/cadAutor', async (req, res) => {
    try {
        const { nome } = req.body;
       

        if (!nome) {
            return res.json({ success: false, message: 'Nome é obrigatórios.' });
        }

        const connection = await mysql.createConnection(conexao);

        // Sanitização (importante para segurança)
        const [rows, fields] = await connection.execute(
            'INSERT INTO autores (nome) VALUES (?, ?)',
            [nome]
        );

        await connection.end();

        res.json({ success: true });
    } catch (error) {
        console.error('Erro ao cadastrar:', error);
        res.status(500).json({ success: false, message: 'Erro interno no servidor.' });
    }
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

export default app