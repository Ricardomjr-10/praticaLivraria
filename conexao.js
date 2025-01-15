import mysql from 'mysql'

const conexao = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'dba',
    password: '1234',
    database: 'livraria'
})

conexao.connect()

export default conexao

//criar coluna cnpj em fornecedores
//conexao.query('ALTER TABLE fornecedores ADD COLUMN cnpj VARCHAR(14)')