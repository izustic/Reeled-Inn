//header sticky
const header = document.querySelector('#header')
window.addEventListener('scroll', fixNav)

function fixNav(){
    if(window.scrollY > header.offsetHeight + 100){
        header.classList.add('active')
    } else{
        header.classList.remove('active')
    }
}

$(".custom-carousel").owlCarousel({
    autoWidth: true,
    loop: true
  });
  $(document).ready(function () {
    $(".custom-carousel .item").click(function () {
      $(".custom-carousel .item").not($(this)).removeClass("active");
      $(this).toggleClass("active");
    });
  });


  //for login

  $('.message a').click(function(){
    $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
 });

//  //for Update
//  function handleEdit(elementId) {
//   const el = document.getElementById(elementId);

//   const inputTitle = document.getElementById('inputTitle');
//   const inputDesc = document.getElementById('inputDescription');
//   const inputImage = document.getElementById('inputImage');
//   const inputPrice = document.getElementById('inputPrice');

//   // Access child elements of el using the same syntax
//   inputTitle.textContent = el.querySelector('#inputTitle').textContent;
//   inputDesc.textContent = el.querySelector('#inputDescription').textContent;
//   inputImage.style.backgroundImage = `url('${el.querySelector('#inputImage').style.backgroundImage.slice(5, -2)}')`;
//   inputPrice.textContent = el.querySelector('#price').textContent;

//   let menuId = elementId.split('@')[1]

// }

// When the update button is clicked
// $('#updateModal').on('show.bs.modal', function (event) {
//   var button = $(event.relatedTarget) // Button that triggered the modal
//   var movieId = button.closest('.containar').attr('id').split('@')[1] // Extract the movie ID from the container ID
//   var modal = $(this)

//   // Fetch the movie details from the server
//   $.ajax({
//     url: '/dashboard/get_movie',
//     method: 'POST',
//     data: { id: movieId },
//     success: function (data) {
//       // Pre-fill the form with the movie details
//       modal.find('#movieId').val(movieId)
//       modal.find('#title').val(data.title)
//       modal.find('#description').val(data.description)
//       modal.find('#price').val(data.price)
//       modal.find('#image').val(data.image)
//     },
//     error: function (error) {
//       console.log(error)
//     }
//   })
// })


const addButton = document.getElementById("add-movie-button"); 
const form = document.getElementById("add-movie-form"); 
addButton.addEventListener("click", () => { 
  form.style.display = form.style.display === "none" ? "block" : "none"; 
}); 
const updateButtons = document.querySelectorAll('#update-movie-button'); 
updateButtons.forEach(button => { 
  button.addEventListener('click', (event) => { 
    const movieCard = event.target.closest('.movie-card'); 
    const updateForm = movieCard.querySelector('.update-form'); 
    updateForm.style.display = 'block'; 
  }); 
});

