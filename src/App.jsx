import { useEffect, useState } from "react";

function App() {
  const [currentTemp, setCurrentTemp] = useState();
  const [currentCity, setCurrentCity] = useState("Auckland");
  const [userEnteredCity, setUserEnteredCity] = useState();
  const API_KEY= import.meta.env.VITE_WEATHER_API_KEY;
  console.log(API_KEY);
  
  useEffect(() => {
    fetch(
      `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${currentCity}&aqi=no`
    )
      .then((res) => res.json())
      .then((response) => {
        console.log(response);
        setCurrentTemp(response.current.temp_c);
      });
  }, [currentCity]);

  const handleCityInput = (event) => {
    setUserEnteredCity(event.target.value);
  };
  const handleSubmit = (e) => {
    setCurrentCity(userEnteredCity);
    e.preventDefault();
  };

  return (
    <div className="App">
      <h1>Type in your city: </h1>
      <input onChange={handleCityInput} type="text" />
      <button onClick={handleSubmit}>search!</button>
      <p>
        The temp in {currentCity} is {currentTemp && currentTemp}
      </p>
    </div>
  );
}

export default App;