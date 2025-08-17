// Portfolio data
const portfolioData = {
    "developer": {
        "name": "Siddhesh Deepak Jadhav",
        "title": "Game & App Developer",
        "description": "Unity game developer and software engineer with experience in gameplay systems, NPC AI, horror survival mechanics, and mobile app development. Skilled in building immersive single-player experiences, real-time notification systems, and scalable API solutions.",
        "skills": [
            { "name": "Unity 3D", "level": 90 },
            { "name": "C# Programming", "level": 92 },
            { "name": "Python", "level": 85 },
            { "name": "Game Design", "level": 88 },
            { "name": "Blender (3D Modeling)", "level": 80 },
            { "name": "Flutter & Dart", "level": 82 },
            { "name": "Node.js & Express", "level": 82 },
            { "name": "PostgreSQL / SQLite", "level": 78 }
        ],
        "contact": {
            "email": "jsiddhesh40@gmail.com",
            "github": "https://github.com/sidd-j",
            "linkedin": "https://linkedin.com/in/siddhesh-jadhav",
            "twitter": ""
        }
    },
    "projects": [
        {
            "name": "Whispers of Ruins",
            "description": "A single-player RPG built in Unity where players must defeat four dragons to uncover the truth. Features NPC AI, dynamic day-night cycle, dialogue & trade systems, and immersive sound management.",
            "image": "./Photos/Demo1.png",
            "link": "https://github.com/sidd-j/WhispersOfRuins"
        },
        {
            "name": "StaySync",
            "description": "A society management system built with Node.js & Express. Includes QR-based attendance, user management, visitor notifications, and real-time announcements using Socket.io, with SQLite caching.",
            "image": "./Photos/SS2.png",

            "link": "https://github.com/sidd-j/StaySync"
        },
        {
            "name": "Laundry App (Prostar Technologies)",
            "description": "Developed as a Flutter freelancer for Prostar Technologies. A mobile app where shop owners register their shops and customers place orders. Backend built with Node.js and PostgreSQL for order management.",
            "image": "./Photos/Laundry.jpg",
            "link": "https://github.com/sidd-j/laundry-app"
        },
        {
            "name": "Custom Node.js Notification System",
            "description": "Real-time notification system using Node.js and Socket.io. Handles announcements, maintenance payment alerts, and visitor notifications (e.g., deliveries).",
            "image": "./Photos/StaySync1.png",
            "link": "https://github.com/sidd-j/notification-system"
        },
        {
            "name": "Unity Games",
            "description": "Multiple Unity projects including a 3D horror survival game, NPC state machine AI systems, RPG mechanics, dialogue/trade interactions, and a legal chess moves calculator using OOP and design patterns.",
            "image": "./Photos/unityGame.png",

            "link": "https://github.com/sidd-j"
        },


    ],
    "experience": [
        {
            "role": "Game Tester",
            "company": "Rendered Ideas",
            "duration": "6 months",
            "description": "Tested mobile games, documented bugs, ensured quality assurance, and provided feedback to improve gameplay mechanics and performance."
        },
        {
            "role": "Flutter Freelancer",
            "company": "Prostar Technologies",
            "duration": "9 months",
            "description": "Developed and delivered a production-ready Laundry App with Flutter and Node.js backend. Managed order workflows and shop owner registration system."
        }
    ]
};



// DOM Elements
let navbar, mobileMenu, navMenu, typingText, particlesContainer;
let aboutDescription, skillsGrid, projectsGrid, socialLinks;

// Initialize DOM elements
function initializeElements() {
    navbar = document.getElementById('navbar');
    mobileMenu = document.getElementById('mobile-menu');
    navMenu = document.getElementById('nav-menu');
    typingText = document.getElementById('typing-text');
    particlesContainer = document.getElementById('particles');
    aboutDescription = document.getElementById('about-description');
    skillsGrid = document.getElementById('skills-grid');
    projectsGrid = document.getElementById('projects-grid');
    socialLinks = document.getElementById('social-links');
}

// Typing Animation
class TypeWriter {
    constructor(element, words, wait = 3000) {
        this.element = element;
        this.words = words;
        this.wait = parseInt(wait, 10);
        this.wordIndex = 0;
        this.txt = '';
        this.isDeleting = false;
        this.type();
    }


