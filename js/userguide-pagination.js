document.addEventListener("DOMContentLoaded", () => {
  const cardsPerPage = 1; // Number of sections per page
  const featuresContainer = document.querySelector(".features-container");
  const paginationControls = document.querySelector(".pagination");
  const cards = Array.from(featuresContainer.children);
  const totalPages = Math.ceil(cards.length / cardsPerPage);
  let currentPage = 1;

  function renderPage(pageNumber) {
    // Hide all sections
    cards.forEach((card, index) => {
      card.style.display =
        index >= (pageNumber - 1) * cardsPerPage &&
        index < pageNumber * cardsPerPage
          ? "block"
          : "none";
    });

    // Update pagination buttons
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
