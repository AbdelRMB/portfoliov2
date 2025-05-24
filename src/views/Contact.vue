<template>
    <div class="contact-container">
        <h1 class="fade-in" style="--delay: 0;">Contactez-moi</h1>
        <p class="fade-in" style="--delay: 1;">
            Vous avez une question, un projet ou souhaitez simplement discuter ? Envoyez-moi un message en utilisant le formulaire ci-dessous.
        </p>
        <form class="contact-form fade-in" style="--delay: 2;" @submit.prevent="handleSubmit">
            <div class="form-group">
                <label for="name">Nom</label>
                <input type="text" id="name" v-model="formData.name" placeholder="Votre nom" required />
            </div>
            <div class="form-group">
                <label for="email">Email</label>
                <input type="email" id="email" v-model="formData.email" placeholder="Votre email" required />
            </div>
            <div class="form-group">
                <label for="subject">Sujet</label>
                <input type="text" id="subject" v-model="formData.subject" placeholder="Sujet de votre message" required />
            </div>
            <div class="form-group">
                <label for="message">Message</label>
                <textarea id="message" v-model="formData.message" placeholder="Votre message" rows="5" required></textarea>
            </div>
            <button type="submit" class="submit-button">Envoyer</button>
            <p v-if="statusMessage">{{ statusMessage }}</p>
        </form>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'Contact',
    data() {
        return {
            formData: {
                name: '',
                email: '',
                subject: '',
                message: '',
            },
            statusMessage: '',
        };
    },
    methods: {
        async handleSubmit() {
            try {
                const response = await axios.post('https://sendmail.abdelrahimriche.com/send-email', this.formData);

                if (response.data.success) {
                    this.statusMessage = 'Votre message a été envoyé avec succès !';
                    this.formData = { name: '', email: '', subject: '', message: '' }; // Reset form
                } else {
                    this.statusMessage = 'Erreur lors de l\'envoi du message.';
                }
            } catch (error) {
                console.error(error);
                this.statusMessage = 'Une erreur s\'est produite. Vérifiez votre connexion ou réessayez plus tard.';
            }
        },
    },
};
</script>

<style scoped>
.contact-container {
    max-width: 600px;
    margin: 50px auto;
    padding: 20px;
    background-color: #1d001d;
    color: #ffffff;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    text-align: center;
}

.contact-container h1 {
    font-size: 28px;
    margin-bottom: 20px;
    color: #ff80ab;
}

.contact-container p {
    font-size: 16px;
    margin-bottom: 30px;
    color: #cccccc;
}

.contact-form {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.form-group {
    display: flex;
    flex-direction: column;
    text-align: left;
}

.form-group label {
    margin-bottom: 5px;
    font-size: 14px;
    color: #ff80ab;
}

.form-group input,
.form-group textarea {
    padding: 10px;
    font-size: 14px;
    border: 1px solid #4d004d;
    border-radius: 5px;
    background-color: #2a002a;
    color: #ffffff;
}

.form-group input:focus,
.form-group textarea:focus {
    outline: none;
    border-color: #ff80ab;
}

.submit-button {
    padding: 10px 20px;
    font-size: 16px;
    color: #ffffff;
    background-color: #ff80ab;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.submit-button:hover {
    background-color: #e5739e;
}

/* Animation fade-in */
@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.fade-in {
    opacity: 0;
    animation: fadeIn 0.7s ease-out forwards;
    animation-delay: calc(var(--delay, 0) * 0.2s);
}
</style>
