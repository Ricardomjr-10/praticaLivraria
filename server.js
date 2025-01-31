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

app.get('/allAutores',  (req, res) => {
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

app.get('/allMontagem', (req, res) => {
    conexao.query('SELECT * FROM montagem', (err, result) => {
        if (err) {
            res.send(err)
        } else {
            res.send(result)
        }
    })
})

app.post('/cadAutor', (req, res) => {
    const { nomeAutor, cpfAutor } = req.body
    const sql = `INSERT INTO autores (name, cpf) VALUES ('${nomeAutor}', '${cpfAutor}')`
    conexao.query(sql, (err, result) => {
        if (err) {
            res.send(err)
        } else {
            res.json('Autor cadastrado com sucesso!')
        }
    })
})



app.post('/cadLivro', (req, res) => {
    const { tituloLivro, autorLivro, isbnLivro } = req.body
    const sql = `INSERT INTO livros (titulo, autor_id, isbn) VALUES ('${tituloLivro}', ${autorLivro}, '${isbnLivro}')`
    conexao.query(sql, (err, result) => {
        if (err) {
            res.send(err)
        } else {
            res.json('Livro cadastrado com sucesso!')
        }
    })
})

app.post('/cadFornecedor', (req, res) => {
    const { nomeFornecedor, cnpjFornecedor, contaFornecedor, digitoVerificadorConta } = req.body
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
    const { nomePeca, fornecedorPeca, precoPeca } = req.body
    const sql = `INSERT INTO pecas (name, fornecedor_id, valor) VALUES ('${nomePeca}', ${fornecedorPeca}, ${precoPeca})`
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


//buscar fornecedor por nome no banco de dados pelo valor do input
// app.get('/filtroFornecedor', (req, res) => {
//     const fornecedorPorNome = req.query.name
//     const sql = `SELECT * FROM fornecedores WHERE name LIKE '%${fornecedorPorNome}%'`
//     conexao.query(sql, (err, result) => {
//         if (err) {
//             res.json(err)
//         } else {
//             res.json(result)
//         }
//     })
// })

// app.get('/filtroFornecedor', (req, res) => { // Rota corrigida: sem parâmetro na URL
//     const nomeFiltro = req.query.name; // Obtém o valor da query string
//     const nomeConta = req.query.conta;
//     if (!nomeFiltro) {
//         return res.json([]); // Retorna array vazio se nenhum filtro for fornecido
//     }
//     const sql = `SELECT * FROM fornecedores WHERE name LIKE '%${nomeFiltro}%' OR conta LIKE '%${nomeConta}%'`; // Nome da coluna corrigido para 'nome'
//     conexao.query(sql, (err, result) => { // Remove o segundo argumento desnecessário
//         if (err) {
//             console.error("Erro na consulta:", err); // Log do erro no console para debug
//             res.status(500).json({ error: "Erro ao buscar fornecedores" }); // Retorna erro 500 com mensagem
//         } else {
//             res.json(result);
//         }
//     });
// });


app.get('/filtroFornecedor',  (req, res) => {
    const nomefiltro = req.query.name
    const nomeConta = req.query.conta

    let query = 'SELECT * FROM fornecedores WHERE 1=1'
    const params = []

    if (nomefiltro) {
        query += ' AND name LIKE ?'
        params.push(`%${nomefiltro}%`)
    }

    if (nomeConta) {
        query += ' AND conta LIKE ?'
        params.push(`%${nomeConta}%`)
    }

    conexao.query(query, params, (err, result) => {
        if (err) {
            res.send(err)
        } else {
            res.send(result)
        }
    })
    
})

app.get('/filtroLivro', (req, res) => {
    const nomefiltro = req.query.titulo;
    const nomeAutor = req.query.autor_id;

    let query = `SELECT livros.*, autores.name AS autor_name FROM livros 
                 JOIN autores ON livros.autor_id = autores.id 
                 WHERE 1=1`;

    const params = [];


    if (nomefiltro) {
        query += ' AND livros.titulo LIKE ?';
        params.push(`%${nomefiltro}%`);
    }

    if (nomeAutor) {
        query += ' AND autores.id = ?'; // Alterado para usar o ID do autor
        params.push(nomeAutor);
    }
   
    conexao.query(query, params, (err, result) => {
        if (err) {
            return res.status(500).send(err); // Retorna um erro 500 em caso de falha
        } else {
            return res.send(result); // Retorna os resultados
        }
    });
});

app.get('/filtroMontagem', (req, res) => {
    const nomefiltro = req.query.name;
    const nomePeca = req.query.peca_id;

    let query = `SELECT montagem.*, pecas.name AS peca_name FROM montagem 
                 JOIN pecas ON montagem.peca_id = pecas.id 
                 WHERE 1=1`;

    const params = [];

    if (nomefiltro) {
        query += ' AND montagem.name LIKE ?';
        params.push(`%${nomefiltro}%`);
    }

    if (nomePeca) {
        query += ' AND pecas.id = ?';
        params.push(nomePeca);
    }

    conexao.query(query, params, (err, result) => {
        if (err) {
            return res.status(500).send(err); // Retorna um erro 500 em caso de falha
        } else {
            return res.send(result); // Retorna os resultados
        }
    })
    })

   //rota para autores com nome, cpf e livros
   app.get('/relatorioAutores', (req, res) => {
       conexao.query('SELECT autores.name, autores.cpf, livros.titulo FROM autores LEFT JOIN livros ON autores.id = livros.autor_id', (err, result) => {
           if (err) {
               res.send(err)
           } else {
               res.send(result)
           }
       })
   })

   //rota para fornecedores com nome, cnpj, conta e digito verificador
   app.get('/relatorioFornecedores', (req, res) => {
       conexao.query('SELECT * FROM fornecedores', (err, result) => {
           if (err) {
               res.send(err)
           } else {
               res.send(result)
           }
       })
   })

   //rota do relatorio de montagem com nome, livro e peca
   app.get('/relatorioMontagem', (req, res) => {
       conexao.query('SELECT * FROM montagem', (err, result) => {
           if (err) {
               res.send(err)
           } else {
               res.send(result)
           }
       })
   })

const deletar = (rota, nome) => {
       app.delete(`/${rota}/:id`, (req, res) => {
        const { id } = req.params
        const sql = `DELETE FROM ${nome} WHERE id = ${id}`
        conexao.query(sql, (err, result) => {
            if (err) {
                res.send(err)
            } else {
                res.json(`${nome} deletado com sucesso!`)
            }
        })
    })
}
   
deletar('deleteAutores', 'autores')
deletar('deleteFornecedores', 'fornecedores')
deletar('deleteLivros', 'livros')
deletar('deletePecas', 'pecas')
deletar('deleteMontagem', 'montagem')



// //rota para validar cpf
// app.get('/validar-cpf/:cpf', (req, res) => {
//     const { cpf } = req.params
//     const isValid = cpf.isValid(cpf)
//     res.json({ isValid })
// })

// //rota para validar cnpj
// app.get('/validar-cnpj/:cnpj', (req, res) => {
//     const { cnpj } = req.params
//     const isValid = cnpj.isValid(cnpj)
//     res.json({ isValid })
// })


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

export default app