    type() {
        const current = this.wordIndex % this.words.length;
        const fullTxt = this.words[current];

        if (this.isDeleting) {
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        this.element.textContent = this.txt;

        let typeSpeed = 100;
        if (this.isDeleting) typeSpeed /= 2;

        if (!this.isDeleting && this.txt === fullTxt) {
            typeSpeed = this.wait;
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            this.wordIndex++;
            typeSpeed = 500;
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

// Navigate to "more works" page
function setupMoreWorksButton() {
    const moreWorksBtn = document.getElementById('more-works-btn');
    if (moreWorksBtn) {
        moreWorksBtn.addEventListener('click', () => {
            window.location.href = "gallery.html";
        });
    }
}

// Load projects into gallery
async function loadGallery() {
    try {
        const response = await fetch("projects.json");
        const projects = await response.json();
        const gallery = document.getElementById("gallery");

        projects.forEach(proj => {
            const card = document.createElement("div");
            card.classList.add("project-card");

            card.innerHTML = `
          <img src="${proj.image}" alt="${proj.name}">
          <h3>${proj.name}</h3>
          <p>${proj.description}</p>
          <a href="${proj.link}" target="_blank">View Project</a>
        `;

            gallery.appendChild(card);
        });
    } catch (error) {
        console.error("Error loading projects:", error);
    }
}

// Initialize gallery if on gallery.html
if (document.getElementById("gallery")) {
    loadGallery();
}

// Particle System
function createParticles() {
    if (!particlesContainer) return;

    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            createParticle();
        }, i * 100);
    }

    setInterval(createParticle, 300);
}

function createParticle() {
    if (!particlesContainer) return;

    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 6 + 's';
    particle.style.animationDuration = (Math.random() * 3 + 3) + 's';

    particlesContainer.appendChild(particle);

    setTimeout(() => {
        if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
        }
    }, 6000);
}

// Mobile Menu Toggle - Fixed functionality
function toggleMobileMenu() {
    if (!mobileMenu || !navMenu) return;

    mobileMenu.classList.toggle('active');
    navMenu.classList.toggle('active');

    // Prevent body scroll when menu is open
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'auto';
}

// Smooth Scrolling - Enhanced
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });

                // Update active nav link
                updateActiveNavLink(targetId);
            }

            // Close mobile menu if open
            if (navMenu && navMenu.classList.contains('active')) {
                toggleMobileMenu();
            }
        });
    });
}

// Update active navigation link
function updateActiveNavLink(targetId) {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === targetId) {
            link.classList.add('active');
        }
    });
}

// Navbar Scroll Effect
function handleNavbarScroll() {
    if (!navbar) return;

    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(10, 10, 15, 0.98)';
        navbar.style.backdropFilter = 'blur(20px)';
    } else {
        navbar.style.background = 'rgba(10, 10, 15, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    }
}

// Populate About Section
function populateAboutSection() {
    if (!aboutDescription) return;

    const { description } = portfolioData.developer;
    aboutDescription.textContent = description;
}

// Populate Skills Section
function populateSkillsSection() {
    if (!skillsGrid) return;

    const { skills } = portfolioData.developer;

    skillsGrid.innerHTML = skills.map(skill => `
        <div class="skill-item fade-in">
            <div>
                <div class="skill-name">${skill.name}</div>
                <div class="skill-bar">
                    <div class="skill-progress" data-level="${skill.level}"></div>
                </div>
            </div>
            <div class="skill-level">${skill.level}%</div>
        </div>
    `).join('');
}

// Animate Skill Bars
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach((bar, index) => {
        const level = bar.getAttribute('data-level');
        setTimeout(() => {
            bar.style.width = level + '%';
        }, index * 200 + 500);
    });
}

// Populate Projects Section - Fixed links functionality
function populateProjectsSection() {
    if (!projectsGrid) return;

    const { projects } = portfolioData;

    projectsGrid.innerHTML = projects.map(project => `
        <div class="project-card fade-in" data-link="${project.link}">
            <img src="${project.image}" alt="${project.name}" class="project-image" loading="lazy">
            <div class="project-content">
                <h3 class="project-name">${project.name}</h3>
                <p class="project-description">${project.description}</p>
                <a href="${project.link}" class="project-link" target="_blank" rel="noopener noreferrer">
                    View Project →
                </a>
            </div>
        </div>
    `).join('');

    // Add click handlers for project cards
    setTimeout(() => {
        document.querySelectorAll('.project-card').forEach(card => {
            card.addEventListener('click', function (e) {
                // Don't trigger if clicking the project link directly
                if (e.target.classList.contains('project-link')) {
                    return;
                }

                const link = this.getAttribute('data-link');
                if (link) {
                    window.open(link, '_blank', 'noopener,noreferrer');
                }
            });
        });
    }, 100);
}

