// --- 1. DATOS DE LOS TESTIMONIOS ---
const defaultComments = [
    { name: "Nelson López", country: "Colombia Medellin", text: "Escalamos ventas de manera sostenida. El ROAS se disparó en semanas." },
    { name: "Andrés Rodriguez", country: "Colombia Bogota", text: "No es solo video, es estrategia pura. Los hooks de venta son otro nivel con esta gran agencia." },
    { name: "Lucía Martinez", country: "Colombia Cali", text: "La implementación de IA y campañas en Meta Ads optimizó todo nuestro proceso." },
    { name: "German Lopez", country: "Colombia Cartagena", text: "Increíble la agencia es lo mejor que le pudo pasar a mi negocio." },
    { name: "Maria Medina", country: "Colombia Barranquilla", text: "Me ayudo a escalar mi negocio la siguiente nivel, realmente le agradezco a MYA." }
];

// --- 2. FUNCIÓN PARA CARGAR COMENTARIOS ---
function loadComments() {
    const list = document.getElementById("comments-list");
    if (!list) return;
    
    const items = [...defaultComments, ...defaultComments];
    list.innerHTML = "";
    
    items.forEach(c => {
        const card = document.createElement("div");
        card.className = "comment-card";
        card.innerHTML = `
            <div class="stars">★★★★★</div>
            <p>"${c.text}"</p>
            <strong>${c.name}</strong><br>
            <span>${c.country.toUpperCase()}</span>
        `;
        list.appendChild(card);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    loadComments();

    // --- 3. REFERENCIAS DEL DOM ---
    const modal = document.getElementById("modal");
    const reviewModal = document.getElementById("review-modal");
    const openBtn = document.getElementById("openModal");
    const closeX = document.getElementById("closeX");
    const sendBtn = document.getElementById("sendComment");
    const mainForm = document.getElementById("main-contact-form");
    const phoneInput = document.getElementById("user_phone");
    
    // Referencias para Menú Hamburguesa
    const toggle = document.getElementById("toggle");
    const menu = document.getElementById("menu");

    // --- 4. LÓGICA MENÚ HAMBURGUESA (NUEVO) ---
    if (toggle && menu) {
        toggle.onclick = () => {
            menu.classList.toggle("active");
        };

        // Cerrar menú automáticamente al hacer clic en un enlace (Inicio, Servicios, etc.)
        const navLinks = menu.querySelectorAll("a");
        navLinks.forEach(link => {
            link.onclick = () => {
                menu.classList.remove("active");
            };
        });
    }

    // --- 5. LÓGICA DEL MODAL DE TESTIMONIOS ---
    if (openBtn && modal) {
        openBtn.onclick = (e) => {
            e.preventDefault();
            modal.style.display = "flex";
        };
    }

    if (closeX) {
        closeX.onclick = () => { modal.style.display = "none"; };
    }

    if (sendBtn) {
        sendBtn.onclick = () => {
            const tName = document.getElementById("name").value.trim();
            const tCountry = document.getElementById("country").value.trim();
            const tComment = document.getElementById("comment").value.trim();

            if (tName && tCountry && tComment) {
                // Aquí podrías integrar el envío a EmailJS si lo deseas
                modal.style.display = "none";
                if (reviewModal) reviewModal.style.display = "flex";

                setTimeout(() => {
                    if (reviewModal) reviewModal.style.display = "none";
                }, 2500);
            } else {
                alert("Por favor, llena todos los campos del testimonio.");
            }
        };
    }

    // --- 6. FORMULARIO DE AUDITORÍA ---
    if (mainForm) {
        mainForm.onsubmit = (e) => {
            e.preventDefault();
            const name = document.getElementById("user_name").value;
            const phone = document.getElementById("user_phone").value;
            const plan = document.getElementById("user_plan").value;
            const project = document.getElementById("user_project").value;
            
            const text = `*M&A CREATORS - NUEVA SOLICITUD*\n\n` +
                         `*Nombre:* ${name}\n` +
                         `*WhatsApp:* ${phone}\n` +
                         `*Plan:* ${plan}\n` +
                         `*Objetivo:* ${project}`;

            window.open(`https://api.whatsapp.com/send?phone=573017726817&text=${encodeURIComponent(text)}`, '_blank');
        };
    }

    // --- 7. VALIDACIÓN DE TELÉFONO ---
    if (phoneInput) {
        phoneInput.addEventListener("input", (e) => {
            e.target.value = e.target.value.replace(/[^0-9+]/g, '');
        });
    }

    // --- 8. ANIMACIONES ---
    const counters = document.querySelectorAll('.counter');
    const textCounters = document.querySelectorAll('.counter-text');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('counter')) {
                    animateNumber(entry.target);
                } else {
                    animateText(entry.target);
                }
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(c => observer.observe(c));
    textCounters.forEach(t => observer.observe(t));

    // Cerrar modal al hacer clic fuera
    window.onclick = (event) => {
        if (event.target == modal) modal.style.display = "none";
    };
});

