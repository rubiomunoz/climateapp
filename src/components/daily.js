import { useState } from "react";
import { obtenerUbicacion, convertirFecha } from "../js/functions";

export const Daily = (props) => {
    console.log(props);
    const dayData = props.dayData;
    return  (
        <>
            <h1 className="text-gray-800 text-xl mb-3">Datos del {convertirFecha(dayData.date)}</h1>
            <p className="text-gray-800">Amanecer: <span className="font-bold">{dayData.astro.sunrise} h</span></p>
            <p className="text-gray-800">Puesta: <span className="font-bold">{dayData.astro.sunset} h</span></p>

            <p className="text-gray-800">tiempo: <span className="font-bold">{dayData.day.condition.text}</span></p>
            <p className="text-gray-800">Temperatura mínima: <span className="font-bold">{dayData.day.mintemp_c}º</span></p>
            <p className="text-gray-800">Temperatura máximo: <span className="font-bold">{dayData.day.maxtemp_c}º</span></p>
            <p className="text-gray-800">Probabilidad de lluvia: <span className="font-bold">{dayData.day.daily_chance_of_rain}%</span></p>
            <p className="text-gray-800">lluvia en mm: <span className="font-bold">{dayData.day.totalprecip_mm}mm</span></p>
            <p className="text-gray-800">Humedad: <span className="font-bold">{dayData.day.avghumidity}%</span></p>


            
            <a href="/" className="text-white p-3 bg-green-700 block mt-5 text-center rounded">Volver</a>
        </>
    )
}
