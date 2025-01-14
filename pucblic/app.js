//import conexao  from './conexao.js'  

const formAutor = document.getElementById('formAutor')
const formLivro = document.getElementById('formLivro')
const formFornecedor = document.getElementById('formFornecedor')
const formPeca = document.getElementById('formPeca')
const formMontagem = document.getElementById('formMontagem')
const selectAutor = document.getElementById('autorLivro')

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
    })
})

selectAutor.addEventListener('change', (event) => {
    const selectedOption = event.target.value;

    if (selectedOption) {
        fetch(`/livros/autor/${selectedOption}`)
            .then(response => response.json())
            .then(data => {
                const livroSelect = document.getElementById('livroLivro');
                livroSelect.innerHTML = '';

                data.forEach(livro => {
                    const option = document.createElement('option');
                    option.value = livro.id;
                    option.textContent = livro.titulo;
                    livroSelect.appendChild(option);
                });
            });
    } else {
        const livroSelect = document.getElementById('livroLivro');
        livroSelect.innerHTML = '';
    }
});

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
    })
})



