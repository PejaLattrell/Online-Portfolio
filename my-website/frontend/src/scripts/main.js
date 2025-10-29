// frontend/src/scripts/main.js

document.addEventListener('DOMContentLoaded', () => {
    console.log('Document is ready!');

    // Example of DOM manipulation
    const header = document.createElement('h2');
    header.textContent = '';
    document.body.appendChild(header);

    // Project data
    const projects = [
        {
            title: 'Automated Pipeline',
            description: 'Description of project 1',
            image: '../assets/images/project1.jpg',
            link: '#'
        },
        {
            title: 'Project 2',
            description: 'Description of project 2',
            image: '../assets/images/project2.jpg',
            link: '#'
        },
        {
            title: 'Project 3',
            description: 'Description of project 3',
            image: '../assets/images/project3.jpg',
            link: '#'
        }
    ];

    // Populate projects
    const projectGrid = document.querySelector('.project-grid');
    projects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        projectCard.innerHTML = `
            <img src="${project.image}" alt="${project.title}" class="project-image">
            <div class="project-info">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <a href="${project.link}" class="project-link">View Project</a>
            </div>
        `;
        projectGrid.appendChild(projectCard);
    });

    // Handle contact form submission
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Add your form submission logic here
        console.log('Form submitted');
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});