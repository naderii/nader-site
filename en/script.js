// ===== Matrix Rain Effect =====
const canvas = document.createElement('canvas');
canvas.id = 'matrix-canvas';
document.body.prepend(canvas);

const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    columns = Math.floor(canvas.width / fontSize);
    drops.length = 0;

    for (let i = 0; i < columns; i++) {
        drops[i] = Math.random() * -100;
    }
}


const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const charArray = chars.split('');
const fontSize = 14;
let columns = 0;
const drops = [];

function drawMatrix() {
    ctx.fillStyle = 'rgba(13, 17, 23, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#00ff41';
    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < drops.length; i++) {
        const text = charArray[Math.floor(Math.random() * charArray.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}

setInterval(drawMatrix, 50);

// ===== Loading Screen =====
const loadingScreen = document.createElement('div');
loadingScreen.id = 'loading-screen';
loadingScreen.innerHTML = '<div id="loading-text"></div>';
document.body.prepend(loadingScreen);

const loadingMessages = [
    '[ OK ] Starting system...',
    '[ OK ] Loading kernel modules...',
    '[ OK ] Mounting /dev/skills...',
    '[ OK ] Initializing infrastructure services...',
    '[ OK ] Loading featured-projects.service...',
    '[ OK ] Starting network-manager...',
    '[ OK ] Loading nader-resume.service...',
    '[ OK ] System ready!'
];


const loadingText = document.getElementById('loading-text');
let messageIndex = 0;

function showLoadingMessage() {
    if (messageIndex < loadingMessages.length) {
        const line = document.createElement('div');
        line.className = 'loading-line';
        line.textContent = loadingMessages[messageIndex];
        line.style.animationDelay = `${messageIndex * 0.3}s`;
        loadingText.appendChild(line);
        messageIndex++;
        setTimeout(showLoadingMessage, 300);
    } else {
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
            // Start typing effects after loading
            setTimeout(initTypingEffects, 500);
        }, 800);
    }
}

showLoadingMessage();

// ===== Typing Effect System =====
class TypeWriter {
    constructor(element, text, speed = 50, callback = null) {
        this.element = element;
        this.text = text;
        this.speed = speed;
        this.callback = callback;
        this.index = 0;
        this.cursor = document.createElement('span');
        this.cursor.className = 'typing-cursor';
        this.cursor.textContent = '█';
    }

    start() {
        this.element.textContent = '';
        this.element.appendChild(this.cursor);
        this.type();
    }

    type() {
        if (this.index < this.text.length) {
            this.cursor.before(this.text.charAt(this.index));
            this.index++;
            setTimeout(() => this.type(), this.speed);
        } else {
            // Remove cursor after typing is done
            setTimeout(() => {
                this.cursor.remove();
                if (this.callback) this.callback();
            }, 500);
        }
    }
}

// ===== Sequential Content Reveal =====
function revealContent(container, delay = 100) {
    const children = container.children;
    Array.from(children).forEach((child, index) => {
        child.style.opacity = '0';
        child.style.transform = 'translateY(10px)';
        setTimeout(() => {
            child.style.transition = 'all 0.4s ease';
            child.style.opacity = '1';
            child.style.transform = 'translateY(0)';
        }, delay * index);
    });
}

// ===== Initialize Typing Effects =====
function initTypingEffects() {
    // Hero Section - Main Title
    const heroTitle = document.querySelector('.hero h1');
    const heroTitleText = heroTitle.textContent;
    const heroTitleWriter = new TypeWriter(heroTitle, heroTitleText, 80, () => {
        // After title, type the job title
        const heroJobTitle = document.querySelector('.hero .title');
        const jobTitleText = heroJobTitle.textContent;
        const jobTitleWriter = new TypeWriter(heroJobTitle, jobTitleText, 40, () => {
            // After job title, reveal summary with terminal effect
            const summary = document.querySelector('.hero .summary');
            summary.style.opacity = '0';
            setTimeout(() => {
                summary.style.transition = 'opacity 0.5s ease';
                summary.style.opacity = '1';
                typeTextInElement(summary, summary.textContent, 15);
            }, 200);
        });
        jobTitleWriter.start();
    });
    heroTitle.style.visibility = 'visible';
    heroTitleWriter.start();

    // Section Headers with typing effect on scroll
    observeSectionHeaders();
}

