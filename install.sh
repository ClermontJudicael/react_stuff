#!/bin/bash
echo "Installing dependencies...."
cd /BackEnd
echo "Express dependencies..."

npm install express cors body-parser
npm install --save-dev nodemon

cd ../ui/
echo "Dependencies for UI..."
npm install react-bootstrap bootstrap react-datepicker react-dom axios chart.js react-chartjs-2
npm install --save-dev concurrently
echo "Dependencies inslalled"
