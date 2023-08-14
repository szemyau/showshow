// document.querySelector("#name").textContent = "hi";
// let cardContainer = document.querySelector(".card-container");
// console.log(`cardContainer`, cardContainer);

let card = document.querySelector(".card");
console.log("card:", card);
let editBtn = document.querySelector(".edit-btn");

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

    //edit function
    event.edit = async function () {
      console.log("edit event:", event);
      console.log("edit event NAME:", event.name);

      const { value: formValues } = await Swal.fire({
        title: "Edit your event",
        html:
          `<span>Event Name: <input id="swal-input1" class="swal2-input" value="${event.name}"></span>` +
          `<span>Event Date: <input id="swal-input2" class="swal2-input" value=${event.event_date}></span>` +
          `<span>Event Time: <input id="swal-input2" class="swal2-input" value=${event.event_time}></span>` +
          ``,
        focusConfirm: false,
        preConfirm: () => {
          return `Your event has been updated!`;
        },
        // preConfirm: () => {
        //   return [
        //     (document.getElementById("swal-input1").value = event.name),
        //     (document.getElementById("swal-input2").value = "1"),
        //   ];
        // },
      });

      if (formValues) {
        Swal.fire(JSON.stringify(formValues));
      }
      // event.created_at = new Date(event.created_at).toLocaleString();
      // event.event_date = new Date(event.event_date).toLocaleDateString();
      // event.event_time = event.event_time.replace(/:00$/, "");
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
    Swal.fire("Failed to delete memo", json.error, "error");
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
  console.log(`loginstatus function run`);
  let res = await fetch("/role");
  console.log(`check login status: ${res}`);
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

async function editEvent(editBtn) {
  console.log("edit");

  const { value: formValues } = await Swal.fire({
    title: "Multiple inputs",
    html:
      '<input id="swal-input1" class="swal2-input">' +
      '<input id="swal-input2" class="swal2-input">',
    focusConfirm: false,
    preConfirm: () => {
      return [
        document.getElementById("swal-input1").value,
        document.getElementById("swal-input2").value,
      ];
    },
  });

  if (formValues) {
    Swal.fire(JSON.stringify(formValues));
  }
}
