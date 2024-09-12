import React, { useEffect, useRef, useState } from 'react';

interface Message {
  text: string;
  sender: 'doctor' | 'user';
}

const HealthChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { text: 'Hey, how are you?', sender: 'doctor' },
    { text: 'I am feeling a pain near my stomach', sender: 'user' },
    { text: 'Is the pain sharp or dispersed?', sender: 'doctor' },
    { text: 'Also tell, what region exactly around the stomach?', sender: 'doctor' },
    { text: 'Its dispersed pain, near the navel', sender: 'user' },
    { text: 'Did you take the prescribed antacid by Dr. House in the last visit?', sender: 'doctor' },
    { text: 'No... I forgot!', sender: 'user' },
    { text: "Okay, no problem. When you take that, you won't feel any pain near your stomach :)", sender: 'doctor' },
  ]);

  const chatBodyRef = useRef<HTMLDivElement>(null);
  const [input, setInput] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false); // Add loading state to manage asynchronous requests

  const handleSendMessage = async () => {
    if (input.trim() === '') return;

    const userMessage: Message = { text: input.trim(), sender: 'user' };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput('');

    setLoading(true); // Start loading when a new message is sent

    try {
      // Send request to the first endpoint
      const response = await fetch('http://localhost:3001/api/crew', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: input.trim() }),
      });

      const data = await response.json();
      const jobId = data.job_id;

      if (jobId) {
        // Poll the job ID endpoint until the result is available
        await pollJobResult(jobId);
      } else {
        console.error('Failed to retrieve job ID');
      }
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const pollJobResult = async (jobId: string) => {
    const jobEndpoint = `http://localhost:3001/api/crew/${jobId}`;

    const intervalId = setInterval(async () => {
      try {
        const resultResponse = await fetch(jobEndpoint);
        const resultData = await resultResponse.json();
        console.log(resultData)
        if (resultData.result) {
          clearInterval(intervalId); // Stop polling when the result is available

          // Ensure that the answer is extracted correctly
          const doctorMessage: Message = {
            text: resultData.result.answer, // Access the 'answer' property of the result object
            sender: 'doctor',
          };

          setMessages((prevMessages) => [...prevMessages, doctorMessage]);
        }
      } catch (error) {
        console.error('Error polling job result:', error);
        clearInterval(intervalId); // Stop polling on error
      }
    }, 2000); // Poll every 2 seconds
  };

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages]); // Runs whenever messages change

  return (
    <div className="sn-chat-container bg-color1 max-h-[80vh] flex flex-col">
      <p className='sn-convo-start-date font-medium flex items-center justify-center my-3'>HealthChat AI Powered</p>
      <div ref={chatBodyRef} className="sn-chat-body max-h-[60vh] overflow-y-scroll">
        {messages.map((message, index) => (
          <div key={index} className={`sn-chat-message sn-${message.sender}-message`}>
            <span>{message.text}</span>
          </div>
        ))}
      </div>
      <div className="sn-chat-footer flex-col">
        <div className='sn-text-input w-[100%] p-1'>
          <input
            type="text"
            placeholder="Type a message..."
            className="sn-chat-input w-[94%] text-black"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleEnter}
          />
          <button className="sn-send-button w-10" onClick={handleSendMessage} disabled={loading}>
            {loading ? '...' : '➤'}
          </button>
        </div>
        <div className='sn-functionality-buttons self-end p-1 px-5'>
          <button className="sn-action-button sn-remove-doctor">Call Ambulance</button>
          <button className="sn-action-button sn-book-appointment">Book appointment</button>
        </div>
      </div>
    </div>
  );
};

export default HealthChat;
