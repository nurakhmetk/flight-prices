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
// button.addEventListener("click", getFromValue);

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
    "https://floating-sea-73933.herokuapp.com/https://api.travelpayouts.com/v1/prices/calendar?calendar_type=departure_date";
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

      let table = document.createElement("table");
      let thead = document.createElement("thead");
      let tbody = document.createElement("tbody");
      table.appendChild(thead);
      table.appendChild(tbody);
      let row_1 = document.createElement("tr");
      let heading_1 = document.createElement("th");
      heading_1.innerHTML = "Airline";
      let heading_2 = document.createElement("th");
      heading_2.innerHTML = "Origin City";
      let heading_3 = document.createElement("th");
      heading_3.innerHTML = "Destination City";
      let heading_4 = document.createElement("th");
      heading_4.innerHTML = "Flight Number";
      let heading_5 = document.createElement("th");
      heading_5.innerHTML = "Departure Date";
      let heading_6 = document.createElement("th");
      heading_6.innerHTML = "Return Date";
      let heading_7 = document.createElement("th");
      heading_7.innerHTML = "Price";
      let parentDiv = document.createElement("div");
      for (var i = 0; i < objValuesArray.length; i++) {
        parentDiv.setAttribute("class", "parent-div");

        var depDate = objValuesArray[i].departure_at;
        depDateArray = depDate.split("");
        var depYear = depDateArray.slice(0, 4).join("");
        var depMonth = depDateArray.slice(5, 7).join("");
        var depDay = depDateArray.slice(8, 10).join("");
        var depTime = depDateArray.slice(11, 16).join("");

        var retDate = objValuesArray[i].return_at;
        retDateArray = retDate.split("");
        var retYear = retDateArray.slice(0, 4).join("");
        var retMonth = retDateArray.slice(5, 7).join("");
        var retDay = retDateArray.slice(8, 10).join("");
        var retTime = retDateArray.slice(11, 16).join("");

        ///

        row_1.appendChild(heading_1);
        row_1.appendChild(heading_2);
        row_1.appendChild(heading_3);
        row_1.appendChild(heading_4);
        row_1.appendChild(heading_5);
        row_1.appendChild(heading_6);
        row_1.appendChild(heading_7);
        thead.appendChild(row_1);

        // Creating and adding data to second row of the table
        let row_2 = document.createElement("tr");
        let row_2_data_1 = document.createElement("td");
        row_2_data_1.innerHTML = `${objValuesArray[i].airline}`;
        let row_2_data_2 = document.createElement("td");
        row_2_data_2.innerHTML = `${objValuesArray[i].origin}`;
        let row_2_data_3 = document.createElement("td");
        row_2_data_3.innerHTML = `${objValuesArray[i].destination}`;
        let row_2_data_4 = document.createElement("td");
        row_2_data_4.innerHTML = `${objValuesArray[i].flight_number}`;
        let row_2_data_5 = document.createElement("td");
        row_2_data_5.innerHTML = `${depDay}-${depMonth}-${depYear} ${depTime}`;
        let row_2_data_6 = document.createElement("td");
        row_2_data_6.innerHTML = `${retDay}-${retMonth}-${retYear} ${retTime}`;
        let row_2_data_7 = document.createElement("td");
        row_2_data_7.innerHTML = `${objValuesArray[i].price} ${objCurrnecy}`;

        row_2.appendChild(row_2_data_1);
        row_2.appendChild(row_2_data_2);
        row_2.appendChild(row_2_data_3);
        row_2.appendChild(row_2_data_4);
        row_2.appendChild(row_2_data_5);
        row_2.appendChild(row_2_data_6);
        row_2.appendChild(row_2_data_7);
        tbody.appendChild(row_2);

        parentDiv.appendChild(table);

        contentOutput.appendChild(contentOutputDiv);
      }
      contentOutputDiv.appendChild(parentDiv);
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
