// Toggle Dropdown Menu
function toggleDropdown() {
  const dropdown = document.querySelector(".dropdown .dropdown-content");
  dropdown.classList.toggle("show");
}

// Close Dropdown if Clicked Outside
window.addEventListener("click", function (event) {
  // Check if the click is not on the dropdown button or its content
  if (
    !event.target.matches(".dropdown-btn") &&
    !event.target.closest(".dropdown")
  ) {
    const dropdowns = document.getElementsByClassName("dropdown-content");
    Array.from(dropdowns).forEach((dropdown) => {
      if (dropdown.classList.contains("show")) {
        dropdown.classList.remove("show");
      }
    });
  }
});

// Toggle Navigation Menu on Mobile View
function toggleMenu() {
  const navLinks = document.querySelector(".nav-links");
  navLinks.classList.toggle("show");
}

// Slideshow Controls
let slideIndex = 0;
showSlides();

// To navigate to specific slide
function currentSlide(n) {
  showSlides((slideIndex = n - 1));
}

// Function to Show Slides
function showSlides() {
  const slides = document.getElementsByClassName("slide");
  const dots = document.getElementsByClassName("dot");

  // Hide all slides
  Array.from(slides).forEach((slide) => (slide.style.display = "none"));

  slideIndex = slideIndex + 1 > slides.length ? 1 : slideIndex + 1;

  // Remove active class from all dots
  Array.from(dots).forEach((dot) => dot.classList.remove("active"));

  // Show the current slide and activate corresponding dot
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].classList.add("active");

  setTimeout(showSlides, 2000); // Change image every 2 seconds
}

// Load Feedback from Server
function loadFeedback() {
  fetch("get_feedback.php")
    .then((response) => response.json())
    .then((data) => {
      const container = document.getElementById("feedbackContainer");
      container.innerHTML = ""; // Clear existing feedback

      // Create feedback cards dynamically
      data.forEach((feedback) => {
        const feedbackCard = document.createElement("div");
        feedbackCard.classList.add("feedback-card");

        const feedbackText = document.createElement("p");
        feedbackText.classList.add("feedback-text");
        feedbackText.textContent = `"${feedback.comment}"`;

        const feedbackAuthor = document.createElement("div");
        feedbackAuthor.classList.add("feedback-author");

        const authorName = document.createElement("h4");
        authorName.textContent = feedback.name;

        const authorEmail = document.createElement("p");
        authorEmail.textContent = feedback.email;

        feedbackAuthor.appendChild(authorName);
        feedbackAuthor.appendChild(authorEmail);
        feedbackCard.appendChild(feedbackText);
        feedbackCard.appendChild(feedbackAuthor);

        container.appendChild(feedbackCard);
      });
    })
    .catch((error) => console.error("Error:", error));
}

// Load feedback on page load
document.addEventListener("DOMContentLoaded", loadFeedback);

// Handle feedback form submission
document.getElementById("commentForm").addEventListener("submit", function (e) {
  e.preventDefault(); // Prevent form submission

  const formData = new FormData(this);

  // Submit feedback data
  fetch("submit_feedback.php", {
    method: "POST",
    body: formData,
  })
    .then((response) => {
      this.reset(); // Reset form
      loadFeedback(); // Reload feedback
    })
    .catch((error) => console.error("Error:", error));
});
