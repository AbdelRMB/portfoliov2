require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
    service: 'gmail', // ou SMTP d'un autre service
    auth: {
        user: process.env.EMAIL, // Ton email
        pass: process.env.PASSWORD // Ton mot de passe ou clé SMTP
    }
});

app.post('/send-email', async (req, res) => {
    const { name, email, subject, message } = req.body;

    try {
        await transporter.sendMail({
            from: `${name} <${email}>`,
            to: process.env.EMAIL, // L'adresse de réception
            subject,
            text: `Nom: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
        });

        res.json({ success: true, message: 'Email envoyé avec succès !' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Erreur lors de l\'envoi de l\'email' });
    }
});

app.listen(3001, () => console.log('Serveur backend démarré sur le port 3001'));