// Funciones globales de apoyo
function animateNumber(el) {
    const target = +el.getAttribute('data-target');
    let count = 0;
    const speed = 2000;
    const increment = target / (speed / 16);
    const update = () => {
        count += increment;
        if (count < target) {
            el.innerText = Math.ceil(count) + "%";
            requestAnimationFrame(update);
        } else { el.innerText = target + "%"; }
    };
    update();
}

function animateText(el) {
    const targetText = el.getAttribute('data-text');
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let iterations = 0;
    const interval = setInterval(() => {
        el.innerText = targetText.split("").map((l, i) => i < iterations ? targetText[i] : letters[Math.floor(Math.random() * 26)]).join("");
        if(iterations >= targetText.length) clearInterval(interval);
        iterations += 1 / 10;
    }, 50);
}
document.addEventListener("DOMContentLoaded", () => {
    // --- CONTROL DE AUDIO DEL VIDEO ---
    const video = document.getElementById("heroVideo");
    const muteBtn = document.getElementById("muteBtn");
    const muteIcon = document.getElementById("muteIcon");

    if (muteBtn && video) {
        muteBtn.addEventListener("click", () => {
            if (video.muted) {
                video.muted = false;
                muteIcon.innerText = "🔊"; // Icono de sonido activo
            } else {
                video.muted = true;
                muteIcon.innerText = "🔇"; // Icono de silencio
            }
        });
    }

    // ... Resto de tus funciones anteriores (loadComments, modal, etc.)
});
// --- LÓGICA DE TIEMPO REAL PARA EL PIXEL ---
document.addEventListener("DOMContentLoaded", () => {
    const eventCounter = document.getElementById("real-events");
    const statusText = document.getElementById("pixel-status");
    const sessionTimer = document.getElementById("session-time");

    // 1. Verificar si el script de Facebook cargó correctamente
    if (typeof fbq === 'function') {
        statusText.innerText = "Activo y Transmitiendo";
        statusText.style.color = "#00ff00";
        // Contamos el primer evento (PageView) que ya se disparó
        eventCounter.innerText = "1"; 
    } else {
        statusText.innerText = "Esperando Conexión...";
        statusText.style.color = "#ffcc00";
    }

    // 2. Contador de tiempo de sesión (Tiempo real)
    let seconds = 0;
    setInterval(() => {
        seconds++;
        let mins = Math.floor(seconds / 60);
        let secs = seconds % 60;
        sessionTimer.innerText = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }, 1000);

    // 3. Detectar clics en botones como "Eventos de Conversión" reales
    const interactiveButtons = document.querySelectorAll('.btn-strategy, .btn-glow, .btn-secondary');
    interactiveButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            let currentEvents = parseInt(eventCounter.innerText);
            eventCounter.innerText = currentEvents + 1;
            
            // Efecto visual de destello cuando se detecta un evento
            eventCounter.style.color = "#fff";
            setTimeout(() => { eventCounter.style.color = "var(--accent-cyan)"; }, 2000);
        });
    });
});
