const formAutor = document.getElementById('formAutor')
const formLivro = document.getElementById('formLivro')
const formFornecedor = document.getElementById('formFornecedor')
const formPeca = document.getElementById('formPeca')
const formMontagem = document.getElementById('formMontagem')
const selectAutor = document.getElementById('autorLivro')
const selectPeca = document.getElementById('fornecedorPeca')
const selectLivroMontagem = document.getElementById('livroMontagem')
const selectPecaMontagem = document.getElementById('pecasMontagem')
const cpfInput = document.getElementById('cpfAutor')
const cnpjInput = document.getElementById('cnpjFornecedor')
const isbnInput = document.getElementById('isbnLivro')
const btnCadastro = document.getElementById('btnCadastro')
const btnFiltros = document.getElementById('btnFiltros')
const btnRelatorios = document.getElementById('btnRelatorios')
const divCadastro = document.querySelector('.cadastro')
const divFiltros = document.querySelector('.filtros')
const divRelatorios = document.querySelector('.relatorio')
const divEditar = document.querySelector('.editar')
const btnEditar = document.getElementById('btnEditar')
const formFiltroFornecedor = document.getElementById('fornecedorPorNome')
const formFiltroLivro = document.getElementById('livroPorTitulo')
const formFiltroMontagem = document.getElementById('montagemPorNome')
const relatorioAutores = document.getElementById('btnAutores')
const relatorioFornecedores = document.getElementById('btnFornecedores')
const relatorioLivros = document.getElementById('btnLivroMontagem')
const alertDiv = document.getElementById('alert');
const overlay = document.getElementById('overlay');
const closeBtn = document.getElementById('closeBtn');

formAutor.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(formAutor);
    const data = Object.fromEntries(formData);
    
   if (validarCPF(cpfInput.value) === 'CPF inválido') {
        showAlert('CPF inválido');
        return;
    }

    fetch('/cadAutor', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            // document.getElementById('mensagens').innerHTML = data
            showAlert(data)
            formAutor.reset()
        })
})

fetch('/allAutores')
    .then(response => response.json())
    .then(data => {
        data.forEach(autor => {
            const option = document.createElement('option');
            option.value = autor.id;
            option.text = autor.name;
            selectAutor.appendChild(option);
        })
    })

fetch('/allFornecedores')
    .then(response => response.json())
    .then(data => {
        data.forEach(fornecedor => {
            const option = document.createElement('option');
            option.value = fornecedor.id;
            option.text = fornecedor.name;
            selectPeca.appendChild(option);
        })
    })

fetch('/allLivros')
    .then(response => response.json())
    .then(data => {
        data.forEach(livro => {
            const option = document.createElement('option');
            option.value = livro.id;
            option.text = livro.titulo;
            selectLivroMontagem.appendChild(option);
        })
    })

fetch('/allPecas')
    .then(response => response.json())
    .then(data => {
        data.forEach(peca => {
            const option = document.createElement('option');
            option.value = peca.id;
            option.text = peca.name;
            selectPecaMontagem.appendChild(option);
        })
    })

formLivro.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(formLivro);
    const data = Object.fromEntries(formData);

    if (validarISBN(isbnInput.value) === 'ISBN inválido') {
        showAlert('ISBN inválido');
        return;
    }

    fetch('/cadLivro', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            //document.getElementById('mensagens').innerHTML = data
            showAlert(data)
            formLivro.reset()
        })
})

formFornecedor.addEventListener('submit', event => {
    event.preventDefault()

    const formData = new FormData(formFornecedor)
    const data = Object.fromEntries(formData)

    if (validarCNPJ(cnpjInput.value) === 'CNPJ inválido') {
        showAlert('CNPJ inválido');
        return;
    }

    fetch('/cadFornecedor', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            //document.getElementById('mensagens').innerHTML = data
            showAlert(data)
            validarCNPJ(cnpjInput.value)
            formFornecedor.reset()
        })
})

formPeca.addEventListener('submit', event => {
    event.preventDefault()

    const formData = new FormData(formPeca)
    const data = Object.fromEntries(formData)

    fetch('/cadPeca', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            //document.getElementById('mensagens').innerHTML = data
            showAlert(data)
            formPeca.reset()
        })
})

formMontagem.addEventListener('submit', event => {
    event.preventDefault()

    const formData = new FormData(formMontagem)
    const data = Object.fromEntries(formData)

    fetch('/cadMontagem', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            //document.getElementById('mensagens').innerHTML = data
            showAlert(data)
            formMontagem.reset()
        })
})

