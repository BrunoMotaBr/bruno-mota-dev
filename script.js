const sections = document.querySelectorAll('.section');

window.addEventListener('scroll', () => {
  sections.forEach(sec => {
    const top = sec.getBoundingClientRect().top;
    if (top < window.innerHeight - 100) {
      sec.style.opacity = 1;
      sec.style.transform = 'translateY(0)';
    }
  });
});

const btn = document.getElementById("toggleTheme");
const body = document.body;

btn.onclick = () => {
  body.classList.toggle("light");
  btn.textContent = body.classList.contains("light") ? "☀️" : "🌙";
};

