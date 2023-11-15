import { getDate } from '../js/functions.js';

export const ClimaToday = (props) => {
    const fechaActual = getDate();
    const { city, current, nextHours, mainIcon, forecast, nextDays } = props;

    return (
       
          <>
            <h1 className="text-yellow-500 text-2xl font-bold text-left drop-shadow(0 4px 3px rgba(0, 0, 0, 0.1)) mb-0">{city}</h1>
            <p className="text-white text-sm text-left drop-shadow(0 4px 3px rgba(0, 0, 0, 0.1)) mb-0">{fechaActual}</p>

            <div id="actual_climate" className="rounded-lg p-[6px] mt-3 flex gap-5">
              <div className="w-4/12">
                <p className="text-white text-7xl font-bold">{Math.round(current.temp_c)}º</p>
              </div>
              <div className="w-8/12">
                <img src={mainIcon} alt='' className="w-full m-auto" />
              </div>
              
            </div>
            <p className="text-white">{current.condition.text}</p>
            
            <h3 className="text-white text-xl font-normal mt-3">Condiciones</h3>

            <div className="bg-[#fff] bg-opacity-30 rounded-lg p-3 mt-3 flex gap-4 align-middle justify-around">
              <div>
                <img src="icons/lluvia.png" alt="Lluvia" className="w-12 m-auto" />
                <p className="text-white text-sm text-center">{current.precip_mm} mm</p>
                <p className="text-white text-[10px] text-center">Lluvia</p>
              </div>

              <div>
                <img src="icons/viento.png" alt="Viento" className="w-12 m-auto" />
                <p className="text-white text-sm text-center">{current.wind_kph} km/h</p>
                <p className="text-white text-[10px] text-center">Viento</p>
              </div>

              <div>
                <img src="icons/icon-humedad.png" alt="Humedad" className="w-12 m-auto" />
                <p className="text-white text-sm text-center">{current.humidity} %</p>
                <p className="text-white text-[10px] text-center">Humedad</p>
              </div>

            </div>

            <h3 className="text-white text-xl font-normal mt-3">Próximas horas</h3>
            <div className="flex gap-2 mt-2 overflow-x-auto">
              {nextHours}
            </div>

            <div className="flex justify-between gap-2 flex-row text-white mt-2">
              <svg xmlns="http://www.w3.org/2000/svg" height="1.2em" fill="white" viewBox="0 0 448 512"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/></svg>
              <svg xmlns="http://www.w3.org/2000/svg" height="1.2em" fill="white" viewBox="0 0 448 512"><path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"/></svg>
            </div>

            <h3 className="text-white text-xl font-normal mt-3">Próximos días</h3>
            <div className="block mt-2">
              {nextDays}
            </div>
        </>
    )
}