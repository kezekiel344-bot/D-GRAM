import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, addDoc, onSnapshot, orderBy, query } from "firebase/firestore";

export default function ChatBox() {
  const [msg, setMsg] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("timestamp"));
    const unsub = onSnapshot(q, (snap) => {
      setMessages(snap.docs.map((d) => d.data()));
    });
    return () => unsub();
  }, []);

  const sendMessage = async () => {
    if (!msg.trim()) return;
    await addDoc(collection(db, "messages"), {
      text: msg,
      timestamp: Date.now()
    });
    setMsg("");
  };

  return (
    <div className="bg-white rounded-xl shadow p-4 flex flex-col">
      <h2 className="font-bold mb-2">Chat</h2>
      <div className="flex-1 overflow-y-auto space-y-2 mb-3">
        {messages.map((m, i) => (
          <div key={i} className="bg-gray-100 p-2 rounded">{m.text}</div>
        ))}
      </div>
      <div className="flex gap-2">
        <input value={msg} onChange={(e)=>setMsg(e.target.value)} className="flex-1 border rounded p-2" placeholder="Type..." />
        <button onClick={sendMessage} className="bg-pink-500 text-white px-3 rounded">Send</button>
      </div>
    </div>
  );
}
