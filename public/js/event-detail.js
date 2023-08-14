async function loadEventDetail() {
  let event_id = new URLSearchParams(location.search).get("id");
  let res = await fetch("/events/" + event_id, {
    headers: { Accept: "application/json" },
  });
  let json = await res.json();
  if (json.error) {
    alert(json.error);
    return;
  }
  console.log(`json.event:`);
  console.log(json.event);

  console.log(`json.isJoined:`);
  console.log(json.isJoined);

  if (json.isJoined) {
    button = document.querySelector("#join-button");
    document.querySelector("#join-button").setAttribute("disabled", "");
  }

  let content = document.querySelector("#about .content");
  content.textContent = "";
  json.event.about.split("\n").forEach((text) => {
    text = text.trim();
    if (!text) return;
    let p = document.createElement("p");
    p.textContent = text;
    content.appendChild(p);
  });
}
loadEventDetail();

// let parmas = new URLSearchParams(location.search);
// let id = parmas.get("id");
// console.log(`parmas event id: ${id}`);

// join event call
document
  .querySelector("#join-form")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const form = event.target;
    const formObject = {
      name: form.name.value,
      // people: form.people.value,
      // date: form.date.value,
      message: form.message.value,
    };

    // ajax to call server
    // const res = await fetch(`/event-detail/${id}`, {
    const res = await fetch("/event-detail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formObject),
    });

    // console.log(`action to reset form and auto reload`);
    // form.reset();
    // location.reload();
    // console.log(`action to reset form and auto reload DONE`);
    // Swal.fire("Joined successfully!", "See you later!", "success");

    // get back data once ready
    const result = await res.json();
    console.log(`join event result:`);
    console.log({ result });

    // console.log(`action to reset form and auto reload`);
    // form.reset();
    // location.reload();
    // console.log(`action to reset form and auto reload DONE`);
    // Swal.fire("Joined successfully!", "See you later!", "success");

    if (result.error) {
        console.log(json.error);
        Swal.fire("Failed to submit form", json.error, "error");
        return;
    //   Swal.fire({
        // icon: "error",
        // title: "Error",
        // text: result.error,
      }).then(function () {
        Swal.fire("Joined successfully!", "See you later!", "success");
        console.log(`action to reset form and auto reload`);
        form.reset();
        location.reload();
        console.log(`action to reset form and auto reload DONE`);
        // window.location = "/login.html";
      })
      return;
    });
    //   return;
    // }
    // if no more error, redirect to select category
//   });
