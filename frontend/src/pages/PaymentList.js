// src/pages/PaymentList.js
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import DatePicker from 'react-datepicker'; // Import DatePicker
import 'react-datepicker/dist/react-datepicker.css'; // Import DatePicker CSS

const PaymentList = () => {
    const [data, setData] = useState([]);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    useEffect(() => {
        fetch('http://localhost:8000/api/payment', {
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
    }, []);
    
    const downloadPDF = () => {
      fetch('http://localhost:8000/convertPDF', {
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
          link.download = 'output.pdf';
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
        setStartDate(null);
        setEndDate(null);
        fetch('http://localhost:8000/api/payment', {
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

    // Add a new state variable for the search term
// Add a new state variable for the search term
const [searchTerm, setSearchTerm] = useState('');
// Update your handleFetch function to also filter based on the search term
const handleFetch = () => {
    // First, filter data based on the search term
    let filteredData = data.filter(item => {
        return item.customerName.includes(searchTerm) || item.civilID.includes(searchTerm) || item.deviceName.includes(searchTerm);
    });

    // If no data matches the search term, then filter the data based on the date range
    if (filteredData.length === 0) {
        filteredData = data.filter(item => {
            const itemDate = new Date(item.date);
            return (!startDate || itemDate >= startDate) && (!endDate || itemDate <= endDate);
        });
    }

    // If both search term and date range are provided, filter the data based on both
    if (searchTerm && (startDate || endDate)) {
        filteredData = data.filter(item => {
            const itemDate = new Date(item.date);
            return (item.customerName.includes(searchTerm) || item.civilID.includes(searchTerm) || item.deviceName.includes(searchTerm)) &&
                (!startDate || itemDate >= startDate) && (!endDate || itemDate <= endDate);
        });
    }

    setData(filteredData);
};

    
  return (
    <div className="container">
    <h1 className="text-center mb-5 mt-5">hamza app</h1>
    <div className="card">
      <div className="card-header">
        <div className="row">
          <div className="col col-6">Sample Data</div>
          <div className="col col-6">
            <button onClick={downloadPDF} className="btn btn-primary btn-sm float-end">Download in PDF</button>
          </div>
        </div>
        <div className="row mt-3">
        <div className="col col-4">
        <input type="text" placeholder="Search" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
    </div>
          <div className="col col-4">
            <DatePicker selected={startDate} onChange={date => setStartDate(date)} placeholderText="Start Date" />
          </div>
          <div className="col col-4">
            <DatePicker selected={endDate} onChange={date => setEndDate(date)} placeholderText="End Date" />
          </div>
          <div className="col col-4">
            <button onClick={handleFetch} className="btn btn-primary btn-sm float-end">Fetch</button>
          </div>
          <div className="col col-4">
    <button onClick={resetTable} className="btn btn-primary btn-sm float-end">Reset</button>
</div>
      
          </div>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-bordered table-striped">
              <thead>
                <tr>
                  <th>customerName</th>
                  <th>civilID</th>
                  <th>deviceName</th>
                  <th>price</th>
                  <th>date</th>
                </tr>
              </thead>
              <tbody>
                {data.length > 0 && data.map((item, index) => (
                  <tr key={index}>
                    <td>{item.customerName}</td>
                    <td>{item.civilID}</td>
                    <td>{item.deviceName}</td>
                    <td>{item.price}</td>
                    <td>{item.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentList;
