import { Link, useLocation, useNavigate } from "react-router-dom";
import { assets } from "../QuickBlog-Assets/assets"
import { GrFormNextLink } from "react-icons/gr";
import { useContext } from "react";
import { context } from "../pages/Provider";
import axios from "axios";
import { toast } from "react-toastify";

const Navbar = () => {
  const nav = useNavigate()

  const location = useLocation()
  const {isAuth,setIsAuth} = useContext(context)

  const logout = async() => {
    try {
        axios.defaults.withCredentials = true
        const {data} = await axios.get("http://localhost:5000/api/auth/logout")
        if(data.success) {
          setIsAuth(false)
        }
        else {
          toast.error(data.message)
        }
    } catch (error) {
      toast.error(error.message)
    }
  }
  return (

    <div className='container mx-auto flex s items-center justify-between '>
        <div>
          <Link to={"/"}>
            <img src={assets.logo} alt="" className="w-[200px] h-[100px]"/>
          </Link>

        </div>
        <div>
          {location.pathname==="/login"?
          
          <>
          {isAuth?<>
          <div className="flex capitalize items-center relative parent">
            hello  <span className="font-semibold mx-[5px]"> {isAuth.name}!</span>
            <img src={assets.user_icon} alt="" className="w-[30px] h-[30px]" />
            <ul className=" bottom-0 right-[0px] p-[5px] hidden  shadow-lg border-[1px] rounded-lg rounded-tr-none  absolute translate-y-[100%] translate-x-[-30%]">
              <li className="hover:underline cursor-pointer" onClick={()=> {
                logout()
              }}>logout</li>
            </ul>
            </div>
          </>:<></>}
          </>
          
          :<>
          {isAuth?<>
          <div className="flex capitalize items-center relative parent">
            hello  <span className="font-semibold mx-[5px]"> {isAuth.name}!</span>
            <img src={assets.user_icon} alt="" className="w-[30px] h-[30px]" />
            <ul className=" bottom-0 right-[0px] p-[5px] hidden  shadow-lg border-[1px] rounded-lg rounded-tr-none  absolute translate-y-[100%] translate-x-[-30%]">
              <li className="hover:underline cursor-pointer" onClick={()=> {
                logout()
              }}>logout</li>
            </ul>
          </div>
          </>:<>
            <button className="flex items-center gap-[5px] border-none outline-none bg-blue-600 text-lg font-semibold text-white capitalize py-[5px] px-[20px] rounded-full cursor-pointer duration-300 hover:bg-blue-800" onClick={()=> {
                nav("/login")
            }}>
                login
                <span>
                  <GrFormNextLink/>
                </span>
            </button>          
          </>}
          </>}

        </div>
    </div>

  )
}

export default Navbar   
