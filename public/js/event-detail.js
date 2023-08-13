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
  console.log(json.event);
  console.log(json.isJoined);

  if (json.isJoined) {
    Swal.fire("Joined successfully!", "See you later!", "success");
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

let parmas = new URLSearchParams(location.search);
let id = parmas.get("id");
console.log({ id });
// join event
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
      join: true,
    };

    // ajax to call server
    const res = await fetch(`/event-detail/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formObject),
    });

    form.reset();
    location.reload();

    // get back data once ready
    const result = await res.json();
    console.log({ result });

    if (result.error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: result.error,
      }).then(function () {
        window.location = "/login.html";
      });
      return;
    }
    // if no more error, redirect to select category
  });
