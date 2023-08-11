async function loadCategoryList() {
  const res = await fetch("/category-list", {
    headers: { Accept: "application/json" },
  });

  let json = await res.json();
  if (json.error) {
    next();
    Swal.fire({
      icon: "error",
      title: "Error",
      text: json.error,
    });
    return;
  }
  //   } else {
  //     const sweetAlertOptions = {
  //       icon: "error",
  //       title: "Error",
  //       text: result.error,
  //     };

  //     // Redirect to the login page when the "OK" button is clicked
  //     const sweetAlertCallback = () => {
  //       res.redirect("/login");
  //     };

  //     // Display the Sweet Alert dialog and execute the callback when the user clicks "OK"
  //     Swal.fire(sweetAlertOptions).then(sweetAlertCallback);
  //   }
  // }

  // return;

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
