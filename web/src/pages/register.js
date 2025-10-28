import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../lib/firebase";
import { useState } from "react";
import { useRouter } from "next/router";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const register = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push("/");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <main style={{ padding: 24 }}>
      <h2>Register</h2>
      <form onSubmit={register}>
        <label>Email<br />
          <input value={email} onChange={e => setEmail(e.target.value)} />
        </label><br />
        <label>Password<br />
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
        </label><br />
        <button type="submit">Register</button>
      </form>
    </main>
  );
}