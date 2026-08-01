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

// Lluvia de Emojis Flotantes (corazones, besos, etc.)
function createFloatingEmoji(emojiSymbol) {
    const emojiContainer = document.getElementById('emoji-container');
    if (!emojiContainer) return;

    for (let i = 0; i < 15; i++) {
        const emoji = document.createElement('div');
        emoji.classList.add('floating-emoji');
        emoji.innerText = emojiSymbol;
        
        emoji.style.left = Math.random() * 100 + 'vw';
        emoji.style.animationDuration = (Math.random() * 2 + 2) + 's';
        emoji.style.fontSize = (Math.random() * 1.5 + 1.5) + 'rem';
        
        emojiContainer.appendChild(emoji);

        setTimeout(() => {
            emoji.remove();
        }, 4000);
    }
}

// Cambiar de pantalla limpiamente Y LANZAR CORAZONES al hacer click
function nextPage(pageNum, emojiToUse = '❤️') {
    // 1. Ocultar todas las tarjetas
    document.querySelectorAll('.card').forEach(card => {
        card.classList.remove('active');
        card.style.display = 'none';
    });
    
    // 2. Mostrar solo la seleccionada
    const targetCard = document.getElementById('page-' + pageNum);
    if (targetCard) {
        targetCard.classList.add('active');
        targetCard.style.display = 'block';
    }

    // 3. ¡Lluvia de corazones al hacer click!
    createFloatingEmoji(emojiToUse);
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

// Consola interactiva con respuestas y animación de emojis
document.addEventListener('DOMContentLoaded', () => {
    resetToStart(); // Reiniciar a la pantalla 1 siempre al recargar

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
