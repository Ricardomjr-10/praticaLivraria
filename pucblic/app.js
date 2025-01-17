//import conexao  from './conexao.js'  

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