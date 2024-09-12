import React, { useState } from 'react';
import cuteGirl from '@/public/images/cute-girl-image.png';
import Image from 'next/image';
// import { Message } from 'postcss';

interface MessageProps {
  text: string;
  isPatient: boolean;
}

interface Props{
    // name: string | any;
    img: string | any;
}

interface Message {
    text: string;
    sender: 'doctor' | 'user';
}

// const Message: React.FC<MessageProps> = ({ text, isPatient }) => {
//   return (
//     <div className={`sn-message ${isPatient ? 'sn-patient' : 'sn-doctor'}`}>
//       {text}
//     </div>
//   );
// };

const ChatInterfaceDoc = ({img} : Props) => {

    const [messages, setMessages] = useState<Message[]>([
        { text: 'Good afternoon, Naren', sender: 'user' },
        { text: 'I wanted to know if you are allergic to paracetamol?', sender: 'user' },
        { text: 'It can be causing your rashes', sender: 'user' },
        { text: 'If yes, then replace it with Advil', sender: 'user' },
    ]);

    const [input, setInput] = useState<string>('');

    const handleSendMessage = () => {
        if (input.trim() === '') return;

        const newMessage: Message = { text: input.trim(), sender: 'user' };
        setMessages([...messages, newMessage]);
        setInput('');
    };


  return (
    <div className="sn-ChatInterfaceDoc-container flex flex-col bg-white text-black ">
        <div className='sn-chat-doc-header' >
            <h3 className="sn-ChatInterfaceDoc-header font-bold text-center pb-4 ">Ms. Khushi Shah</h3>
        </div>
        <div className='flex' >
            <div className="sn-patient-info">
                <Image
                // src={cuteGirl}
                src={img}
                alt="Patient"
                className="sn-patient-image  "
                width={300}
                height={400}
                />
                <div className="sn-patient-details">
                <p>Sex: Female</p>
                <p>Age: 22</p>
                <p>Condition: Lupus</p>
                <p>Blood Group: O-</p>
                <span>📞</span>
                <span>💬</span>
                </div>
                {/* <div className="sn-patient-contact">
                
                </div> */}
            </div>
            {/* <div className="sn-ChatInterfaceDoc-content">
                <p className="sn-ChatInterfaceDoc-date">Today</p>
                <Message text="Good afternoon, Naren" isPatient={true} />
                <Message text="I wanted to know if you are allergic to paracetamol?" isPatient={true} />
                <Message text="It can be causing your rashes" isPatient={true} />
                <Message text="If yes, then replace it with Advil" isPatient={true} />
                <button className="sn-remove-patient-button">Remove Patient</button>
            </div> */}
            <div className="sn-doc-chat-container ">
                {/* <div className="sn-chat-header">
                    <Image src={profilePic} alt="Doctor's Profile" className="sn-doctor-profile" />
                    <span className="sn-doctor-name">Dr. Anita Dixit</span>
                    <button className="sn-close-button  ml-auto mr-4 ">✖</button>
                </div> */}
                <div className="sn-chat-body ">
                    <p className='sn-convo-start-date m-auto font-bold pb-4 ' >Today</p>
                    {messages.map((message, index) => (
                    <div key={index} className={`sn-chat-message sn-${message.sender}-message`}>
                        <span>{message.text}</span>
                    </div>
                    ))}
                </div>
                <div className="sn-chat-footer flex-col ">
                    <div className='sn-text-input w-[100%] p-1 ' >
                        <input
                        type="text"
                        placeholder="Type a message..."
                        className="sn-chat-input w-[89%] text-black "
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        />
                        <button className="sn-send-button w-10 " onClick={handleSendMessage}>
                        ➤
                        </button>
                    </div>
                    <div className='sn-functionality-buttons self-end p-1 px-5 ' >
                        <button className="sn-action-button sn-remove-doctor">Remove Patient</button>
                        {/* <button className="sn-action-button sn-book-appointment">Book appointment</button> */}
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default ChatInterfaceDoc;
