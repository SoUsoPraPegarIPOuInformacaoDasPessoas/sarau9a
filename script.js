const TOTAL_FOTOS = 16;
const TEMPO_FOTO = 10000;
const foto = document.getElementById("foto");
const inicio = document.getElementById("inicio");
const musicaAtual = document.getElementById("musicaAtual");

const musicas = {
    "1": document.getElementById("musica1"),
    "2": document.getElementById("musica2"),
    "3": document.getElementById("musica3")
};

let numeroFoto = 1;
let iniciado = false;
let intervaloFotos;

async function iniciar() {

    if (iniciado) return;

    iniciado = true;

    // Remove tela inicial
    inicio.style.display = "none";

    try {
        if (!document.fullscreenElement) {
            await document.documentElement.requestFullscreen();
        }
    } catch (erro) {
        console.log("Tela cheia bloqueada pelo navegador.");
    }

    intervaloFotos = setInterval(trocarFoto, TEMPO_FOTO);
}

function trocarFoto() {

    foto.style.opacity = "0";


    setTimeout(() => {

        numeroFoto++;

        if (numeroFoto > TOTAL_FOTOS) {
            numeroFoto = 1;
        }

        const novaFoto = `foto${numeroFoto}.jpg`;

        foto.onload = function () {
            foto.style.opacity = "1";
        };

        foto.onerror = function () {
            console.error("Não foi possível carregar:", novaFoto);
            foto.style.opacity = "1";
        };

        foto.src = novaFoto;

    }, 800);
}

function tocarMusica(numero) {

    if (!iniciado) {
        iniciar();
    }

    for (const musica of Object.values(musicas)) {

        musica.pause();
        musica.currentTime = 0;

    }

    const musica = musicas[numero];

    if (!musica) {
        return;
    }

    musica.loop = true;

    musica.play()
        .then(() => {

            musicaAtual.textContent = `🎵 Música ${numero}`;

            musicaAtual.classList.add("mostrar");

        })
        .catch((erro) => {

            console.error("Erro ao tocar música:", erro);

            musicaAtual.textContent =
                "⚠️ O navegador bloqueou o áudio. Clique na tela e tente novamente.";

            musicaAtual.classList.add("mostrar");

        });
}

document.addEventListener("keydown", function(event) {

    if (event.key === "1") {
        tocarMusica("1");
    }

    else if (event.key === "2") {
        tocarMusica("2");
    }

    else if (event.key === "3") {
        tocarMusica("3");
    }

    else if (event.key === "Enter") {

        if (!iniciado) {
            iniciar();
        }

    }

});

inicio.addEventListener("click", function() {

    iniciar();

});
