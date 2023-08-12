// document.querySelector("#name").textContent = "hi";

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
  renderTemplate(eventList, json);
}

loadEventProfile();
