'use strict';

const addEventOnElements = function (elements, eventType, callback) {
  for (let i = 0, len = elements.length; i < len; i++) {
    elements[i].addEventListener(eventType, callback);
  }
}

const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.classList.toggle("nav-active");
}

addEventOnElements(navTogglers, "click", toggleNavbar);

const header = document.querySelector("[data-header]");

window.addEventListener("scroll", function () {
  if (window.scrollY > 100) {
    header.classList.add("active");
  } else {
    header.classList.remove("active");
  }
});

const revealElements = document.querySelectorAll("[data-reveal]");
const revealDelayElements = document.querySelectorAll("[data-reveal-delay]");

const reveal = function () {
  for (let i = 0, len = revealElements.length; i < len; i++) {
    if (revealElements[i].getBoundingClientRect().top < window.innerHeight / 1.2) {
      revealElements[i].classList.add("revealed");
    }
  }
}

for (let i = 0, len = revealDelayElements.length; i < len; i++) {
  revealDelayElements[i].style.transitionDelay = revealDelayElements[i].dataset.revealDelay;
}

window.addEventListener("scroll", reveal);
window.addEventListener("load", reveal);

window.onload = function() {
  emailjs.init("S6fV879CSYuCgEe4y");
};

document.getElementById('contact-form').addEventListener('submit', function(event) {
  event.preventDefault();
  
  const submitBtn = event.target.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;
  submitBtn.textContent = 'Sending...';
  submitBtn.disabled = true;

  const templateParams = {
      to_name: 'Admin',
      from_name: document.getElementById('name').value,
      from_email: document.getElementById('email').value,
      message: document.getElementById('message').value,
      reply_to: document.getElementById('email').value
  };

  console.log('Sending with parameters:', templateParams);

  emailjs.send('service_6qfv3pv', 'template_dyjr9ha', templateParams)
      .then(function(response) {
          console.log('SUCCESS!', response.status, response.text);
          alert('Message sent successfully!');
          event.target.reset();
      }, function(error) {
          console.error('FAILED...', error);
          alert(`Failed to send message: ${error.text}`);
      })
      .finally(() => {
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
      });
});
