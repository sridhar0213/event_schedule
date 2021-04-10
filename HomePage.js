let eventForm = document.getElementById('eventForm');
let eventName = document.getElementById('eventName');
let eventDescription = document.getElementById("eventDescription");

let startTime = document.getElementById("startTime");

let endTime = document.getElementById("endTime");
let eventsContainer = document.getElementById("eventsContainer")
let day = document.getElementById("day");

let logout = document.getElementById("logout")


logout.addEventListener("click", function() {
    window.location = "index.html";
})

function eventsFromLocalStorage() {
    let stringifiedEvents = localStorage.getItem("eventsArray");
    let parsedEvents = JSON.parse(stringifiedEvents);
    if (parsedEvents === null) {
        return []
    } else {
        return parsedEvents
    }
}
let eventsArray = eventsFromLocalStorage()

function display(each) {
    let listElement = document.createElement("li");
    listElement.classList.add("inner-card", "col-12",
        "col-md-5", "overflow-auto", "d-flex", "flex-column", "justify-content-start")
    eventsContainer.appendChild(listElement)

    let nameContainer = document.createElement("div");
    nameContainer.classList.add("d-flex", "flex-row");
    listElement.appendChild(nameContainer)

    let nameHead = document.createElement("p");
    nameHead.textContent = "Event: "
    nameHead.classList.add("head")
    nameContainer.appendChild(nameHead)

    let nameElement = document.createElement("p")
    nameElement.textContent = each.eventName
    nameContainer.appendChild(nameElement)

    let descriptionContainer = document.createElement("div");
    descriptionContainer.classList.add("d-flex", "flex-row");
    listElement.appendChild(descriptionContainer)

    let descriptionHead = document.createElement("p");
    descriptionHead.textContent = "Description: "
    descriptionHead.classList.add("head")
    descriptionContainer.appendChild(descriptionHead)

    let descriptionElement = document.createElement("p")
    descriptionElement.textContent = each.eventDescription
    descriptionContainer.appendChild(descriptionElement)

    let timeContainer = document.createElement("div");
    timeContainer.classList.add("d-flex", "flex-row");
    listElement.appendChild(timeContainer)

    let timeHead = document.createElement("p");
    timeHead.textContent = "Timing: "
    timeHead.classList.add("head")
    timeContainer.appendChild(timeHead)

    let startTimeElement = document.createElement("p")
    startTimeElement.textContent = each.startTime + "  to  " + each.endTime
    timeContainer.appendChild(startTimeElement)

    let dayContainer = document.createElement("div");
    dayContainer.classList.add("d-flex", "flex-row");
    listElement.appendChild(dayContainer)

    let dayHead = document.createElement("p");
    dayHead.textContent = "Day: "
    dayHead.classList.add("head")
    dayContainer.appendChild(dayHead)

    let dayElement = document.createElement("p")
    dayElement.textContent = "Every " + each.day
    dayContainer.appendChild(dayElement)

    let toContainer = document.createElement("div");
    toContainer.classList.add("d-flex", "flex-row");
    listElement.appendChild(toContainer);

    let toHead = document.createElement("p");
    toHead.textContent = "Upto: ";
    toHead.classList.add("head")
    toContainer.appendChild(toHead)

    let rangeElement = document.createElement("p")
    rangeElement.textContent = each.from
    toContainer.appendChild(rangeElement)
}

function createEvent() {
    let now = new Date();
    let days = ("0" + now.getDate()).slice(-2);
    let month = ("0" + (now.getMonth() + 1)).slice(-2);
    let startDate = now.getFullYear() + "-" + (month) + "-" + (days);

    now.setMonth(now.getMonth() + 4);
    let months = ("0" + now.getMonth()).slice(-2);
    let endDate = now.getFullYear() + "-" + (months) + "-" + (days);


    let event = {
        eventName: eventName.value,
        eventDescription: eventDescription.value,
        startTime: startTime.value,
        endTime: endTime.value,
        day: day.value,
        from: endDate

    }
    eventsArray.push(event)
    localStorage.setItem("eventsArray", JSON.stringify(eventsArray));
    display(event)
    eventName.value = ""
    eventDescription.value = ""
    startTime.value = ""
    endTime.value = ""
    day.value = ""
}
for (let each of eventsArray) {
    display(each)
}

eventForm.addEventListener("submit", function(event) {
    event.preventDefault()
    createEvent()
})