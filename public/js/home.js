async function loadUserCategory() {

  let res = await fetch("/userCategoryList", {
    headers: { Accept: "application/json" },
  });

  let json = await res.json();
        if (json.error) {
          alert(json.error);
          return;
        }

// let userCategories = document.querySelector('.category-photo-container')
// console.log(json);
 
//for (let category of json) {
for (let category of json.userCategoryChoices) {
  console.log({category});
  let node =  document.querySelector("#categoryTemplate").content.cloneNode(true);
 
  node.querySelector("img").src = category.user_image ;
  console.log(category.user_image);
  node.querySelector("img").alt = category.name ;
  node.querySelector(".card-title").textContent = category.name ;
  node.querySelector("a").href = `/event-list.html?id=${category.id}`; 

  let container = document.querySelector('.category-photo-container');
    container.appendChild(node);
  
}

for (let category of json.anotherCategoryChoices) {
    console.log({category});
    let node =  document.querySelector("#categoryTemplateTwo").content.cloneNode(true);
  
    node.querySelector("img").src = category.user_image ;
    node.querySelector("img").alt = category.name ;
    node.querySelector(".card-title").textContent = category.name ;
    node.querySelector("a").href = `/event-list.html?id=${category.id}`;

    let container = document.querySelector('.another-container');
    container.appendChild(node);
  }

return;

}

loadUserCategory();
  
  

// successful dom for about your choices on 8 Aug
// let categoryList = document.querySelector('.category-photo-container')

// function loadUserCategory(category) {
//   let div = document.createElement('div')
//   div.classList.add('card')
//   div.setAttribute("id", category) // set variable as id's value

//   //insert variable as photo src, alt, card-title
//   div.innerHTML = /* html */`
//      <img src="/photo/${category}-category.jpg" class="card-img" alt="${category}">  
//           <div class="card-body">
//             <div class="card-title">${category}</div>
//             <a href="/showshow/public/category.html" class="btn btn-primary btn-sm">Go somewhere</a>
//           </div>`

//   div.querySelector('a').href += '?id=' +
//     categoryList.appendChild(div) + category.id  //TODO need to add function(category)
// }

// loadUserCategory('Hiking')
// loadUserCategory('Health')
// loadUserCategory('Party-Room')
// loadUserCategory('VR-Game')
// loadUserCategory('War-Game')
// loadUserCategory('Music')

// successful dom for look for more on 8 Aug
let categoryListTwo = document.querySelector('.another-container')

function loadAnotherCategory(category) {
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
  categoryListTwo.appendChild(div) + category.id  //TODO need to add function(category)
}

// loadAnotherCategory('Hiking')



// // TODO assume database input info into browser
// // let result = [{ id: 1, name: "hiking", image: "hiking-category.jpg" }, { id: 2, name: "music", image: "music-category.jpg" }]
// // for (let record of result) {
// //     loadCategory(record.name)
// // }


// async function getUserCategory() {
//   let res = await fetch("/")
// }

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