'use strict';

/**
 * Add event on element
 */
const addEventOnElem = function (elem, type, callback) {
  if (elem.length > 1) {
    for (let i = 0; i < elem.length; i++) {
      elem[i].addEventListener(type, callback);
    }
  } else {
    elem.addEventListener(type, callback);
  }
};

/**
 * Navbar toggle
 */
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const navbar = document.querySelector("[data-navbar]");
const navbarLinks = document.querySelectorAll("[data-nav-link]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
};

addEventOnElem(navTogglers, "click", toggleNavbar);

const closeNavbar = function () {
  navbar.classList.remove("active");
  overlay.classList.remove("active");
};

addEventOnElem(navbarLinks, "click", closeNavbar);

/**
 * Header sticky & back-to-top button active
 */
const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

const headerActive = function () {
  if (window.scrollY > 150) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
};

addEventOnElem(window, "scroll", headerActive);

let lastScrolledPos = 0;

const headerSticky = function () {
  if (lastScrolledPos >= window.scrollY) {
    header.classList.remove("header-hide");
  } else {
    header.classList.add("header-hide");
  }

  lastScrolledPos = window.scrollY;
};

addEventOnElem(window, "scroll", headerSticky);

/**
 * Scroll reveal effect
 */
const sections = document.querySelectorAll("[data-section]");

const scrollReveal = function () {
  for (let i = 0; i < sections.length; i++) {
    if (sections[i].getBoundingClientRect().top < window.innerHeight / 2) {
      sections[i].classList.add("active");
    }
  }
};

scrollReveal();

addEventOnElem(window, "scroll", scrollReveal);

/**
 * Sign Up functionality
 */
document.getElementById("signup-btn").addEventListener("click", async () => {
  const name = document.getElementById("signup-name").value.trim();
  const email = document.getElementById("signup-email").value.trim();
  const password = document.getElementById("signup-password").value.trim();
  const error = document.getElementById("signup-error");

  if (name && email && password) {
    try {
      const response = await fetch("http://localhost:4001/api/user/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Sign Up Successful! Redirecting to Login page...");
        error.style.display = "none";
        document.getElementById("signup").classList.add("hidden");
        document.getElementById("login").classList.remove("hidden");
      } else {
        error.textContent = data.message || "Sign Up Failed!";
        error.style.display = "block";
      }
    } catch (err) {
      error.textContent = "An error occurred. Please try again later.";
      error.style.display = "block";
    }
  } else {
    error.textContent = "All fields are required!";
    error.style.display = "block";
  }
});

/**
 * Login functionality
 */
document.getElementById("login-btn").addEventListener("click", async () => {
  const email = document.getElementById("login-email").value.trim();
  const password = document.getElementById("login-password").value.trim();
  const error = document.getElementById("login-error");

  if (email && password) {
    try {
      const response = await fetch("http://localhost:4001/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(`Welcome back, ${data.user.name}!`);
        error.style.display = "none";
        localStorage.setItem("user", JSON.stringify(data));

        // Redirect to the home page
        document.querySelectorAll(".page").forEach((page) => page.classList.add("hidden"));
        document.getElementById("home").classList.remove("hidden");
      } else {
        error.textContent = data.message || "Invalid email or password.";
        error.style.display = "block";
      }
    } catch (err) {
      error.textContent = "An error occurred. Please try again later.";
      error.style.display = "block";
    }
  } else {
    error.textContent = "All fields are required!";
    error.style.display = "block";
  }
});

// Open Sign In Modal
function openSignInForm() {
    document.getElementById("login").classList.remove("hidden");
    document.getElementById("signup").classList.add("hidden");
    document.getElementById("auth-modal").classList.remove("hidden");
  }
  
  // Open Sign Up Modal
  function openSignUpForm() {
    document.getElementById("signup").classList.remove("hidden");
    document.getElementById("login").classList.add("hidden");
    document.getElementById("auth-modal").classList.remove("hidden");
  }
  
  // Close Modal
  function closeAuthModal() {
    document.getElementById("auth-modal").classList.add("hidden");
  }
  
  // Login Button Functionality
  document.getElementById("login-btn").addEventListener("click", () => {
    const email = document.getElementById("login-email").value.trim();
    const password = document.getElementById("login-password").value.trim();
    const error = document.getElementById("login-error");
  
    if (email && password) {
      alert(`Logged in with Email: ${email}`);
      error.textContent = "";
    } else {
      error.textContent = "Please enter both email and password.";
    }
  });
  
  // Sign Up Button Functionality
  document.getElementById("signup-btn").addEventListener("click", () => {
    const name = document.getElementById("signup-name").value.trim();
    const email = document.getElementById("signup-email").value.trim();
    const password = document.getElementById("signup-password").value.trim();
    const error = document.getElementById("signup-error");
  
    if (name && email && password) {
      alert(`Signed up with Name: ${name}, Email: ${email}`);
      error.textContent = "";
    } else {
      error.textContent = "All fields are required!";
    }
  });
  