// ===== Matrix Rain Effect =====
const canvas = document.createElement('canvas');
canvas.id = 'matrix-canvas';
document.body.prepend(canvas);

const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const charArray = chars.split('');
const fontSize = 14;
let columns = canvas.width / fontSize;
const drops = [];

for (let i = 0; i < columns; i++) {
    drops[i] = Math.random() * -100;
}

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
    '[ OK ] Starting network-manager...',
    '[ OK ] Loading nader-resume.service...',
    '[ OK ] Initializing user interface...',
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
        }, 800);
    }
}

showLoadingMessage();

// ===== Terminal Input =====
const terminalInput = document.createElement('div');
terminalInput.id = 'terminal-input';
terminalInput.innerHTML = `
    <span>nader@resume:~$</span>
    <input type="text" placeholder="help را وارد کنید..." id="cmd-input">
`;
document.body.appendChild(terminalInput);

const cmdInput = document.getElementById('cmd-input');

const commands = {
    'help': () => showNotification('دستورات: skills, contact, about, clear, top'),
    'skills': () => {
        document.querySelector('.skills').scrollIntoView({ behavior: 'smooth' });
        showNotification('📂 در حال نمایش مهارت‌ها...');
    },
    'contact': () => {
        document.querySelector('footer').scrollIntoView({ behavior: 'smooth' });
        showNotification('📧 در حال نمایش اطلاعات تماس...');
    },
    'about': () => {
        document.querySelector('.profile').scrollIntoView({ behavior: 'smooth' });
        showNotification('👤 در حال نمایش پروفایل...');
    },
    'clear': () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        showNotification('🔄 صفحه پاک شد!');
    },
    'top': () => {
        showNotification('CPU: 2% | MEM: 512MB | UPTIME: 15 years');
    },
    'whoami': () => {
        showNotification('نادر نادری - کارشناس ارشد شبکه و امنیت');
    },
    'uname': () => {
        showNotification('Linux nader-pc 6.1.0-resume #1 SMP');
    },
    'date': () => {
        showNotification(new Date().toLocaleString('fa-IR'));
    }
};

cmdInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const cmd = cmdInput.value.toLowerCase().trim();
        if (commands[cmd]) {
            commands[cmd]();
        } else if (cmd) {
            showNotification(`❌ دستور '${cmd}' یافت نشد. help را امتحان کنید.`);
        }
        cmdInput.value = '';
    }
});

// ===== Notification System =====
function showNotification(message) {
    const existing = document.querySelector('.terminal-notification');
    if (existing) existing.remove();
    
    const notification = document.createElement('div');
    notification.className = 'terminal-notification';
    notification.innerHTML = `<span style="color: #58a6ff;">→</span> ${message}`;
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
        animation: slideDown 0.3s ease;
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideUp 0.3s ease forwards';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
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
`;
document.head.appendChild(style);

// ===== Typing Effect for Hero =====
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        const heroTitle = document.querySelector('.hero h1');
        if (heroTitle) {
            const cursor = document.createElement('span');
            cursor.className = 'cursor';
            heroTitle.appendChild(cursor);
        }
    }, 2500);
});

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
        0% { transform: translate(0); }
        20% { transform: translate(-2px, 2px); }
        40% { transform: translate(-2px, -2px); }
        60% { transform: translate(2px, 2px); }
        80% { transform: translate(2px, -2px); }
        100% { transform: translate(0); }
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
        showNotification('🎮 کد مخفی فعال شد! sudo rm -rf /boring');
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

// ===== Skills Hover Sound Effect (Visual) =====
document.querySelectorAll('.skill').forEach(skill => {
    skill.addEventListener('click', () => {
        const skillName = skill.querySelector('p').textContent;
        showNotification(`💡 مهارت: ${skillName}`);
    });
});

// ===== Cert Items Click =====
document.querySelectorAll('.cert-item').forEach(cert => {
    cert.addEventListener('click', () => {
        const certName = cert.querySelector('span').textContent;
        showNotification(`🏆 مدرک: ${certName}`);
    });
});

// ===== Random Terminal Messages =====
const terminalMessages = [
    'همه سیستم‌ها آنلاین هستند...',
    'بارگذاری مهارت‌های جدید...',
    'اتصال به سرورها برقرار است...',
    'امنیت شبکه: فعال',
    'پینگ به موفقیت‌ها: 1ms'
];

setInterval(() => {
    if (Math.random() > 0.95) {
        const msg = terminalMessages[Math.floor(Math.random() * terminalMessages.length)];
        console.log(`%c[SYSTEM] ${msg}`, 'color: #00ff41; font-family: monospace;');
    }
}, 5000);

console.log('%c═══════════════════════════════════════', 'color: #00ff41');
console.log('%c  رزومه نادر نادری - Terminal Mode  ', 'color: #00ff41; font-size: 16px; font-weight: bold;');
console.log('%c  برای کمک "help" را در ترمینال وارد کنید  ', 'color: #58a6ff');
console.log('%c═══════════════════════════════════════', 'color: #00ff41');
