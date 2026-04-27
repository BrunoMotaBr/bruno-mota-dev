import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


// ─── NAV SCROLL ────────────────────────────────────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

// ─── MOBILE MENU ───────────────────────────────────────────────────────────
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');
navToggle.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  navToggle.textContent = open ? '[×]' : '[≡]';
});
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.textContent = '[≡]';
  });
});

// ─── TYPING EFFECT ─────────────────────────────────────────────────────────
const phrases = [
  'Desenvolvedor Full Stack',
  'React · Node.js · PHP',
  'Builder de Soluções Digitais',
  'Orientado a Produto & Performance',
];
const typedEl = document.getElementById('typed');
let phraseIndex = 0;
let charIndex   = 0;
let deleting    = false;

function type() {
  const current = phrases[phraseIndex];
  if (!deleting) {
    typedEl.textContent = current.slice(0, charIndex + 1);
    charIndex++;
    if (charIndex === current.length) {
      deleting = true;
      setTimeout(type, 2000);
      return;
    }
    setTimeout(type, 55);
  } else {
    typedEl.textContent = current.slice(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      deleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      setTimeout(type, 300);
      return;
    }
    setTimeout(type, 28);
  }
}
type();

// ─── FADE-IN ON SCROLL ─────────────────────────────────────────────────────
const fadeEls = document.querySelectorAll('.fade-up');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

fadeEls.forEach(el => observer.observe(el));

// Hero elements trigger on load (already in viewport)
window.addEventListener('load', () => {
  document.querySelectorAll('#hero .fade-up').forEach(el => {
    el.classList.add('visible');
  });

   // ─── Estado do mouse ───────────────────────────────────────────────
  let mouseSobre = false;

  const cena = new THREE.Scene();
  
  const divBruno3d = document.querySelector(".bruno3d");

  let largura = window.innerWidth;
  let altura = window.innerHeight;
  console.log("L: " + largura)
  console.log("A: " + altura)

  if(largura < 600){largura = 1500;}

  const camera = new THREE.PerspectiveCamera(
      40, 
      largura / altura,
      0.1,
      1000
  );
  
  camera.position.z = 10;
  
  const projetor = new THREE.WebGLRenderer({alpha: true, antialias: true});
  
  projetor.domElement.id = "meuCanvas3d";
  projetor.toneMapping = THREE.ACESFilmicToneMapping; // Dá um visual mais realista
  projetor.toneMappingExposure = 10;
  divBruno3d.addEventListener('mouseenter', () => { mouseSobre = true;  });
  divBruno3d.addEventListener('mouseleave', () => { mouseSobre = false; });
  
  divBruno3d.appendChild(
      projetor.domElement
  );
  
  const gltfLoader = new GLTFLoader();
  let bruno3d = null;
  
  gltfLoader.load("assets/3d/bruno.glb", (modelo) => {
    bruno3d = modelo.scene;
    bruno3d.position.z = 7;
    bruno3d.position.y = 0;
  
    if(window.innerWidth <= 545){
      bruno3d.scale.set(0.5,0.5,0.5);
    }
  
    cena.add(bruno3d);
  });
  
  const txtLoader = new THREE.TextureLoader();
  txtLoader.load( 'assets/imgs/hdri.webp', (textura) => {
    textura.mapping = THREE.EquirectangularReflectionMapping;
    const pmrem = new THREE.PMREMGenerator(projetor);
    const ambiente = pmrem.fromEquirectangular(textura).texture;
    cena.environment = ambiente;
  });
  
  
  
  function animar() {
    requestAnimationFrame(animar);

    if (bruno3d !== null && !mouseSobre) {
      bruno3d.rotation.y += 0.01; // devagar — ajuste aqui (0.005 = mais lento, 0.02 = mais rápido)
    }

    //if(mouseSobre){
      //window.
    //}

    projetor.render(cena, camera);
  }
  
  animar();
});
