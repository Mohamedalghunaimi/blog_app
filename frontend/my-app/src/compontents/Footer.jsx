import { Link } from "react-router-dom"
import { assets, footer_data } from "../QuickBlog-Assets/assets"

const Footer = () => {
  return (
    <div className="bg-slate-200 py-[20px] mt-[80px]">
        <div className="container mx-auto flex justify-between">
            <div className="max-w-[500px]">
                <Link to={"/"}>
                    <img src={assets.logo} alt="" />
                </Link>
                <p className=" mt-[10px]">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam laborum laudantium facilis obcaecati ea itaque magnam, provident eveniet similique, officia totam neque blanditiis at voluptas culpa nihil? Corporis, voluptas quasi!
                </p>
            </div>
        {
            footer_data.map((item)=> {
                return(<>
                <ul className="flex flex-col gap-[5px]">
                    <li className="font-bold text-xl">{item.title}</li>
                    {
                        item.links.map((link)=> {
                            return(<>
                            <li className="hover:underline cursor-pointer text-gray-600 text-sm">
                                {link}
                            </li>
                            
                            
                            </>)
                        })
                    }
                </ul>
                
                
                
                
                
                
                </>)
            })
        }
        </div>

    </div>
    )
}

export default Footer
