
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import 'react-datepicker/dist/react-datepicker.css'; // Import DatePicker CSS


const CustomerList = () => { // Changed to DeviceList
    const [originalData, setOriginalData] = useState([]);
    const [data, setData] = useState([]);
    const [name, setname] = useState('');
    const [email, setemail] = useState('');
    const [civil_id, setcivil_id] = useState('');
    const [nationality, setnationality] = useState('');
    const [area, setarea] = useState('');
    const [block, setblock] = useState('');
    const [street, setstreet] = useState('');
    const [building_no, setbuilding_no] = useState('');
    const [mobile, setmobile] = useState('');
    const [whatsapp_no, setwhatsapp_no] = useState('');
    const [telephone_no, settelephone_no] = useState('');

    useEffect(() => {
        fetch('http://localhost:8000/api/customer/', {
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
      fetch('http://localhost:8000/convertcustomerPDF', {
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
      
        fetch('http://localhost:8000/api/customer/', {
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
            (civil_id === '' || item.civil_id === Number(civil_id)) &&
            (nationality === '' || item.nationality === nationality) &&
            (area === '' || item.area === area) &&
            (block === '' || item.block === block) &&
            (street === '' || item.street === street) &&
            (building_no === '' || item.building_no === Number(building_no)) &&
            (mobile === '' || item.mobile === Number(mobile)) &&
            (whatsapp_no === '' || item.whatsapp_no === Number(whatsapp_no)) &&
            (telephone_no === '' || item.telephone_no === Number(telephone_no));
    });

        setData(filteredData);

        // Clear all fields after fetch
        setname('');
        setemail('');
        setcivil_id('');
        setnationality('');
        setarea('');
        setblock('');
        setstreet('');
        setbuilding_no('');
        setmobile('');
        setwhatsapp_no('');
        settelephone_no('');
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
                            <input type="text" placeholder="civil_id" value={civil_id} onChange={e => setcivil_id(e.target.value)} />
                        </div>
                        <div className="col col-4">
                            <input type="text" placeholder="nationality" value={nationality} onChange={e => setnationality(e.target.value)} />
                        </div>
                        <div className="col col-4">
                            <input type="text" placeholder="area" value={area} onChange={e => setarea(e.target.value)} />
                        </div>
                        <div className="col col-4">
                            <input type="text" placeholder="block" value={block} onChange={e => setblock(e.target.value)} />
                        </div>
                        <div className="col col-4">
                            <input type="text" placeholder="street" value={street} onChange={e => setstreet(e.target.value)} />
                        </div>
                        <div className="col col-4">
                            <input type="text" placeholder="building_no" value={building_no} onChange={e => setbuilding_no(e.target.value)} />
                        </div>
                        <div className="col col-4">
                            <input type="text" placeholder="mobile" value={mobile} onChange={e => setmobile(e.target.value)} />
                        </div>
                        <div className="col col-4">
                            <input type="text" placeholder="whatsapp_no" value={whatsapp_no} onChange={e => setwhatsapp_no(e.target.value)} />
                        </div>
                        <div className="col col-4">
                            <input type="text" placeholder="telephone_no" value={telephone_no} onChange={e => settelephone_no(e.target.value)} />
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
                  <th>civil_id </th>
                  <th>nationality </th>
                  <th>area</th>
                  <th>block</th>
                  <th>street</th>
                  <th>building_no </th>
                  <th>mobile</th>
                  <th>whatsapp_no</th>
                  <th>telephone_no</th>
                </tr>
              </thead>
              <tbody>
                {data.length > 0 && data.map((item, index) => (
                  <tr key={index}>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.civil_id}</td>
                    <td>{item.nationality}</td>
                    <td>{item.area}</td>
                    <td>{item.block}</td>
                    <td>{item.street}</td>
                    <td>{item.building_no }</td>
                    <td>{item.mobile}</td>
                    <td>{item.whatsapp_no}</td>
                    <td>{item.telephone_no}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
   
  );
}

export default CustomerList; // Removed the named export
