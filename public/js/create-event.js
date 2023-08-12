let eventImage = document.querySelector(".event-list");

// document.querySelector("#create-form").addEventListener("submit",(e)=>{
//     submitForm(e)
// })

let submitForm = document.querySelector("#create-form");
submitForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  let form = event.target;
  let res = await fetch("/create-event", {
    method: form.method,
    body: new FormData(form),
  });

  let json = await res.json();

  // let json = await res.redirected('/home.html')
  console.log("submit form result:", json);

  if (json.error) {
    console.log(json.error);
    Swal.fire("Failed to submit form", json.error, "error");
    return;
  }

  window.location = "home.html";
  // showImagePreview(json)
});

// function showImagePreview(event) {

//     let imageDiv = document.createElement('div')
//     imageDiv.innerHTML= `<div class="event-details">
//     <img src="/photo/party-room.jpg" alt="Event Photo 1" />
//     </div>
//     <span class="img-preview">Event Image Preview</span>
//     </div>`

//     imageDiv.querySelector('img').src = event.user_create_event_image;
//     imageDiv.querySelector('img').alt = event.name;
//     eventImage.appendChild(imageDiv)

//     }

function loadFile(event) {
  var reader = new FileReader();
  reader.onload = function () {
    var output = document.getElementById("output");
    output.src = reader.result;
  };
  reader.readAsDataURL(event.target.files[0]);
}
//     let img = node.querySelector('.memo-image')
//   if (memo.filename) {
//     img.src = '/uploads/' + memo.filename
//   } else {
//     img.remove()
//   }
//   memoList.appendChild(node)
// }

// showImagePreview({user_create_event_image:'/photo/party-room.jpg', name: 'music' })

// eventImage.remove()

// let eventGroup = document.querySelector('.list-group');
// let eventTemplate = eventGroup.querySelector('.list-group-item');
// console.log(eventTemplate);

// function showEvent(event) {
//     let node = eventTemplate.cloneNode(true)
//     console.log(node);
//     // event.node = node
//     // node.querySelector('.event-name').textContent = event.name;
//     node.querySelector('.event-name').textContent = event.name;
//     console.log(event.name);

//     node.querySelector('img').src = event.user_create_event_image;
//     node.querySelector('img').alt = event.name;
//     node.querySelector('.event-time').textContent = `Event will be held on ${event.event_date} at ${event.event_time}`
//     node.querySelector('.venue').textContent = `Location: ${event.event_location}`
//     eventGroup.appendChild(node)
// }

// showEvent({name:'go to hiking',user_create_event_image:"/photo/party-room.jpg",
// event_date:'2023-08-10', event_time:'11:00', event_location: 'Wong Tai Sin' })

// check if login or not
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
