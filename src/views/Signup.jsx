import { signupWithGoogle } from "../firebase"
import { useNavigate } from "react-router-dom"
import Logo from "../components/common/Logo"
import googleIcon from "../assets/googleIcon.svg"
import { useSelector } from "react-redux"
import { useEffect } from "react"

export default function Signup() {
  const user = useSelector(state => state.user)
  useEffect(()=>{
    if(user.user){
      console.log(user);
      navigate('/')
    }
  },[user])
  const navigate = useNavigate()
  const buttonHandler = async () => {
    try {
      await signupWithGoogle()
      navigate('/')
    }
    catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='flex justify-center items-center w-screen h-screen'>
      <div className="card w-96 bg-base-100 shadow-xl">
  <figure className="px-10 pt-10">
    <Logo/>
  </figure>
  <div className="card-body items-center text-center">
    <h2 className="card-title">Sign up</h2>
    <div className="card-actions">
      <button onClick={buttonHandler} className="btn flex gap-4 bg-white text-gray-900 mt-2 py-3 hover:text-white ">
        <img src={googleIcon} alt=""  className='h-full'/>
        Sign up with Google</button>
    </div>
  </div>
</div>
    </div>
  )
}
