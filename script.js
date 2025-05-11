document.addEventListener('DOMContentLoaded', function() {
  // Typed.js برای متن متحرک
  var typed = new Typed('#typed', {
    strings: ['نادر نادری', 'برنامه نویس', 'متخصص شبکه'],
    typeSpeed: 100,
    backSpeed: 50,
    loop: true
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