const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const greeting = document.getElementById("greeting");
const factBtn = document.getElementById("factBtn");
const factText = document.getElementById("factText");
const projectList = document.getElementById("projectList");
const yearSpan = document.getElementById("year");
const form = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");


function setMenu(open) {
  navLinks.classList.toggle("open", open);
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  menuToggle.innerHTML = open ? "&times;" : "&#9776;";
}

menuToggle.addEventListener("click", function () {
  const isOpen = navLinks.classList.contains("open");
  setMenu(!isOpen);
});

// Close the menu after tapping a link (useful on phones)
navLinks.querySelectorAll("a").forEach(function (link) {
  link.addEventListener("click", function () {
    setMenu(false);
  });
});


window.addEventListener("resize", function () {
  if (window.innerWidth > 768) {
    setMenu(false);
  }
});


function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) {
    return "Good morning!";
  } else if (hour < 18) {
    return "Good afternoon!";
  } else {
    return "Good evening!";
  }
}

greeting.textContent =
  getGreeting() + " I'm Brian Koech, an IT student at Africa International University.";


const facts = [
  "I'm studying Information Technology at Africa International University.",
  "I wrote my first Python program to help process student results.",
  "I'm learning JavaScript, Python and SQL right now.",
  "I host my portfolio for free using GitHub Pages.",
  "I'm looking for internships and open-source projects to join."
];
let factIndex = -1;

factBtn.addEventListener("click", function () {
  factIndex = (factIndex + 1) % facts.length;
  factText.textContent = facts[factIndex];
  factBtn.textContent = "Show another fact";
});


const projects = [
  {
    title: "Student Result Processor",
    description: "A Python tool that helps with student grading.",
    tech: "Python",
    link: "https://github.com/briandebruno2-cyber/student-result-processor"
  },
  {
    title: "Portfolio Website",
    description: "This site, built with HTML, CSS and JavaScript.",
    tech: "HTML, CSS, JavaScript",
    link: "https://github.com/briandebruno2-cyber/Portfolio"
  }
];

function renderProjects() {
  projectList.innerHTML = "";
  projects.forEach(function (project) {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML =
      "<h3>" + project.title + "</h3>" +
      "<p>" + project.description + "</p>" +
      "<p><strong>Tech:</strong> " + project.tech + "</p>" +
      '<a href="' + project.link + '" target="_blank" rel="noopener">View on GitHub &rarr;</a>';
    projectList.appendChild(card);
  });
}

renderProjects();

// ===== 6. Footer year updates automatically =====
yearSpan.textContent = new Date().getFullYear();

// ===== 7. Contact form validation =====
function showError(fieldId, message) {
  document.getElementById(fieldId + "Error").textContent = message;
  document.getElementById(fieldId).classList.add("invalid");
}

function clearError(fieldId) {
  document.getElementById(fieldId + "Error").textContent = "";
  document.getElementById(fieldId).classList.remove("invalid");
}

function isValidEmail(email) {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email);
}

function validateForm() {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();
  let valid = true;

  clearError("name");
  clearError("email");
  clearError("message");

  if (name === "") {
    showError("name", "Please enter your name.");
    valid = false;
  }

  if (email === "") {
    showError("email", "Please enter your email.");
    valid = false;
  } else if (!isValidEmail(email)) {
    showError("email", "Please enter a valid email, like name@example.com.");
    valid = false;
  }

  if (message === "") {
    showError("message", "Please write a message.");
    valid = false;
  } else if (message.length < 10) {
    showError("message", "Your message should be at least 10 characters.");
    valid = false;
  }

  return valid;
}

form.addEventListener("submit", function (event) {
  event.preventDefault(); // stop the page from reloading
  formStatus.textContent = "";
  formStatus.classList.remove("success");

  if (validateForm()) {
    const name = document.getElementById("name").value.trim();
    formStatus.textContent = "Thanks, " + name + "! Your message is ready to send.";
    formStatus.classList.add("success");
    form.reset();
  } else {
    formStatus.textContent = "Please fix the errors above and try again.";
  }
});


["name", "email", "message"].forEach(function (id) {
  document.getElementById(id).addEventListener("input", function () {
    clearError(id);
  });
});
