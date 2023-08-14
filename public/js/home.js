async function loadUserCategory() {
  let res = await fetch("/userCategoryList", {
    headers: { Accept: "application/json" }, //what type of data the client expect to receive
  });

  let json = await res.json();
  if (json.error) {
    alert(json.error);
    return;
  }

  // console.log(json);
  // json.userCategoryChoices.push(...json.userCategoryChoices);
  // json.userCategoryChoices.pop();

  if (json.userCategoryChoices.length > 0) {
    chosenCategoryList.textContent = "";

    // extract categories selected by client
    for (let category of json.userCategoryChoices) {
      // userCategoryChoices = extract from server
      let node = chosenCategoryTemplate.content.cloneNode(true); // combine html and server

      node.querySelector("img").src = category.user_image;
      node.querySelector("img").alt = category.name;
      node.querySelector(".card-title").textContent = category.name;
      node.querySelector("a").href = `/event-list.html?id=${category.id}`;

      chosenCategoryList.appendChild(node);
    }
  }

  // using data template to generate the choices which are selected by client
  for (let category of json.anotherCategoryChoices) {
    category.link = `/event-list.html?id=${category.id}`;
  }
  renderTemplate(anotherCategoryList, json);
  console.log(`anotherCategoryList:`, anotherCategoryList);
}

loadUserCategory();

// check if login or not <add katy's logout function>
async function loginStatus() {
  console.log(`loginstatus function run`);
  let res = await fetch("/role");

  let result = await res.json();

  if (result.error) {
    return;
  }

  console.log(`check login status:`);
  console.log({ result });

  if (result.isLogin) {
    document.querySelector("#login_button").style.display = "none";
    document.querySelector("#signup_button").style.display = "none";
    document.querySelector("#logout_button").style.display = "block";
  } else {
    document.querySelector("#login_button").style.display = "block";
    document.querySelector("#signup_button").style.display = "block";
    document.querySelector("#logout_button").style.display = "none";
  }
}

loginStatus();
// successful dom for look for more on 8 Aug
// let categoryListTwo = document.querySelector(".another-container");

// function loadAnotherCategory(category) {
//   let div = document.createElement("div");
//   div.classList.add("card");
//   div.setAttribute("id", category); // set variable as id's value

//   //insert variable as photo src, alt, card-title
//   div.innerHTML = /* html */ `
//      <img src="/photo/${category}-category.jpg" class="card-img" alt="${category}">
//           <div class="card-body">
//             <div class="card-title">${category}</div>
//             <a href="/showshow/public/category.html" class="btn btn-primary btn-sm">Go somewhere</a>
//           </div>`;

//   div.querySelector("a").href +=
//     "?id=" + categoryListTwo.appendChild(div) + category.id;
// }

async function logout() {
  console.log("logout");
  let res = await fetch("/logout");
  let result = await res.json();
  await loginStatus();
}
