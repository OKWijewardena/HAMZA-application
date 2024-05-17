
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import DatePicker from 'react-datepicker'; // Import DatePicker
import 'react-datepicker/dist/react-datepicker.css'; // Import DatePicker CSS


const DeviceList = () => { // Changed to DeviceList
    const [originalData, setOriginalData] = useState([]);
    const [data, setData] = useState([]);
    const [deviceName, setDeviceName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('');
    const [color, setColor] = useState('');
    const [shopName, setShopName] = useState('');
    const [modelNumber, setModelNumber] = useState('');
    const [storage, setStorage] = useState('');
    const [warrenty, setWarrenty] = useState('');
    const [emiNumber, setEmiNumber] = useState('');
    const [purchaseDateFrom, setPurchaseDateFrom] = useState(null);
    const [purchaseDateTo, setPurchaseDateTo] = useState(null);
    const [expiryDate, setExpiryDate] = useState(null);

    useEffect(() => {
        fetch('http://localhost:8000/api/device', {
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
      fetch('http://localhost:8000/convertdevicePDF', {
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
          link.download = 'DeviceReport.pdf';
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
      
        fetch('http://localhost:8000/api/device', {
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
            const itemPurchaseDate = new Date(item.purchaseDate);
            const itemExpiryDate = new Date(item.expireDate);
            return (deviceName === '' || item.deviceName.includes(deviceName)) &&
                (quantity === '' || item.quantity.includes(quantity)) &&
                (price === '' || item.price.includes(price)) &&
                (color === '' || item.color.includes(color)) &&
                (shopName === '' || item.shopName.includes(shopName)) &&
                (modelNumber === '' || item.modelNumber.includes(modelNumber)) &&
                (storage === '' || item.storage.includes(storage)) &&
                (warrenty === '' || item.warrenty.includes(warrenty)) &&
                (emiNumber === '' || item.emiNumber.includes(emiNumber)) &&
                (!purchaseDateFrom || itemPurchaseDate >= purchaseDateFrom) && 
                (!purchaseDateTo || itemPurchaseDate <= purchaseDateTo ) &&
                (!expiryDate || itemExpiryDate <= expiryDate);
        });

        setData(filteredData);

        // Clear all fields after fetch
        setDeviceName('');
        setQuantity('');
        setPrice('');
        setColor('');
        setShopName('');
        setModelNumber('');
        setStorage('');
        setWarrenty('');
        setEmiNumber('');
        setPurchaseDateFrom(null);
        setPurchaseDateTo(null);
        setExpiryDate(null);
       
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
                            <input type="text" placeholder="Device Name" value={deviceName} onChange={e => setDeviceName(e.target.value)} />
                        </div>
                        <div className="col col-4">
                            <input type="text" placeholder="Quantity" value={quantity} onChange={e => setQuantity(e.target.value)} />
                        </div>
                        <div className="col col-4">
                            <input type="text" placeholder="Price" value={price} onChange={e => setPrice(e.target.value)} />
                        </div>
                        <div className="col col-4">
                            <input type="text" placeholder="Color" value={color} onChange={e => setColor(e.target.value)} />
                        </div>
                        <div className="col col-4">
                            <input type="text" placeholder="Shop Name" value={shopName} onChange={e => setShopName(e.target.value)} />
                        </div>
                        <div className="col col-4">
                            <input type="text" placeholder="Model Number" value={modelNumber} onChange={e => setModelNumber(e.target.value)} />
                        </div>
                        <div className="col col-4">
                            <input type="text" placeholder="Storage" value={storage} onChange={e => setStorage(e.target.value)} />
                        </div>
                        <div className="col col-4">
                            <input type="text" placeholder="Warrenty" value={warrenty} onChange={e => setWarrenty(e.target.value)} />
                        </div>
                        <div className="col col-4">
                            <input type="text" placeholder="EMI Number" value={emiNumber} onChange={e => setEmiNumber(e.target.value)} />
                        </div>
                        <div className="col col-4">
                            <DatePicker selected={purchaseDateFrom} onChange={date => setPurchaseDateFrom(date)} placeholderText="Purchase Date From" />
                        </div>
                        <div className="col col-4">
                            <DatePicker selected={purchaseDateTo} onChange={date => setPurchaseDateTo(date)} placeholderText="Purchase Date To" />
                        </div>
                        <div className="col col-4">
                            <DatePicker selected={expiryDate} onChange={date => setExpiryDate(date)} placeholderText="Expiry Date" />
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
                  <th>deviceName</th>
                  <th>quantity </th>
                  <th>price </th>
                  <th>color </th>
                  <th>shopName</th>
                  <th>modelNumber</th>
                  <th>storage</th>
                  <th>warrenty </th>
                  <th>emiNumber</th>
                  <th>purchaseDate</th>
                  <th>expireDate</th>
                </tr>
              </thead>
              <tbody>
                {data.length > 0 && data.map((item, index) => (
                  <tr key={index}>
                    <td>{item.deviceName}</td>
                    <td>{item.quantity}</td>
                    <td>{item.price}</td>
                    <td>{item.color}</td>
                    <td>{item.shopName}</td>
                    <td>{item.modelNumber}</td>
                    <td>{item.storage}</td>
                    <td>{item.warrenty }</td>
                    <td>{item.emiNumber}</td>
                    <td>{item.purchaseDate}</td>
                    <td>{item.expireDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
   
  );
}

export default DeviceList; // Removed the named export
