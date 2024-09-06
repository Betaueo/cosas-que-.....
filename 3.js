const loveMessages = [
    "Tu sonrisa ilumina mi día",
    "Amo tu forma de ver el mundo",
    "Tu risa es mi sonido favorito",
    "Me encanta cómo me haces sentir",
    "Amo tu determinación y fuerza",
    "Tu bondad me inspira cada día",
    "Amo cómo me apoyas en todo",
    "Tu inteligencia me asombra",
    "Me encanta cómo me haces reír",
    "Amo cada momento contigo",
    "Tu sentido del humor me hace reír más de lo que debería",
    "Tu sentido del humor me hace reír y me encanta",
    "Amo cómo me enseñas a ver el mundo de una manera distinta",
    "Me gusta que pienses diferente (como de una forma adulta)",
    "Amo tu nariz, es una de las características que me gusta",
    "Me encantan tus labios suaves y delgaditos",
    "Esto no tiene nada que ver pero tú eres mala conmigo a veces",
    "Me gusta cómo haces que cada error sea una historia divertida para contar",
    "Me encanta cómo tus abrazos siempre parecen ser el tamaño perfecto"
];

// Obtener la fecha actual en formato YYYY-MM-DD
const today = new Date().toISOString().split('T')[0];
let currentMessageIndex = localStorage.getItem('currentMessageIndex');
let lastShownDate = localStorage.getItem('lastShownDate');

// Inicializar el índice del mensaje si no existe en localStorage o si es un nuevo día
if (!currentMessageIndex || lastShownDate !== today) {
    currentMessageIndex = Math.floor(Math.random() * loveMessages.length);
    localStorage.setItem('currentMessageIndex', currentMessageIndex);
    localStorage.setItem('lastShownDate', today);

    // Mostrar el video de confeti la primera vez que se muestra un nuevo mensaje
    showConfettiVideo();
}

// Función para mostrar el mensaje actual
function displayCurrentMessage() {
    const messageElement = document.getElementById('love-message');
    messageElement.textContent = loveMessages[currentMessageIndex];
}

// Función para manejar el clic en "Siguiente mensaje"
function nextMessage() {
    alert("Solo puedes ver un mensaje por día. ¡Vuelve mañana para ver el próximo MI AMOR 😘!");
}

// Actualizar el color del tema y guardar la preferencia
function updateThemeColor() {
    const color = document.getElementById('theme-color').value;
    document.querySelector('h2').style.color = color;
    document.querySelector('button').style.backgroundColor = color;
    localStorage.setItem('themeColor', color);
}

// Actualizar el fondo y guardar la preferencia
function updateBackground() {
    const background = document.getElementById('background-selector').value;
    document.body.className = background;
    localStorage.setItem('background', background);
}

// Función para mostrar el video de confeti
function showConfettiVideo() {
    const videoOverlay = document.getElementById('video-overlay');
    videoOverlay.classList.remove('hidden');

    const video = document.getElementById('confetti-video');
    video.play();

    // Ocultar el video después de que termine
    video.onended = () => {
        videoOverlay.classList.add('hidden');
    };
}

// Función para activar el Modo Oscuro basado en la hora
function activateDarkMode() {
    const hour = new Date().getHours();
    if (hour >= 19 || hour < 7) {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }
}

// Función para ajustar el brillo del personaje en el fondo
function adjustCharacterBrightness() {
    const background = document.body.className;
    const widget = document.querySelector('.widget');

    // Ajustar el brillo para personajes específicos en modo oscuro
    if (background === 'snoopycor' || background === 'snoopyflo' || background === 'snoopylov') {
        widget.setAttribute('data-background', background);
    }
}

// Configurar eventos y restaurar preferencias guardadas
document.addEventListener('DOMContentLoaded', () => {
    displayCurrentMessage();
    document.getElementById('next-message').addEventListener('click', nextMessage);
    document.getElementById('theme-color').addEventListener('input', updateThemeColor);
    document.getElementById('background-selector').addEventListener('change', updateBackground);

    // Restaurar preferencias guardadas
    const savedThemeColor = localStorage.getItem('themeColor');
    if (savedThemeColor) {
        document.getElementById('theme-color').value = savedThemeColor;
        document.querySelector('h2').style.color = savedThemeColor;
        document.querySelector('button').style.backgroundColor = savedThemeColor;
    }

    const savedBackground = localStorage.getItem('background');
    if (savedBackground) {
        document.getElementById('background-selector').value = savedBackground;
        document.body.className = savedBackground;
    }

    // Activar el Modo Oscuro y ajustar el brillo del personaje
    activateDarkMode();
    adjustCharacterBrightness();
});
