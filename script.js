// --- FECHA DE INICIO DE LA RELACIÓN ---
// 25 de mayo de 2026 - 8:00 PM (20:00 hrs)
const fechaInicio = new Date(2026, 4, 25, 20, 0); 

function cambiarPantalla(pantallaId) {
    document.querySelectorAll('.page').forEach(p => p.classList.add('hidden'));
    document.getElementById(pantallaId).classList.remove('hidden');
}

// Contador continuo
function actualizarContador() {
    const ahora = new Date();
    const dif = ahora - fechaInicio;

    const dias = Math.floor(dif / (1000 * 60 * 60 * 24));
    const horas = Math.floor((dif / (1000 * 60 * 60)) % 24);
    const minutos = Math.floor((dif / 1000 / 60) % 60);

    const elem = document.getElementById('time-counter');
    if (elem) {
        elem.innerText = `${dias} días, ${horas} horas, ${minutos} mins`;
    }
}
setInterval(actualizarContador, 1000);

// Flujo de navegación
document.getElementById('btnComenzar').addEventListener('click', () => {
    document.getElementById('top-bar').classList.remove('hidden');
    cambiarPantalla('page-2');
});

document.getElementById('btn-to-letter').addEventListener('click', () => {
    cambiarPantalla('page-3');
    iniciarEscritura();
});

// Texto efecto Máquina de Escribir
const lineasTexto = [
    "Hola mi amor...",
    "Hoy cumple años la persona más especial de mi vida...",
    "Gracias por estar a mi lado y hacerme tan feliz.",
    "Espero que disfrutemos mucho este día juntas. ❤️"
];

function iniciarEscritura() {
    const contenedor = document.getElementById('typewriter-text');
    contenedor.innerHTML = "";
    let iLinea = 0;

    function escribirLinea() {
        if (iLinea < lineasTexto.length) {
            let p = document.createElement('p');
            p.style.marginBottom = "10px";
            contenedor.appendChild(p);
            let iChar = 0;
            let textoActual = lineasTexto[iLinea];

            let timer = setInterval(() => {
                if (iChar < textoActual.length) {
                    p.innerHTML += textoActual.charAt(iChar);
                    iChar++;
                } else {
                    clearInterval(timer);
                    iLinea++;
                    setTimeout(escribirLinea, 500);
                }
            }, 45);
        } else {
            document.getElementById('btn-to-timeline').classList.remove('hidden');
        }
    }
    escribirLinea();
}

document.getElementById('btn-to-timeline').addEventListener('click', () => cambiarPantalla('page-4'));
document.getElementById('btn-to-console').addEventListener('click', () => cambiarPantalla('page-5'));

// Consola de comandos con respuestas animadas y emojis
const inputConsola = document.getElementById('console-input');
const outputConsola = document.getElementById('console-output');

inputConsola.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const cmd = inputConsola.value.trim().toLowerCase();
        inputConsola.value = '';
        let res = '';

        if (cmd === 'hug') {
            res = '¡Abrazo gigante enviado! 🫂🤗💖';
            lanzarEmojisConsola(['🫂', '🤗', '💖', '🫂']);
        } else if (cmd === 'kiss' || cmd === 'kiis') {
            res = '¡Muchos besitos recibidos! 💋😘❤️';
            lanzarEmojisConsola(['💋', '😘', '😚', '💋']);
        } else if (cmd === 'future') {
            res = 'Construyendo un futuro juntas... 100% ✨💍';
            lanzarEmojisConsola(['✨', '💍', '🌟', '💖']);
        } else if (cmd === 'love') {
            res = 'Te amo con todo mi corazón. 💖';
            lanzarEmojisConsola(['💖', '💗', '💓', '❤️']);
        } else {
            res = `Comando "${cmd}" no reconocido. Prueba con: hug, kiss, love, future`;
        }

        outputConsola.innerHTML += `<br>> ${cmd}<br><span style="color: #38bdf8;">${res}</span>`;
        outputConsola.scrollTop = outputConsola.scrollHeight; // Auto-scroll hacia abajo
    }
});

// Función para animar emojis flotantes
function lanzarEmojisConsola(emojis) {
    for (let i = 0; i < 15; i++) {
        const emojiEl = document.createElement('div');
        emojiEl.innerText = emojis[Math.floor(Math.random() * emojis.length)];
        emojiEl.style.position = 'fixed';
        emojiEl.style.left = Math.random() * 80 + 10 + 'vw';
        emojiEl.style.bottom = '10px';
        emojiEl.style.fontSize = Math.random() * 20 + 24 + 'px';
        emojiEl.style.zIndex = '1000';
        emojiEl.style.pointerEvents = 'none';
        emojiEl.style.transition = 'transform 2s ease-out, opacity 2s ease-out';
        
        document.body.appendChild(emojiEl);

        setTimeout(() => {
            emojiEl.style.transform = `translateY(-${Math.random() * 300 + 200}px) rotate(${Math.random() * 90 - 45}deg)`;
            emojiEl.style.opacity = '0';
        }, 50);

        setTimeout(() => emojiEl.remove(), 2050);
    }
}

document.getElementById('btn-to-secret').addEventListener('click', () => cambiarPantalla('page-6'));

// Botón secreto y animación
document.getElementById('btn-secret').addEventListener('click', () => {
    document.getElementById('secret-response').classList.remove('hidden');
    lluviaCorazones();
});

document.getElementById('btn-to-final').addEventListener('click', () => {
    cambiarPantalla('page-final');
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
});

// Lluvia de corazones
function lluviaCorazones() {
    const canvas = document.getElementById('hearts-canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const hearts = Array.from({ length: 25 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * -canvas.height,
        size: Math.random() * 20 + 12,
        speed: Math.random() * 3 + 2
    }));

    function animar() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#ff4d88';
        hearts.forEach(h => {
            ctx.font = `${h.size}px serif`;
            ctx.fillText('❤️', h.x, h.y);
            h.y += h.speed;
            if (h.y > canvas.height) h.y = -20;
        });
        requestAnimationFrame(animar);
    }
    animar();
}