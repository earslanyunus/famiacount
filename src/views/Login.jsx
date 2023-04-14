import React from 'react'
import { signInWithGoogle } from '../firebase'

export default function Login() {
  return (
    <div>
        <button onClick={signInWithGoogle}>sing in google</button>
    </div>
  )
}
