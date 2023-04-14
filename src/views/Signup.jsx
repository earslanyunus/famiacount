import { signupWithGoogle } from "../firebase"

export default function Signup() {
  return (
    <div>
      <button onClick={signupWithGoogle}>Signup with Google</button>
    </div>
  )
}
