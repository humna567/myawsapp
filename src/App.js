import './App.css';
import React from 'react';



function App() {
  const [open, setOpen] = React.useState(false)
  async function handleClick(event){
    event.preventDefault()
    const name = document.getElementById('name').value;
    const cnic = document.getElementById('cnic').value;
    const gender = document.getElementById('gender').value;
    const dob = document.getElementById('dob').value;
    const cnic_exp = document.getElementById('cnic_exp').value;
    
    function dateToSQLDatetime(dateString) {
      const date = new Date(dateString);
      if (isNaN(date)) {
        throw new Error('Invalid date format');
      }
      const year = date.getUTCFullYear();
      const month = String(date.getUTCMonth() + 1).padStart(2, '0');
      const day = String(date.getUTCDate()).padStart(2, '0');
      const hours = String(date.getUTCHours()).padStart(2, '0');
      const minutes = String(date.getUTCMinutes()).padStart(2, '0');
      const seconds = String(date.getUTCSeconds()).padStart(2, '0');
    
      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }
    dateToSQLDatetime(dob)
    dateToSQLDatetime(cnic_exp)
    const data = {
      name:name,
      cnic:cnic,
      gender:gender,
      dob:dob,
      cnic_exp:cnic_exp
    }
    const response = await fetch('http://localhost:5000/data',{
      method:'POST',
      headers:{
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    }).then(console.log('data sent successfully'))
    if(response.ok){
      setOpen(true)
      alert('Data entered in Database successfully')
    }
  }
 
  return (
    <div className="App">
      <nav>
        <h1>HBFC data collection</h1>
      </nav>
      <form className='form' id='form' >
        <h3>Employee Name</h3>
        <input type='text' className='form-fields' placeholder='Employee Name' id='name' required></input> 
        <h3>CNIC Number</h3>
        <input type='text' className='form-fields' placeholder='CNIC with dashes' id='cnic' required></input>  
        <h3>Gender</h3>
        <select id="gender" name="gender">
          <option value="1">Male</option>
          <option value="0">Female</option>
        </select>
        <h3>Date of Birth</h3>
        <input type='date' className='form-fields' placeholder='DOB' id='dob' required></input>  
        <h3>CNIC Expiry</h3>
        <input type='date' className='form-fields' placeholder='CNIC Expiry' id='cnic_exp' required></input>  
        <button type='submit' value='Submit' onClick={handleClick} id='submit'>Submit</button>
      </form>
    </div>
  );
}

export default App;
