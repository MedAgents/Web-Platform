import React, { useState } from 'react';

const AddReportForm: React.FC = () => {
  const [what, setWhat] = useState<string>('');
  const [when, setWhen] = useState<string>('');
  const [from, setFrom] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);
  const [valueOne, setValueOne] = useState<string>('');
  const [valueTwo, setValueTwo] = useState<string>('');
  const [valueThree, setValueThree] = useState<string>('');

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleSubmit = () => {
    // Handle the form submission logic here
    console.log({
      file,
      what,
      when,
      from,
      valueOne,
      valueTwo,
      valueThree,
    });
  };

  return (
    <div className="sn-add-report-container m-auto my-40 text-[#666666] ">
      <div className="sn-add-report-header text-black ">
        <h2 className="sn-add-report-title text-black mx-auto ">Add Report</h2>
        <button className="sn-close-button  ">✖</button>
      </div>
      <div className="sn-file-upload">
        <input
          type="file"
          accept=".pdf"
          id="file-upload"
          className="sn-file-input"
          onChange={handleFileUpload}
        />
        <label htmlFor="file-upload" className="sn-file-upload-label">
          {file ? file.name : 'Upload Report PDF'}
        </label>
      </div>
      <div className="sn-details-input">
        <p>Enter Details:</p>
        <div className='sn-inputs'>
            <input
            type="text"
            placeholder="What?"
            className="sn-input-field1"
            value={what}
            onChange={(e) => setWhat(e.target.value)}
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
            type="text"
            placeholder="When?"
            className="sn-input-field1"
            value={when}
            onChange={(e) => setWhen(e.target.value)}
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
            placeholder="From?"
            className="sn-input-field1"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
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
      <div className="sn-add-report-footer pr-2 ">
        <button className="sn-add-report-button" onClick={handleSubmit}>
          Add Report
        </button>
      </div>
    </div>
  );
};

export default AddReportForm;
