require("dotenv").config();
const express = require('express');
const router = express.Router();
const fs = require('fs').promises;
const path = require('path');

const nodemailer = require("nodemailer");

// Nodemailer Transporter
const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// === get contact form data ===

router.post('/submit_contact_form', async (req, res) => {
    try {
        const data = req.body;
        console.log(data);

        // await sendEmail(data);
        await writeDataToFile(data);

        res.status(200).json({message: "Thank you for sending your message! We will be in contact with you shortly :)"})
    } catch (error) {
        console.error(error);
    }
});

async function sendEmail(data){
    try {
        await transporter.sendMail({
          from: `"${data.name}" <${data.email}>`, // Sender's email
          to: process.env.EMAIL_USER, // Your email (recipient)
          subject: `${data.project_type} from ${data.name}`,
          text: `From: ${data.name} (${data.email})\n\nMessage:\n${data.message}`,
        });
    
        return({ success: true, message: "Email sent successfully!" });
      } catch (error) {
        console.error(error);
        return({ error: "Failed to send email." });
      }
}

async function writeDataToFile(data) {
    try {
        // Define the file path
        const filePath = path.join(__dirname, '..', 'files', 'contact_forms.json');

        // Read existing data or initialize an empty array
        let existingData = [];
        try {
            const fileContent = await fs.readFile(filePath, 'utf8');
            existingData = fileContent ? JSON.parse(fileContent) : [];
        } catch (error) {
            if (error.code !== 'ENOENT') throw error; // Ignore "file not found" errors
        }

        // Append the new data
        existingData.push({
            ...data,
            timestamp: new Date().toISOString() // Add timestamp for reference
        });

        // Write the updated data back to the file
        await fs.writeFile(filePath, JSON.stringify(existingData, null, 2));

    } catch (error) {
        console.error('Error writing data to file:', error);
        throw error; // Rethrow error for handling in the calling function
    }
}


module.exports = router;