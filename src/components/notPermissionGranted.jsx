import Image from 'next/image'

export const NotPermissionGranted = () => {

    return (
        <>
          <Image
            src="/images/robot.png"
            className="w-4/5 p-2 text-center m-auto"
            alt="robot"
            width={750}
            height={670}
          />

          <h1 className="text-white text-xl mt-3 font-light">No has concedido permisos, por lo que los datos de tiempo no pueden ser calculados de manera automática. Usa el buscador superior para establecer la ciudad deseada. El buscador registra las búsquedas en inglés.</h1>

        </>
    )
}