import helpers from './helpers';

const dom = function dom() {
  function show(value) {
    switch (true) {
      case value === 'search':
        document.getElementById('main').style.display = 'none';
        document.getElementById('section').style.display = 'block';
        document.getElementById('section2').style.display = 'none';
        break;
      case value === 'forecast':
        document.getElementById('main').style.display = 'none';
        document.getElementById('section').style.display = 'none';
        document.getElementById('section2').style.display = 'block';
        break;
      default:
        document.getElementById('main').style.display = 'block';
        document.getElementById('section').style.display = 'none';
        document.getElementById('section2').style.display = 'none';
        break;
    }
  }

  function fillCard(data) {
    helpers().addInnerText('title', `${data.name}, ${data.sys.country}`);
    helpers().addInnerText('temp', `<i class="fas fa-thermometer-half text-warning my-2"></i> Temp: ${data.main.temp} Celsius`);
    helpers().addInnerText('feel', `<i class="fas fa-meteor text-warning my-2"></i> Feel: ${data.main.feels_like} Celsius`);
    helpers().addInnerText('desc', `<i class="fas fa-cloud-sun-rain text-warning my-2"></i> ${data.weather[0].main}`);
    helpers().addInnerText('pressure', `<i class="fas fa-compress-arrows-alt text-warning my-2"></i> Pressure: ${data.main.pressure} hPa`);
    helpers().addInnerText('humidity', `<i class="fas fa-percent text-warning my-2"></i> Humidity: ${data.main.humidity}%`);
    helpers().addInnerText('minTemp', `<i class="fas fa-temperature-low text-warning my-2"></i> Min: ${data.main.temp_min} Celsius`);
    helpers().addInnerText('maxTemp', `<i class="fas fa-temperature-high text-warning my-2"></i> Max: ${data.main.temp_max} Celsius`);
    helpers().addInnerText('wind', `<i class="fas fa-wind text-warning my-2"></i> ${data.wind.speed} meter/sec`);
    helpers().addInnerText('windDir', `<i class="fas fa-compass text-warning my-2"></i> ${data.wind.deg} degrees`);
    helpers().addInnerText('clouds', `<i class="fas fa-cloud text-warning my-2"></i> Clouds: ${data.clouds.all}%`);
    helpers().addInnerText('sunrise', `<i class="fas fa-sun text-warning my-2"></i> Sunrise: ${new Date((data.sys.sunrise + data.timezone) * 1000).toUTCString().slice(-11, -7)} AM`);
    helpers().addInnerText('sunset', `<i class="fas fa-sun text-warning my-2"></i> Sunset: ${new Date((data.sys.sunset + data.timezone) * 1000).toUTCString().slice(-11, -7)} PM`);
  }

  function imageSwitch(data, id) {
    const code = data.weather[0].id;
    switch (true) {
      case code >= 200 && code <= 232:
        document.getElementById(id).style.backgroundImage = "url('../src/images/lighting.jpg')";
        break;
      case code >= 300 && code <= 321:
        document.getElementById(id).style.backgroundImage = "url('../src/images/drizzle.jpg')";
        break;
      case code >= 500 && code <= 531:
        document.getElementById(id).style.backgroundImage = "url('../src/images/rain.jpg')";
        break;
      case code >= 600 && code <= 622:
        document.getElementById(id).style.backgroundImage = "url('../src/images/snow.jpg')";
        break;
      case code >= 701 && code <= 781:
        document.getElementById(id).style.backgroundImage = "url('../src/images/mist.jpg')";
        break;
      case code >= 801 && code <= 804:
        document.getElementById(id).style.backgroundImage = "url('../src/images/rainclouds.jpg')";
        break;
      case code === 800:
        document.getElementById(id).style.backgroundImage = "url('../src/images/shiningsun.jpg')";
        break;
      default:
        document.getElementById(id).style.backgroundImage = "url('../src/images/bluesky.jpg')";
        break;
    }
  }

  function clearForms() {
    document.getElementById('searching').reset();
    document.getElementById('navSearch').reset();
  }

  function createCard(data) {
    const name = document.getElementById('cityName');
    name.innerHTML = `${data.city.name}, ${data.city.country}`;
    const row = document.getElementById('row');
    row.innerHTML = '';
    const forecastFive = data.list.filter((value, index) => index % 8 === 0);
    forecastFive.forEach((day, index) => {
      const cont = helpers().createElement('div', 'col-5');
      const card = helpers().createElement('div', 'card bg-dark text-white w-100 mb-2 mx-2');
      const imgBg = helpers().createElement('div', '');
      imgBg.id = `images${index + 1}`;
      imgBg.style = 'background-size: cover;background-position-y: 100%;height: 75vh;';
      const over = helpers().createElement('div', 'card-img-overlay');
      const h5 = helpers().createElement('h5', 'card-title text-center text-warning');
      h5.innerHTML = day.dt_txt.slice(0, -9);
      const listCont = helpers().createElement('div', 'd-flex flex-row justify-content-around');
      const ul1 = helpers().createElement('ul', 'list-group list-unstyled');
      const ul2 = helpers().createElement('ul', 'list-group list-unstyled');
      const temp = helpers().createElementWithInnerText('li', 'list-group-item', `<i class="fas fa-thermometer-half text-warning my-2"></i> Temp: ${day.main.temp} Celsius`);
      const feel = helpers().createElementWithInnerText('li', 'list-group-item', `<i class="fas fa-meteor text-warning my-2"></i> Feel: ${day.main.feels_like} Celsius`);
      const pressure = helpers().createElementWithInnerText('li', 'list-group-item', `<i class="fas fa-compress-arrows-alt text-warning my-2"></i> Pressure: ${day.main.pressure} hPa`);
      const humidity = helpers().createElementWithInnerText('li', 'list-group-item', `<i class="fas fa-percent text-warning my-2"></i> Humidity: ${day.main.humidity}%`);
      const desc = helpers().createElementWithInnerText('li', 'list-group-item', `<i class="fas fa-cloud-sun-rain text-warning my-2"></i> ${day.weather[0].main}`);
      const minTemp = helpers().createElementWithInnerText('li', 'list-group-item', `<i class="fas fa-temperature-low text-warning my-2"></i> Min: ${day.main.temp_min} Celsius`);
      const maxTemp = helpers().createElementWithInnerText('li', 'list-group-item', `<i class="fas fa-temperature-high text-warning my-2"></i> Max: ${day.main.temp_max} Celsius`);
      const clouds = helpers().createElementWithInnerText('li', 'list-group-item', `<i class="fas fa-cloud text-warning my-2"></i> Clouds: ${day.clouds.all}%`);
      const wind = helpers().createElementWithInnerText('li', 'list-group-item', `<i class="fas fa-wind text-warning my-2"></i> ${day.wind.speed} meter/sec`);
      const windDir = helpers().createElementWithInnerText('li', 'list-group-item', `<i class="fas fa-compass text-warning my-2"></i> ${day.wind.deg} degrees`);
      const color = document.getElementsByClassName('list-group-item');

      ul2.appendChild(minTemp);
      ul2.appendChild(maxTemp);
      ul2.appendChild(wind);
      ul2.appendChild(windDir);
      ul2.appendChild(clouds);

      ul1.appendChild(temp);
      ul1.appendChild(feel);
      ul1.appendChild(desc);
      ul1.appendChild(pressure);
      ul1.appendChild(humidity);

      listCont.appendChild(ul1);
      listCont.appendChild(ul2);

      over.appendChild(h5);
      over.appendChild(listCont);

      card.appendChild(imgBg);
      card.appendChild(over);

      cont.appendChild(card);
      row.appendChild(cont);

      for (let i = 0; i < color.length; i += 1) {
        color[i].style = 'background-color: rgba(255,255,255,0.1);';
      }


      imageSwitch(day, (`images${index + 1}`));
    });
  }


  async function converter(data) {
    const data2 = await helpers().getFahrenheit(data.name);
    if (document.getElementById('temp').innerHTML.includes(' Celsius')) {
      helpers().addInnerText('temp', `<i class="fas fa-thermometer-half text-warning my-2"></i> Temp: ${data2.main.temp} &#8457`);
      helpers().addInnerText('feel', `<i class="fas fa-meteor text-warning my-2"></i> Feel: ${data2.main.feels_like} &#8457`);
      helpers().addInnerText('minTemp', `<i class="fas fa-temperature-low text-warning my-2"></i> Min: ${data2.main.temp_min} &#8457`);
      helpers().addInnerText('maxTemp', `<i class="fas fa-temperature-high text-warning my-2"></i> Max: ${data2.main.temp_max} &#8457`);
    } else {
      helpers().addInnerText('temp', `<i class="fas fa-thermometer-half text-warning my-2"></i> Temp: ${data.main.temp} Celsius`);
      helpers().addInnerText('feel', `<i class="fas fa-meteor text-warning my-2"></i> Feel: ${data.main.feels_like} Celsius`);
      helpers().addInnerText('minTemp', `<i class="fas fa-temperature-low text-warning my-2"></i> Min: ${data.main.temp_min} Celsius`);
      helpers().addInnerText('maxTemp', `<i class="fas fa-temperature-high text-warning my-2"></i> Max: ${data.main.temp_max} Celsius`);
    }
  }


  return {
    show, fillCard, imageSwitch, createCard, clearForms, converter,
  };
};

export { dom as default };