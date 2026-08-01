// Cambiar entre pantallas una por una
function nextPage(pageNum) {
    document.querySelectorAll('.card').forEach(card => {
        card.classList.remove('active');
        card.style.display = 'none';
    });
    
    const targetCard = document.getElementById('page-' + pageNum);
    if (targetCard) {
        targetCard.classList.add('active');
        targetCard.style.display = 'block';
    }
}

// Contador de tiempo (puedes ajustar la fecha de inicio aquí)
const startDate = new Date('2024-01-01T00:00:00'); // Cambia esta fecha por la de ustedes si gustas

function updateTimer() {
    const now = new Date();
    const diff = now - startDate;

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

// Consola interactiva de comandos
document.addEventListener('DOMContentLoaded', () => {
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
                } else if (command === 'kiss') {
                    response = '💋 ¡Muchos besos para ti!';
                } else if (command === 'future') {
                    response = '🔮 Un futuro lleno de momentos bonitos juntas.';
                } else if (command === 'love') {
                    response = '❤️ Te amo más de lo que las palabras pueden decir.';
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
