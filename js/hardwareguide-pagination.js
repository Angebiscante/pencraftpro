document.addEventListener("DOMContentLoaded", () => {
  const sectionsPerPage = 1; // Number of sections per page
  const featuresContainer = document.querySelector(".features-container");
  const paginationControls = document.querySelector(".pagination");
  const sections = Array.from(featuresContainer.children);
  const totalPages = Math.ceil(sections.length / sectionsPerPage);
  let currentPage = 1;

  function renderPage(pageNumber) {
    // Hide all sections
    sections.forEach((section, index) => {
      section.style.display =
        index >= (pageNumber - 1) * sectionsPerPage &&
        index < pageNumber * sectionsPerPage
          ? "block"
          : "none";
    });

    // Update pagination controls
    paginationControls.innerHTML = "";

    // Previous Button
    const prevButton = document.createElement("button");
    prevButton.textContent = "Previous";
    prevButton.disabled = pageNumber === 1;
    prevButton.addEventListener("click", () => {
      currentPage--;
      renderPage(currentPage);
    });
    paginationControls.appendChild(prevButton);

    // Numbered Page Buttons
    for (let i = 1; i <= totalPages; i++) {
      const pageButton = document.createElement("button");
      pageButton.textContent = i;
      pageButton.disabled = i === pageNumber;
      pageButton.addEventListener("click", () => {
        currentPage = i;
        renderPage(currentPage);
      });
      paginationControls.appendChild(pageButton);
    }

    // Next Button
    const nextButton = document.createElement("button");
    nextButton.textContent = "Next";
    nextButton.disabled = pageNumber === totalPages;
    nextButton.addEventListener("click", () => {
      currentPage++;
      renderPage(currentPage);
    });
    paginationControls.appendChild(nextButton);
  }

  renderPage(currentPage);
});
