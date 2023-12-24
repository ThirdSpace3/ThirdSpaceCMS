  // JavaScript for interactive elements (if needed)
  // Example: Smooth scrolling for navigation links
  document.querySelectorAll('.navbar a').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const href = this.getAttribute('href');
      const offsetTop = document.querySelector(href).offsetTop;

      scroll({
        top: offsetTop,
        behavior: "smooth"
      });
    });
  });