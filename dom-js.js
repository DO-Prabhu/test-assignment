"use strict";
  /**
       * Creates a button for kicking off the test and adds it to the DOM.
       *
       * @param {HTMLElement} context  the parent element to add the button to
       * @param {Test}        test     the test to be executed
       * @returns {HTMLElement} the button added to the test
       */
   function addButtonForTest(context, test) {
    let testButton = document.createElement("button");

    testButton.type = "button";
    testButton.innerText = "Get the Nashville Weather";
    testButton.onclick = () => test.run();

    context.appendChild(testButton);

    return testButton;
  }

  /**
   * Creates a button for fetching the results from API and showing into the DOM.
   *
   * @param {HTMLElement} context  the parent element to add the button to
   * @param {Test}        test     the data from weather API is loaded into here
   * @returns {HTMLElement} the button added to the test and fetches the result to show the data into table
   */

  async function getWeatherFromApi(context, test) {
    let getWeatherButton = document.createElement("button");

    getWeatherButton.type = "button";
    getWeatherButton.innerText = "Get weather for Brentwood, TN";

    // API Call within try-catch
    try {
      const results = await axios.get(
        "https://api.openweathermap.org/data/2.5/weather?q=Brentwood&appid=25e989bd41e3e24ce13173d8126e0fd6"
      );

      const data = results.data;
      const id = "tblBody";
      getWeatherButton.onclick = () => test.setResults(data, id);
    } catch (error) {
      //console.log(error.message);
      test.setError(error.message);
    }

    context.appendChild(getWeatherButton);
    return getWeatherButton;
  }

  /**
   * Creates a button for fetching the results from API and showing into the DOM.
   *
   * @param {HTMLElement} context  the parent element to add the button to
   * @param {Test}        test     the data from weather API is loaded for the current location into here
   * @returns {HTMLElement} the button added to the test and fetches the result to show the data into table
   */

  function getCurrentLocationWeather(context, test) {
    let getGeoLocationWeatherButton = document.createElement("button");

    getGeoLocationWeatherButton.type = "button";
    getGeoLocationWeatherButton.innerText = "Get current location weather";

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          const { latitude } = position.coords;
          const { longitude } = position.coords;
          axios
            .get(
              `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=25e989bd41e3e24ce13173d8126e0fd6`
            )
            .then((resp) => {
              test.setResults(resp.data, "tblCurrentBody");
            })
            .catch((err) => {
              // Handle Error Here
              test.setError(err.message);
            });
        },
        function () {
          alert("Could not get location");
        }
      );
    }

    context.appendChild(getGeoLocationWeatherButton);
    return getGeoLocationWeatherButton;
  }

  /**
   * Creates a button for kicking off the test and adds it to the DOM.
   *
   * @param {Latitude}  get and pass the latitude
   * @param {Longitude} get and pass the longitude
   */
  async function getWeatherByCoordinatesFromMap(latitude, longitude) {
    // API Call within try-catch
    try {
      const results = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=25e989bd41e3e24ce13173d8126e0fd6`
      );

      const data = results.data;
      const id = "tblMapBody";
      test.setResults(data, id);
    } catch (error) {
      //console.log(error.message);
      test.setError(error.message);
    }
  }

  // Create the Test and add a button to the UI for running the test
  const test = new Test();
  const buttonContainer =
    document.getElementsByClassName("button-container")[0];

  // Get BrentWood weather
  const weatherButtonContainer =
    document.getElementsByClassName("button-container")[0];

  // Get current location weather
  const geolocationButtonContainer = document.getElementsByClassName(
    "geolocation-button-container"
  )[0];

  // Add Button for Test
  addButtonForTest(buttonContainer, test);

  // Weather API button here
  getWeatherFromApi(weatherButtonContainer, test);

  // Current location weather
  getCurrentLocationWeather(geolocationButtonContainer, test);

  // Get from coordinates the map
  function getCoordinatesFromMap({ lat, lng }) {
    getWeatherByCoordinatesFromMap(lat, lng);
  }

  // Show map in DOM
  let map = L.map("map").setView([40.7812, -73.2462], 13);

  // Show title layer
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  // Show marker
  L.marker([40.7812, -73.2462])
    .addTo(map)
    .bindPopup("A pretty CSS3 popup.<br> Easily customizable.")
    .openPopup();

  let marker = L.marker([40.7812, -73.2462]).addTo(map);

  // Show circle
  let circle = L.circle([40.7812, -73.2462], {
    color: "red",
    fillColor: "#f03",
    fillOpacity: 0.5,
    radius: 500,
  }).addTo(map);

  // Get the latitude and longitude
  function onMapClick(e) {
    console.log(e.latlng);
    getCoordinatesFromMap(e.latlng);
  }

  map.on("click", onMapClick);