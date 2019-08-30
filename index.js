'use strict';

function getDogImages(amount) {
  fetch(`https://dog.ceo/api/breeds/image/random/${amount}`)
    .then(response => response.json())
    .then(responseData => {
      const extractedImages = extractAllDogImages(responseData, amount);
      displayDogImages(extractedImages);
    })
    .catch(error => console.log(error));
}

function extractAllDogImages(jsonData, amount) {
  console.log(jsonData);
  const allImages = [];
  for(let i = 0; i < amount; i++) {
    let imageURL = jsonData.message[i];
    allImages.push(imageURL);
    console.log(imageURL);
  }
  return allImages; 
}

function extractBreed(jsonData) {
  return jsonData.message;
} 

function displayDogImages(imageArr) {
  let imgString = ``;
  for(let i = 0; i < imageArr.length; i++){
    imgString += `<img src="${imageArr[i]}">`;
  }
  $('.js-display-images').html(imgString);
}

function displayBreedImage(imageString) {
  $('.js-single-random').html(`<img src="${imageString}">`);
}

function displayError(errorMsg) {
  $('.js-single-random').html(`<span style="font-weight:bold;color:red">${errorMsg}</span>`);
}

function getBreedImage(breed) {
  fetch(`https://dog.ceo/api/breed/${breed}/images/random`)
    .then(response => response.json())
    .then(responseData => {
      if (responseData.status === 'error'){
        throw Error (responseData.message);
      }
      const breedImage = extractBreed(responseData);
      displayBreedImage(breedImage);
    })
    .catch(error => displayError(error));
}

// another method
function tryGetBreedImage(breed) {
  fetch(`https://dog.ceo/api/breeds/list/all`)
    .then(response => response.json())
    .then(responseData => {
      if (breed in responseData.message) {
        getBreedImage(breed);
      }
      else {
        throw Error (`${breed} breed doesn't exist!`);
      }
    })
    .catch(error => console.log(error));
}

function handleSubmitDogImagesClicked() {
  $('#dogImages-form').on('click', '.js-submit-amount', event => {
    event.preventDefault();
    let amount = $('.js-input-amount').val();
    if (amount) {
      amount = Math.min(amount, 50);
    }
    else {
      amount = 1;
    }
    getDogImages(amount);
  });
}

function handleSubmitDogImagesClicked() {
  $('#dogImages-form').on('click', '.js-submit-amount', event => {
    event.preventDefault();
    let amount = $('.js-input-amount').val();
    if (amount > 50 || amount < 1) {
      alert('Enter a number between 1 and  50');
    }
    else {
      getDogImages(amount);
    }
  });
}

function handleSubmitBreedImageClicked() {
  $('#breedImage-form').on('click', '.js-submit-breed', event => {
    event.preventDefault();
    let breed = $('.js-input-breed').val().toLowerCase();
    getBreedImage(breed);
  });
}

// bind event listeners
$(() => {
  handleSubmitDogImagesClicked();
  handleSubmitBreedImageClicked();
});