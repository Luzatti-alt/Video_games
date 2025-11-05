//carrosel
let indice = 0;
let slide = document.getElementById("slide");
let imagens = ["imagens/deltarune(2).avif","imagens/deltarune(1).jpg","imagens/deltarune(2).png","imagens/deltarune(3).jpg","imagens/deltarune(4).avif"];
setInterval(() => {
    if (indice >= imagens.length) {
        indice = 0; // Reinicia o índice para 0 quando chega ao final do array
    }
    slide.src = imagens[indice];
    indice++; // Incrementa o índice para a próxima imagem
}, 3000);