let card = document.querySelector(".card");
let editBtn = document.querySelector(".edit-btn");

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
    event.created_at = new Date(event.created_at).toLocaleString();
    event.event_date = new Date(event.event_date).toLocaleDateString();
    event.event_time = event.event_time
      ? event.event_time.replace(/:00$/, "")
      : "12:00";

    //edit function
    event.edit = async function () {
      console.log("edit event:", event);
      console.log("edit event NAME:", event.name);
      console.log(`edit`);

      const { value: formValues } = await Swal.fire({
        title: "Edit your event",
        html:
          `<span>Event Name: <input id="swal-input1" class="swal2-input" value="${event.name}"></span>` +
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
