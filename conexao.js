import mysql from 'mysql'

const conexao = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'dba',
    password: '1234',
    database: 'livraria'
})

conexao.connect((erro) => {
    if (erro) {
        console.log(erro)
    } else {
        console.log('Conectado com sucesso!')
    }
})

export default conexao