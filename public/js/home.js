// successful dom
// let categoryList = document.querySelector('.category-photo-container')

// //create photo container
// let div = document.createElement('div');
// div.classList.add('photoContainer')

// //create image
// const image = document.createElement('img');
// image.src = "./photo/yoga-choice.jpg"

// //append image into photo container
// div.appendChild(image)
// categoryList.appendChild(div)


// fail dom

// // add selected category cards into 'category-photo-container'
// let categoryList = document.querySelector('category-photo-container')

// function showCategory(category) {

//     // create the category card element
//     const categoryCard = document.createElement('div');
//     categoryCard.classList.add('card');
//     categoryCard.style.width = '10rem';
//     categoryCard.id = category.id; //parameter

//     // create the category image
//     const categoryImage = document.createElement('img');
//     categoryImage.src = category.imageUrl; //parameter
//     categoryImage.classList.add('card-img-top');
//     categoryImage.alt = category.id; ////parameter
//     categoryCard.appendChild(categoryImage);

//     // Create the category body
//     const categoryBody = document.createElement('div');
//     categoryBody.classList.add('card-body');

//     //// Create the category title
//     const categoryTitle = document.createElement('div');
//     categoryTitle.classList.add('card-title', 'd-flex', 'justify-content-center');
//     categoryTitle.textContent = category.title; //parameter
//     categoryBody.appendChild(categoryTitle);

//     // Create the category link
//     const categoryLink = document.createElement('a');
//     categoryLink.href = category.link; //parameter
//     categoryLink.classList.add('btn', 'btn-primary', 'btn-sm');
//     categoryLink.textContent = 'Go somewhere';
//     categoryBody.appendChild(categoryLink);

//     // start to append all html elements into container
//     // Append the category body to the category card
//     categoryCard.appendChild(categoryBody);

//     // Append the category card to the category list
//     categoryList.appendChild(categoryCard);

// }

// showCategory({
//     id: 'health',
//     imageUrl: './photo/yoga-choice.jpg',
//     title: 'Health',
//     link: '#'
// });