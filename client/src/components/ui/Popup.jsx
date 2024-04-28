import Form from "./Form"


const Popup = ({details,openPopup,setOpenPopup}) => {
  return (
    <>
        { openPopup &&
            <div className = "absolute z-2 w-full min-h-[100vh]">
            <div className="absolute w-full h-full bg-black opacity-10"></div>
            <div className = "absolute  bg-white top-[20%] left-[30%] rounded-lg">
                <Form details = {details} setOpenPopup = {setOpenPopup}/>
            </div>
        </div>
        }
    </>
    
    
  )
}

export default Popup
