const slide = document.getElementById("slide");
const startScreen = document.getElementById("startScreen");
const musicInfo = document.getElementById("musicInfo");

const fotos = [];

for (let i = 1; i <= 16; i++) {
    fotos.push(`foto${i}.jpg`);
}

const musicas = {
    "1": document.getElementById("audio1"),
    "2": document.getElementById("audio2"),
    "3": document.getElementById("audio3")
};

let fotoAtual = 0;
let iniciado = false;

function iniciar() {

    if (iniciado) return;

    iniciado = true;

    startScreen.style.display = "none";

    setInterval(() => {
        proximaFoto();
    }, 10000);

    document.documentElement.requestFullscreen?.().catch(() => {});
}

function proximaFoto() {

    fotoAtual++;

    if (fotoAtual >= fotos.length) {
        fotoAtual = 0;
    }

    slide.style.opacity = "0";

    setTimeout(() => {

        slide.src = fotos[fotoAtual];

        slide.onload = () => {
            slide.style.opacity = "1";
        };

    }, 800);
}

function tocarMusica(numero) {

    if (!iniciado) {
        iniciar();
    }

    Object.values(musicas).forEach(audio => {

        audio.pause();
        audio.currentTime = 0;

    });

    const musica = musicas[numero];

    if (!musica) return;

    musica.play()
        .then(() => {

            musicInfo.textContent =
                `🎵 Música ${numero}`;

            musicInfo.classList.add("show");

            setTimeout(() => {
                musicInfo.classList.remove("show");
            }, 2500);

        })
        .catch(() => {

            musicInfo.textContent =
                `⚠️ Não foi possível tocar a música ${numero}`;

            musicInfo.classList.add("show");

        });
}

document.addEventListener("keydown", (event) => {

    if (event.key === "1" || event.code === "Numpad1") {
        tocarMusica("1");
    }

    if (event.key === "2" || event.code === "Numpad2") {
        tocarMusica("2");
    }

    if (event.key === "3" || event.code === "Numpad3") {
        tocarMusica("3");
    }

    if (event.key === "Enter" && !iniciado) {
        iniciar();
    }

});

startScreen.addEventListener("click", () => {
    iniciar();
});
