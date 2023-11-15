## Weather APP

Aplicación de tiempo basado en la API de WeatherAPI. Usa una API KEY gratuita que se puede conseguir en: https://www.weatherapi.com/ con la limitación de un millón de consultas al mes y el tiempo de los próximos dos días además del actual. Las características pueden ser consultadas aquí: https://www.weatherapi.com/pricing.aspx.

De cada tipo de clima hay un icono de día y otro de noche, con el prefijo day_ y night_. Debajo del clima actual escribo la condición actual y de ahí sacamos las imágenes que sacamos.

Se puede consultar una versión online aquí: https://weather-app-sand.vercel.app/

## Cómo funciona
Cuando accedes, si das permisos de localización, cargará el clima de la localidad en la que se encuentra en base al posicionamiento (latitud y longitud). En caso contrario, se puede hacer uso del buscador implementado. Este funciona en base a la API de GeoApify (hace falta una nueva Key e incluirla en el archivo .env)

## Pendiente
-Añadir más iconos de clima (los iré añadiendo según me van apareciendo)
-Refactorizar el código