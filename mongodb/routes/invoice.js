const express = require('express');
const router = express.Router();
const Invoice = require('../model/Invoice');

router.post('/addInvoice', async (req, res) => {
    try {
        let invoice = new Invoice({
            Currency: req.body.Currency,
            Inv_Basic_Amt: req.body.Inv_Basic_Amt,
            Inv_Tax_Amt: req.body.Inv_Tax_Amt,
            Total_Inv_Amt: req.body.Total_Inv_Amt,
            Advanced_Paid: req.body.Advanced_Paid,
            TDS_Applicaable: req.body.TDS_Applicaable,
            Net_Payable_Amt: req.body.Net_Payable_Amt,
            payee1: req.body.payee1,
            payee2: req.body.payee2,
            city: req.body.city,
            street: req.body.street,
            country: req.body.country,
            IFSC_code: req.body.IFSC_code,
            Acc_Number: req.body.Acc_Number,
            Reference: req.body.Reference
        });

        

        const doc = await invoice.save();
        console.log(doc);
        res.json(doc);
    } catch (error) {
        console.error('Error saving document:', error);
        res.status(500).json({ error: 'An error occurred while saving the document' });
    }
});

module.exports = router;