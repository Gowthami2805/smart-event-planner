const form = document.getElementById("event-form");
const eventList = document.getElementById("event-list");

function loadEvents() {
  const events = JSON.parse(localStorage.getItem("events")) || [];
  eventList.innerHTML = "";
  events.forEach((event, index) => {
    const li = document.createElement("li");
    li.textContent = ${event.date} ${event.time} - ${event.title}: ${event.description};
    eventList.appendChild(li);
  });
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const title = document.getElementById("title").value;
  const date = document.getElementById("date").value;
  const time = document.getElementById("time").value;
  const description = document.getElementById("description").value;
  const newEvent = { title, date, time, description };

  const events = JSON.parse(localStorage.getItem("events")) || [];
  events.push(newEvent);
  localStorage.setItem("events", JSON.stringify(events));
  form.reset();
  loadEvents();
});

// Reminder Alert Check
setInterval(() => {
  const now = new Date();
  const events = JSON.parse(localStorage.getItem("events")) || [];
  events.forEach(event => {
    const eventTime = new Date(${event.date}T${event.time});
    if (Math.abs(now - eventTime) < 60000) {
      alert(⏰ Reminder: ${event.title} is happening now!);
    }
  });
}, 60000);

loadEvents();