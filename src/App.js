import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import logo from '../src/assets/Alstom_logo.png';

function App() {
  const [teamNumber, setTeamNumber] = useState('');
  const [code, setCode] = useState('');
  const [message, setMessage] = useState('Please Enter your code');

  const handleSubmit = () => {
    // First, make the POST request to verify the team and code
    axios.post('http://localhost:5000/verify', { teamNumber, code })
      .then(response => {
        setMessage(response.data.message);
        // After the POST request completes, trigger the GET request
        return axios.get('http://localhost:5000/teams');
      })
      .then(response => {
        // Update the teams state with the data retrieved from the GET request
        setMessage(response.data);
      })
      .catch(error => {
        setMessage('Error! Could not verify the code.');
      });
  };

  return (
    <>
      <div className="d-flex justify-content-center">
        <img src={logo} alt='alstom' />
      </div>
      <div className="head-bars text-white">
        <h1 className='head-spaceing'>Club Cabana</h1>
        <h1 className='head-spaceing m-0'>Amusement Park</h1>
        <h2 className='head-name'>Crack the Code, Find the Gold</h2>
      </div>
      <div className='background d-flex justify-content-center'>
        <div className='background-image'>
          <div className='form-position'>
            <div className='input d-flex justify-content-center'>
              <h4>Team Number</h4>
              <input
                className='input-box'
                value={teamNumber}
                onChange={(e) => setTeamNumber(e.target.value)}
              />
            </div>
            <div className='d-flex justify-content-center input-code'>
              <h4>Code</h4>
              <input
                className='input-box'
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
            </div>
          </div>
          <div className='d-flex justify-content-center button'>
            <button type="button" className="btn btn-danger" onClick={handleSubmit}>
              Submit
            </button>
          </div>
          <div className='d-flex justify-content-center clue'>
            <h5>{message}</h5>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
