'use strict';

function getDogImages(amount) {
  fetch(`https://dog.ceo/api/breeds/image/random/${amount}`)
    .then(response => response.json())
    .then(responseData => extractData(responseData, amount))
    .catch(error => console.log(error));
}

function extractData(jsonData, amount) {
  for(let i = 0; i < amount; i++) {
    let imageURL = jsonData.message[i];
    console.log(imageURL);
  }
}

function appendToDOM() {

}

function handleSubmitClicked() {
  $('form').on('submit', event => {
    event.preventDefault();
    let amount = $('.js-input-amount').val();
    if (amount) {
      let dogImages = getDogImages(amount);
    }
  });
}

// bind event listeners
$(handleSubmitClicked());