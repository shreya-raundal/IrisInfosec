document.addEventListener("DOMContentLoaded", function () {
  const chooseCards = document.querySelectorAll(".choose-card");

  chooseCards.forEach((card) => {
    card.addEventListener("click", function () {
      chooseCards.forEach((item) => {
        item.classList.remove("active");
      });

      this.classList.add("active");
    });
  });

  const mapPins = document.querySelectorAll(".map-pin");
  const mapWrapper = document.querySelector(".map-wrapper");
  const connectionLines = document.querySelector(".connection-lines");
  const mapLocation = document.querySelector(".map-location");

  const mapCity = document.querySelector(".map-location h3");
  const mapCountry = document.querySelector(".map-location p");
  if (
    !mapWrapper ||
    !connectionLines ||
    !mapLocation ||
    !mapCity ||
    !mapCountry ||
    !mapPins.length
  ) {
    return;
  }

  function drawConnectionLine(pin) {
    if (!pin) return;

    const mapRect = mapWrapper.getBoundingClientRect();
    const pinRect = pin.getBoundingClientRect();
    const locationRect = mapLocation.getBoundingClientRect();
    const pinX = pinRect.left - mapRect.left + pinRect.width / 2;

    const pinY = pinRect.top - mapRect.top + pinRect.height / 2;
    const lineEndX = locationRect.left - mapRect.left + 35;

    const lineEndY = locationRect.top - mapRect.top - 10;
    const bendY = pinY + 45;
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");

    const pathData = `
      M ${pinX} ${pinY}
      L ${pinX} ${bendY}
      L ${lineEndX} ${lineEndY}
    `;

    path.setAttribute("d", pathData);
    path.setAttribute("class", "connection-line active");
    connectionLines.innerHTML = "";
    connectionLines.appendChild(path);
  }
  function selectLocation(pin) {
    if (!pin) return;
    mapPins.forEach((item) => {
      item.classList.remove("active");
    });
    pin.classList.add("active");

    const city = pin.dataset.city || "";
    const country = pin.dataset.country || "";

    mapCity.textContent = city;
    mapCountry.textContent = country;
    requestAnimationFrame(() => {
      drawConnectionLine(pin);
    });
  }

  mapPins.forEach((pin) => {
    pin.addEventListener("click", function () {
      selectLocation(this);
    });
  });

  const defaultPin =
    document.querySelector(".map-pin.active") ||
    document.querySelector(".pin-usa") ||
    mapPins[0];

  if (defaultPin) {
    selectLocation(defaultPin);
  }
  let resizeTimer;

  window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);

    resizeTimer = setTimeout(() => {
      const activePin = document.querySelector(".map-pin.active");

      if (activePin) {
        drawConnectionLine(activePin);
      }
    }, 100);
  });
});
