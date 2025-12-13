import { useState } from "react";
import { registerUser } from "../services/auth";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  const submit = async () => {
    await registerUser(email, password);
    nav("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="bg-zinc-900 p-8 rounded w-96">
        <h2 className="text-2xl mb-4">Register</h2>
        <input className="w-full mb-3 p-2" placeholder="Email" onChange={e=>setEmail(e.target.value)} />
        <input className="w-full mb-4 p-2" type="password" placeholder="Password" onChange={e=>setPassword(e.target.value)} />
        <button onClick={submit} className="bg-pink-500 w-full py-2 rounded">
          Sign up
        </button>
      </div>
    </div>
  );
}
