async function loadCategoryList() {
    let res = await fetch("/category-list", {
      headers: { Accept: "application/json" },
    });

    let json = await res.json();
    if (json.error) {
      alert(json.error);
      return;
    }
    console.log(json);

    let categoryList = document.querySelector(".categoryListContainer");

    for (let category of json) {
      let node = categoryTemplate.content.cloneNode(true);
      node.querySelector("img").src = category.image;
      node.querySelector("img").alt = category.name;
      node.querySelector("label span").textContent = category.name;
      node.querySelector("label input").value = category.id;
      categoryList.appendChild(node);
    }

    return;
  }

  loadCategoryList();