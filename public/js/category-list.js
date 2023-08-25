let categoryList = document.querySelector(".categoryListContainer");

async function loadCategoryList() {
  const res = await fetch("/category-list", {
    headers: { Accept: "application/json" },
  });

  let json = await res.json();
  console.log({ json });
  if (json.error) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: json.error,
    }).then(function () {
      window.location = "/login.html";
    });
    return;
  }

  // method "get" dont need to fetch body
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