// ===== Type text character by character =====
function typeTextInElement(element, text, speed = 30) {
    const originalContent = text;
    element.textContent = '';

    const cursor = document.createElement('span');
    cursor.className = 'typing-cursor';
    cursor.textContent = '█';
    element.appendChild(cursor);

    let index = 0;

    function typeChar() {
        if (index < originalContent.length) {
            cursor.before(originalContent.charAt(index));
            index++;
            setTimeout(typeChar, speed);
        } else {
            cursor.classList.add('blink');
            setTimeout(() => cursor.remove(), 1000);
        }
    }

    typeChar();
}

// ===== Observe Section Headers for Typing Effect =====
function observeSectionHeaders() {
    const headers = document.querySelectorAll('section h2');

    const headerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.dataset.typed) {
                entry.target.dataset.typed = 'true';
                const text = entry.target.textContent;
                const writer = new TypeWriter(entry.target, text, 60, () => {
                    // After header typed, reveal section content
                    const container = entry.target.closest('.container');
                    if (container) {
                        const contentElements = container.querySelectorAll(':scope > *:not(h2)');
                        contentElements.forEach((el, index) => {
                            el.style.opacity = '0';
                            el.style.transform = 'translateX(-20px)';
                            setTimeout(() => {
                                el.style.transition = 'all 0.5s ease';
                                el.style.opacity = '1';
                                el.style.transform = 'translateX(0)';
                            }, 200 + (index * 150));
                        });
                    }
                });
                writer.start();
            }
        });
    }, { threshold: 0.3 });

    headers.forEach(header => {
        header.style.visibility = 'visible';
        headerObserver.observe(header);
    });
}

// ===== Terminal Input =====
const terminalInput = document.createElement('div');
terminalInput.id = 'terminal-input';
terminalInput.innerHTML = `
    <span>nader@resume:~$</span>
    <input type="text" placeholder="type help..." id="cmd-input">
`;
document.body.appendChild(terminalInput);

const cmdInput = document.getElementById('cmd-input');

const commands = {
    'help': () => showNotification('Commands: skills, projects, contact, about, clear, top, whoami, uname, neofetch, date, print', 12000),
    'skills': () => {
        document.querySelector('.skills').scrollIntoView({ behavior: 'smooth' });
        showNotification('Displaying skills...');
    },
    'projects': () => {
        document.querySelector('.projects').scrollIntoView({ behavior: 'smooth' });
        showNotification('Displaying featured projects...');
    },
    'contact': () => {
        document.querySelector('footer').scrollIntoView({ behavior: 'smooth' });
        showNotification('Displaying contact info...');
    },
    'about': () => {
        document.querySelector('.profile').scrollIntoView({ behavior: 'smooth' });
        showNotification('Displaying profile...');
    },
    'clear': () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        showNotification('Screen cleared!');
    },
    'top': () => {
        showNotification('CPU: 2% | MEM: 512MB | UPTIME: 15+ years | SERVICES: VMware, GitLab, Zabbix, VoIP');
    },
    'whoami': () => {
        showNotification('Nader Naderi - Senior Infrastructure, Network & Information Security Engineer');
    },
    'uname': () => {
        showNotification('Linux nader-resume 6.1.0-infra #1 SMP');
    },
    'neofetch': () => {
        showNotification('OS: Linux Resume | Role: Senior Infrastructure Engineer | Kernel: Skills v15.0');
    },
    'date': () => {
        showNotification(new Date().toLocaleString('en-US'));
    },
    'sudo': () => {
        showNotification('Sorry, you do not have root access!');
    },
    'print': () => {
        showNotification('Preparing page for printing...');
        setTimeout(() => {
            window.print();
        }, 500);
    }
};


cmdInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const cmd = cmdInput.value.toLowerCase().trim();
        if (commands[cmd]) {
            commands[cmd]();
        } else if (cmd) {
            showNotification(`Command '${cmd}' not found. Try 'help'.`);
        }
        cmdInput.value = '';
    }
});

