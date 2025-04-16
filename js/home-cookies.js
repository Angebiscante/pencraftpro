// Show cookie modal when the site loads
document.addEventListener("DOMContentLoaded", function () {
  const cookieModal = new bootstrap.Modal(
    document.getElementById("cookieModal"),
    {}
  );
  if (!localStorage.getItem("cookieConsent")) {
    cookieModal.show();
  }
});

// Handle Accept and Customize button clicks
function handleCookieConsent(action) {
  if (action === "accept") {
    localStorage.setItem("cookieConsent", "accepted");
  } else if (action === "customize") {
    window.location.href = "cookies.html"; // Redirect to cookies.html for customization
  }
  const cookieModal = bootstrap.Modal.getInstance(
    document.getElementById("cookieModal")
  );
  cookieModal.hide();
}
