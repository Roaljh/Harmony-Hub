document.querySelectorAll('.artwork-item').forEach(item => {
    item.addEventListener('click', function() {
        window.location.href = '/signup';
    });
});

function showGenre(genre) {
    const grids = document.querySelectorAll('.artwork-grid');
    grids.forEach(grid => {
        grid.style.display = 'none';
    });

    const selectedGrid = document.getElementById(genre);
    if (selectedGrid) {
        selectedGrid.style.display = 'flex';
    }
}
