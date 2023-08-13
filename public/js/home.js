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
  // end;

  // for (let category of json.anotherCategoryChoices) {
  //   let node = moreCategoryTemplate.content.cloneNode(true);

  //   node.querySelector("img").src = category.user_image;
  //   node.querySelector("img").alt = category.name;
  //   node.querySelector(".card-title").textContent = category.name;
  //   node.querySelector("a").href = `/event-list.html?id=${category.id}`;

  //   moreCategoryList.appendChild(node);
  //   console.log(moreCategoryList);
  // }
}

loadUserCategory();
