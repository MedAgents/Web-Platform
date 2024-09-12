import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
// import 'chatinterface.css';
// import profilePic from '@\public\images\anita-dixit-potrait.png'
import profilePic from '@/public/images/anita-dixit-potrait.png';

interface Props {
  name: string | any;
  img: string | any;
}

interface Message {
  text: string;
  sender: 'doctor' | 'user';
}

const ChatInterface = ({ name, img }: Props) => {
  const [messages, setMessages] = useState<Message[]>([
    { text: 'Good afternoon, Naren', sender: 'doctor' },
    { text: 'I wanted to know if you are allergic to paracetamol?', sender: 'doctor' },
    { text: 'It can be causing your rashes', sender: 'doctor' },
    { text: 'If yes, then replace it with Advil', sender: 'doctor' },
  ]);
  const [input, setInput] = useState<string>('');
  
  // Create a reference for the chat body div
  const chatBodyRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = () => {
    if (input.trim() === '') return;

    const newMessage: Message = { text: input.trim(), sender: 'user' };
    setMessages([...messages, newMessage]);
    setInput('');
  };

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  // useEffect to handle scrolling to the bottom of the chat
  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages]); // Runs whenever messages change

  return (
    <div className="bg-color1">
      <div className="sn-chat-header">
        <Image src={img} alt="Doctor's Profile" className="sn-doctor-profile" width={15} height={15} />
        <span className="sn-doctor-name text-textColorDark">{name}</span>
      </div>
      <div ref={chatBodyRef} className="sn-chat-body max-h-[20rem] overflow-y-scroll">
        <p className='sn-convo-start-date m-auto font-bold'>Today</p>
        {messages.map((message, index) => (
          <div key={index} className={`sn-chat-message sn-${message.sender}-message`}>
            <span>{message.text}</span>
          </div>
        ))}
      </div>
      <div className="sn-chat-footer flex-col">
        <div className='sn-text-input w-[100%] p-1 flex flex-row'>
          <input
            type="text"
            placeholder="Type a message..."
            className="sn-chat-input w-[94%] text-black"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleEnter}
          />
          <button className="sn-send-button w-10" onClick={handleSendMessage}>
            ➤
          </button>
        </div>
        <div className='sn-functionality-buttons self-end p-1 mt-4'>
          <button className="sn-action-button sn-remove-doctor">Remove Doctor</button>
          <button className="sn-action-button sn-book-appointment">Book appointment</button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
