
let categoryList = document.querySelector('.category-photo-container')

function loadCategory(category) {
    let div = document.createElement('div')
    div.classList.add('card')
    div.setAttribute("id", category) // set variable as id's value

    //insert variable as photo src, alt, card-title
    div.innerHTML = /* html */`
     <img src="/photo/${category}-category.jpg" class="card-img" alt="${category}">  
          <div class="card-body">
            <div class="card-title">${category}</div>
            <a href="/showshow/public/category.html" class="btn btn-primary btn-sm">Go somewhere</a>
          </div>`

    div.querySelector('a').href += '?id=' +
        categoryList.appendChild(div) + category.id  //TODO need to add function(category)
}

// loadCategory('hiking')
// loadCategory('health')
// loadCategory('music')
// loadCategory('party-room')
// loadCategory('vr-game')
// loadCategory('war-game')

// assume database input info into browser
// let result = [{ id: 1, name: "hiking", image: "hiking-category.jpg" }, { id: 2, name: "music", image: "music-category.jpg" }]
// for (let record of result) {
//     loadCategory(record.name)
// }


async function getUserCategory() {
    let res = await fetch("/")
}





// cant load js logic

// let categoryList = document.querySelector('.category-photo-container')

// function loadCategory(category) {
//     let div = document.createElement('div')
//     div.classList.add('card')
//     div.setAttribute("id", category) // set variable as id's value

//     //insert variable as photo src, alt, card-title
//     div.innerHTML = /* html */`
//  <img src="./photo/${category}-category.jpg" class="card-img" alt="${category}">  
//       <div class="card-body">
//         <div class="card-title">${category}</div>
//         <a href="/showshow/public/category.html" class="btn btn-primary btn-sm">Go somewhere</a>
//       </div>`

//     div.querySelector('a').href += '?id=' +
//         categoryList.appendChild(div) + category.id  //TODO need to add function(category)
// }

// loadCategory('hiking')
// loadCategory('health')
// loadCategory('music')
// loadCategory('party-room')
// loadCategory('vr-game')
// loadCategory('war-game')





// let categoryList = document.querySelector('.category-photo-container')

// let div = document.createElement('div')
// div.classList.add('card')
// div.setAttribute("id", "hiking") // id = variable

// div.innerHTML = /* html */`
// <img src="./photo/hiking-category.jpg" class="card-img" alt="hiking">
// <img src="./photo/hiking-category.jpg" class="card-img" alt="hiking">
//           <div class="card-body">
//             <div class="card-title">Hiking</div>
//             <a href="/showshow/public/category.html" class="btn btn-primary btn-sm">Go somewhere</a>
//           </div>
// </div>`




//  // successful dom
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