let card = document.querySelector(".card");
let editBtn = document.querySelector(".edit-btn");

function toISODate(str) {
  let date = new Date(str);
  let y = date.getFullYear();
  let m = date.getMonth() + 1;
  let d = date.getDate();
  let output = `${y}-${d2(m)}-${d2(d)}`;
  console.log("toISODate", { str, y, m, d, output });
  return output;
}

function d2(x) {
  if (x < 10) {
    return "0" + x;
  }
  return x;
}

async function loadEventProfile() {
  let res = await fetch("/events/by-me");
  let json = await res.json();
  if (json.error) {
    console.log(json.error);
    Swal.fire("Failed to load event profiles", json.error, "error");
    return;
  }
  // console.log(json);
  for (let event of json.events) {
    console.log(`event:`, event);
    event.card_id = "event-" + event.id;

    let { event_date, event_time } = event;

    event.created_at = new Date(event.created_at).toLocaleString();
    event.event_date = new Date(event.event_date).toLocaleDateString();
    event.event_time = event.event_time
      ? event.event_time.replace(/:00$/, "")
      : "12:00";

    //edit function
    event.edit = async function () {
      let card = document.getElementById("event-" + event.id);
      console.log("edit event:", event, card);

      let eventNameNode = card.querySelector("[data-text=name]");
      eventNameNode.textContent = "";
      let input = document.createElement("input");
      input.name = "event_name";
      input.value = event.name;
      eventNameNode.appendChild(input);

      let eventDateNode = card.querySelector("[data-text=event_date]");
      eventDateNode.textContent = "";
      input = document.createElement("input");
      input.name = "event_date";
      input.type = "date";
      input.value = toISODate(event_date);
      eventDateNode.appendChild(input);

      let eventTimeNode = card.querySelector("[data-text=event_time]");
      eventTimeNode.textContent = "";
      input = document.createElement("input");
      input.name = "event_time";
      input.type = "time";
      input.value = event_time;
      eventTimeNode.appendChild(input);

      let editBtn = card.querySelector(".edit-btn");
      editBtn.hidden = true;

      let saveBtn = card.querySelector(".save-btn");
      saveBtn.hidden = false;

      let form = card;
      let event_id = event.id;
      form.onsubmit = async (event) => {
        event.preventDefault();
        let res = await fetch(form.action.replace(":id", event_id), {
          method: form.getAttribute("method"),
          body: new FormData(form),
        });
        let json = await res.json();
        console.log("edit event result:", json);
        if (json.error) {
          Swal.fire("Failed to edit event", json.error, "error");
          return;
        }
        loadEventProfile();
      };

      return;
      console.log("edit event NAME:", event.name);
      console.log(`edit`);

      const { value: formValues } = await Swal.fire({
        title: "Edit your event",
        html:
          ` span>Event Name: <input id="swal-input1" class="swal2-input" value="${event.name}"></span>` +
          `<span>Event Date: <input id="swal-input2" class="swal2-input" value=${event.event_date}></span>` +
          `<span>Event Time: <input id="swal-input3" class="swal2-input" value=${event.event_time}></span>` +
          ``,
        focusConfirm: false,
        preConfirm: () => {
          return {
            event_name: document.getElementById("swal-input1").value,
            event_date: document.getElementById("swal-input2").value,
            event_time: document.getElementById("swal-input3").value,
          };
        },
      });

      if (formValues) {
        Swal.fire("your requested has been updated!");
        console.log("wtf", formValues);

        //fetch path :

        // let id = button.value;

        let res = await fetch("/events/" + event.id, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formValues),
        });
        let json = await res.json();
        if (json.error && res.status != 404) {
          Swal.fire("Failed to edit form", json.error, "error");
          return;
        }
        location.reload();
      }
    };
  }
  renderTemplate(eventList, json); //eventList = html "id"
}

loadEventProfile();

async function deleteEvent(button) {
  let id = button.value;
  console.log("delete event", id);
  let res = await fetch("/events/" + id, { method: "DELETE" });
  let json = await res.json();
  if (json.error && res.status != 404) {
    Swal.fire("Failed to delete form", json.error, "error");
    return;
  }
  let node = button.closest(".card");
  node.remove();
  let toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });
  toast.fire({ icon: "success", title: "Deleted Event #" + id });
}

// check if login or not <add katy's logout function>
async function loginStatus() {
  let res = await fetch("/role");
  // console.log(`check login status: ${res}`);
  if (res) {
    document.querySelector("#login_button").style.display = "none";
    document.querySelector("#signup_button").style.display = "none";
    document.querySelector("#logout_button").style.display = "block";
  } else {
    document.querySelector("#login_button").style.display = "block";
    document.querySelector("#signup_button").style.display = "block";
    document.querySelector("#logout_button").style.display = "none";
  }
}
loginStatus();

// async function editEvent(editBtn) {
//   console.log("edit");

//   const { value: formValues } = await Swal.fire({
//     title: "Multiple inputs",
//     html:
//       '<input id="swal-input1" class="swal2-input">' +
//       '<input id="swal-input2" class="swal2-input">',
//     focusConfirm: false,
//     preConfirm: () => {
//       return [
//         document.getElementById("swal-input1").value,
//         document.getElementById("swal-input2").value,
//       ];
//     },
//   });

//   if (formValues) {
//     Swal.fire(JSON.stringify(formValues));
//   }
// }
