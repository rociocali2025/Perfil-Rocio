// Efectos de animación y funcionalidades interactivas
document.addEventListener('DOMContentLoaded', function() {
    // Animación de las cards al hacer scroll
    const cards = document.querySelectorAll('.card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    cards.forEach(card => {
        card.style.opacity = 0;
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });

    // Funcionalidad de las pestañas
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.getAttribute('data-tab');
            
            // Remover clase active de todos los botones y contenidos
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Agregar clase active al botón y contenido seleccionado
            button.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // Efecto de escritura para el título
    const title = document.querySelector('.profile-title');
    const originalText = title.textContent;
    title.textContent = '';
    
    let i = 0;
    const typeWriter = () => {
        if (i < originalText.length) {
            title.textContent += originalText.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        }
    };
    
    setTimeout(typeWriter, 500);

    // Cambio de color del header al hacer scroll
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.background = 'linear-gradient(to right, var(--primary), var(--dark))';
        } else {
            header.style.background = 'linear-gradient(to right, var(--primary), var(--secondary))';
        }
    });

    // Tooltips para los iconos de contacto
    const contactIcons = document.querySelectorAll('.contact-info i');
    contactIcons.forEach(icon => {
        icon.addEventListener('mouseover', function() {
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = this.nextSibling.textContent.trim();
            document.body.appendChild(tooltip);
            
            const rect = this.getBoundingClientRect();
            tooltip.style.top = `${rect.top - 35}px`;
            tooltip.style.left = `${rect.left + rect.width/2 - tooltip.offsetWidth/2}px`;
            
            this.addEventListener('mouseout', () => {
                document.body.removeChild(tooltip);
            });
        });
    });

    // Animación para los elementos de la línea de tiempo
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        item.style.opacity = 0;
        item.style.transform = 'translateX(-20px)';
        item.style.transition = `opacity 0.5s ease ${index * 0.2}s, transform 0.5s ease ${index * 0.2}s`;
        
        setTimeout(() => {
            item.style.opacity = 1;
            item.style.transform = 'translateX(0)';
        }, 500 + index * 200);
    });

    // Efecto de parpadeo para llamar la atención al cargar
    const tagline = document.querySelector('.tagline');
    tagline.style.animation = 'pulse 2s infinite';
    
    // Agregar estilos para las animaciones
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
        
        .tooltip {
            position: fixed;
            background: var(--dark);
            color: white;
            padding: 5px 10px;
            border-radius: 5px;
            font-size: 0.8rem;
            z-index: 1000;
            pointer-events: none;
        }
    `;
    document.head.appendChild(style);
});