//funcao para validar digito verificador em conta
function calcularDigitoVerificador(conta) {
    let soma = 0;
    for (let i = 0; i < conta.length; i++) {
        soma += parseInt(conta[i]);
    }
    let digito = soma % 11;
    return digito;
}

const contaInput = document.getElementById('contaFornecedor');
contaInput.addEventListener('input', () => {
    const digitoVerificador = calcularDigitoVerificador(contaInput.value);
    document.getElementById('digitoVerificadorConta').value = digitoVerificador;
});


//validar cpf em autor
function validarCPF(cpf) {
    const regex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
    const isValid = regex.test(cpf);
    const msg = isValid ? 'CPF válido' : 'CPF inválido'
    //document.getElementById('mensagens').innerHTML = isValid ? 'CPF válido' : 'CPF inválido';
    //se invalido, cor da letra vermelha
    //cpfInput.style.color = isValid ? 'green' : 'red';
    return msg
}

// cpfInput.addEventListener('input', () => {
//     validarCPF(cpfInput.value)
// })

//validar cnpj em fornecedor
function validarCNPJ(cnpj) {
    const regex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/;
    const isValid = regex.test(cnpj);
    const msg = isValid ? 'CNPJ válido' : 'CNPJ inválido'
    // document.getElementById('mensagens').innerHTML = isValid ? 'CNPJ válido' : 'CNPJ inválido';
    //se invalido, cor da letra vermelha
    // cnpjInput.style.color = isValid ? 'green' : 'red';
    return msg
}

// cnpjInput.addEventListener('input', () => {
//     validarCNPJ(cnpjInput.value)
// })

//validar isbn em livro
function validarISBN(isbn) {
    const regex = /^\d{3}-\d{3}-\d{3}-\d{2}-\d{1}$/;
    const isValid = regex.test(isbn);
    const msg = isValid ? 'ISBN válido' : 'ISBN inválido'
    // document.getElementById('mensagens').innerHTML = isValid ? 'ISBN válido' : 'ISBN inválido';
    //se invalido, cor da letra vermelha
    // isbnInput.style.color = isValid ? 'green' : 'red';
    return msg
}

// isbnInput.addEventListener('input', () => {
//     validarISBN(isbnInput.value)
// })

btnCadastro.addEventListener('click', () => {
    divCadastro.style.display = 'block'
    divFiltros.style.display = 'none'
    divRelatorios.style.display = 'none'
    divEditar.style.display = 'none'
})

btnFiltros.addEventListener('click', () => {
    divCadastro.style.display = 'none'
    divFiltros.style.display = 'block'
    divRelatorios.style.display = 'none'
    divEditar.style.display = 'none'
})

btnRelatorios.addEventListener('click', () => {
    divCadastro.style.display = 'none'
    divFiltros.style.display = 'none'
    divRelatorios.style.display = 'block'
    divEditar.style.display = 'none'
})

btnEditar.addEventListener('click', () => {
    divCadastro.style.display = 'none'
    divFiltros.style.display = 'none'
    divRelatorios.style.display = 'none'
    divEditar.style.display = 'block'
})

