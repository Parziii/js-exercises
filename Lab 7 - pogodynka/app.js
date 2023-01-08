const select = document.querySelector("#cities");
const img = document.getElementById("img");
const tempField = document.getElementById("temp");
const cityField = document.getElementById("city");

class ApiClient {
  static async getWeatherData(lat, long) {
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&hourly=temperature_2m`
    );

    return response;
  }
}

const iconsSrc = {
  cloud: "./assets/cloud.svg",
  snow: "./assets/snow.svg",
  sun: "./assets/sun.svg",
};

const app = async () => {
  const state = {
    apiData: null,
  };

  const fetchData = async (lat, long) => {
    const response = await ApiClient.getWeatherData(lat, long);
    const data = await response.json();

    state.apiData = data;
  };

  const getCurrentTemp = () => state.apiData.hourly.temperature_2m.pop();

  const getIconByTemp = (temp) => {
    if (temp <= 0) {
      return iconsSrc.snow;
    } else if (temp > 0 && temp < 10) {
      return iconsSrc.cloud;
    } else {
      return iconsSrc.sun;
    }
  };

  const initWeatherTile = (city) => {
    cityField.innerHTML = city;
    tempField.innerHTML = getCurrentTemp();
    img.setAttribute("src", getIconByTemp(getCurrentTemp()));
  };

  await fetchData(select.value.split(" ")[1], select.value.split(" ")[2]);
  initWeatherTile(select.value.split(" ")[0]);

  select.onchange = async (e) => {
    const lat = e.target.value.split(" ")[1];
    const long = e.target.value.split(" ")[2];

    await fetchData(lat, long);

    const city = e.target.value.split(" ")[0];

    initWeatherTile(city);
  };
};

app();
