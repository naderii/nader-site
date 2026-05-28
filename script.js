document.addEventListener('DOMContentLoaded', function() {
  // Typed.js برای متن متحرک
const typed = new Typed('#typed', {
  // استفاده از دستورات لینوکسی برای جذابیت بیشتر
  strings: [
    '> root@nader:~# whoami<br>^500 <span style="color:var(--accent-primary)">کارشناس ارشد شبکه و امنیت</span>',
    '> root@nader:~# ./start_service.sh<br>^500 <span style="color:var(--accent-primary)">متخصص DevOps و زیرساخت</span>',
    '> root@nader:~# ping server -c 1<br>^500 <span style="color:var(--accent-primary)">مدیر سیستم‌های مجازی‌سازی</span>'
  ],
  typeSpeed: 40,
  backSpeed: 20,
  backDelay: 2000,
  loop: true,
  cursorChar: '█', // کرسر شبیه به محیط ترمینال
  contentType: 'html' // اجازه اجرای تگ‌های HTML مثل br و span
});


  // AOS.js برای انیمیشن‌ها
  AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true
  });

  // اسکرول نرم برای لینک‌های منو
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });

  // تغییر استایل نوار ناوبری هنگام اسکرول
  window.addEventListener('scroll', function() {
    if (window.scrollY > 100) {
      document.querySelector('.navbar').classList.add('navbar-scrolled');
    } else {
      document.querySelector('.navbar').classList.remove('navbar-scrolled');
    }
  });
});
// نوار پیشرفت اسکرول
window.addEventListener('scroll', () => {
  const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (winScroll / height) * 100;
  document.getElementById("scroll-progress").style.width = scrolled + "%";
});
