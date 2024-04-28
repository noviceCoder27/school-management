

const Card = ({icon,value,title,bgradient,shadowcolor,iconcolor}) => {
  return (
    <div className = {`flex justify-between flex-1 p-5 rounded-2xl ${bgradient} shadow-[0_20px_40px_-15px_rgb(${shadowcolor})]`}>
            <div className = "flex flex-col gap-5 font-semibold text-white">
              <p className = "text-[2.5rem]">{value}</p>
              <p>{title}</p>
            </div>
            <div className = {`mt-auto mb-auto text-[3rem] bg-white p-4 rounded-full ${iconcolor}`}>
              {icon}
            </div>
    </div>
  )
}

export default Card
