export function getDate() {
  const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
  const dias_semana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  const fecha = new Date();
  return dias_semana[fecha.getDay()] + ', ' + fecha.getDate() + ' de ' + meses[fecha.getMonth()] + ' de ' + fecha.getUTCFullYear();
}

function getLocation() {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        resolve(position.coords);
      }, (error) => {
        reject(error);
      });
    } else {
      reject("Geolocation is not supported by this browser.");
      return null;
    }
  }); 
}
  
export async function obtenerUbicacion() {
  try {
    const coords = await getLocation();
    const latitude = coords.latitude;
    const longitude = coords.longitude;
    return { latitude, longitude };
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function fetchCityData() {
  try {
    const response = await fetch('https://ipapi.co/json/');
    const data = await response.json();
    console.log(data);
    const city = data.city + ", " + data.country_name;
    const latitude = data.latitude;
    const longitude = data.longitude;
    return { city, latitude, longitude };
  } catch (err) {
    console.log(err);
    return {
      city: 'Córdoba, España',
      latitude: 0,
      longitude: 0
    };
  }
}

export function convertirFecha(fechaStr) {
  const diasSemana = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
  const meses = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];

  const partes = fechaStr.split('-');
  if (partes.length !== 3) {
    return "Fecha no válida";
  }

  const anio = parseInt(partes[0]);
  const mes = parseInt(partes[1]);
  const dia = parseInt(partes[2]);

  const fecha = new Date(anio, mes - 1, dia); // Meses en JavaScript son 0-indexados

  const diaSemana = diasSemana[fecha.getDay()];
  const nombreMes = meses[mes - 1];

  return `${diaSemana} ${dia} de ${nombreMes}`;
}