document.querySelectorAll('.review-item').forEach(item => {
    item.addEventListener('click', function() {
        window.location.href = 'signup.html';
    });
});