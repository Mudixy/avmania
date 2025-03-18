document.addEventListener("DOMContentLoaded", () => {
    // Theme Toggle
    const html = document.documentElement
    const themeToggleBtn = document.getElementById("theme-toggle-btn")
  
    // Check for saved theme preference or use system preference
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme) {
      html.className = savedTheme + "-theme"
    } else {
      // Check if user prefers dark mode
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
      html.className = prefersDark ? "dark-theme" : "light-theme"
    }
  
    // Toggle theme when button is clicked
    if (themeToggleBtn) {
      themeToggleBtn.addEventListener("click", () => {
        if (html.className === "light-theme") {
          html.className = "dark-theme"
          localStorage.setItem("theme", "dark")
        } else {
          html.className = "light-theme"
          localStorage.setItem("theme", "light")
        }
      })
    }
  
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector(".mobile-menu-btn")
    const mainNav = document.querySelector(".main-nav")
  
    if (mobileMenuBtn && mainNav) {
      mobileMenuBtn.addEventListener("click", () => {
        mainNav.classList.toggle("active")
      })
    }
  
    // Hero Slider
    const slides = document.querySelectorAll(".slide")
    const dots = document.querySelectorAll(".dot")
    const prevBtn = document.querySelector(".prev")
    const nextBtn = document.querySelector(".next")
  
    if (slides.length > 0) {
      let currentSlide = 0
      const slideCount = slides.length
      let slideInterval
  
      function showSlide(index) {
        // Hide all slides
        slides.forEach((slide) => {
          slide.classList.remove("active")
        })
  
        // Remove active class from all dots
        dots.forEach((dot) => {
          dot.classList.remove("active")
        })
  
        // Show the current slide and activate the corresponding dot
        slides[index].classList.add("active")
        dots[index].classList.add("active")
      }
  
      function nextSlide() {
        currentSlide = (currentSlide + 1) % slideCount
        showSlide(currentSlide)
      }
  
      function prevSlide() {
        currentSlide = (currentSlide - 1 + slideCount) % slideCount
        showSlide(currentSlide)
      }
  
      // Start automatic slideshow
      function startSlideshow() {
        slideInterval = setInterval(nextSlide, 5000)
      }
  
      // Stop slideshow on user interaction
      function stopSlideshow() {
        clearInterval(slideInterval)
      }
  
      // Add event listeners to navigation buttons
      if (prevBtn && nextBtn) {
        prevBtn.addEventListener("click", () => {
          stopSlideshow()
          prevSlide()
          startSlideshow()
        })
  
        nextBtn.addEventListener("click", () => {
          stopSlideshow()
          nextSlide()
          startSlideshow()
        })
      }
  
      // Add event listeners to dots
      dots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
          stopSlideshow()
          currentSlide = Number.parseInt(dot.getAttribute("data-index"))
          showSlide(currentSlide)
          startSlideshow()
        })
      })
  
      // Start the slideshow
      startSlideshow()
    }
  
    // Category Tabs
    const tabBtns = document.querySelectorAll(".tab-btn")
    const tabPanes = document.querySelectorAll(".tab-pane")
  
    tabBtns.forEach((btn) => {
      btn.addEventListener("click", function () {
        // Remove active class from all buttons and panes
        tabBtns.forEach((btn) => btn.classList.remove("active"))
        tabPanes.forEach((pane) => pane.classList.remove("active"))
  
        // Add active class to clicked button
        this.classList.add("active")
  
        // Show corresponding tab pane
        const category = this.getAttribute("data-category")
        const pane = document.getElementById(category)
        if (pane) {
          pane.classList.add("active")
        }
      })
    })
  
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        const targetId = this.getAttribute("href")
        if (targetId !== "#") {
          e.preventDefault()
          const targetElement = document.querySelector(targetId)
          if (targetElement) {
            window.scrollTo({
              top: targetElement.offsetTop - 80,
              behavior: "smooth",
            })
  
            // If it's a tab, activate it
            if (
              targetId.includes("television") ||
              targetId.includes("radio") ||
              targetId.includes("films") ||
              targetId.includes("series")
            ) {
              const tabBtn = document.querySelector(`.tab-btn[data-category="${targetId.substring(1)}"]`)
              if (tabBtn) {
                tabBtn.click()
              }
            }
          }
        }
      })
    })
  
    // Newsletter Form Submission
    const newsletterForm = document.querySelector(".newsletter-form")
    const newsletterSuccess = document.querySelector(".newsletter-success")
  
    if (newsletterForm && newsletterSuccess) {
      newsletterForm.addEventListener("submit", function (e) {
        e.preventDefault()
        const emailInput = this.querySelector('input[type="email"]')
  
        if (emailInput && emailInput.value) {
          // In a real application, you would send this to your server
          newsletterForm.style.display = "none"
          newsletterSuccess.style.display = "flex"
          emailInput.value = ""
  
          // Reset after 5 seconds
          setTimeout(() => {
            newsletterForm.style.display = "flex"
            newsletterSuccess.style.display = "none"
          }, 5000)
        }
      })
    }
  
    // Search Form
    const searchBar = document.querySelector(".search-bar")
  
    if (searchBar) {
      searchBar.addEventListener("submit", function (e) {
        e.preventDefault()
        const searchInput = this.querySelector("input")
  
        if (searchInput && searchInput.value) {
          // In a real application, you would redirect to search results
          alert("Recherche en cours pour : " + searchInput.value)
        }
      })
    }
  
    // Comment Form
    const commentForm = document.querySelector(".comment-form")
  
    if (commentForm) {
      commentForm.addEventListener("submit", function (e) {
        e.preventDefault()
        const commentInput = this.querySelector("textarea")
  
        if (commentInput && commentInput.value.trim()) {
          // In a real application, you would send this to your server
          alert("Commentaire envoyé : " + commentInput.value)
          commentInput.value = ""
        }
      })
    }
  
    // Load More Comments
    const loadMoreBtn = document.querySelector(".load-more")
  
    if (loadMoreBtn) {
      loadMoreBtn.addEventListener("click", () => {
        // In a real application, you would load more comments from the server
        alert("Chargement de plus de commentaires...")
      })
    }
  })
  