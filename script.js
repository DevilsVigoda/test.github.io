document.addEventListener('DOMContentLoaded', function () {
    // Matrix effect
    createMatrixEffect();
    // Tab navigation
    setupTabs();
    // Animate skill bars
    animateSkillBars();
    // Contact form submission
    setupContactForm();
    // Scroll animations
    setupScrollAnimations();

    // Reinitialize matrix on window resize
    window.addEventListener('resize', function () {
        const matrix = document.getElementById('matrix');
        matrix.innerHTML = '';
        createMatrixEffect();
    });
});

function createMatrixEffect() {
    const matrix = document.getElementById('matrix');
    const width = window.innerWidth;
    const height = window.innerHeight;
    const fontSize = 14;
    const columns = Math.floor(width / fontSize);
    const chars = "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンabcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#$%&()*+-/<=>?@[\\]^_{|}~";

    // Create columns
    for (let i = 0; i < columns; i++) {
        const line = document.createElement('div');
        line.className = 'matrix-line';
        line.style.left = (i * fontSize) + 'px';

        // Even lines go up, odd lines go down
        if (i % 2 === 0) {
            line.style.top = '-' + Math.floor(Math.random() * 100) + 'px';
            line.style.animation = `fallUp ${(Math.random() * 10 + 5)}s linear infinite`;
        } else {
            line.style.bottom = '-' + Math.floor(Math.random() * 100) + 'px';
            line.style.animation = `fallDown ${(Math.random() * 10 + 5)}s linear infinite`;
        }

        // Add random characters
        const charCount = Math.floor(height / fontSize) + 1;
        for (let j = 0; j < charCount; j++) {
            const char = document.createElement('span');
            char.textContent = chars[Math.floor(Math.random() * chars.length)];
            char.style.opacity = Math.random().toString();
            line.appendChild(char);
        }

        matrix.appendChild(line);
    }
}

// Keyframes for matrix animation
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = `
    @keyframes fallUp {
        from { transform: translateY(0); opacity: 0.5; }
        to { transform: translateY(-100%); opacity: 0; }
    }
    @keyframes fallDown {
        from { transform: translateY(0); opacity: 0.5; }
        to { transform: translateY(100%); opacity: 0; }
    }
`;
document.head.appendChild(styleSheet);

function setupTabs() {
    const navLinks = document.querySelectorAll('.nav-link');
    const tabContents = document.querySelectorAll('.tab-content');

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            // Remove active class from all links and contents
            navLinks.forEach(l => l.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            // Add active class to current link and corresponding content
            this.classList.add('active');
            const targetId = this.getAttribute('href').substring(1);
            document.getElementById(targetId).classList.add('active');
        });
    });
}

function animateSkillBars() {
    const skillLevels = document.querySelectorAll('.skill-level');

    skillLevels.forEach(level => {
        const levelWidth = level.getAttribute('data-level');
        // Добавляем внутренний span, который будет отображать заполнение
        const fill = document.createElement('span');
        fill.className = 'skill-fill';
        fill.style.width = '0%';
        fill.style.height = '100%';
        fill.style.backgroundColor = 'var(--primary-color)';
        fill.style.position = 'absolute';
        fill.style.top = '0';
        fill.style.left = '0';
        fill.style.borderRadius = '4px';
        fill.style.transition = 'width 1.5s ease';
        level.appendChild(fill);

        // Анимируем через таймер, чтобы триггернуть рендеринг
        setTimeout(() => {
            fill.style.width = levelWidth + '%';
        }, 100);
    });
}

function setupContactForm() {
    const contactForm = document.getElementById('contactForm');

    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();

        // Simple validation
        if (!name || !email || !subject || !message) {
            alert('Пожалуйста, заполните все поля.');
            return;
        }

        // Email validation regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Пожалуйста, введите корректный email адрес.');
            return;
        }

        // Simulate form submission
        console.log('Form submitted with:', { name, email, subject, message });
        alert('Спасибо за ваше сообщение! Оно успешно отправлено.');
        contactForm.reset();
    });
}

function setupScrollAnimations() {
    const scrollElements = document.querySelectorAll('[data-scroll]');

    const elementInView = (el, offset = 0) => {
        const elementTop = el.getBoundingClientRect().top;
        return (
            elementTop <= (window.innerHeight || document.documentElement.clientHeight) - offset
        );
    };

    const displayScrollElement = (element) => {
        element.classList.add('scrolled');
    };

    const handleScrollAnimation = () => {
        scrollElements.forEach(el => {
            if (elementInView(el, 50)) {
                displayScrollElement(el);
            }
        });
    };

    window.addEventListener('scroll', () => {
        handleScrollAnimation();
    });

    // Initial check
    handleScrollAnimation();
}


document.querySelector('.hero-buttons .btn[href="#portfolio"]').addEventListener('click', function(e) {
    e.preventDefault();

    const targetId = this.getAttribute('href').substring(1);

    // Удалить active у всех ссылок и контента
    document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));

    // Найти и активировать нужную ссылку и контент
    const correspondingLink = document.querySelector(`.nav-link[data-tab="${targetId}"]`);
    if (correspondingLink) correspondingLink.classList.add('active');

    const tabContent = document.getElementById(targetId);
    if (tabContent) tabContent.classList.add('active');

    // Прокрутить к целевой секции
    tabContent.scrollIntoView({ behavior: 'smooth' });
});