// ===== Notification System =====
function showNotification(message, duration = 5000) {
    const existing = document.querySelector('.terminal-notification');
    if (existing) existing.remove();

    const notification = document.createElement('div');
    notification.className = 'terminal-notification';
    notification.innerHTML = `<span class="notif-prompt">root@system:~#</span> ${message}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: #161b22;
        border: 1px solid #00ff41;
        color: #00ff41;
        padding: 15px 25px;
        border-radius: 8px;
        font-family: 'Fira Code', monospace;
        font-size: 0.9rem;
        box-shadow: 0 0 20px rgba(0, 255, 65, 0.3);
        z-index: 10001;
        animation: slideDown 0.5s ease;
        max-width: 90%;
    `;
    document.body.appendChild(notification);

    notification.innerHTML = '<span class="notif-prompt" style="color: #58a6ff;">root@system:~#</span> ';
    const cursor = document.createElement('span');
    cursor.className = 'typing-cursor';
    cursor.textContent = '█';
    notification.appendChild(cursor);

    let i = 0;
    function typeNotif() {
        if (i < message.length) {
            cursor.before(message.charAt(i));
            i++;
            setTimeout(typeNotif, 30);
        } else {
            cursor.remove();
        }
    }
    typeNotif();

    setTimeout(() => {
        notification.style.animation = 'slideUp 0.3s ease forwards';
        setTimeout(() => notification.remove(), 300);
    }, duration);
}

// Add animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes slideDown {
        from { transform: translateX(-50%) translateY(-20px); opacity: 0; }
        to { transform: translateX(-50%) translateY(0); opacity: 1; }
    }
    @keyframes slideUp {
        from { transform: translateX(-50%) translateY(0); opacity: 1; }
        to { transform: translateX(-50%) translateY(-20px); opacity: 0; }
    }
    .typing-cursor {
        color: #00ff41;
        animation: cursorBlink 0.7s infinite;
    }
    .typing-cursor.blink {
        animation: cursorBlink 0.7s infinite;
    }
    @keyframes cursorBlink {
        0%, 50% { opacity: 1; }
        51%, 100% { opacity: 0; }
    }
    .hero h1, section h2 {
        visibility: hidden;
    }
