// check if login or not
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

async function loadEventList() {
  console.log(`loadEventList function run`);
  let params = new URLSearchParams(location.search);
  let id = params.get("id");

  // loop to load the event date with category id
  let res = await fetch(`/event-list?id=${id}`);
  let json = await res.json();
  console.log(`load res: ${res}`);
  console.log(`load json: ${json}`);
  let cardList = document.querySelector("#cardList");

  cardList.textContent = "";
  for (let event of json) {
    let node = cardTemplate.content.cloneNode(true);
    node.querySelector("a").href = `/event-detail.html?id=${event.id}`;
    node.querySelector(".event-image").textContent = event.image;
    node.querySelector(".event-date").textContent = event.event_date.substring(
      0,
      10
    );
    node.querySelector(".event-time").textContent = event.event_time.replace(
      /:00$/,
      ""
    );
    node.querySelector(".event-name").textContent = event.name;
    node.querySelector(".event-vacancy").textContent = event.vacancy;
    node.querySelector(".event-quota").textContent = event.quota;
    node.querySelector(".event-status").textContent = event.status;

    cardList.appendChild(node);
  }
}

async function main() {
  await loginStatus();
  await loadEventList();
}
main();

async function logout() {
  console.log("attempt to logout");
  let res = await fetch("/logout");
  let result = await res.json();
  //window.href = "./home.html";
}
