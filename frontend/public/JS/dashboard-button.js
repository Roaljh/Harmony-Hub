// Get the modal and buttons
var modal = document.getElementById("customModal");
var openModalBtn = document.getElementById("openModalBtn");
var closeModalBtn = document.getElementById("closeModalBtn");

// Open the modal when the 'Create' button is clicked
openModalBtn.onclick = function () {
  modal.style.display = "block";
}

// Close the modal when the 'x' button is clicked
closeModalBtn.onclick = function () {
  modal.style.display = "none";
}

// Close the modal if the user clicks outside the modal content
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
