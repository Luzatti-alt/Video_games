//carrosel
let indice = 0;
let slide = document.getElementById("slide");
let imagens = ["imagens/deltarune(2).avif","imagens/deltarune.jpg","imagens/deltarune(2).jpg","imagens/silksong-gameplay(3).webp","imagens/silksong-gameplay(4).jpg"];
setInterval(() => {
    if (indice >= imagens.length) {
        indice = 0; // Reinicia o índice para 0 quando chega ao final do array
    }
    slide.src = imagens[indice];
    indice++; // Incrementa o índice para a próxima imagem
}, 3000);