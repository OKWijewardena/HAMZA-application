const puppeteer = require('puppeteer');
const fs = require('fs');
const handlebars = require('handlebars');
const path = require('path');
const moment = require('moment');
const stats = require('simple-statistics');

const convertToPDF = async (req, res) => {
    
    let data = Array.isArray(req.body) ? req.body : [req.body];
    
    // Format the date to exclude the time
    data = data.map(item => {
        let date = new Date(item.date);
        let formattedDate = date.getFullYear() + '-' + String(date.getMonth() + 1).padStart(2, '0') + '-' + String(date.getDate()).padStart(2, '0');
        item.date = formattedDate;
        item.statisticsDate = moment(formattedDate).format('YYYY-MM-DD');
        return item;
    });
    
    // Sort the data by date
    data.sort((a, b) => new Date(a.date) - new Date(b.date));

    // Identify the start and end dates
    let startDate = data[0].date;
    let endDate = data[data.length - 1].date;

    // Calculate the total price
    let totalPrice = data.reduce((total, item) => total + item.price, 0);

    // Assuming your data is in the 'data' variable
    data = data.map(item => {
        item.statisticsDate = moment(item.date);
        return item;
    });
    
    // Group payments by month
    let paymentsByMonth = {};
    data.forEach(item => {
        let month = item.statisticsDate.format('YYYY-MM');
        if (!paymentsByMonth[month]) {
            paymentsByMonth[month] = [];
        }
        paymentsByMonth[month].push(item.price);
    });

    // Calculate total payments for each month
    let totalPaymentsByMonth = {};
    for (let month in paymentsByMonth) {
        totalPaymentsByMonth[month] = stats.sum(paymentsByMonth[month]);
    }

    // Find the month with the highest payment
    let highestPaymentMonth = Object.keys(totalPaymentsByMonth).reduce((a, b) => totalPaymentsByMonth[a] > totalPaymentsByMonth[b] ? a : b);

    console.log('Month with highest payment:', highestPaymentMonth, 'Total payment:', totalPaymentsByMonth[highestPaymentMonth]);
    let x =totalPaymentsByMonth[highestPaymentMonth];

    // Predict next month's payment
    let lastTwoMonths = Object.keys(totalPaymentsByMonth).sort().slice(-2);
    let lastTwoMonthsPayments = lastTwoMonths.map(month => totalPaymentsByMonth[month]);
    let predictedNextMonthPayment = stats.mean(lastTwoMonthsPayments);

    console.log('Predicted payment for next month:', predictedNextMonthPayment);
    let lowestPaymentMonth = Object.keys(totalPaymentsByMonth).reduce((a, b) => totalPaymentsByMonth[a] < totalPaymentsByMonth[b] ? a : b);

    console.log('Month with lowest payment:', lowestPaymentMonth, 'Total payment:', totalPaymentsByMonth[lowestPaymentMonth]);
    let y=totalPaymentsByMonth[lowestPaymentMonth];

    // Read the HTML template
    const source = fs.readFileSync(path.join(__dirname, '../template/invoicespdfTemplate.html'), 'utf8');
    // Calculate the number of data items
    let numberOfItems = data.length;
    // Compile the template with handlebars
    const template = handlebars.compile(source);
    const html = template({ data, totalPrice,numberOfItems,startDate, endDate , highestPaymentMonth, x,predictedNextMonthPayment,lowestPaymentMonth,y}); // Pass the total price to the template
  
    const pdf = await convertHTMLToPDF(html, 'data.pdf');
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=data.pdf');
    res.send(pdf);
};




const convertToPaymentInvoicePDF = async (req, res) => {
    
    let data = Array.isArray(req.body) ? req.body : [req.body];
    
    // Format the date to exclude the time
    data = data.map(item => {
        let date = new Date(item.date);
        let formattedDate = date.getFullYear() + '-' + String(date.getMonth() + 1).padStart(2, '0') + '-' + String(date.getDate()).padStart(2, '0');
        item.date = formattedDate;
        item.statisticsDate = moment(formattedDate).format('YYYY-MM-DD');
        return item;
    });
    

    // Calculate the total price
    let totalPrice = data.reduce((total, item) => total + item.price, 0);

 
    // Read the HTML template
    const source = fs.readFileSync(path.join(__dirname, '../template/PaymentInvoicePdfTemplate.html'), 'utf8');

    // Compile the template with handlebars
    const template = handlebars.compile(source);
    const html = template({ data, totalPrice}); // Pass the total price to the template
  
    const pdf = await convertHTMLToPDF(html, 'data.pdf');
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=data.pdf');
    res.send(pdf);
};






async function convertHTMLToPDF(htmlContent, pdfFilePath, margins = {top: '10mm', right: '10mm', bottom: '10mm', left: '10mm'}){
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(htmlContent);
    const pdf = await page.pdf({ format : 'A4', margin : margins });
    await browser.close();
    return pdf;
}

module.exports={convertToPDF,convertToPaymentInvoicePDF};