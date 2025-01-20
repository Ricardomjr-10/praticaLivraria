
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
const formFiltroFornecedor = document.getElementById('fornecedorPorNome')
const formFiltroLivro = document.getElementById('livroPorTitulo')
const formFiltroMontagem = document.getElementById('montagemPorNome')

formAutor.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(formAutor);
    const data = Object.fromEntries(formData);

    fetch('/cadAutor', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            document.getElementById('mensagens').innerHTML = data
            console.log(data)
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

    fetch('/cadLivro', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            document.getElementById('mensagens').innerHTML = data
            console.log(data)
            formLivro.reset()
        })
})

formFornecedor.addEventListener('submit', event => {
    event.preventDefault()

    const formData = new FormData(formFornecedor)
    const data = Object.fromEntries(formData)

    fetch('/cadFornecedor', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            document.getElementById('mensagens').innerHTML = data
            console.log(data)
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
            document.getElementById('mensagens').innerHTML = data
            console.log(data)
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
            document.getElementById('mensagens').innerHTML = data
            console.log(data)
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
    document.getElementById('mensagens').innerHTML = isValid ? 'CPF válido' : 'CPF inválido';
    //se invalido, cor da letra vermelha
    cpfInput.style.color = isValid ? 'green' : 'red';
}

cpfInput.addEventListener('input', () => {
    validarCPF(cpfInput.value)
})

//validar cnpj em fornecedor
function validarCNPJ(cnpj) {
    const regex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/;
    const isValid = regex.test(cnpj);
    document.getElementById('mensagens').innerHTML = isValid ? 'CNPJ válido' : 'CNPJ inválido';
    //se invalido, cor da letra vermelha
    cnpjInput.style.color = isValid ? 'green' : 'red';
}

cnpjInput.addEventListener('input', () => {
    validarCNPJ(cnpjInput.value)
})

//validar isbn em livro
function validarISBN(isbn) {
    const regex = /^\d{3}-\d{3}-\d{3}-\d{2}-\d{1}$/;
    const isValid = regex.test(isbn);
    document.getElementById('mensagens').innerHTML = isValid ? 'ISBN válido' : 'ISBN inválido';
    //se invalido, cor da letra vermelha
    isbnInput.style.color = isValid ? 'green' : 'red';
}

isbnInput.addEventListener('input', () => {
    validarISBN(isbnInput.value)
})

btnCadastro.addEventListener('click', () => {
    divCadastro.style.display = 'flex'
    divFiltros.style.display = 'none'
    divRelatorios.style.display = 'none'
})

btnFiltros.addEventListener('click', () => {
    divCadastro.style.display = 'none'
    divFiltros.style.display = 'flex'
    divRelatorios.style.display = 'none'
})

formFiltroFornecedor.addEventListener('submit', event => {
    event.preventDefault();

    const nomeFiltro = document.getElementById('buscarFornecedor').value;
    const nomeConta = document.getElementById('numeroConta').value;

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
                fornecedorResult.appendChild(fornecedorDiv);
            });
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
    const autorFiltro = document.getElementById('autorLivro').value

    fetch(`/filtroLivro?titulo=${tituloFiltro}&autor_id=${autorFiltro}`)

        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const livroResult = document.querySelector('.livroResult');
            livroResult.innerHTML = '';

            if (data.length === 0) {
                livroResult.innerHTML = "<p>Nenhum livro encontrado.</p>";
                return; // Impede que o loop continue sem dados

            }

            data.forEach(livro => {
                const livroDiv = document.createElement('div');
                livroDiv.innerHTML = `
            <p>ISBN: ${livro.isbn}</p>
            <p>Título: ${livro.titulo}</p>
            <p>Autor: ${livro.autor}</p>
            <p>Editora: ${livro.editora}</p>
            <p>Quantidade: ${livro.quantidade}</p>
            <p>Preço: ${livro.preco}</p>
            <hr>
        `;
                livroResult.appendChild(livroDiv);
            });
        })
        .catch(error => {
            console.error("Erro ao buscar livros:", error);
            const livroResult = document.querySelector('.livroResult');
            livroResult.innerHTML = `<p>Erro ao buscar livros: ${error.message}</p>`;
        })
})
// formFiltroFornecedor.addEventListener('submit', event => {
//     event.preventDefault()

//     //buscar fornecedor por nome no banco de dados pelo valor do input
//     const nomeFiltro = document.getElementById('buscarFornecedor').value

//     fetch(`/filtroFornecedor?nome=${nomeFiltro}`)
//         .then(response => response.json())
//         .then(data => {
//             console.log(data)
//             const fornecedorResult = document.querySelector('.forneResult')
//             fornecedorResult.innerHTML = ''
//             data.forEach(fornecedor => {
//                 const fornecedorDiv = document.createElement('div')
//                 fornecedorDiv.innerHTML = `
//                 <p>Nome: ${fornecedor.name}</p>
//                 <p>Contas: ${fornecedor.contas}</p>
//                 <p>Dígito Verificador: ${fornecedor.digito_verificador}</p>
//                 <p>CNPJ: ${fornecedor.cnpj}</p>
//                 <hr>
//                 `
//                 fornecedorResult.appendChild(fornecedorDiv)
//             })
//         })
// })
