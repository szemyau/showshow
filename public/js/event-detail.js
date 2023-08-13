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
