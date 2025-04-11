// Animation du menu de navigation
document.addEventListener("DOMContentLoaded", function () {
    const navLinks = document.querySelectorAll(".nav-links a");
  
    navLinks.forEach((link) => {
      link.addEventListener("click", function (e) {
        navLinks.forEach((link) => link.classList.remove("active"));
        this.classList.add("active");
      });
    });
  });