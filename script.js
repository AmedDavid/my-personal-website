// Dark Mode Toggle
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

themeToggle.addEventListener('click', () => {
  body.classList.toggle('dark-mode');
  themeToggle.textContent = body.classList.contains('dark-mode') ? '☀️' : '🌙';
});

// CTA Button Interaction
const ctaButton = document.getElementById('cta-button');

ctaButton.addEventListener('click', () => {
  alert('Let’s build something amazing together!');
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// GitHub Calendar Initialization with Private Contributions
const username = "AmedDavid"; // Replace with your GitHub username
const token = "your_github_personal_access_token"; // Replace with your GitHub token

GitHubCalendar(".calendar", username, {
  responsive: true,
  global_stats: true, // Show total contributions, longest streak, and current streak
  tooltips: true, // Enable tooltips
  cache: 24 * 60 * 60 * 1000, // Cache the data for 24 hours
  summary_text: "Summary of contributions in the last year", // Custom summary text
  proxy: (username) => {
    // Use the token to fetch private contributions
    return fetch(`https://api.github.com/users/${username}/events`, {
      headers: {
        Authorization: `token ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        return data.filter((event) => event.type === "PushEvent");
      });
  },
});

// Optional: Add a loading message
document.querySelector(".calendar").innerHTML = "Loading GitHub contributions...";