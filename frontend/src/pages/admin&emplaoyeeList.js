
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import 'react-datepicker/dist/react-datepicker.css'; // Import DatePicker CSS


const AdminAndEmplaoyeeList = () => { // Changed to DeviceList
    const [originalData, setOriginalData] = useState([]);
    const [data, setData] = useState([]);
    const [name, setname] = useState('');
    const [email, setemail] = useState('');
    const [address, setaddress] = useState('');
    const [phone, setphone] = useState('');
    const [role, setrole] = useState('');
 

    useEffect(() => {
        fetch('http://localhost:8000/api/employee&admin/', {
            method: 'GET'
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            setOriginalData(data);
            setData(data);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    }, []);
    
    const downloadPDF = () => {
      fetch('http://localhost:8000/employeeAndAdminPdf', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(data) // Send current data to the backend
      })
      .then(response => {
          if (response.ok) {
              return response.blob(); // If the response is OK, get the PDF blob
          } else {
              throw new Error('Error converting to PDF');
          }
      })
      .then(blob => {
          // Create a blob URL
          const url = window.URL.createObjectURL(blob);
          // Create a link element
          const link = document.createElement('a');
          link.href = url;
          // The downloaded file name
          link.download = 'CustomerReport.pdf';
          // Append the link to the body
          document.body.appendChild(link);
          // Simulate click
          link.click();
          // Remove the link when done
          document.body.removeChild(link);
      })
      .catch(error => alert(error));
  };

    const resetTable = () => {
      
        fetch('http://localhost:8000/api/employee&admin/', {
            method: 'GET'
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => setData(data))
        .catch(error => {
            console.error('Error fetching data:', error);
            // Handle error accordingly
        });
    };

// Update your handleFetch function to also filter based on the search term
const handleFetch = () => {
       
    let filteredData = originalData.filter(item => {
        return (name === '' || item.name === name) &&
            (email === '' || item.email === email) &&
            (phone === '' || item.phone === Number(phone)) &&
            (address === '' || item.address === address) &&
            (role === '' || item.role === role);
    });

        setData(filteredData);

        // Clear all fields after fetch
        setname('');
        setemail('');
        setphone('');
        setaddress('');
        setrole('');
    };

    
  return (
    <div className="container">
    <h1 className="text-center mb-5 mt-5">hamza app</h1>
    <div className="card">
      <div className="card-header">
        <div className="row">
          <div className="col col-6">Sample Data</div>
          <div className="col col-6">
           <div className="col col-6">
                            <button onClick={downloadPDF} className="btn btn-primary btn-sm float-end">Download in PDF</button>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col col-4">
                            <input type="text" placeholder="Name" value={name} onChange={e => setname(e.target.value)} />
                        </div>
                        <div className="col col-4">
                            <input type="text" placeholder="email" value={email} onChange={e => setemail(e.target.value)} />
                        </div>
                        <div className="col col-4">
                            <input type="text" placeholder="address" value={address} onChange={e => setaddress(e.target.value)} />
                        </div>
                        <div className="col col-4">
                            <input type="text" placeholder="phone" value={phone} onChange={e => setphone(e.target.value)} />
                        </div>
                        <div className="col col-4">
                            <input type="text" placeholder="role" value={role} onChange={e => setrole(e.target.value)} />
                        </div>
                        
                        <div className="col col-4">
                            <button onClick={handleFetch} className="btn btn-primary btn-sm float-end">Fetch</button>
                        </div>
                        <div className="col col-4">
    <button onClick={resetTable} className="btn btn-primary btn-sm float-end">Reset</button>
</div>
                        </div>
                        </div>
                      
            </div>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-bordered table-striped">
              <thead>
                <tr>
                  <th>name</th>
                  <th>email </th>
                  <th>address </th>
                  <th>role</th>
                  <th>phone</th>
                  
                </tr>
              </thead>
              <tbody>
                {data.length > 0 && data.map((item, index) => (
                  <tr key={index}>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.address}</td>
                    <td>{item.role}</td>
                    <td>{item.phone}</td>
                  
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
   
  );
}

export default AdminAndEmplaoyeeList; // Removed the named export
