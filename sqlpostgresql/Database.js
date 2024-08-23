const { Pool, Client } = require('pg');

const cors = require('cors');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
// const Pool =require('pg').Pool;


require('dotenv').config();


app.use(cors({
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  allowedHeaders: '*',
}));
app.use(bodyParser.json());

// const pool = new POOL({
//     user: 'PostgreSQL_16',
//     host: 'localhost',
//     password: 'postgres',
//     port: 5432,
// })

const superuserClient = new Client({
  user: 'username',
  host: 'localhost',
  password: 'password',
  port: 5432,
});

superuserClient.connect();

const dbName = 'mydatabase';

// Check if the database exists before attempting to create it
superuserClient
  .query(`SELECT 1 FROM pg_database WHERE datname='${dbName}'`)
  .then(result => {
    if (result.rows.length === 0) {
      // Database does not exist, create it
      return superuserClient.query(`CREATE DATABASE ${dbName};`);
    } else {
      console.log(`Database ${dbName} already exists`);
    }
  })
  .then(() => {
    if (arguments.length > 0) console.log(`Database ${dbName} created successfully`);
  })
  .catch((err) => console.error('Error creating database:', err))
  .finally(() => superuserClient.end());

const pool = new Pool({
  user: 'username', // Replace with your database username
  host: 'localhost',
  database: dbName,
  password: 'password', // Replace with your database password
  port: 5432,
});
const createTableQuery = `
CREATE TABLE IF NOT EXISTS invoices (
  id SERIAL PRIMARY KEY,
  currency VARCHAR(255) DEFAULT '',
  inv_basic_amt NUMERIC DEFAULT 0,
  inv_tax_amt NUMERIC DEFAULT 0,
  total_inv_amt NUMERIC DEFAULT 0,
  advanced_paid VARCHAR(255) DEFAULT '',
  tds_applicable VARCHAR(255) DEFAULT '',
  net_payable_amt NUMERIC DEFAULT 0,
  payee1 VARCHAR(255) DEFAULT '',
  payee2 VARCHAR(255) DEFAULT '',
  city VARCHAR(255) DEFAULT '',
  street VARCHAR(255) DEFAULT '',
  country VARCHAR(255) DEFAULT '',
  ifsc_code VARCHAR(255) DEFAULT '',
  acc_number BIGINT DEFAULT 0,
  reference VARCHAR(255) DEFAULT ''
);
`;
pool.query(createTableQuery)
  .then(() => console.log('Table "invoices" created successfully'))
  .catch((err) => console.error('Error creating table:', err));

pool.on("connect", () => {
  console.log("Database connection");
})

//   app.get('/', async(req,res)=>{
//     res.render('Database')
//   })

app.post('/addInvoice', async (req, res) => {
    const client = await pool.connect();
    try {
        const {
            Currency, Inv_Basic_Amt, Inv_Tax_Amt, Total_Inv_Amt, Advanced_Paid,
            TDS_Applicable, Net_Payable_Amt, payee1, payee2, city, street,
            country, IFSC_code, Acc_Number, Reference
        } = req.body;

        // Convert Acc_Number to BIGINT or null if empty
        const accNumberBigInt = Acc_Number === '' ? null : BigInt(Acc_Number);

        const insertQuery = `
            INSERT INTO invoices (
                currency, inv_basic_amt, inv_tax_amt, total_inv_amt, advanced_paid,
                tds_applicable, net_payable_amt, payee1, payee2, city, street,
                country, ifsc_code, acc_number, reference
            ) VALUES (
                $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15
            )
        `;

        const result = await client.query(insertQuery, [
            Currency, Inv_Basic_Amt, Inv_Tax_Amt, Total_Inv_Amt, Advanced_Paid,
            TDS_Applicable, Net_Payable_Amt, payee1, payee2, city, street,
            country, IFSC_code, accNumberBigInt, Reference
        ]);
        console.log(result);
        res.status(201).send('Invoice added successfully');
    } catch (error) {
        console.error('Error inserting invoice:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    } finally {
        client.release();
    }
});

pool.on("end", () => {
  console.log("Connection end ");
})

app.listen(5005, () => {
  console.log(`App running on port 5005.`)
})

process.on('SIGINT', () => {
  pool.end().then(() => {
    console.log('Pool has ended');
    process.exit(0);
  });
});