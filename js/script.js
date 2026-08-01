// Asegurar que al recargar la página SIEMPRE empiece limpia en la Pantalla 1
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

function resetToStart() {
    document.querySelectorAll('.card').forEach(card => {
        card.classList.remove('active');
        card.style.display = 'none';
    });
    const firstPage = document.getElementById('page-1');
    if (firstPage) {
        firstPage.classList.add('active');
        firstPage.style.display = 'block';
    }
}

// Lluvia de Emojis Flotantes en Cascada
function createFloatingEmoji(emojiSymbol) {
    const emojiContainer = document.getElementById('emoji-container');
    if (!emojiContainer) return;

    for (let i = 0; i < 20; i++) {
        const emoji = document.createElement('div');
        emoji.classList.add('floating-emoji');
        emoji.innerText = emojiSymbol;
        
        // Posicionamiento horizontal aleatorio de 5vw a 95vw
        const randomLeft = Math.floor(Math.random() * 90) + 5;
        emoji.style.left = randomLeft + 'vw';
        
        // Tiempos y tamaños desfasados para efecto cascada natural
        const duration = (Math.random() * 2 + 2.5); // entre 2.5s y 4.5s
        const delay = Math.random() * 0.8;
        const size = (Math.random() * 1.5 + 1.2);

        emoji.style.animationDuration = duration + 's';
        emoji.style.animationDelay = delay + 's';
        emoji.style.fontSize = size + 'rem';
        
        emojiContainer.appendChild(emoji);

        setTimeout(() => {
            emoji.remove();
        }, (duration + delay) * 1000);
    }
}

// Cambiar de pantalla limpiamente Y LANZAR CASCADA DE CORAZONES
function nextPage(pageNum, emojiToUse = '❤️') {
    document.querySelectorAll('.card').forEach(card => {
        card.classList.remove('active');
        card.style.display = 'none';
    });
    
    const targetCard = document.getElementById('page-' + pageNum);
    if (targetCard) {
        targetCard.classList.add('active');
        targetCard.style.display = 'block';
    }

    createFloatingEmoji(emojiToUse);
}

// Mensajes para días difíciles
const cheerMessages = [
    "Recuerda que los malos días también pasan, pero lo increíble que eres dura para siempre. ❤️",
    "Inhala profundo... exhala. Todo va a estar bien, mi lunita. 🌙✨",
    "Eres más fuerte de lo que te imaginas y más capaz de lo que crees. ¡Tú puedes con todo! 💪💖",
    "No olvides sonreír, iluminas todo a tu alrededor cuando lo haces. 😊✨",
    "Cierra los ojos un segundo e imagíname dándote el abrazo más grande del mundo. 🤗💖",
    "No tienes que poder con todo hoy. Respira y ve a tu ritmo. Te amo. ❤️"
];

function getCheerMessage() {
    const box = document.getElementById('cheer-box');
    const randomMsg = cheerMessages[Math.floor(Math.random() * cheerMessages.length)];
    if (box) {
        box.innerText = `"${randomMsg}"`;
    }
    createFloatingEmoji('💖');
}

// Fecha exacta: 25 de mayo de 2026 a las 8:00 PM (20:00 hrs)
const startDate = new Date('2026-05-25T20:00:00'); 

function updateTimer() {
    const now = new Date();
    const diff = now - startDate;

    if (diff < 0) {
        const timerElement = document.getElementById('timer');
        if (timerElement) {
            timerElement.innerText = "¡Muy pronto!";
        }
        return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / 1000 / 60) % 60);

    const timerElement = document.getElementById('timer');
    if (timerElement) {
        timerElement.innerText = `${days} días, ${hours} horas, ${minutes} mins`;
    }
}

setInterval(updateTimer, 1000);
updateTimer();

// Botón secreto "No presiones aquí"
function secretButton() {
    alert("¡Te dije que no presionaras! 😜 Pero ya que estás aquí... ¡Te amo muchísimo! ❤️");
    createFloatingEmoji('💖');
}

// Consola interactiva
document.addEventListener('DOMContentLoaded', () => {
    resetToStart();

    const consoleInput = document.getElementById('console-input');
    const consoleOutput = document.getElementById('console-output');

    if (consoleInput) {
        consoleInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const command = consoleInput.value.trim().toLowerCase();
                consoleInput.value = '';

                let response = '';
                if (command === 'hug') {
                    response = '🤗 ¡Te mando un abrazo enorme y apretado!';
                    createFloatingEmoji('🤗');
                } else if (command === 'kiss') {
                    response = '💋 ¡Muchos besos para ti!';
                    createFloatingEmoji('💋');
                } else if (command === 'future') {
                    response = '🔮 Un futuro lleno de momentos bonitos juntas.';
                    createFloatingEmoji('✨');
                } else if (command === 'love') {
                    response = '❤️ Te amo más de lo que las palabras pueden decir.';
                    createFloatingEmoji('❤️');
                } else {
                    response = `❓ Comando desconocido: "${command}". Prueba con: hug, kiss, future, love.`;
                }

                const p = document.createElement('p');
                p.innerHTML = `<strong>> ${command}</strong><br>${response}`;
                consoleOutput.appendChild(p);
                consoleOutput.scrollTop = consoleOutput.scrollHeight;
            }
        });
    }
});
