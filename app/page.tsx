import Image from "next/image"
import img from "./img.png"


export default function Login() {
  return(
    <div className="bg-gradient-to-r from-[#DA4453] to-[#89216B] h-screen w-screen flex items-center justify-center">
      <div className="w-240 h-170 flex items-center justify-center bg-white rounded-xl relative">
        <div className="flex items-center justify-center">
          <div className="flex flex-col  items-center justify-center">
            <form className="flex flex-col absolute right-20 top-45" action="">
              <h1 className="text-2xl font-bold">Member Login</h1>
              <div className="mt-15 mb-4">
            <input placeholder="Username" className="bg-[#e6e6e6] p-3 rounded-full w-70" type="username" />
              </div>
            <div>
              <input placeholder="Password" className="bg-[#e6e6e6] p-3 rounded-full w-70" type="password" />
            </div>
            <div>
                <button className="bg-[#57b846] mt-5 p-3 rounded-full text-white-500 w-70">Login</button>
            </div>  
            </form>
          </div>
        </div>
        <div className="absolute left-20 top-45">
          <Image src={img} alt="image" />
        </div>
      </div>
    </div>
  )
}
