let currentSlide = 1; // Start at the first real slide (index 1)
const slides = document.querySelectorAll('.carousel-slide');
const totalSlides = slides.length;
const carouselContainer = document.querySelector('.carousel-container');

// Initial positioning to show the first two slides
carouselContainer.style.transform = `translateX(-${100}%)`;

function showSlide(index) {
    carouselContainer.style.transition = 'transform 1s ease-in-out';

    // Update currentSlide
    currentSlide = index;

    // Handle forward loop when reaching the last (duplicated) slide
    if (index >= totalSlides - 1) {
        setTimeout(() => {
            carouselContainer.style.transition = 'none';
            carouselContainer.style.transform = `translateX(-${100}%)`;
            currentSlide = 1;
        }, 1000); // Match with the transition time
    }
    
    // Handle backward loop when reaching the first (duplicated) slide
    else if (index <= 0) {
        setTimeout(() => {
            carouselContainer.style.transition = 'none';
            carouselContainer.style.transform = `translateX(-${(totalSlides - 2) * 100}%)`;
            currentSlide = totalSlides - 2;
        }, 1000); // Match with the transition time
    }

    const offset = -currentSlide * 100;
    carouselContainer.style.transform = `translateX(${offset}%)`;
}

function moveSlide(step) {
    showSlide(currentSlide + step);
}

// Automatic slide change every 4 seconds
let currentTestimonialIndex = 0;
const testimonialSlides = document.querySelectorAll('#testimonial-carousel .carousel-slide');
const totalTestimonialSlides = testimonialSlides.length;

let currentDotIndex = 0; // For sequential dot highlighting
const dots = document.querySelectorAll('#testimonial-carousel .dot');

function showTestimonialSlides(index) {
    const container = document.querySelector('#testimonial-carousel .carousel-container');

    if (index >= totalTestimonialSlides - 2) {
        currentTestimonialIndex = 0;
        container.style.transition = 'none'; // Disable transition for the jump
        container.style.transform = `translateX(0%)`;
        setTimeout(() => {
            container.style.transition = 'transform 1s ease-in-out'; // Re-enable the transition
            moveTestimonialSlide(1);
        }, 20);
    } else {
        currentTestimonialIndex = index;
        const offset = -currentTestimonialIndex * 33.3333;
        container.style.transform = `translateX(${offset}%)`;
    }

    updateDots(); // Update dots every time a slide is shown
}

function moveTestimonialSlide(step) {
    currentTestimonialIndex += step;

    if (currentTestimonialIndex === totalTestimonialSlides - 1) {
        setTimeout(() => {
            showTestimonialSlides(0); // Move to the first set of slides seamlessly
        }, 1000); // Match with the transition time
    } else {
        showTestimonialSlides(currentTestimonialIndex);
    }
}

function updateDots() {
    dots.forEach(dot => dot.classList.remove('active'));
    dots[currentDotIndex].classList.add('active');
    currentDotIndex = (currentDotIndex + 1) % dots.length; // Move to the next dot in the sequence
}

// Automatic slide change every 4 seconds
setInterval(() => {
    moveTestimonialSlide(1);
}, 4000);

// Initialize the first slide and highlight the first dot
showTestimonialSlides(0);
updateDots();
