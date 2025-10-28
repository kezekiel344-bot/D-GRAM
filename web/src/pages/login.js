import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../lib/firebase";
import { useState } from "react";
import { useRouter } from "next/router";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const login = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <main style={{ padding: 24 }}>
      <h2>Login</h2>
      <form onSubmit={login}>
        <label>Email<br />
          <input value={email} onChange={e => setEmail(e.target.value)} />
        </label><br />
        <label>Password<br />
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
        </label><br />
        <button type="submit">Login</button>
      </form>
    </main>
  );
}