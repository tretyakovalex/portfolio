const express = require('express');
const router = express.Router();
const fs = require('fs').promises;
const path = require('path');

// === get contact form data ===

router.get('/download_pricing_pdf', async (req, res) => {
    try {
        const pdfPath = path.join(__dirname, '..', 'files', 'pricing.pdf'); // Adjust the path as needed
        
        res.download(pdfPath, 'pricing.pdf', (err) => {
            if (err) {
                console.error('Error sending PDF:', err);
                res.status(500).send('Error downloading the file');
            }
        });
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).send('Internal server error');
    }
});

module.exports = router;