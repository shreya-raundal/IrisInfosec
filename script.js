const chooseCards = document.querySelectorAll(".choose-card");

chooseCards.forEach((card) => {
  card.addEventListener("click", () => {
    chooseCards.forEach((item) => {
      item.classList.remove("active");
    });

    card.classList.add("active");
  });
});

// location

const mapPins = document.querySelectorAll(".map-pin");

const mapCity = document.querySelector(".map-location h3");
const mapCountry = document.querySelector(".map-location p");

const mapWrapper = document.querySelector(".map-wrapper");
const connectionLines = document.querySelector(".connection-lines");

function drawConnectionLine(pin) {
  const mapRect = mapWrapper.getBoundingClientRect();
  const pinRect = pin.getBoundingClientRect();
  const locationRect = document
    .querySelector(".map-location")
    .getBoundingClientRect();

  // PIN POSITION
  const pinX = pinRect.left - mapRect.left + pinRect.width / 2;

  const pinY = pinRect.top - mapRect.top + pinRect.height / 2;

  // LOCATION TEXT POSITION
  const locationX = locationRect.left - mapRect.left + locationRect.width / 2;

  const locationY = locationRect.top - mapRect.top;

  // CREATE LINE
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");

  // LINE SHAPE
  const middleY = pinY + (locationY - pinY) * 0.5;

  const bendY = pinY + 82;

  const lineEndX = locationRect.left - mapRect.left + 35;

  const lineEndY = locationRect.top - mapRect.top - 10;

  const pathData = `
  M ${pinX} ${pinY}
  L ${pinX} ${bendY}
  L ${lineEndX} ${lineEndY}
`;

  path.setAttribute("d", pathData);

  path.setAttribute("class", "connection-line active");

  path.setAttribute("stroke", "#00d084");

  connectionLines.innerHTML = "";

  connectionLines.appendChild(path);
}

function selectLocation(pin) {
  // REMOVE ACTIVE FROM ALL PINS
  mapPins.forEach((item) => {
    item.classList.remove("active");
  });

  // ACTIVE PIN
  pin.classList.add("active");

  // UPDATE LOCATION NAME
  mapCity.textContent = pin.dataset.city;

  mapCountry.textContent = pin.dataset.country;

  // DRAW GREEN LINE
  drawConnectionLine(pin);
}

// CLICK LOCATORS
mapPins.forEach((pin) => {
  pin.addEventListener("click", function () {
    selectLocation(this);
  });
});

// DEFAULT LOCATION
const defaultPin = document.querySelector(".pin-usa");

if (defaultPin) {
  selectLocation(defaultPin);
}
