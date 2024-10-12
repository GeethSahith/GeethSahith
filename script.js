const text = "Hi! This is Geeth Sahith"; 
let index = 0;
const typingText = document.getElementById("typing-text");
typingText.textContent = ""; 

function type() {
    if (index < text.length) {
        typingText.textContent += text.charAt(index);
        index++;
        setTimeout(type, 100);
    } else {
        setTimeout(startParticles, 1500); 
    }
}

// Particle animation
function createParticle() {
    const particle = document.createElement("div");
    particle.className = "particle";
    const size = Math.random() * 10 + 5; 
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = Math.random() * window.innerWidth + "px";
    particle.style.top = Math.random() * window.innerHeight + "px";
    document.body.appendChild(particle);

    // Animate the particle
    const animationDuration = Math.random() * 2000 + 1000; 
    setTimeout(() => {
        particle.style.transform = `translateY(${Math.random() * 200 - 100}px)`; 
        particle.style.opacity = "0"; 
    }, 50); 

    setTimeout(() => {
        particle.remove();
    }, animationDuration + 50); 
}

function createParticles() {
    setInterval(createParticle, 300); 
}

function startParticles() {
    createParticles();

    const landingPage = document.getElementById('landing-page');
    const mainContent = document.getElementById('main-content');

    landingPage.style.transition = "opacity 1s ease-in-out";
    landingPage.style.opacity = 0; 

    mainContent.style.background = 'linear-gradient(to bottom, #6bb0c7, rgba(0, 191, 255, 0.1))'; 

    setTimeout(() => {
        landingPage.style.display = 'none'; 
        mainContent.style.display = 'block';
        mainContent.style.opacity = "1"; 
    }, 1000); 
}
window.onload = () => {
    type();
};

const homeButton = document.querySelector('a[href="#home"]');
const skillsButton = document.querySelector('a[href="#skills"]');
const projectsButton = document.querySelector('a[href="#projects"]');
const contactButton = document.querySelector('a[href="#contact"]');

const aboutSection = document.getElementById('about');
const skillsSection = document.getElementById('skills'); 
const projectsSection = document.getElementById('projects'); 
const contactSection = document.getElementById('contact'); 

function smoothScroll(target) {
    target.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
    });
}

// Event listeners for the buttons
homeButton.addEventListener('click', function(e) {
    e.preventDefault(); 
    smoothScroll(aboutSection); 
});

skillsButton.addEventListener('click', function(e) {
    e.preventDefault(); 
    smoothScroll(skillsSection);
});

projectsButton.addEventListener('click', function(e) {
    e.preventDefault();
    smoothScroll(projectsSection); 
});

contactButton.addEventListener('click', function(e) {
    e.preventDefault(); 
    smoothScroll(contactSection);
});

// Smooth scrolling for anchors
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        const targetPosition = targetElement.offsetTop;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        const duration = 1000; 
        let startTime = null;

        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = ease(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }

        function ease(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        }
        if (targetId === '#home') {
            smoothScroll(aboutSection); 
        } else {
            requestAnimationFrame(animation);
        }
    });
});