`;
document.head.appendChild(style);

// ===== Glitch Effect on Hover =====
document.querySelectorAll('h2').forEach(h2 => {
    h2.addEventListener('mouseenter', () => {
        h2.style.animation = 'glitch 0.3s ease';
        setTimeout(() => h2.style.animation = '', 300);
    });
});

const glitchStyle = document.createElement('style');
glitchStyle.textContent = `
    @keyframes glitch {
        0% { transform: translate(0); text-shadow: 2px 0 #ff0000, -2px 0 #00ff00; }
        20% { transform: translate(-2px, 2px); text-shadow: -2px 0 #ff0000, 2px 0 #00ff00; }
        40% { transform: translate(-2px, -2px); text-shadow: 2px 0 #0000ff, -2px 0 #ff00ff; }
        60% { transform: translate(2px, 2px); text-shadow: -2px 0 #00ffff, 2px 0 #ffff00; }
        80% { transform: translate(2px, -2px); text-shadow: 2px 0 #ff0000, -2px 0 #00ff00; }
        100% { transform: translate(0); text-shadow: none; }
    }
`;
document.head.appendChild(glitchStyle);

// ===== Scroll Reveal Animation =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'all 0.6s ease';
    observer.observe(section);
});

// ===== Easter Egg: Konami Code =====
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);

    if (konamiCode.join(',') === konamiSequence.join(',')) {
        document.body.style.animation = 'hueRotate 2s linear';
        showNotification('Secret code activated! sudo rm -rf /boring');
        setTimeout(() => document.body.style.animation = '', 2000);
    }
});

const hueStyle = document.createElement('style');
hueStyle.textContent = `
    @keyframes hueRotate {
        from { filter: hue-rotate(0deg); }
        to { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(hueStyle);

// ===== Skills Click Effect =====
document.querySelectorAll('.skill').forEach(skill => {
    skill.addEventListener('click', () => {
        const skillName = skill.querySelector('p').textContent;
        skill.style.transform = 'scale(0.95)';
        setTimeout(() => skill.style.transform = '', 150);
        showNotification(`Loading skill: ${skillName}...`);
    });
});

// ===== Cert Items Click =====
document.querySelectorAll('.cert-item').forEach(cert => {
    cert.addEventListener('click', () => {
        const certName = cert.querySelector('span').textContent;
        cert.style.transform = 'scale(0.95)';
        setTimeout(() => cert.style.transform = '', 150);
        showNotification(`Certificate verified: ${certName}`);
    });
});

// ===== Timeline Items Typing Effect =====
function initTimelineTyping() {
    const timelineItems = document.querySelectorAll('.timeline-item');

    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.dataset.animated) {
                entry.target.dataset.animated = 'true';
                const title = entry.target.querySelector('h3');
                const desc = entry.target.querySelector('p');

                if (title) {
                    const titleText = title.textContent;
                    title.textContent = '';

                    let i = 0;
                    function typeTitle() {
                        if (i < titleText.length) {
                            title.textContent += titleText.charAt(i);
                            i++;
                            setTimeout(typeTitle, 40);
                        } else if (desc) {
                            // After title, fade in description
                            desc.style.opacity = '0';
                            setTimeout(() => {
                                desc.style.transition = 'opacity 0.5s ease';
                                desc.style.opacity = '1';
                            }, 100);
                        }
                    }
                    typeTitle();
                }
            }
        });
    }, { threshold: 0.5 });

    timelineItems.forEach(item => timelineObserver.observe(item));
}

// Initialize timeline typing after DOM is ready
document.addEventListener('DOMContentLoaded', initTimelineTyping);

// ===== Profile List Typing =====
function initProfileTyping() {
    const profileItems = document.querySelectorAll('.profile-details li');

    const profileObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.dataset.typed) {
                entry.target.dataset.typed = 'true';
                const text = entry.target.textContent;
                entry.target.textContent = '';
                entry.target.style.borderColor = '#00ff41';

                let i = 0;
                function typeProfile() {
                    if (i < text.length) {
                        entry.target.textContent += text.charAt(i);
                        i++;
                        setTimeout(typeProfile, 25);
                    } else {
                        entry.target.style.borderColor = '';
                    }
                }
                typeProfile();
            }
        });
    }, { threshold: 0.3, rootMargin: '0px 0px -20px 0px' });

    profileItems.forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.1}s`;
        profileObserver.observe(item);
    });
}

document.addEventListener('DOMContentLoaded', initProfileTyping);

// ===== Random Terminal Messages =====
const terminalMessages = [
    'All infrastructure services are online...',
    'Loading featured projects...',
    'Connected to virtual servers...',
    'Network monitoring and security active...',
    'Service uptime within optimal range...',
    'Ping to success: 1ms'
];

setInterval(() => {
    if (Math.random() > 0.95) {
        const msg = terminalMessages[Math.floor(Math.random() * terminalMessages.length)];
        console.log(`%c[SYSTEM] ${msg}`, 'color: #00ff41; font-family: monospace;');
    }
}, 5000);

console.log('%c═══════════════════════════════════════', 'color: #00ff41');
console.log('%c  Nader Naderi Resume - Terminal Mode  ', 'color: #00ff41; font-size: 16px; font-weight: bold;');
console.log('%c  Type "help" in the terminal for assistance  ', 'color: #58a6ff');
console.log('%c═══════════════════════════════════════', 'color: #00ff41');

// ===== Print Handling =====
function prepareForPrint() {
    canvas.style.display = 'none';
    loadingScreen.style.display = 'none';
    terminalInput.style.display = 'none';

    const existingNotif = document.querySelector('.terminal-notification');
    if (existingNotif) existingNotif.style.display = 'none';

    // Make sure any text still mid-typing is fully shown
    document.querySelectorAll('.hero h1, section h2, .timeline-item h3, .profile-details li, .hero .summary').forEach(el => {
        el.style.visibility = 'visible';
        el.style.opacity = '1';
        el.style.transform = 'none';
    });

    // Remove any leftover blinking cursors
    document.querySelectorAll('.typing-cursor').forEach(cursor => cursor.remove());

    // Reveal all sections (in case some haven't scrolled into view yet)
    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '1';
        section.style.transform = 'none';
    });
}

function restoreAfterPrint() {
    canvas.style.display = '';
    loadingScreen.style.display = '';
    terminalInput.style.display = '';
}

window.addEventListener('beforeprint', prepareForPrint);
window.addEventListener('afterprint', restoreAfterPrint);

// ===== Print Stylesheet =====
const printStyle = document.createElement('style');
printStyle.textContent = `
    @media print {
        body {
            background: #ffffff !important;
            color: #000000 !important;
        }
        #matrix-canvas,
        #loading-screen,
        #terminal-input,
        .terminal-notification {
            display: none !important;
        }
        section {
            page-break-inside: avoid;
            opacity: 1 !important;
            transform: none !important;
        }
        h1, h2, h3, p, li, span {
            color: #000000 !important;
            text-shadow: none !important;
            animation: none !important;
        }
        a {
            color: #000000 !important;
            text-decoration: underline;
        }
        .skill, .cert-item, .timeline-item {
            border-color: #cccccc !important;
            box-shadow: none !important;
            background: #ffffff !important;
        }
    }
`;
document.head.appendChild(printStyle);