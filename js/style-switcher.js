const styleSwitcherToggle = document.querySelector(".style__switcher-toggler");
styleSwitcherToggle.addEventListener('click', () => {
    document.querySelector(".style__switcher").classList.toggle("open");
});

// hide style switcher on scroll
window.addEventListener('scroll', () => {
    if (document.querySelector(".style__switcher").classList.contains("open")) {
        document.querySelector(".style__switcher").classList.remove("open");
    }
});

// change style on click (can save setting to local)
const alternateStyle = document.querySelectorAll(".alternate-style");
function setActiveStyle(color) {
  alternateStyle.forEach(style => {
    if (color === style.getAttribute("title")) {
      style.removeAttribute("disabled");
      localStorage.setItem("activeStyle", style.getAttribute("title"));
    } else {
      style.setAttribute("disabled", "true");
    }
  });
}

const color = localStorage.getItem("activeStyle");
if (color) {
  setActiveStyle(color);
}

// change theme light or dark (can save setting to local)
const dayNight = document.querySelector(".day-night");
// Check if the theme is already saved in local storage
const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
    // Apply the saved theme
    document.body.classList.add(savedTheme);
    
    // Update the dayNight icon based on the saved theme
    if (savedTheme === "dark") {
        dayNight.querySelector("i").classList.remove("fa-sun");
        dayNight.querySelector("i").classList.add("fa-moon");
    } else {
        dayNight.querySelector("i").classList.remove("fa-moon");
        dayNight.querySelector("i").classList.add("fa-sun");
    }
} else {
    // Default to light theme if no saved theme is found
    document.body.classList.add("light");
}

// Add event listener for theme toggle button
dayNight.addEventListener("click", () => {
    // Toggle the body class between dark and light
    document.body.classList.toggle("dark");
    document.body.classList.toggle("light");

    // Update the dayNight icon based on the current theme
    const currentTheme = document.body.classList.contains("dark") ? "dark" : "light";
    if (currentTheme === "dark") {
        dayNight.querySelector("i").classList.remove("fa-sun");
        dayNight.querySelector("i").classList.add("fa-moon");
    } else {
        dayNight.querySelector("i").classList.remove("fa-moon");
        dayNight.querySelector("i").classList.add("fa-sun");
    }

    // Save the current theme to local storage
    localStorage.setItem("theme", currentTheme);
});