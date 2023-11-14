
  /*
  //USANDO ACCUWEATHER
  // Con la posición, capturamos el Citykey Necesario
  const API_CITY_KEY = "http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=" + process.env.NEXT_PUBLIC_ACCUWEATHER_KEY + "&q=" + positioning + "&language=es-es&details=true";
 
  useEffect(() => {
    if (positioning !== "") {
      fetch(API_CITY_KEY)
        .then(response => response.json())
          .then(data => {
          setCityKey(data.Key);})
    }
  }, [city])


  
  //Cuando tenemos la citiKey, llamamos a la API para capturar los datos del tiempo  
  const API_WEATHER_URL = "http://dataservice.accuweather.com/currentconditions/v1/" + cityKey + "?apikey=" + process.env.NEXT_PUBLIC_ACCUWEATHER_KEY + "&language=es-es&details=true";

  useEffect(() => {
    if (cityKey !== "") {
      fetch(API_WEATHER_URL)
        .then(response => response.json())
          .then(data => {
            console.log(data);
            setDataWeather(data);
            setEstadoActual(data[0].WeatherText);
            (data[0].IsDayTime) ? setIsDay(true) : setIsDay(false);

            setIsLoading(false)
          })
    }
  }, [cityKey]);

  */