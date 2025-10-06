const whatsbnt = document.getElementById("whats");
let msg = "bem-vindo a paralel";
let num = "5541999184139";
whatsbnt.addEventListener('click', () => {
    alert('enviando mensagem');
    const url = `https://wa.me/${num}?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank"); 
});