// Populate Social Links
function populateSocialLinks() {
    if (!socialLinks) return;

    const { contact } = portfolioData.developer;
    const socialPlatforms = [
        { name: 'GitHub', url: contact.github, icon: 'GH' },
        { name: 'LinkedIn', url: contact.linkedin, icon: 'LI' },
        { name: 'Twitter', url: contact.twitter, icon: 'TW' },
        { name: 'Email', url: `mailto:${contact.email}`, icon: '@' }
    ];

    socialLinks.innerHTML = socialPlatforms.map(platform => `
        <a href="${platform.url}" class="social-link" target="_blank" rel="noopener noreferrer" title="${platform.name}">
            ${platform.icon}
        </a>
    `).join('');
}

// Intersection Observer for Animations
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                // Trigger skill bar animations when skills section is visible
                if (entry.target.closest('#about')) {
                    setTimeout(animateSkillBars, 500);
                }
            }
        });
    }, observerOptions);

    // Observe all fade-in elements
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
}

// Form Submission Handler
function setupContactForm() {
    const contactForm = document.querySelector('.contact-form');
    if (!contactForm) return;

    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Get form data
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        // Simple validation
        if (!name || !email || !message) {
            alert('Please fill in all fields.');
            return;
        }

        if (!isValidEmail(email)) {
            alert('Please enter a valid email address.');
            return;
        }

        // Simulate form submission
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;

        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;

        setTimeout(() => {
            alert('Thank you for your message! I\'ll get back to you soon.');
            contactForm.reset();
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }, 2000);
    });
}

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Navigation scroll spy
function setupScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (window.scrollY >= (sectionTop - 100)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });
}

// Initialize Application
function initializeApp() {
    // Initialize DOM elements
    initializeElements();

    // Start typing animation
    if (typingText) {
        new TypeWriter(typingText, [
            portfolioData.developer.name,
            'Game Developer',
            'Unity Expert',
            'RPG Creator',
            'App Developer'
        ], 2000);
    }

    // Create particle effects
    createParticles();

    // Setup mobile menu - Fixed event listener
    if (mobileMenu) {
        mobileMenu.addEventListener('click', toggleMobileMenu);
    }

    // Setup smooth scrolling
    setupSmoothScrolling();

    // Setup navbar scroll effect
    window.addEventListener('scroll', handleNavbarScroll);

    // Setup scroll spy
    setupScrollSpy();

    // Populate sections
    populateAboutSection();
    populateSkillsSection();
    populateProjectsSection();
    populateSocialLinks();

    // Setup scroll animations
    setTimeout(setupScrollAnimations, 100);

    // Setup contact form
    setupContactForm();

    // Add initial animations
    setTimeout(() => {
        document.querySelectorAll('.fade-in').forEach((el, index) => {
            setTimeout(() => {
                el.classList.add('visible');
            }, index * 100);
        });
    }, 500);
}

// Handle window resize
function handleWindowResize() {
    if (window.innerWidth > 768 && navMenu && navMenu.classList.contains('active')) {
        toggleMobileMenu();
    }
}

// Add some extra cosmic effects
function addCosmicEffects() {
    // Add random twinkling to existing elements
    setInterval(() => {
        const glowElements = document.querySelectorAll('.project-card, .skill-item, .social-link');
        if (glowElements.length > 0) {
            const randomElement = glowElements[Math.floor(Math.random() * glowElements.length)];
            const originalBoxShadow = window.getComputedStyle(randomElement).boxShadow;

            randomElement.style.boxShadow = '0 0 20px rgba(0, 217, 255, 0.5)';

            setTimeout(() => {
                randomElement.style.boxShadow = originalBoxShadow;
            }, 1000);
        }
    }, 5000);
}

// Enhanced error handling
function setupErrorHandling() {
    window.addEventListener('error', function (e) {
        console.error('Application error:', e.error);
    });

    // Check if all required elements are present
    const requiredElements = ['navbar', 'nav-menu', 'mobile-menu', 'typing-text', 'projects-grid'];
    let missingElements = [];

    requiredElements.forEach(id => {
        if (!document.getElementById(id)) {
            missingElements.push(id);
        }
    });

    if (missingElements.length > 0) {
        console.warn('Missing elements:', missingElements);
    }
}

// Start the application when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    setupErrorHandling();
    initializeApp();
});

// Handle window events
window.addEventListener('resize', handleWindowResize);

// Initialize cosmic effects after page load
window.addEventListener('load', function () {
    setTimeout(addCosmicEffects, 2000);
});