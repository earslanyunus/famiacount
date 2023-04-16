import { useEffect } from 'react'
import { signInWithGoogle } from '../firebase'
import Logo from '../components/common/Logo'
import googleIcon from '../assets/googleIcon.svg'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'

export default function Login() {
  const user = useSelector(state => state.user.user)
  const navigate = useNavigate()
  useEffect(()=>{
    if(user){
      navigate('/')
    }
  },[user])

  const buttonHandler = async () => {
    try {
      await signInWithGoogle()
      navigate('/')
    }
    catch (error) {
      console.log(error)
    }
  }
  return (
    <div className='flex flex-col justify-center items-center w-screen h-screen'>
      <div className="card w-96 bg-base-100 shadow-xl">
  <figure className="px-10 pt-10">
    <Logo/>
  </figure>
  <div className="card-body items-center text-center">
    <h2 className="card-title">Login</h2>
    <div className="card-actions">
      <button onClick={buttonHandler} className="btn flex gap-4 bg-white text-gray-900 mt-2 py-3 hover:text-white ">
        <img src={googleIcon} alt=""  className='h-full'/>
        Sign in with Google</button>
    </div>
  </div>
</div>
<p className='mt-4'>If you don't have an account, <NavLink to={'/signup'} className={'btn-link'}>sign up.</NavLink></p>
    </div>
  )
}
