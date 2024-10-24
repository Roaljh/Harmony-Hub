let currentIndex = 0;
const slides = document.querySelectorAll('.carousel-slide');
const carouselContainer = document.querySelector('.carousel-container');
const totalSlides = slides.length;
const visibleSlides = 2;  // Show 2 slides at a time

// Duplicate slides for smooth infinite scrolling
for (let i = 0; i < visibleSlides; i++) {
    const cloneFirst = slides[i].cloneNode(true);
    const cloneLast = slides[totalSlides - 1 - i].cloneNode(true);
    carouselContainer.appendChild(cloneFirst);  // Append clones to the end
    carouselContainer.insertBefore(cloneLast, slides[0]);  // Prepend clones to the start
}

// Adjust each slide's width based on the carousel container width
function adjustSlideWidth() {
    const carouselWidth = carouselContainer.offsetWidth;
    const slideWidth = carouselWidth / visibleSlides;

    const allSlides = document.querySelectorAll('.carousel-slide');
    allSlides.forEach(slide => {
        slide.style.width = `${slideWidth}px`;  // Set each slide's width
    });
}

function showSlides(index) {
    const slideWidth = carouselContainer.offsetWidth / visibleSlides;
    const offset = slideWidth * index;

    const allSlides = document.querySelectorAll('.carousel-slide');
    allSlides.forEach((slide) => {
        slide.style.transform = `translateX(-${offset}px)`;
        slide.style.transition = 'transform 1.5s ease';  // Slower, smoother transition
    });
}

function nextSlide() {
    currentIndex++;
    showSlides(currentIndex);

    // Handle continuous looping
    const allSlides = document.querySelectorAll('.carousel-slide');
    if (currentIndex >= totalSlides) {
        setTimeout(() => {
            allSlides.forEach((slide) => {
                slide.style.transition = 'none';  // Remove transition for seamless jump
                slide.style.transform = `translateX(0)`;  // Jump back to the start
            });
            currentIndex = 0;  // Reset index to the original position
        }, 1500);  // Delay for the smooth transition
    }
}

// Adjust the slide width when the page loads and when the window resizes
window.addEventListener('load', adjustSlideWidth);
window.addEventListener('resize', adjustSlideWidth);

// Set an interval to change slides every 5 seconds (5000ms)
setInterval(nextSlide, 5000);  // Slower speed

// Initial display
showSlides(currentIndex);

