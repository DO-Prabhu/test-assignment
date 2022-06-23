"use strict"
class Test {
    constructor() {
      this.testResults = document.getElementsByClassName("test-results");
    }

    async run() {
      console.log(new Date().toISOString(), "[Test]", "Running the test");

      // TODO: Make the API call and handle the results
    }

    setError(message) {
      // TODO: Format the error

      /** I have handled error in a try catch block. I checked the error by mis typing the API, and am getting 401 error.
     Following is the logic to show error message in DOM.
     First, took a div element and appended a paragraph element showing the error message.
     **/

      const divContainer =
        document.getElementsByClassName("test-results")[0];
      const paraElem = document.createElement("p");
      paraElem.style.color = "red";
      paraElem.innerHTML = message;
      divContainer.appendChild(paraElem);
      //this.divContainer.innerHTML = (message || "").toString();
    }

    setResults(results, id) {
      // TODO: Format the results
      //const divContainer = this.testResults[0];

      // Get the table body section for Brentwood

      if (id === "tblBody") {
        const tbl = document.getElementById("tblBody");

        // Add table rows into table body section element and insert into Table body
        tbl.innerHTML += `<tr>
        <td>${results.sys.country}</td>
        <td>${results.name}</td>
        <td>${results.coord.lon}</td>
        <td>${results.coord.lat}</td>
        <td>${results.weather[0].description}</td>
        <td>${results.main.temp}</td>
        <td>${results.main.humidity}</td>
        <td>${results.wind.speed}</td>
        </tr>`;

        // const tblElem = document.querySelector('table');
        // const divContainer = document.getElementsByClassName("test-results")[0];
        // divContainer.appendChild(tblElem);
        // this.testResults.appendChild(tblElem);
      }

      // Get the table body section for current location

      if (id === "tblCurrentBody") {
        const tbl = document.getElementById("tblCurrentBody");

        // Add table rows into table body section element and insert into Table body
        tbl.innerHTML += `<tr>
        <td>${results.sys.country}</td>
        <td>${results.name}</td>
        <td>${results.coord.lon}</td>
        <td>${results.coord.lat}</td>
        <td>${results.weather[0].description}</td>
        <td>${results.main.temp}</td>
        <td>${results.main.humidity}</td>
        <td>${results.wind.speed}</td>
        </tr>`;
      }

      // Get the table body section for map coordinates and find weather for it

      if (id === "tblMapBody") {
        const tbl = document.getElementById("tblMapBody");

        // Add table rows into table body section element and insert into Table body
        tbl.innerHTML += `<tr>
        <td>${results.sys.country}</td>
        <td>${results.name}</td>
        <td>${results.coord.lon}</td>
        <td>${results.coord.lat}</td>
        <td>${results.weather[0].description}</td>
        <td>${results.main.temp}</td>
        <td>${results.main.humidity}</td>
        <td>${results.wind.speed}</td>
        </tr>`;
      }
    }
  }
