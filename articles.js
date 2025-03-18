document.addEventListener("DOMContentLoaded", () => {
    // Elements
    const articlesContainer = document.querySelector(".articles-container")
    const categoryFilter = document.getElementById("category-filter")
    const sortBySelect = document.getElementById("sort-by")
    const viewButtons = document.querySelectorAll(".view-btn")
    const filterTags = document.querySelector(".filter-tags")
    const clearFiltersBtn = document.querySelector(".clear-filters")
    const articlesTotal = document.getElementById("articles-total")
    const paginationNumbers = document.querySelector(".pagination-numbers")
    const prevButton = document.querySelector(".pagination-btn.prev")
    const nextButton = document.querySelector(".pagination-btn.next")
  
    // State
    let currentFilter = "all"
    let currentSort = "date-desc"
    let currentView = "grid"
    let currentPage = 1
    const articlesPerPage = 12
  
    // Initialize
    updateFilterTags()
    updateArticlesCount()
    filterAndSortArticles()
    updatePagination()
  
    // Filter by category
    if (categoryFilter) {
      categoryFilter.addEventListener("change", function () {
        currentFilter = this.value
        currentPage = 1
        updateFilterTags()
        filterAndSortArticles()
        updatePagination()
      })
    }
  
    // Sort articles
    if (sortBySelect) {
      sortBySelect.addEventListener("change", function () {
        currentSort = this.value
        filterAndSortArticles()
      })
    }
  
    // Toggle view (grid/list)
    viewButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const view = this.getAttribute("data-view")
  
        // Remove active class from all view buttons
        viewButtons.forEach((btn) => btn.classList.remove("active"))
  
        // Add active class to clicked button
        this.classList.add("active")
  
        // Update view
        currentView = view
        articlesContainer.className = `articles-container ${view}-view`
      })
    })
  
    // Handle filter tags
    function updateFilterTags() {
      // Clear existing tags
      filterTags.innerHTML = ""
  
      // Add current filter tag
      let tagText = "Toutes les catégories"
      if (currentFilter === "television") tagText = "Télévision"
      if (currentFilter === "radio") tagText = "Radio"
      if (currentFilter === "films") tagText = "Films"
      if (currentFilter === "series") tagText = "Séries"
  
      const tag = document.createElement("span")
      tag.className = "filter-tag"
      tag.setAttribute("data-filter", currentFilter)
      tag.innerHTML = `${tagText} <button class="remove-filter">×</button>`
      filterTags.appendChild(tag)
  
      // Add event listener to remove button
      const removeBtn = tag.querySelector(".remove-filter")
      if (removeBtn) {
        removeBtn.addEventListener("click", () => {
          currentFilter = "all"
          categoryFilter.value = "all"
          updateFilterTags()
          filterAndSortArticles()
          updatePagination()
        })
      }
    }
  
    // Clear all filters
    if (clearFiltersBtn) {
      clearFiltersBtn.addEventListener("click", () => {
        currentFilter = "all"
        categoryFilter.value = "all"
        updateFilterTags()
        filterAndSortArticles()
        updatePagination()
      })
    }
  
    // Filter and sort articles
    function filterAndSortArticles() {
      const articles = Array.from(document.querySelectorAll(".article-item"))
  
      // Filter articles
      const filteredArticles = articles.filter((article) => {
        if (currentFilter === "all") return true
        return article.getAttribute("data-category") === currentFilter
      })
  
      // Sort articles
      filteredArticles.sort((a, b) => {
        const aDate = new Date(a.getAttribute("data-date"))
        const bDate = new Date(b.getAttribute("data-date"))
        const aTitle = a.getAttribute("data-title")
        const bTitle = b.getAttribute("data-title")
  
        switch (currentSort) {
          case "date-desc":
            return bDate - aDate
          case "date-asc":
            return aDate - bDate
          case "title-asc":
            return aTitle.localeCompare(bTitle)
          case "title-desc":
            return bTitle.localeCompare(aTitle)
          default:
            return 0
        }
      })
  
      // Hide all articles first
      articles.forEach((article) => {
        article.style.display = "none"
      })
  
      // Show filtered and sorted articles for current page
      const startIndex = (currentPage - 1) * articlesPerPage
      const endIndex = startIndex + articlesPerPage
      const visibleArticles = filteredArticles.slice(startIndex, endIndex)
  
      visibleArticles.forEach((article) => {
        article.style.display = ""
      })
  
      // Update articles count
      updateArticlesCount(filteredArticles.length)
    }
  
    // Update articles count
    function updateArticlesCount(count) {
      if (articlesTotal) {
        const totalCount = count || document.querySelectorAll(".article-item").length
        articlesTotal.textContent = `${totalCount} article${totalCount > 1 ? "s" : ""} trouvé${totalCount > 1 ? "s" : ""}`
      }
    }
  
    // Pagination
    function updatePagination() {
      const articles = Array.from(document.querySelectorAll(".article-item"))
  
      // Filter articles
      const filteredArticles = articles.filter((article) => {
        if (currentFilter === "all") return true
        return article.getAttribute("data-category") === currentFilter
      })
  
      const totalPages = Math.ceil(filteredArticles.length / articlesPerPage)
  
      // Update pagination numbers
      if (paginationNumbers) {
        paginationNumbers.innerHTML = ""
  
        // Add first page
        const firstPageBtn = document.createElement("button")
        firstPageBtn.className = "page-number" + (currentPage === 1 ? " active" : "")
        firstPageBtn.textContent = "1"
        firstPageBtn.addEventListener("click", () => {
          currentPage = 1
          filterAndSortArticles()
          updatePagination()
        })
        paginationNumbers.appendChild(firstPageBtn)
  
        // Add ellipsis and middle pages
        if (totalPages > 3) {
          if (currentPage > 2) {
            const ellipsis = document.createElement("span")
            ellipsis.className = "pagination-ellipsis"
            ellipsis.textContent = "..."
            paginationNumbers.appendChild(ellipsis)
          }
  
          // Add current page if it's not 1 or last
          if (currentPage !== 1 && currentPage !== totalPages) {
            const currentPageBtn = document.createElement("button")
            currentPageBtn.className = "page-number active"
            currentPageBtn.textContent = currentPage
            paginationNumbers.appendChild(currentPageBtn)
          }
  
          if (currentPage < totalPages - 1) {
            const ellipsis = document.createElement("span")
            ellipsis.className = "pagination-ellipsis"
            ellipsis.textContent = "..."
            paginationNumbers.appendChild(ellipsis)
          }
        } else {
          // Add all pages for small total
          for (let i = 2; i <= totalPages; i++) {
            const pageBtn = document.createElement("button")
            pageBtn.className = "page-number" + (currentPage === i ? " active" : "")
            pageBtn.textContent = i
            pageBtn.addEventListener("click", () => {
              currentPage = i
              filterAndSortArticles()
              updatePagination()
            })
            paginationNumbers.appendChild(pageBtn)
          }
        }
  
        // Add last page if more than 1 page
        if (totalPages > 1 && totalPages !== 2) {
          const lastPageBtn = document.createElement("button")
          lastPageBtn.className = "page-number" + (currentPage === totalPages ? " active" : "")
          lastPageBtn.textContent = totalPages
          lastPageBtn.addEventListener("click", () => {
            currentPage = totalPages
            filterAndSortArticles()
            updatePagination()
          })
          paginationNumbers.appendChild(lastPageBtn)
        }
      }
  
      // Update prev/next buttons
      if (prevButton) {
        prevButton.disabled = currentPage === 1
      }
  
      if (nextButton) {
        nextButton.disabled = currentPage === totalPages || totalPages === 0
      }
    }
  
    // Add event listeners to pagination buttons only once
    if (prevButton) {
      prevButton.addEventListener("click", () => {
        if (currentPage > 1) {
          currentPage--
          filterAndSortArticles()
          updatePagination()
        }
      })
    }
  
    if (nextButton) {
      nextButton.addEventListener("click", () => {
        const articles = Array.from(document.querySelectorAll(".article-item"))
        const filteredArticles = articles.filter((article) => {
          if (currentFilter === "all") return true
          return article.getAttribute("data-category") === currentFilter
        })
        const totalPages = Math.ceil(filteredArticles.length / articlesPerPage)
  
        if (currentPage < totalPages) {
          currentPage++
          filterAndSortArticles()
          updatePagination()
        }
      })
    }
  })
  