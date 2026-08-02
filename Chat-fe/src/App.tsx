import './App.css'
import {useEffect, useState, useRef} from "react";

function App() {

  // giving this useState a type of generics (array of strings) so that it doesn't complain
  const [messages, setMessages] = useState<string[]>(["hi"]);

  const textRef = useRef();

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080")

    ws.onmessage = (ev) =>{
      setMessages(m => [...m, ev.data])
    }
  }, [])

  function sendMessage(){
    
    ws.send("")
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-black ">
      <p className="text-black p-1 m-2 bg-white rounded-xl">Real-Time-Chat Application</p>
      <div className="flex flex-col border-2 border-white justify-between rounded-xl position-relative h-[70vh] w-[70vh] overflow-hidden">

        {/* I need to iterate over all of the messages and then render it on the screen, for that i am using messages.map */}
        <div className="flex flex-col overflow-y-auto">
          {messages.map(messages =><div className="bg-white text-black p-3 m-2 w-[15vh] rounded-xl ">
            {messages}
            </div>)}
        </div>

        <div className= "bg-white h-[10vh] flex justify-between m-2 rounded-xl">
          <input type="text" placeholder="  send message" className=" m-2 w-full position-relative "/>
          <button className="bg-black text-white rounded-xl m-2 p-1 position-relative h-[6vh] " onClick={sendMessage} ref={textRef}>Send</button>
        </div>


      </div>
    </div>
    
  )
}

export default App
