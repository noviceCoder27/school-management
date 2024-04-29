import { CiSearch } from "react-icons/ci";
import { useDataContext } from "../../context/DataContext";


const Input = () => {
    const {setSearchStr} = useDataContext();
    return (
        <div className = "relative">
            <input placeholder = "Search" className = "p-2 border-2 rounded-md" onChange = {(e) => setSearchStr(e.target.value)}/>
            <div className = "absolute text-xl text-gray-400 right-2 top-3">
                <CiSearch />
            </div>
        </div>
        
    )
}

export default Input
