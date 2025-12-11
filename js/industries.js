// Slideshow functionality for industries page - 3x3 grid with continuous loop
document.addEventListener('DOMContentLoaded', function () {
    // Initialize all slideshows with auto-scroll delays
    initSlideshow('contractors-slideshow', 'contractors-dots', 5000);
    initSlideshow('health-slideshow', 'health-dots', 6000);
    initSlideshow('property-slideshow', 'property-dots', 4000);
});

function initSlideshow(containerId, dotsId, autoScrollDelay) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const slides = Array.from(container.getElementsByClassName('contractor-slide'));
    const dotsContainer = document.getElementById(dotsId);

    // Wrap slides in a grid container
    const gridWrapper = document.createElement('div');
    gridWrapper.className = 'slides-grid';

    // Move all slides into grid wrapper
    slides.forEach(slide => {
        gridWrapper.appendChild(slide);
    });

    // Insert grid before buttons
    const firstButton = container.querySelector('.slide-prev');
    container.insertBefore(gridWrapper, firstButton);

    const itemsPerPage = 3;
    const totalPages = Math.ceil(slides.length / itemsPerPage);

    // Create dots
    for (let i = 0; i < totalPages; i++) {
        const dot = document.createElement('span');
        dot.className = 'dot';
        dot.onclick = function () { setPage(containerId, i); };
        dotsContainer.appendChild(dot);
    }

    // Store data
    container.dataset.currentPage = 0;
    container.dataset.totalPages = totalPages;
    container.dataset.itemsPerPage = itemsPerPage;

    // Show first page
    showPage(containerId, 0);

    // Auto-scroll
    if (autoScrollDelay) {
        setInterval(() => {
            const currentPage = parseInt(container.dataset.currentPage);
            const nextPage = (currentPage + 1) % totalPages;
            showPage(containerId, nextPage);
        }, autoScrollDelay);
    }
}

function showPage(containerId, pageIndex) {
    const container = document.getElementById(containerId);
    const slides = Array.from(container.querySelectorAll('.contractor-slide'));
    const dotsContainer = document.getElementById(containerId.replace('-slideshow', '-dots'));
    const dots = dotsContainer.getElementsByClassName('dot');

    const itemsPerPage = parseInt(container.dataset.itemsPerPage);
    const totalPages = parseInt(container.dataset.totalPages);

    // Update current page
    container.dataset.currentPage = pageIndex;

    // Hide all slides
    slides.forEach(slide => slide.style.display = 'none');

    // Show slides for current page
    const startIndex = pageIndex * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, slides.length);

    for (let i = startIndex; i < endIndex; i++) {
        slides[i].style.display = 'flex';
    }

    // Update dots
    for (let i = 0; i < dots.length; i++) {
        dots[i].classList.remove('active');
    }
    if (dots[pageIndex]) {
        dots[pageIndex].classList.add('active');
    }
}

function changeSlide(containerId, direction) {
    const container = document.getElementById(containerId);
    const currentPage = parseInt(container.dataset.currentPage);
    const totalPages = parseInt(container.dataset.totalPages);

    let newPage = currentPage + direction;

    // Loop around
    if (newPage >= totalPages) newPage = 0;
    if (newPage < 0) newPage = totalPages - 1;

    showPage(containerId, newPage);
}

function setPage(containerId, pageIndex) {
    showPage(containerId, pageIndex);
}
