// const { response } = require("express");

document.addEventListener('DOMContentLoaded', function () {
  // Initialize modal
  var elems = document.querySelectorAll('.modal');
  var instances = M.Modal.init(elems, {});

  //  Data for cards
  // var cardList = [
  //   { title: 'Kitten 1', image: 'images/kitten.jpeg', link: '#', description: 'Description for kitten 1' },
  //   { title: 'Kitten 2', image: 'images/kitten2.jpeg', link: '#', description: 'Description for kitten 2' },
  //   { title: 'Kitten 3', image: 'images/kitten3.jpeg', link: '#', description: 'Description for kitten 3' }
  // ];

  const getcards = () => {
    $.get('/api/cards', (response) => {
      if (response.statusCode == 200) {
        addCards(response.cards)
      }
    })
  }

  // Function to add cards dynamically
  function addCards(cardList) {
    var cardContainer = document.getElementById('card-container');
    cardList.forEach(function (card) {
      var cardHtml = `
          <div class="col s12 m4">
            <div class="card">
              <div class="card-image">
                <img src="${card.image}" alt="${card.title}" height="200" width="100%">
              </div>
              <div class="card-content">
                <span class="card-title">${card.title}</span>
                <p>${card.description}</p>
              </div>
            </div>
          </div>`;
      cardContainer.innerHTML += cardHtml;
    });
  }

  getcards();

  // Form Submission Handling
  document.getElementById('myForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent default form submission
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var message = document.getElementById('message').value;
    console.log('Name: ', name);
    console.log('Email: ', email);
    console.log('Message: ', message);
  });
});
