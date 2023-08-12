async function loadUserCategory() {
  let res = await fetch("/userCategoryList", {
    headers: { Accept: "application/json" },
  });

  let json = await res.json();
  if (json.error) {
    alert(json.error);
    return;
  }

  console.log(json);

  // json.userCategoryChoices.push(...json.userCategoryChoices);
  // json.userCategoryChoices.pop();

  if (json.userCategoryChoices.length > 0) {
    chosenCategoryList.textContent = "";

    // beeno demo data template
    // for (let category of json.userCategoryChoices) {
    //   category.link = `/event-list.html?id=${category.id}`;
    // }
    // renderTemplate(chosenCategoryList2, json);
    // end

    // const templateElement = document.getElementById("chosenCategoryList2");
    // templateElement.removeAttribute("data-template");

    // put image into specific area
    for (let category of json.userCategoryChoices) {
      let node = chosenCategoryTemplate.content.cloneNode(true);

      node.querySelector("img").src = category.user_image;
      node.querySelector("img").alt = category.name;
      node.querySelector(".card-title").textContent = category.name;
      node.querySelector("a").href = `/event-list.html?id=${category.id}`;

      chosenCategoryList.appendChild(node);
    }
  }

  // beeno demo data template
  for (let category of json.anotherCategoryChoices) {
    category.link = `/event-list.html?id=${category.id}`;
  }
  renderTemplate(moreCategoryList, json);
  // end;

  for (let category of json.anotherCategoryChoices) {
    let node = moreCategoryTemplate.content.cloneNode(true);

    node.querySelector("img").src = category.user_image;
    node.querySelector("img").alt = category.name;
    node.querySelector(".card-title").textContent = category.name;
    node.querySelector("a").href = `/event-list.html?id=${category.id}`;

    moreCategoryList.appendChild(node);
    console.log(moreCategoryList);
  }
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
let categoryListTwo = document.querySelector(".another-container");

function loadAnotherCategory(category) {
  let div = document.createElement("div");
  div.classList.add("card");
  div.setAttribute("id", category); // set variable as id's value

  //insert variable as photo src, alt, card-title
  div.innerHTML = /* html */ `
     <img src="/photo/${category}-category.jpg" class="card-img" alt="${category}">  
          <div class="card-body">
            <div class="card-title">${category}</div>
            <a href="/showshow/public/category.html" class="btn btn-primary btn-sm">Go somewhere</a>
          </div>`;

  div.querySelector("a").href +=
    "?id=" + categoryListTwo.appendChild(div) + category.id; //TODO need to add function(category)
}
