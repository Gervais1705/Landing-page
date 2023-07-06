// Define Global Variables
const navbar = document.querySelector('.navbar__menu');
const sections = document.querySelectorAll('section');

/**
 * Helper Functions
 */

// Build the navigation menu dynamically
function buildNavMenu() {
  const navList = document.createElement('ul');
  sections.forEach((section) => {
    const listItem = document.createElement('li');
    const sectionId = section.getAttribute('id');
    const sectionTitle = section.getAttribute('data-nav');
    const anchorLink = document.createElement('a');
    anchorLink.setAttribute('href', `#${sectionId}`);
    anchorLink.textContent = sectionTitle;
    listItem.appendChild(anchorLink);
    navList.appendChild(listItem);
  });
  navbar.appendChild(navList);
}

// Add class 'active' to section when near top of viewport
function setActiveSection() {
  const scrollPosition = window.pageYOffset;

  sections.forEach((section) => {
    const rect = section.getBoundingClientRect();

    if (rect.top <= 200 && rect.bottom >= 200) {
      section.classList.add('your-active-class');
      const navLinks = navbar.querySelectorAll('a');
      navLinks.forEach((link) => {
        if (link.getAttribute('href') === `#${section.getAttribute('id')}`) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
    } else {
      section.classList.remove('your-active-class');
    }
  });
}

// Scroll to section on link click
navbar.addEventListener('click', (event) => {
  event.preventDefault();
  if (event.target.tagName === 'A') {
    const targetId = event.target.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    
    // Remove the clicked class from all sections
    sections.forEach((section) => {
      section.classList.remove('clicked');
    });
    
    // Add the clicked class to the target section
    targetSection.classList.add('clicked');
    
    // Scroll to the target section
    targetSection.scrollIntoView({ behavior: 'smooth' });
  }
});

// Smooth scrolling to target section
function scrollToSection(event) {
  event.preventDefault();
  if (event.target.tagName === 'A') {
    const targetId = event.target.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    targetSection.scrollIntoView({ behavior: 'smooth' });
  }
}

/**
 * Main Functions
 */

// Build the navigation menu
buildNavMenu();

// Set sections as active on initial page load
setActiveSection();

/**
 * Events
 */

// Scroll to section on link click
navbar.addEventListener('click', scrollToSection);

// Set sections as active on scroll
window.addEventListener('scroll', setActiveSection);
