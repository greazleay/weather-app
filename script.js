async function getWeather(city) {
  try {
    const access_key = "b6b794895416bf47d4bbdbc5e02b3cf2";
    let fetchCity;
    try {
        fetchCity = await fetch(
            `https://nominatim.openstreetmap.org/?addressdetails=1&q=${city}&format=json&limit=1`
          );
    } catch (error) {
        if (String(error).startsWith("TypeError")) {
            throw new Error('Oops!!! Something went wrong, try again later');
        }
        throw error;
    }
    
    const data = await fetchCity.json();
    switch (true) {
      case Object.is(data[0].lat, undefined):
      case Object.is(data[0].lon, undefined):
        throw new Error("Oops!!! City does not exist");
    }
    const fetchWeather = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${data[0].lat}&lon=${data[0].lon}&units=metric&exclude=minutely,hourly,alerts&appid=${access_key}`
    );
    
    const sevenDays = await fetchWeather.json();
    const options = [
      {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        timeZone: sevenDays.timezone,
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      },
      {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
        timeZone: sevenDays.timezone,
      },
      {
        timeZone: sevenDays.timezone,
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      },
    ];
    const args = [
      `${data[0].address.city || data[0].address.state || data[0].address.town || data[0].address.village}, ${data[0].address.country}`,
      `Temperature: ${sevenDays.current.temp}℃, Feels like: ${sevenDays.current.feels_like}℃`,
      `${sevenDays.current.weather[0].main} | ${sevenDays.current.weather[0].description}`,
      `Humidity: ${sevenDays.current.humidity}%`,
      `Wind Speed: ${sevenDays.current.wind_speed}m/secs`,
      `Local Time: ${new Date(sevenDays.current.dt * 1000).toLocaleDateString(undefined, options[0])}`,
    ];
    cityCard(args, sevenDays.current.weather[0].icon);
    const table = document.createElement('table');
    addTRH(table)
    main.appendChild(table);
    sevenDays.daily.forEach(day => {
      const args = [
        `${new Date(day.dt * 1000).toLocaleDateString(undefined, options[1])}`, 
        `Min: ${day.temp.min}℃, Max: ${day.temp.max}℃`,
        `${new Date(day.sunrise * 1000).toLocaleDateString(undefined, options[2]).slice(10)}`,
        `${new Date(day.sunset * 1000).toLocaleDateString(undefined, options[2]).slice(10)}`,
        `${day.weather[0].description}`
      ];
      addTRD(args, day.weather[0].icon, table)
    })
  } catch (error) {
    addElement("p", error.message, main);
  }
}

const handleChange = () => {
  if (main.childElementCount !== 0) {
    [...main.childNodes].forEach((child) => {
      main.removeChild(child);
      console.log("removed!!!");
    });
  };
  getWeather(city.value);
  city.value = "";
};

city.addEventListener("change", handleChange);
