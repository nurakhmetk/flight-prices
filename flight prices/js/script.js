const form = document.getElementById("form");

const originInputValue = document.getElementById("originInput");
const destinationInputValue = document.getElementById("destinationInput");
const departureDateValue = document.getElementById("departureDate");
const returnDateValue = document.getElementById("returnDate");
const currencyValue = document.getElementById("currency");
const button = document.getElementById("button");

const airlineP = document.getElementById("airline-p");
const originP = document.getElementById("origin-p");
const destinationP = document.getElementById("destination-p");
const departureP = document.getElementById("departure-p");
const returnP = document.getElementById("return-p");
const priceP = document.getElementById("price-p");
const flightP = document.getElementById("flight-p");
const transfersP = document.getElementById("transfers-p");

const contentBody = document.getElementById("contentBody");

const content = document.querySelector(".content");

const contentOutput = document.createElement("div");
contentOutput.setAttribute("class", "content__output");

const contentOutputDiv = document.createElement("div");
contentOutputDiv.setAttribute("class", "content__output-body");

content.appendChild(contentOutput);

form.addEventListener("submit", getFromValue);

if (
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(
    navigator.userAgent
  )
) {
  button.addEventListener(
    "touchend",
    function (ev) {
      ev.preventDefault();
      getFromValue;
    },
    false
  );
} else {
  form.addEventListener("submit", getFromValue);
}

let div = document.createElement("div");
contentBody.appendChild(div);
div.setAttribute("class", "created-div");

function getFromValue(event) {
  event.preventDefault();
  const data = {
    OriginCity: originInputValue.value,
    DestinationCity: destinationInputValue.value,
    DepartureDate: departureDateValue.value,
    ReturnDate: returnDateValue.value,
    Currency: currencyValue.value,
  };

  const origin = "origin=";
  const destination = "destination=";
  const currency = "currency=";
  const departDate = "depart_date=";
  const returnDate = "return_date=";
  const apiUrl =
    "https://cors-anywhere.herokuapp.com/https://api.travelpayouts.com/v1/prices/calendar?calendar_type=departure_date";
  const token = "token=1b74596b5a8f332ac7268a410709eca6";

  let result = null;
  result = `${apiUrl}&${origin}${data.OriginCity}&${destination}${data.DestinationCity}&${departDate}${data.DepartureDate}&${returnDate}${data.ReturnDate}&${currency}${data.Currency}&${token}`;

  const xhr = new XMLHttpRequest();

  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === this.DONE) {
      var serverResponse = JSON.parse(this.responseText);
      const obj = serverResponse.data;
      const objCurrnecy = serverResponse.currency;
      const objKeysArray = Object.keys(obj);
      const objValuesArray = Object.values(obj);

      for (var i = 0; i < objValuesArray.length; i++) {
        var parentDiv = document.createElement("div");
        var airlineP = document.createElement("p");
        var originP = document.createElement("p");
        var destinationP = document.createElement("p");
        var departureP = document.createElement("p");
        var returnP = document.createElement("p");
        var flightNumberP = document.createElement("p");
        var priceP = document.createElement("p");
        airlineP.innerHTML += `Airline: ${objValuesArray[i].airline}`;
        originP.innerHTML += `Origin City: ${objValuesArray[i].origin}`;
        destinationP.innerHTML += `Destination City: ${objValuesArray[i].destination}`;
        departureP.innerHTML += `Departure Date: ${objValuesArray[i].departure_at}`;
        returnP.innerHTML += `Return Date: ${objValuesArray[i].return_at}`;
        flightNumberP.innerHTML += `Flight Number: ${objValuesArray[i].flight_number}`;
        priceP.innerHTML += `Price: ${objValuesArray[i].price} ${objCurrnecy}`;

        parentDiv.setAttribute("class", "parent-div");

        parentDiv.appendChild(airlineP);
        parentDiv.appendChild(originP);
        parentDiv.appendChild(destinationP);
        parentDiv.appendChild(flightNumberP);
        parentDiv.appendChild(priceP);
        parentDiv.appendChild(departureP);
        parentDiv.appendChild(returnP);

        contentOutputDiv.appendChild(parentDiv);
        contentOutput.appendChild(contentOutputDiv);
      }
    }
  });

  xhr.open("GET", result);

  xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
  xhr.setRequestHeader("Access-Control-Allow-Credentials", "true");
  xhr.setRequestHeader(
    "Access-Control-Allow-Headers",
    "content-type",
    "Authorization"
  );
  xhr.setRequestHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
  xhr.setRequestHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With, content-type"
  );

  xhr.send(data);
}

//================================================================
