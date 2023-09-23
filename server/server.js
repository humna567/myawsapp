const express = require('express');
const cors = require('cors')
const bodyparser = require('body-parser')
const sql = require('mssql')



const app = express()


app.use(cors())
app.use(bodyparser.json())


app.post('/data', async (req,res)=>{
    const {name,cnic,gender,dob, cnic_exp} = await req.body;
    console.log(req.body)
    const config = {
        user: 'sa',
        password: 'systems@1234',
        server: '192.168.37.55', // Replace with your local MSSQL server name if different
        database: 'HBFC_Live6Sep',
        options: {
          encrypt: false, // Change to true if you're using SSL encryption
        },
    };

    sql.connect(config, function (error) {
        let request = new sql.Request()
        const query = 'INSERT INTO EMP_Personal (First_Name, identification_code, Gender_ID, CNIC_Expiry_Date, Date_Of_Birth, Created_By, Created_Date, role_type_id, emp_id) VALUES (@name, @cnic, @gender, @cnic_exp, @dob ,1313, GETDATE(),41,3821)';
        request.input('name', name)
        request.input('cnic', cnic)
        request.input('gender', gender)
        request.input('cnic_exp', cnic_exp)
        request.input('dob', dob)
        request.query(query,function(err){
            if(err) console.log(err)
            console.log('Data inserted successfully')
            res.send('data entered successfully')
        })
    })
    
})



const server = app.listen(5000, ()=>{
    console.log('server listeneing on port 5000');
})