formFiltroFornecedor.addEventListener('submit', event => {
    event.preventDefault();

    const nomeFiltro = document.getElementById('buscarFornecedor').value;
    const nomeConta = document.getElementById('numeroConta').value;

    if (nomeFiltro === '' && nomeConta === '') {
        alert('Preencha pelo menos um campo para realizar a busca.');
        return;
    }

    fetch(`/filtroFornecedor?name=${nomeFiltro}&conta=${nomeConta}`) // URL correta
        .then(response => {
            if (!response.ok) { // Verifica se a resposta foi bem-sucedida (status 2xx)
                throw new Error(`Erro na requisição: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const fornecedorResult = document.querySelector('.forneResult');
            fornecedorResult.innerHTML = '';
            fornecedorResult.style.display = 'block';
            if (data.length === 0) { // Mensagem caso não encontre nenhum fornecedor
                fornecedorResult.innerHTML = "<p>Nenhum fornecedor encontrado.</p>";
                return; // Impede que o loop continue sem dados
            }

            data.forEach(fornecedor => {
                const fornecedorDiv = document.createElement('div');
                fornecedorDiv.innerHTML = `
                    <p>Nome: ${fornecedor.name}</p>
                    <p>Contas: ${fornecedor.conta}</p>
                    <p>Dígito Verificador: ${fornecedor.digito_verificador}</p>
                    <p>CNPJ: ${fornecedor.cnpj}</p>
                    <hr>
                `;
                fornecedorResult.appendChild(fornecedorDiv)
            });
            formFiltroFornecedor.reset()
            limpar(fornecedorResult)
        })
        .catch(error => { // Tratamento de erros mais robusto
            console.error("Erro ao buscar fornecedores:", error);
            const fornecedorResult = document.querySelector('.forneResult');
            fornecedorResult.innerHTML = `<p>Erro ao buscar fornecedores: ${error.message}</p>`;
        });
});

formFiltroLivro.addEventListener('submit', event => {
    event.preventDefault()

    const tituloFiltro = document.getElementById('buscarLivro').value
    const autorFiltro = document.getElementById('autorBuscar').value
   
    if (tituloFiltro === '' && autorFiltro === '') {
        alert('Preencha pelo menos um campo para realizar a busca.');
        return;
    }

    fetch(`/filtroLivro?titulo=${encodeURIComponent(tituloFiltro)}&autor_id=${encodeURIComponent(autorFiltro)}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const livroResult = document.querySelector('.livroResult');
            livroResult.innerHTML = '';
            livroResult.style.display = 'block';
            if (data.length === 0) {
                livroResult.innerHTML = "<p>Nenhum livro encontrado.</p>";
                return; // Impede que o loop continue sem dados

            }

            data.forEach(livro => {
                const livroDiv = document.createElement('div');
                livroDiv.innerHTML = `
                  <p>ISBN: ${livro.isbn}</p>
                  <p>Título: ${livro.titulo}</p>
                  <p>Autor: ${livro.autor_name}</p>
                  <hr>
                `;
                livroResult.appendChild(livroDiv);
            });
            formFiltroLivro.reset()
            limpar(livroResult)
        })
        .catch(error => {
            console.error("Erro ao buscar livros:", error);
            const livroResult = document.querySelector('.livroResult');
            livroResult.innerHTML = `<p>Erro ao buscar livros: ${error.message}</p>`;
        })
})

formFiltroMontagem.addEventListener('submit', event => {
    event.preventDefault()

    const nomeFiltro = document.getElementById('buscarMontagem').value
    const pecaFiltro = document.getElementById('buscarPecasMontagem').value

    if (nomeFiltro === '' && pecaFiltro === '') {
        alert('Preencha pelo menos um campo para realizar a busca.');
        return;
    }

    fetch(`/filtroMontagem?name=${encodeURIComponent(nomeFiltro)}&peca_id=${encodeURIComponent(pecaFiltro)}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const montagemResult = document.querySelector('.montaResult');
            montagemResult.innerHTML = '';
            montagemResult.style.display = 'block';
            if (data.length === 0) {
                montagemResult.innerHTML = "<p>Nenhuma montagem encontrada.</p>";
                return; // Impede que o loop continue sem dados
            }

            data.forEach(montagem => {
                const montagemDiv = document.createElement('div');
                montagemDiv.innerHTML = `
                    <p>Nome: ${montagem.name}</p>
                    <p>Livro: ${montagem.livro_id}</p>
                    <p>Peças: ${montagem.peca_id}</p>
                    <hr>
                `;
                montagemResult.appendChild(montagemDiv);
            });
            formFiltroMontagem.reset()
            limpar(montagemResult)
        })
        .catch(error => {
            console.error("Erro ao buscar montagens:", error);
            const montagemResult = document.querySelector('.montaResult');
            montagemResult.innerHTML = `<p>Erro ao buscar montagens: ${error.message}</p>`;
        })
})  

relatorioAutores.addEventListener('click', () => {
    //rota com nome dos autores e seus livros
    fetch('/relatorioAutores')
        .then(response => response.json())
        .then(data => {
            const relatorioResult = document.querySelector('.relatorioResult');
            relatorioResult.innerHTML = '';
            relatorioResult.style.display = 'block';
            if (data.length === 0) {
                relatorioResult.innerHTML = "<p>Nenhum autor encontrado.</p>";
                return; // Impede que o loop continue sem dados
            }

            data.forEach(autor => {
                const autorDiv = document.createElement('div');
                autorDiv.innerHTML = `
                    <p>Nome: ${autor.name}</p>
                    <p>CPF: ${autor.cpf}</p>
                    <p>Titulo: ${autor.titulo}</p>
                    <hr>
                `;
                relatorioResult.appendChild(autorDiv);
            })
        })
})
           
   relatorioFornecedores.addEventListener('click', () => {
    fetch('/relatorioFornecedores')
        .then(response => response.json())
        .then(data => {
            const relatorioResult = document.querySelector('.relatorioResult');
            relatorioResult.innerHTML = '';

            if (data.length === 0) {
                relatorioResult.innerHTML = "<p>Nenhum fornecedor encontrado.</p>";
                return; // Impede que o loop continue sem dados
            }

            data.forEach(fornecedor => {
                const fornecedorDiv = document.createElement('div');
                fornecedorDiv.innerHTML = `
                    <p>Nome: ${fornecedor.name}</p>
                    <p>CNPJ: ${fornecedor.cnpj}</p>
                    <p>Conta: ${fornecedor.conta}</p>
                    <p>Dígito Verificador: ${fornecedor.digito_verificador}</p>
                    <hr>
                `;
                relatorioResult.appendChild(fornecedorDiv);
            })
        })
})
            

relatorioLivros.addEventListener('click', () => {
    fetch('/relatorioMontagem')
        .then(response => response.json())
        .then(data => {
            const relatorioResult = document.querySelector('.relatorioResult');
            relatorioResult.innerHTML = '';

            if (data.length === 0) {
                relatorioResult.innerHTML = "<p>Nenhum livro encontrado.</p>";
                return; // Impede que o loop continue sem dados
            }

            data.forEach(livro => {
                const livroDiv = document.createElement('div');
                livroDiv.innerHTML = `
                    <p>Nome: ${livro.name}</p>
                    <p>Livro: ${livro.livro_id}</p>
                    <p>Peca: ${livro.peca_id}</p>
                    <hr>
                `;
                relatorioResult.appendChild(livroDiv);
            })
        })
})

const btnLimpar = document.getElementById('limpar')

btnLimpar.addEventListener('click', () => {
    document.querySelector('.relatorioResult').innerHTML = ''
})

const limpar = (result) => {
    const btn = document.createElement('button')
    btn.textContent = 'Limpar'

    btn.addEventListener('click', () => {
        result.style.display = 'none'
    })

    result.appendChild(btn)
}



// Função para mostrar o alerta
function showAlert(dados) {
    alertDiv.style.display = 'block';
    overlay.style.display = 'block';
    document.querySelector('p').innerHTML = dados
    // document.body.classList.add('blur');
}

// Função para fechar o alerta
function closeAlert() {
    alertDiv.style.display = 'none';
    overlay.style.display = 'none';
    // document.body.classList.remove('blur');
}

// Fechar o alerta ao clicar fora da div
overlay.addEventListener('click', closeAlert);

// Fechar o alerta ao clicar no botão
closeBtn.addEventListener('click', closeAlert);

// Mostrar o alerta ao carregar a página
// window.onload = showAlert;

const editarAutores = document.getElementById('EditarAutores')
const editarFornecedores = document.getElementById('EditarFornecedores')
const editarLivros = document.getElementById('EditarLivros')
const editarPecas = document.getElementById('EditarPecas')
const editarMontagem = document.getElementById('EditarMontagem')

editarAutores.addEventListener('click', () => {
    //mostar todos os autores e com o botao para editar e outro para excluir
    fetch('/allAutores')
        .then(response => response.json())
        .then(data => {
            const editarResult = document.querySelector('.editarResult');
            editarResult.innerHTML = '';
            editarResult.style.display = 'block';
            if (data.length === 0) {
                editarResult.innerHTML = "<p>Nenhum autor encontrado.</p>";
                return; // Impede que o loop continue sem dados
            }

            data.forEach(autor => { 
                const autorDiv = document.createElement('div');
                autorDiv.innerHTML = `
                    <p>Nome: ${autor.name}</p>
                    <span>CPF: ${autor.cpf}</span> 
                    <div class="botaoEd">
                    <button class="editarBtn btnEd">Editar</button>
                    <button class="excluirBtn btnEd">Excluir</button>
                    </div>
                    <hr>
                `;
                editarResult.appendChild(autorDiv);
            })
        })  
})

editarFornecedores.addEventListener('click', () => {
    //mostar todos os fornecedores e com o botao para editar e outro para excluir
    fetch('/allFornecedores')
        .then(response => response.json())
        .then(data => {
            const editarResult = document.querySelector('.editarResult');
            editarResult.innerHTML = '';
            editarResult.style.display = 'block';
            if (data.length === 0) {
                editarResult.innerHTML = "<p>Nenhum fornecedor encontrado.</p>";
                return; // Impede que o loop continue sem dados
            }

            data.forEach(fornecedor => {
                const fornecedorDiv = document.createElement('div');
                fornecedorDiv.innerHTML = `
                    <p>Nome: ${fornecedor.name}</p>
                    <span>CNPJ: ${fornecedor.cnpj}</span> 
                    <div class="botaoEd">
                    <button class="editarBtn btnEd">Editar</button>
                    <button class="excluirBtn btnEd">Excluir</button>
                    </div>
                    <hr>
                `;
                editarResult.appendChild(fornecedorDiv);
            })
        })
})