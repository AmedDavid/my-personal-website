// Hamburger Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Back to Top Button
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Typing Effect for Hero Title
const heroTitle = document.getElementById('hero-title');
if (heroTitle) {
    const text = "Hello, I’m David Amedi";
    let index = 0;

    function type() {
        if (index < text.length) {
            heroTitle.textContent += text.charAt(index);
            index++;
            setTimeout(type, 100);
        } else {
            heroTitle.style.borderRight = 'none';
        }
    }

    window.addEventListener('load', () => {
        type();
    });
}

// Random Background Image for Hero Section
const heroSection = document.getElementById('hero');
if (heroSection) {
    const bgImages = [
        'nature-bg.jpg',
        'nature-bg2.jpg',
        'nature-bg3.jpg',
        'nature-bg4.jpg',
        'nature-bg5.jpg',
        'nature-bg6.jpg',
        'nature-bg7.jpg',
        'nature-bg8.jpg',
        'nature-bg9.jpg',
        'nature-bg10.jpg'
    ];

    window.addEventListener('load', () => {
        const randomIndex = Math.floor(Math.random() * bgImages.length);
        const randomImage = bgImages[randomIndex];
        heroSection.style.background = `url('assets/images/${randomImage}') no-repeat center/cover`;
    });
}

// Project Modal
const projectCards = document.querySelectorAll('.project-card');
const modal = document.getElementById('projectModal');
const modalBody = document.getElementById('modalBody');
const modalClose = document.querySelector('.modal-close');

const projectsData = {
    project1: {
        name: "Scalable Web App",
        details: "A high-performance web application designed for scalability and user engagement.",
        images: ["../assets/images/project1.jpg"],
        video: null,
        link: null, // No external link
        timeTaken: "3 months",
        approach: "Utilized React for the frontend and Next.js for server-side rendering, with a focus on optimizing API calls and caching."
    },
    project2: {
        name: "Favor Of Blessings",
        details: "Favor of Blessings is a full-stack real estate web application that connects buyers and sellers in the USA real estate market. The platform features a responsive frontend where users can browse properties, view listings, contact agents, and manage their account. On the backend, an admin panel provides tools for managing properties, agents, users, and roles, with secure authentication and user-friendly interfaces. Built with a focus on usability and performance, Favor of Blessings leverages modern web technologies to deliver a seamless experience across devices. This is a project that was designed for an USA based client.",
        images: ["../assets/images/favorofblessings.png"],
        video: "../assets/videos/favorofblessings.mp4",
        link: "https://favourofblessings.com/",
        timeTaken: "4 months",
        approach: "Built with Laravel for the backend and CSS for responsive styling."
    },
    project3: {
        name: "ConcArt",
        details: "ConcArt is a full-stack web application designed to streamline concert and event management for both users and administrators. The platform features a responsive frontend where users can browse events, explore artists and venues, book tickets, and manage their bookings via a user dashboard. On the backend, an admin panel provides comprehensive tools for managing events, artists, venues, tickets, users, bookings, and roles, with secure authentication and user-friendly interfaces. Built with a focus on usability and scalability, ConcArt leverages modern web technologies to deliver a seamless experience across devices.",
        images: ["../assets/images/concart.png"],
        video: "../assets/videos/concart.mp4",
        link: "https://conc-art.vercel.app/frontend/index.html",
        timeTaken: "2 weeks",
        approach: [
            "Planning and Wireframing: I started by defining the project scope, identifying key features for both the frontend (user-facing) and admin panel (management-focused). Wireframes were sketched to outline page layouts and user flows.",
            "Design Phase: Focused on creating a consistent design system with reusable CSS variables (e.g., --primary-color, --admin-bg) to ensure a cohesive look. Prioritized responsive design from the outset using mobile-first principles.",
            "Frontend Development: Built the user-facing pages (index.html, events.html, etc.) first, ensuring seamless navigation, event browsing, and ticket booking flows. JavaScript was used for interactivity, such as filtering events and handling form submissions.",
            "Admin Panel Development: Developed the admin section (admin-login.html, admin-dashboard.html, etc.) with secure authentication (login/registration) and comprehensive management tools. Implemented a sidebar for navigation and ensured all admin pages were responsive.",
            "Testing and Iteration: Conducted thorough testing across devices (desktop, tablet, mobile) to ensure responsiveness and usability. Iterated on feedback to refine form layouts, improve navigation, and optimize performance.",
            "Documentation: Created a detailed README.md to document the project structure, setup, and usage for future developers or collaborators."
        ]
    }
};

projectCards.forEach(card => {
    card.addEventListener('click', () => {
        const projectId = card.getAttribute('data-project');
        const project = projectsData[projectId];

        // Handle approach as string or array
        let approachContent = '';
        if (Array.isArray(project.approach)) {
            approachContent = `
                <ul class="approach-list">
                    ${project.approach.map(step => `<li>${step}</li>`).join('')}
                </ul>
            `;
        } else {
            approachContent = project.approach;
        }

        // Build the details list dynamically
        let detailsList = `
            <ul class="details-list">
                <li><strong>Time Taken:</strong> ${project.timeTaken}</li>
                <li><strong>Approach:</strong> ${approachContent}</li>
                ${project.link ? `<li><strong>External Link:</strong> <a href="${project.link}" target="_blank">${project.link}</a></li>` : ''}
            </ul>
        `;

        modalBody.innerHTML = `
            <h2>${project.name}</h2>
            <p>${project.details}</p>
            ${project.images.map(img => `<img src="${img}" alt="${project.name}">`).join('')}
            ${project.video ? `<video controls><source src="${project.video}" type="video/mp4"></video>` : ''}
            ${detailsList}
        `;

        modal.style.display = 'flex';
    });
});

modalClose.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Close modal when clicking outside
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Project Filter Functionality
const filterButtons = document.querySelectorAll('.filter-btn');
const projectGridCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const filter = button.getAttribute('data-filter');

        // Toggle active class
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        // Filter projects
        projectGridCards.forEach(card => {
            const category = card.getAttribute('data-category');
            if (filter === 'all' || category === filter) {
                card.style.display = 'block';
                card.style.opacity = '0';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transition = 'opacity 0.3s ease';
                }, 10);
            } else {
                card.style.opacity = '0';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Contact Form Submission
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent default form submission for demo
        formMessage.textContent = "Thank you! Your message has been sent.";
        formMessage.style.display = 'block';
        contactForm.reset();
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 3000);
    });
}

// Highlight Current Page in Navbar
window.addEventListener('load', () => {
    const currentPath = window.location.pathname.split('/').pop();
    const navItems = document.querySelectorAll('.nav-links a');

    navItems.forEach(link => {
        let linkPath = link.getAttribute('href');

        // Normalize relative paths
        if (linkPath.includes('/')) {
            linkPath = linkPath.split('/').pop();
        }

        if (linkPath === currentPath || (currentPath === '' && linkPath === 'index.html')) {
            link.classList.add('active');
        }
    });
});
