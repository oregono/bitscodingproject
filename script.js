// Hamburger menu toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
        // Close mobile menu after clicking
        if (navLinks) {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
});

// Add scroll effect to header
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (header) {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
        }
    }
});

// Add intersection observer for fade-in animations
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

// Observe all sections for animations
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// Observe cards for animations
document.querySelectorAll('.service-card, .project-card, .team-member').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});



// Connected dots & lines background effect

window.addEventListener('DOMContentLoaded', () => {
            const canvas = document.getElementById('network-bg');
            const ctx = canvas.getContext('2d');
            let width, height;
            function resize() {
                width = canvas.offsetWidth;
                height = canvas.offsetHeight;
                canvas.width = width;
                canvas.height = height;
            }
            resize();
            window.addEventListener('resize', resize);

            // Particle network
            const particles = [];
            const PARTICLE_COUNT = Math.floor(width / 30);
            for(let i=0;i<PARTICLE_COUNT;i++){
                particles.push({
                    x: Math.random()*width,
                    y: Math.random()*height,
                    vx: (Math.random()-0.5)*0.4,
                    vy: (Math.random()-0.5)*0.4
                });
            }
            function draw(){
                ctx.clearRect(0,0,width,height);
                // Draw lines
                for(let i=0;i<PARTICLE_COUNT;i++){
                    for(let j=i+1;j<PARTICLE_COUNT;j++){
                        const dx = particles[i].x - particles[j].x;
                        const dy = particles[i].y - particles[j].y;
                        const dist = Math.sqrt(dx*dx+dy*dy);
                        if(dist<120){
                            ctx.beginPath();
                            ctx.moveTo(particles[i].x,particles[i].y);
                            ctx.lineTo(particles[j].x,particles[j].y);
                            ctx.strokeStyle = 'rgba(0,255,255,0.07)';
                            ctx.lineWidth = 1;
                            ctx.stroke();
                        }
                    }
                }
                // Draw dots
                for(let i=0;i<PARTICLE_COUNT;i++){
                    ctx.beginPath();
                    ctx.arc(particles[i].x,particles[i].y,3,0,2*Math.PI);
                    ctx.fillStyle = 'rgba(0,255,255,0.13)';
                    ctx.fill();
                }
            }
            function animate(){
                for(let i=0;i<PARTICLE_COUNT;i++){
                    particles[i].x += particles[i].vx;
                    particles[i].y += particles[i].vy;
                    if(particles[i].x<0||particles[i].x>width) particles[i].vx*=-1;
                    if(particles[i].y<0||particles[i].y>height) particles[i].vy*=-1;
                }
                draw();
                requestAnimationFrame(animate);
            }
            animate();
        });