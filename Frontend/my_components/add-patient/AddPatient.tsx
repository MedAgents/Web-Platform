import React, { use, useState } from 'react';
// import MessageIcon from '@/public/icons/MessageIcon';
// import MessageIcon from '@/public/icons/messageIcon';
// import FileIconSn from '@/public/icons/FileIconSn';
import messageIcon from '@/public/icons/messagesIcon.png';
import filesIcon from '@/public/icons/filesIcon.png';
import Image from 'next/image';

const AddPatient: React.FC = () => {
  // const [what, setWhat] = useState<string>('');
  // const [when, setWhen] = useState<string>('');
  // const [from, setFrom] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [age, setAge] = useState<number | undefined>(undefined);
  const [phone, setPhone] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);
  const [valueOne, setValueOne] = useState<string>('');
  const [valueTwo, setValueTwo] = useState<string>('');
  const [valueThree, setValueThree] = useState<string>('');

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value ? parseInt(e.target.value, 10) : undefined;
    setAge(newValue);
  };
  

  const handleSubmit = () => {
    console.log({
      file,
      // what,
      // when,
      // from,
      valueOne,
      valueTwo,
      valueThree,
      name,
      age,
      phone,
    });
  };

  return (
    <div className="sn-add-report-container m-auto my-40 text-[#666666] ">
      <div className="sn-add-report-header text-black ">
        <h2 className="sn-add-report-title text-black mx-auto ">Add Report</h2>
        <button className="sn-close-button  ">✖</button>
      </div>
      <div className="sn-patient-file-upload " >
        <div className='sn-file-upload-under  w-[65%]' >
          <input
            type="file"
            accept=".pdf"
            id="file-upload"
            className="sn-file-input  "
            onChange={handleFileUpload}
          />
          <label htmlFor="file-upload" className="sn-file-upload-label w-[99%] ">
            {file ? file.name : 'Upload Report PDF'}
          </label>
        </div>
        <div className='sn-buttons'>
          <button className='sn-button' > <Image src={filesIcon} alt='file icon' ></Image> </button>
          <button className='sn-button' > <Image src={messageIcon} alt='message icon' ></Image> </button>
        </div>
      </div>
      <div className="sn-details-input">
        <p>Enter Details:</p>
        <div className='sn-inputs' >
            <input
            type="text"
            placeholder="name"
            className="sn-input-field1"
            value={name}
            onChange={(e) => setName(e.target.value)}
            />
            <input
            type="text"
            placeholder="Value"
            className="sn-input-field2"
            value={valueOne}
            onChange={(e) => setValueOne(e.target.value)}
            />
        </div>
        <div className='sn-inputs'>
            <input
            type="number"
            placeholder="Age"
            className="sn-input-field1"
            value={age ?? ''}
            onChange={handleAgeChange}
            />
            <input
            type="text"
            placeholder="Value"
            className="sn-input-field2"
            value={valueTwo}
            onChange={(e) => setValueTwo(e.target.value)}
            />
        </div>
        <div className='sn-inputs'>
            <input
            type="text"
            placeholder="Phone"
            className="sn-input-field1"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            />
            <input
            type="text"
            placeholder="Value"
            className="sn-input-field2"
            value={valueThree}
            onChange={(e) => setValueThree(e.target.value)}
            />
        </div>

      </div>
      {/* <div className="sn-add-report-footer pr-2">
        <button className="sn-add-report-button" onClick={handleSubmit}>
          Add Report
        </button>
      </div> */}
    </div>
  );
};

export default AddPatient;
