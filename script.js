const text = "Hi! This is Geeth Sahith"; 
let index = 0;
const typingText = document.getElementById("typing-text");
typingText.textContent = ""; // Clear content initially

function type() {
    if (index < text.length) {
        typingText.textContent += text.charAt(index);
        index++;
        setTimeout(type, 100); // Adjust typing speed here
    } else {
        setTimeout(startParticles, 1500); // Delay before particle animation starts
    }
}

// Particle animation
function createParticle() {
    const particle = document.createElement("div");
    particle.className = "particle";
    const size = Math.random() * 10 + 5; // Random size between 5px and 15px
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = Math.random() * window.innerWidth + "px";
    particle.style.top = Math.random() * window.innerHeight + "px";
    document.body.appendChild(particle);

    // Animate the particle
    const animationDuration = Math.random() * 2000 + 1000; // Random duration
    setTimeout(() => {
        particle.style.transform = `translateY(${Math.random() * 200 - 100}px)`; // Random vertical movement
        particle.style.opacity = "0"; // Fade out
    }, 50); // Short delay before animation

    // Remove particle after animation
    setTimeout(() => {
        particle.remove();
    }, animationDuration + 50); // Wait for animation to finish before removing
}

// Create particles at intervals
function createParticles() {
    setInterval(createParticle, 300); // Create a particle every 300ms
}

function startParticles() {
    // Start particle animation
    createParticles();

    const landingPage = document.getElementById('landing-page');
    const mainContent = document.getElementById('main-content');

    landingPage.style.transition = "opacity 1s ease-in-out";
    landingPage.style.opacity = 0; // Fade out landing page

    // Change background color of main content before displaying
    mainContent.style.background = 'linear-gradient(to bottom, #6bb0c7, rgba(0, 191, 255, 0.1))'; // Set the new background color

    setTimeout(() => {
        landingPage.style.display = 'none'; // Hide landing page
        mainContent.style.display = 'block'; // Show main content
        mainContent.style.opacity = "1"; // Fade in the main content
    }, 1000); // Wait for fade-out duration
}

// Start typing animation on page load
window.onload = () => {
    type();
};

// Smooth scrolling functionality
const homeButton = document.querySelector('a[href="#home"]');
const skillsButton = document.querySelector('a[href="#skills"]');
const projectsButton = document.querySelector('a[href="#projects"]');
const contactButton = document.querySelector('a[href="#contact"]');

const aboutSection = document.getElementById('about');
const skillsSection = document.getElementById('skills'); // Ensure this ID matches your skills section
const projectsSection = document.getElementById('projects'); // Ensure this ID matches your projects section
const contactSection = document.getElementById('contact'); // Ensure this ID matches your contact section

// Function to smooth scroll to a specific section
function smoothScroll(target) {
    target.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
    });
}

// Event listeners for the buttons
homeButton.addEventListener('click', function(e) {
    e.preventDefault(); // Prevent the default anchor click behavior
    smoothScroll(aboutSection); // Scroll to the about section
});

skillsButton.addEventListener('click', function(e) {
    e.preventDefault(); // Prevent the default anchor click behavior
    smoothScroll(skillsSection); // Scroll to the skills section
});

projectsButton.addEventListener('click', function(e) {
    e.preventDefault(); // Prevent the default anchor click behavior
    smoothScroll(projectsSection); // Scroll to the projects section
});

contactButton.addEventListener('click', function(e) {
    e.preventDefault(); // Prevent the default anchor click behavior
    smoothScroll(contactSection); // Scroll to the contact section
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
        const duration = 1000; // Duration of the scroll in milliseconds
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

        // Check if the clicked link is the Home link
        if (targetId === '#home') {
            // Scroll to the about section
            smoothScroll(aboutSection); // Use the smoothScroll function defined earlier
        } else {
            // For other links, perform normal scrolling
            requestAnimationFrame(animation);
        }
    });
});
