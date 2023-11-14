export const DayDetail = ({name, data, img}) => {
    return (
        <div className="w-1/3 p-3 text-center">
            <img 
              src={img} className="w-[60px] h-auto m-auto block"
            />
            <p className="text-white text-xs mt-2 text-center">{name}</p>
            <p className="text-white text-center">{data}</p>
        </div>
    )
}
