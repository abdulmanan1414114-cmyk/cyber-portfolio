/* =========================================================
   script.js - Abdul Manan Cyber Security Portfolio
   Features:
   1. Mobile menu toggle
   2. Header style change on scroll
   3. Highlight the active nav link
   4. Typing effect in the hero
   5. Reveal-on-scroll animations
   6. Contact form validation
   7. Footer year
   (Smooth scrolling itself is done in CSS: scroll-behavior: smooth)
   ========================================================= */

// Wait until the whole HTML page is loaded
document.addEventListener("DOMContentLoaded", function () {

  /* ---------- 1. MOBILE MENU TOGGLE ---------- */
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");
  const allNavLinks = document.querySelectorAll(".nav-link");

  navToggle.addEventListener("click", function () {
    const isOpen = navLinks.classList.toggle("open");
    navToggle.classList.toggle("open", isOpen);
    navToggle.setAttribute("aria-expanded", isOpen);
  });

  // Close the menu after clicking a link (mobile)
  allNavLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      navLinks.classList.remove("open");
      navToggle.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });

  /* ---------- 2 & 3. SCROLL EFFECTS ---------- */
  const header = document.getElementById("header");
  const sections = document.querySelectorAll("main section[id]");

  function handleScroll() {
    // Dark background on the header once we scroll a little
    header.classList.toggle("scrolled", window.scrollY > 50);

    // Find which section is currently on screen
    let currentId = "home";
    sections.forEach(function (section) {
      if (window.scrollY >= section.offsetTop - 140) {
        currentId = section.id;
      }
    });

    // Mark the matching nav link as "active"
    allNavLinks.forEach(function (link) {
      link.classList.toggle("active", link.getAttribute("href") === "#" + currentId);
    });
  }

  window.addEventListener("scroll", handleScroll);
  handleScroll(); // run once on load

  /* ---------- 4. TYPING EFFECT ---------- */
  const typedText = document.getElementById("typedText");
  const roles = ["Cyber Security Student", "Ethical Hacking Learner", "Future Security Professional"];
  let roleIndex = 0;   // which sentence we are typing
  let charIndex = 0;   // which letter we are on
  let deleting = false;

  function typeEffect() {
    const currentRole = roles[roleIndex];

    if (!deleting) {
      charIndex++;
    } else {
      charIndex--;
    }
    typedText.textContent = currentRole.substring(0, charIndex);

    let delay = deleting ? 40 : 90;

    if (!deleting && charIndex === currentRole.length) {
      delay = 1600;       // pause when the sentence is complete
      deleting = true;
    } else if (deleting && charIndex === 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length; // next sentence
      delay = 400;
    }
    setTimeout(typeEffect, delay);
  }
  typeEffect();

  /* ---------- 5. REVEAL ON SCROLL ---------- */
  const revealItems = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target); // animate only once
        }
      });
    }, { threshold: 0.15 });

    revealItems.forEach(function (item) { observer.observe(item); });
  } else {
    // Very old browsers: just show everything
    revealItems.forEach(function (item) { item.classList.add("visible"); });
  }

  /* ---------- 6. CONTACT FORM VALIDATION ---------- */
  const form = document.getElementById("contactForm");
  const formStatus = document.getElementById("formStatus");

  // Show or clear an error under a field
  function setError(inputId, message) {
    const input = document.getElementById(inputId);
    const errorBox = document.getElementById(inputId + "Error");
    errorBox.textContent = message;
    input.parentElement.classList.toggle("invalid", message !== "");
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault(); // stop the page from reloading

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let valid = true;

    // Check each field
    if (name.length < 2) {
      setError("name", "Please enter your name.");
      valid = false;
    } else { setError("name", ""); }

    if (!emailPattern.test(email)) {
      setError("email", "Please enter a valid email address.");
      valid = false;
    } else { setError("email", ""); }

    if (message.length < 10) {
      setError("message", "Message should be at least 10 characters.");
      valid = false;
    } else { setError("message", ""); }

    if (!valid) {
      formStatus.textContent = "";
      return;
    }

    // There is no server here, so this is a demo success message.
    // To receive real messages later, connect a free service such as Formspree.
    formStatus.textContent = "Thank you, " + name + "! Your message looks good (demo mode: no email was sent).";
    form.reset();
  });

  /* ---------- 7. FOOTER YEAR ---------- */
  document.getElementById("year").textContent = new Date().getFullYear();
});
