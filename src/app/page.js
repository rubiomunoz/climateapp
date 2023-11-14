'use client';
import { useState, useEffect } from "react";
import { ClimaToday } from "../components/climaToday";
import { ClimaByIP } from "../components/climaByIP";
import { obtenerUbicacion, convertirFecha } from "../js/functions";
import { v4 as uuidv4 } from 'uuid';
import { DayDetail } from '../components/DayDetail';


export default function Home() {
  const [city, setCity] = useState('');
  const [positioning, setPositioning] = useState(''); // [lat, long] para el posicionamiento
  const [mainIcon, setMainIcon] = useState(''); // Icono principal
  const [isLoading, setIsLoading] = useState(true); // Para mostrar el loader

  const [nextHours, setNextHours] = useState(''); // Para mostrar las próximas horas
  const [hourly, setHourly] = useState([]); // Para mostrar los datos de las próximas horas
  const [current, setCurrent] = useState([]); // Para mostrar los datos actuales
  
  const [forecast, setForecast] = useState([]); // Para mostrar los datos de los próximos días
  const [nextDays, setNextDays] = useState([]); // Para mostrar los datos de los próximos días
  const [userPermission, setUserPermission] = useState('pending'); // Para saber si el usuario ha dado permiso de ubicación

  const [isDaily, setIsDaily] = useState(false); 
  const [dayData, setDayData] = useState([]); 

  // Cuando cargamos por primera vez, pedimos permiso para la geolocalización. Si no nos lo da, la sacamos por IP. Si hay error, la asigno a Córdoba.
  useEffect(() => {
  const fetchData = () => {
    obtenerUbicacion()
    .then((coordenadas) => {
      if (coordenadas) {
        const { latitude, longitude } = coordenadas;
        setPositioning(latitude + "," + longitude);
        setUserPermission('granted');
      } else {
        console.log("No se pudieron obtener las coordenadas.");
        setUserPermission('denied');
        setIsLoading(false)
      }
    });
  };

  fetchData();
}, []);

  //USANDO WHATERAPI
  //Cuando tenemos las coordenadas, llamamos a la API para capturar los datos del tiempo
  useEffect(() => {
    if (positioning !== "") {
      const API_WEATHER_URL = "https://api.weatherapi.com/v1/forecast.json?key=" + process.env.NEXT_PUBLIC_WEATHERAPI_KEY + "&q=" + positioning + "&days=7&aqi=no&alerts=no";
      const options = {
        'mode': 'cors',
      }
      fetch(API_WEATHER_URL, options)
        .then(response => response.json())
        .then(data => {
          setCity(data.location.name + ", " + data.location.country);
          setCurrent(data.current);
          setHourly(data.forecast.forecastday[0].hour);
          setForecast(data.forecast.forecastday);

          let prefixDayNight;
          (data.current.is_day) ? prefixDayNight = "day_" : prefixDayNight = "night_";
          
          setMainIcon("icons/" + prefixDayNight + data.current.condition.text + ".png");
          setIsLoading(false)
        })
    }
  }, [city, positioning])



useEffect(() => {

  //Sacamos los datos de las próximas horas
  if(hourly.length > 0) {
    const fecha = new Date();

    // Filtramos las horas de hoy a partir de la hora actual
    let horasNext = hourly.filter((item) => (item.time_epoch >= fecha.getTime() / 1000) && (item.time_epoch / 3600));

    // Como no hay 12 horas, cogemos las del dias siguiente de forecast sin importar la hora, partiendo de la primera, el elemento cero
    if (horasNext.length < 12) {
      let horasNext2 = forecast[1].hour;
      horasNext.push(...horasNext2);
      // cortamos el array a los 12 elementos primeros
      horasNext = horasNext.slice(0, 12);
    }

    let nextHours = horasNext.map((item) => (
      <div className="px-3 py-3 rounded-md w-[70px] text-center bg-[#0f1531] min-w-[58px]" key={uuidv4()}>
        <p className="text-white text-[12px]">{item.time.slice(11, 16)}</p>
        
        {(item.is_day) 
        ? <img src={`icons/day_${item.condition.text}.png`} alt={item.condition.text} className="w-1-2 m-auto" /> 
        : <img src={`icons/night_${item.condition.text}.png`} alt={item.condition.text} className="w-1-2 m-auto" />}

        <p className="text-white text-sm mt-2 font-extralight">{item.temp_c}º</p>
    </div>
    ));
      setNextHours(nextHours);    
    }

const setDailyData = (item) => {
  //Vamos a filtrar el array con la fecha del item y vamos a inyectar el html en el div con id de item.date
  const selectedDay = forecast.filter((day) => day.date === item.date);

  // Quitamos la clase hidden al div con id de item.date si la tiene en su classlist, en caso contrario se la añadimos. Además le añadimos la clase activeDay al div padre del día seleccionado
  const itemDay = document.getElementById(item.date);
  
  const parentDays = document.querySelectorAll(".parentday");
  parentDays.forEach((item) => {
      item.classList.remove("activeDay");
  })

  const parent = document.getElementById(`parent-${item.date}`);
  if (itemDay.classList.contains("hidden")) {
    itemDay.classList.remove("hidden");
    parent.classList.add("activeDay");
  } else {
    itemDay.classList.add("hidden");
  }
  // A todos los demás div con clase itemday excepto al seleccionado le añadimos la clase hidden	
  const itemDays = document.querySelectorAll(".itemday");
  itemDays.forEach((item) => {
    if (item.id !== selectedDay[0].date) {
      item.classList.add("hidden");
    }
  })

}


  // Guardamos datos breves de los próximos días
 const proxDays = forecast.map((item) => (
  
    <section key={uuidv4()}>
      <a date={item.date} onClick={() => {setDailyData(item)}} forecastday={item.day} className="cursor-pointer">
        <div id={`parent-${item.date}`} className="px-2 py-2 rounded-md w-full text-center flex justify-between mb-2 border-b parentday" >
          <p className="text-white text-[16px]">{convertirFecha(item.date)}</p>
          <img src={`icons/day_${item.day.condition.text}.png`} className="w-[40px] h-auto" />
        </div>
      </a>
      
      
      <div className="itemday hidden p-3 bg-gray-400 bg-opacity-30 mb-2 rounded-xl" id={item.date}>
        <div className="flex justify-between gap-2 flex-row">
          
          <DayDetail name="Amanece" data={item.astro.sunrise} img="icons/amanece.png" />
          <DayDetail name="Anochece" data={item.astro.sunset} img="icons/anochece.png" />
          <DayDetail name="Viento" data={`${item.day.maxwind_kph} km/h`} img="icons/viento.png" />
        </div>


        <div className="flex justify-between gap-2 flex-row">
          <DayDetail name="Lluvia" data={`${item.day.totalprecip_mm} mm`} img="icons/lluvia.png" />
          <DayDetail name="Mínima" data={`${item.day.mintemp_c} º`} img="icons/temp_minima.png" />
          <DayDetail name="Máxima" data={`${item.day.maxtemp_c} º`} img="icons/temp_maxima.png" />
       </div>
          
      </div>

    </section>
    
  ));
  
  // Eliminamos el primer elemento, que es el de hoy
  proxDays.shift();
  setNextDays(proxDays);
}, [hourly]);



if (!isLoading) {
    if (userPermission === 'granted') {
        return <ClimaToday current={current} city={city} mainIcon={mainIcon} nextHours={nextHours} nextDays={nextDays} />
    } else {
      return <ClimaByIP />
    }
  } else {
    return (<span className="loader mt-[50px] mb-[50px]"></span>)
  }
}




