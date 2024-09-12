import React, { useState } from 'react';

interface Props{
  img: string|any;
}


interface MessageProps {
  text: string;
  isPatient: boolean;
}


interface Message {
    text: string;
    sender: 'doctor' | 'user';
}

const MedicalReport = ({img} : Props) => {
    const [selectedTab, setSelectedTab] = useState('Diagnosis');
    const [isMessage, setIsMessage] = useState(false);


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


    const renderContent = () => {
        switch (selectedTab) {
          case 'Reports':
            return (
              <div className="h-[55vh] overflow-y-scroll">
                <h2 className="sn-title">Medical History</h2>
                <p className="sn-text">
                  22-year-old with a medical history that includes childhood chickenpox, an appendectomy at age 13, mild anemia managed with supplements, and mild asthma controlled with an inhaler. She has seasonal pollen allergies and a known allergy to penicillin. She has a family history of hypertension, diabetes, high cholesterol, osteoporosis, and heart disease. She leads an active lifestyle, enjoying yoga and jogging, and maintains a mostly vegetarian diet. Recently, she has managed mild anxiety related to academic pressures through mindfulness and counseling. Her immunizations are up-to-date, including the COVID-19 vaccine, and she experiences regular menstrual cycles with no significant gynecological concerns.
                </p>
              </div>
            );
          case 'Diagnosis':
            return (
              <div className="h-[55vh] overflow-y-scroll">
                <div className="sn-section">
                  <h2 className="sn-title">Medical History</h2>
                  <p className="sn-text">
                    22-year-old with a medical history that includes childhood chickenpox, an appendectomy at age 13, mild anemia managed with supplements, and mild asthma controlled with an inhaler. She has seasonal pollen allergies and a known allergy to penicillin. She has a family history of hypertension, diabetes, high cholesterol, osteoporosis, and heart disease. She leads an active lifestyle, enjoying yoga and jogging, and maintains a mostly vegetarian diet. Recently, she has managed mild anxiety related to academic pressures through mindfulness and counseling. Her immunizations are up-to-date, including the COVID-19 vaccine, and she experiences regular menstrual cycles with no significant gynecological concerns.
                  </p>
                </div>
                <div>
                  <h2 className="sn-title">Current Symptoms</h2>
                  <p className="sn-text">
                    The patient is experiencing a high body temperature ranging from 100-104°F (38-40°C), accompanied by chills and sweating. They report headaches, body aches, and joint pain, leading to a feeling of fatigue and weakness. Respiratory symptoms include a sore throat, cough, and congestion. The patient also has gastrointestinal complaints such as nausea, vomiting, and diarrhea. Additional symptoms include loss of appetite, a runny or stuffy nose, red eyes, and occasionally, a skin rash. These symptoms appeared suddenly and have persisted for several days.
                  </p>
                </div>
                <div className="sn-section">
                  <h2 className="sn-title">Assistive Diagnosis</h2>
                  <p className="sn-text">
                    Based on the symptoms observed, my diagnosis is viral fever. The patient is exhibiting a high body temperature between 100-104°F (38-40°C), along with chills, sweating, headaches, body aches, and joint pain, which are common signs of viral infections. Additionally, the presence of respiratory symptoms such as a sore throat, cough, and congestion, along with gastrointestinal issues like nausea, vomiting, and diarrhea, suggests a systemic viral infection. The sudden onset of these symptoms, combined with fatigue, loss of appetite, runny or stuffy nose, red eyes, and occasional skin rash, further supports this diagnosis. These symptoms are characteristic of viral fever, which is typically caused by common viruses such as influenza, adenovirus, or enterovirus.
                  </p>
                </div>
              </div>
            );
          case 'Health Vitals':
            return (
              <div className='h-[55vh] overflow-y-scroll'>
                <div className="flex flex-row gap-4 w-full h-full">
                  <div className="flex flex-col gap-4 w-[35%]">
                      <img src="/images/BMI.png" alt="" className="w-[100%]"/>
                      <img src="/images/Glucose.png" alt="" className="w-[100%]" />
                  </div>
                  <div className="flex flex-col w-[20.3%]">
                      <img src="/images/Fat.png" alt="" className="w-full"/>
                  </div>
                  <div className="flex flex-col gap-4 w-[20%]">
                    <img src="/images/Schedule.png" alt="" className="w-full" />
                  </div>
                  <div className="flex flex-col gap-4 w-[20%]">
                    <img src="/images/Circle.png" alt="" className="w-full" />
                  </div>
                </div>
              </div>
            );
          default:
            return null;
        }
   };


  const handleMessage = () => {
    setIsMessage(true);
  }

  return (
    <div className="sn-ChatInterfaceDoc-container flex flex-col bg-backgroundColor text-textColorDark w-[100%] ">
        <div className=' flex items-center justify-center mb-2' >
            <h3 className="font-medium text-center text-medium">Ms. Khushi Shah</h3>
        </div>
        <div className='flex' >
            <div className="w-[20%] flex flex-col gap-1 items-center">
                <img
                src={img}
                alt="Patient"
                className="w-[90%] rounded-[20px] shadow-ourBoxShadow"
                />
                <div className="sn-patient-details w-[90%] flex flex-col">
                <p><span className='font-medium'>Sex</span>: Female</p>
                <p><span className='font-medium'>Age</span>: 22</p>
                <p><span className='font-medium'>Condition</span>: Lupus</p>
                <p><span className='font-medium'>Blood Group</span>: O-</p>
                <div className='flex gap-2'>
                  <span>📞</span>
                  <span onClick={handleMessage} className='cursor-pointer' >💬</span>
                </div>
                </div>
            </div>

            {/* TODO: Chat area */}
            {isMessage && <div className="sn-doc-chat-container w-full">
                <div className="sn-chat-body max-h-[48vh] overflow-y-scroll">
                    <p className='sn-convo-start-date m-auto font-medium pb-4' >Today</p>
                    {messages.map((message, index) => (
                    <div key={index} className={`sn-chat-message sn-${message.sender}-message`}>
                        <span>{message.text}</span>
                    </div>
                    ))}
                </div>
                <div className="sn-chat-footer flex-col gap-2">
                    <div className='sn-text-input w-[100%] flex' >
                        <input
                          type="text"
                          placeholder="Type a message..."
                          className="sn-chat-input flex-grow text-grey "
                          value={input}
                          onChange={(e) => setInput(e.target.value)}
                        />
                        <button className="sn-send-button w-10 h-10" onClick={handleSendMessage}>
                        ➤
                        </button>
                    </div>
                    <div className='sn-functionality-buttons self-end p-1 px-0' >
                        <button className="sn-action-button sn-remove-doctor">Remove Patient</button>
                    </div>
                </div>
            </div>}


            {!isMessage && 
            <div className="bg-backgroundColor p-4 w-[80%] rounded-[20px] flex flex-col items-center">
                <div className="flex center justify-center bg-[#d9d9d9] rounded-[10px] w-[50%] p-1 gap-3 opacity-80">
                    <button
                    className={`sn-tab  ${selectedTab === 'Reports' ? 'sn-tab-active' : ''}`}
                    onClick={() => setSelectedTab('Reports')}
                    >
                    Reports
                    </button>
                    <button
                    className={`sn-tab ${selectedTab === 'Diagnosis' ? 'sn-tab-active' : ''}`}
                    onClick={() => setSelectedTab('Diagnosis')}
                    >
                    Diagnosis
                    </button>
                    <button
                    className={`sn-tab ${selectedTab === 'Health Vitals' ? 'sn-tab-active' : ''}`}
                    onClick={() => setSelectedTab('Health Vitals')}
                    >
                    Health Vitals
                    </button>
                </div>
                {renderContent()}
            </div>}

        </div>
    </div>
  );
};

export default MedicalReport;
