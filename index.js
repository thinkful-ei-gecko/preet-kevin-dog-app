'use strict';

function getDogImages(amount) {
  fetch(`https://dog.ceo/api/breeds/image/random/${amount}`)
    .then(response => response.json())
    .then(responseData => {
      const extractedImages = extractData(responseData, amount);
      displayOnDom(extractedImages);
    })
    .catch(error => console.log(error));
}

function extractData(jsonData, amount) {
  const allImages = [];
  for(let i = 0; i < amount; i++) {
    let imageURL = jsonData.message[i];
    allImages.push(imageURL);
    console.log(imageURL);
  }
  return allImages; 
}

function displayOnDom(imageArr) {
  let imgString = ``;
  for(let i = 0; i < imageArr.length; i++){
    imgString += `<img src="${imageArr[i]}">`
  }
  $('.js-display-images').html(imgString);
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