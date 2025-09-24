async function fetchWeather() {
  let searchInput = document.getElementById('search-text').value
  const weatherData = document.getElementById('weather-data')
  weatherData.style.display = 'block'
  const apiKey = '2f9aa47cc7dc75608d5a2249d1a09c1f'

  if (searchInput == '') {
    weatherData.innerHTML = `
  <div>
  <h2>Invalid Input</h2>
  <p>Try again with <u> valid city name </u>.</p>
  </div>
  `
    return
  }

  async function getLonAndLat() {
    // const countryCode = 977
    const geocodeURL = `https://api.openweathermap.org/geo/1.0/direct?q=${searchInput.replace(
      ' ',
      '%20'
    )},&limit=1&appid=${apiKey}`

    const response = await fetch(geocodeURL)
    if (!response.ok) {
      console.log('Bad Response!', response.status)
      return
    }

    const data = await response.json()

    if (data.length == 0) {
      console.log('something went wrong here.')
      weatherData.innerHTML = `
      <div>
      <h2> Invalid input: "${searchInput}"</h2>
      <p>Please use Valid <u> city name</u>. </p>
      </div>`
      return
    } else {
      return data[0]
    }
  }

  async function getWeatherData(lon, lat) {
    const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`

    const response = await fetch(weatherURL)
    if (!response.ok) {
      console.log('Bad Response!', response.status)
      return
    }

    const data = await response.json()

    weatherData.innerHTML = `
   <img src="https://openweathermap.org/img/wn/${
     data.weather[0].icon
   }.png" alt="${data.weather[0].description}" width="100" />
   <div>
   <h2>${data.name}</h2>
   <p><strong>Temperature:</strong>${Math.round(data.main.temp - 273.15)}°C</p> 
   <p><strong>Description:</strong>${data.weather[0].description}</p>
   </div>
   `
  }
  const geocodeData = await getLonAndLat()
  getWeatherData(geocodeData.lon, geocodeData.lat)
}

document.getElementById('search-text').value = '' // clearing the text input after search
