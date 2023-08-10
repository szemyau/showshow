let eventImage = document.querySelector('.event-list')
document.querySelector("#create-form").addEventListener("submit",(e)=>{
    submitForm(e)

})

async function submitForm(event) {
    event.preventDefault()

    let form = event.target
    let res = await fetch ('/create-event', {
        method: form.method,
        body: new FormData(form),
    })

    let json = await res.json()
    console.log('submit form result:', json)
    if (json.error) {
    Swal.fire('Failed to post memo', json.error, 'error')
    return
    } 
    showImagePreview(json)
}

function showImagePreview(event) {

    let imageDiv = document.createElement('div')
    imageDiv.innerHTML= `<div class="event-details">
    <img src="/photo/party-room.jpg" alt="Event Photo 1" />
    </div>
    <span class="img-preview">Event Image Preview</span>
    </div>`
    
    imageDiv.querySelector('img').src = event.user_create_event_image;
    imageDiv.querySelector('img').alt = event.name;
    eventImage.appendChild(imageDiv)
    
    }
    
    
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