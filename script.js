// 1. تنظیمات نوار پیشرفت اسکرول (Scroll Progress Bar)
window.onscroll = function() {
    let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let scrolled = (winScroll / height) * 100;
    document.getElementById("scroll-progress").style.width = scrolled + "%";
};

// 2. تنظیمات Typed.js (افکت تایپ ترمینال)
// بررسی می‌کنیم که المنتی با آیدی typed وجود داشته باشد تا خطا ندهد
if (document.getElementById('typed')) {
    var options = {
        strings: [
            'root@nader:~# systemctl start devops',
            'root@nader:~# docker-compose up -d',
            'root@nader:~# ansible-playbook deploy.yml',
            'root@nader:~# ping -c 4 8.8.8.8'
        ],
        typeSpeed: 50,
        backSpeed: 30,
        backDelay: 2000,
        loop: true,
        showCursor: true,
        cursorChar: '_'
    };
    var typed = new Typed('#typed', options);
}

// 3. تنظیمات Particles.js (ذرات متصل به هم در هدر)
if (document.getElementById('particles-js')) {
    particlesJS('particles-js', {
        "particles": {
            "number": {
                "value": 60,
                "density": {
                    "enable": true,
                    "value_area": 800
                }
            },
            "color": {
                "value": "#00f0ff" // رنگ آبی نئونی
            },
            "shape": {
                "type": "circle"
            },
            "opacity": {
                "value": 0.5,
                "random": false
            },
            "size": {
                "value": 3,
                "random": true
            },
            "line_linked": {
                "enable": true,
                "distance": 150,
                "color": "#10b981", // رنگ سبز نئونی
                "opacity": 0.4,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 2,
                "direction": "none",
                "random": false,
                "straight": false,
                "out_mode": "out",
                "bounce": false
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": "grab" // هنگام نزدیک شدن موس، خطوط به موس وصل می‌شوند
                },
                "onclick": {
                    "enable": true,
                    "mode": "push"
                },
                "resize": true
            },
            "modes": {
                "grab": {
                    "distance": 140,
                    "line_linked": {
                        "opacity": 1
                    }
                },
                "push": {
                    "particles_nb": 4
                }
            }
        },
        "retina_detect": true
    });
}
