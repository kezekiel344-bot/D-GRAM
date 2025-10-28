import Link from 'next/link';
import { useEffect, useState } from 'react';
import { auth } from '../lib/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';

export default function Layout({ children }){
  const [user, setUser] = useState(null);
  useEffect(()=>onAuthStateChanged(auth, setUser), []);
  return (
    <div>
      <header className="p-4 border-b">
        <div className="max-w-3xl mx-auto flex justify-between">
          <Link href="/"><a className="font-bold">Messenger MVP</a></Link>
          <nav>
            {user ? (
              <>
                <a className="mr-2">{user.displayName || user.email}</a>
                <button onClick={()=>signOut(auth)} className="btn">Sign out</button>
              </>
            ) : (
              <Link href="/login"><a className="btn">Login</a></Link>
            )}
          </nav>
        </div>
      </header>
      <main className="p-4">{children}</main>
    </div>
  );
}
