// document.querySelector("#name").textContent = "hi";
// let cardContainer = document.querySelector(".card-container");
// console.log(`cardContainer`, cardContainer);

let card = document.querySelector(".card");
console.log("card:", card);

async function loadEventProfile() {
  let res = await fetch("/events/by-me");
  let json = await res.json();
  if (json.error) {
    console.log(json.error);
    Swal.fire("Failed to load event profiles", json.error, "error");
    return;
  }
  console.log(json);
  for (let event of json.events) {
    event.created_at = new Date(event.created_at).toLocaleString();
    event.event_date = new Date(event.event_date).toLocaleDateString();
    event.event_time = event.event_time.replace(/:00$/, "");
  }
  renderTemplate(eventList, json); //eventList = html "id"

  console.log(`events:`, json.events);
  console.log(`delete event:`, json.deleteEvent);
  // for (let event of json.deleteEvent) {
  //   console.log(event);

  cardContainer
    .querySelector(".del-btn")
    .addEventListener("click", () => deleteEvent());
}
// do i need to renderTemplate? i guess no becaz i only need to render html one time only

loadEventProfile();

async function deleteEvent() {
  let res = await fetch("/events/" + id, { method: "DELETE" });
  let json = await res.json();
  if (json.error && res.status != 404) {
    Swal.fire("Failed to delete memo", json.error, "error");
    return;
  }
  cardContainer.remove();
}
