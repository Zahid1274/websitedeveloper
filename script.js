const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');
const chatbot = document.querySelector('[data-chatbot]');
const chatbotToggle = chatbot ? chatbot.querySelector('.chatbot-toggle') : null;
const chatbotPanel = chatbot ? chatbot.querySelector('.chatbot-panel') : null;
const revealItems = document.querySelectorAll('.reveal');
const contactForm = document.querySelector('[data-contact-form]');
const scrollTopButton = document.createElement('button');
const themeToggle = document.createElement('button');
const rootElement = document.documentElement;

function isDarkModeEnabled() {
  return rootElement.classList.contains('dark-mode');
}

function updateThemeToggle() {
  const darkEnabled = isDarkModeEnabled();
  themeToggle.setAttribute('aria-pressed', String(darkEnabled));
  themeToggle.setAttribute('aria-label', darkEnabled ? 'Switch to light mode' : 'Switch to dark mode');
  themeToggle.innerHTML = darkEnabled
    ? '<i class="fa-solid fa-sun"></i><span>Light</span>'
    : '<i class="fa-solid fa-moon"></i><span>Dark</span>';
}

scrollTopButton.className = 'scroll-top-button';
scrollTopButton.type = 'button';
scrollTopButton.setAttribute('aria-label', 'Scroll to top');
scrollTopButton.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
document.body.appendChild(scrollTopButton);

themeToggle.className = 'theme-toggle';
themeToggle.type = 'button';
updateThemeToggle();

if (siteNav) {
  siteNav.appendChild(themeToggle);
}

if (navToggle && siteNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = siteNav.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
    document.body.classList.toggle('nav-open', isOpen);
  });

  siteNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      siteNav.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('nav-open');
    });
  });
}

themeToggle.addEventListener('click', () => {
  const darkEnabled = rootElement.classList.toggle('dark-mode');
  localStorage.setItem('theme', darkEnabled ? 'dark' : 'light');
  updateThemeToggle();
});

if (chatbotToggle && chatbotPanel) {
  chatbotToggle.addEventListener('click', () => {
    const isHidden = chatbotPanel.hasAttribute('hidden');
    if (isHidden) {
      chatbotPanel.removeAttribute('hidden');
    } else {
      chatbotPanel.setAttribute('hidden', '');
    }
    chatbotToggle.setAttribute('aria-expanded', String(isHidden));
  });
}

if (revealItems.length > 0) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealItems.forEach((item) => observer.observe(item));
}

if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(contactForm);
    const name = String(formData.get('name') || '').trim();
    const email = String(formData.get('email') || '').trim();
    const message = String(formData.get('message') || '').trim();
    const subject = encodeURIComponent(`Website Project Inquiry from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
    window.location.href = `mailto:zahidali9028@gmail.com?subject=${subject}&body=${body}`;
  });
}

scrollTopButton.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

window.addEventListener('scroll', () => {
  scrollTopButton.classList.toggle('is-visible', window.scrollY > 320);
});