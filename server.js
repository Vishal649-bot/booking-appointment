// const express = require('express');
// const bodyParser = require('body-parser');
// const mysql = require('mysql2');

// const app = express();
// const port = 3000;

// // MySQL Connection
// const db = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'qwert@4321',
//     database: 'node-complete'
// });

// // Connect to MySQL
// db.connect((err) => {
//     if (err) throw err;
//     console.log('MySQL Connected');
// });

// // Body Parser Middleware
// app.use(bodyParser.urlencoded({ extended: false }));

// app.post('/submit', (req, res) => {
//     const { username, phonenumber, email } = req.body;
// console.log(req.body);
//     const sql = `INSERT INTO users (username, phonenumber, email) VALUES (?, ?, ?)`;
//     const values = [username, phonenumber, email];

//     db.query(sql, values, (err, result) => {
//         if (err) throw err;
//         console.log('Data inserted successfully');
        
//         // Retrieve all users from the database
//         db.query('SELECT * FROM users', (err, rows) => {
//             if (err) throw err;
//             res.json(rows);
//         });
//     });
// });
 
// // Serve the HTML file
// app.get('/', (req, res) => {
//     res.sendFile(__dirname + '/index.html');
// });

// // Start server
// app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
// });





const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const db = require('./db')
    userroutes = require('./controller/user')
    
const PORT = 3000;

app.use(bodyParser.json());

app.use('/api/user',userroutes)


app.post('/submit', (req, res) => {
    const { username, email,phonenumber } = req.body;
    // Here you can process the received data, e.g., save it to a database
    const sql = `INSERT INTO users (username, phonenumber, email) VALUES (?, ?, ?)`;
    const values = [username, phonenumber, email];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error inserting data:', err);
            return res.status(500).json({ error: 'Server error' });
        }
        
        console.log('Data inserted successfully');
        // console.log(rows);
        
        // Retrieve all users from the database
        db.query('SELECT * FROM `node-complete`.users', (err, rows) => {
            if (err) throw err;
            // console.log(rows);
            res.json(rows);
        });
    });
    console.log('Received data:', { username, email,phonenumber });
    // Send back a response
    // console.log();
    res.json({ username, email,phonenumber});
});



app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// app.get('/api/user/:id', (req, res) => {
//     const userId = req.params.id;

//     db.query('SELECT * FROM users WHERE id = ?', [userId], (err, rows) => {
//         if (err) {
//             console.error('Error retrieving user data:', err);
//             return res.status(500).json({ error: 'Server error' });
//         }

//         if (rows.length === 0) {
//             return res.status(404).json({ error: 'User not found' });
//         }

//         res.json(rows[0]);
//     });
// });

db.query("SELECT * FROM `node-complete`.users")
.then(data => {
    console.log('db connetion is succeded')
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
})
.catch(err=> console.log('connection failed'))



