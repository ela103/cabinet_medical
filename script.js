// Gestion des rendez-vous
document.addEventListener('DOMContentLoaded', function() {
    const appointmentForm = document.getElementById('appointmentForm');
    const appointmentsList = document.getElementById('appointmentsList');

    // Charger les rendez-vous existants depuis le localStorage
    let appointments = JSON.parse(localStorage.getItem('appointments')) || [];

    // Afficher les rendez-vous existants
    function displayAppointments() {
        if (appointmentsList) {
            appointmentsList.innerHTML = '';
            appointments.forEach((appointment, index) => {
                const appointmentCard = document.createElement('div');
                appointmentCard.className = 'appointment-card';
                appointmentCard.innerHTML = `
                    <h3>Rendez-vous avec ${appointment.doctor}</h3>
                    <p><strong>Date:</strong> ${appointment.date}</p>
                    <p><strong>Heure:</strong> ${appointment.time}</p>
                    <p><strong>Motif:</strong> ${appointment.reason}</p>
                    <button onclick="cancelAppointment(${index})" class="cancel-btn">Annuler</button>
                `;
                appointmentsList.appendChild(appointmentCard);
            });
        }
    }

    // Gérer la soumission du formulaire de rendez-vous
    if (appointmentForm) {
        appointmentForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Validation du numéro de téléphone
            const phoneInput = document.getElementById('phone');
            const phoneValue = phoneInput.value.replace(/\D/g, ''); // Supprime tous les caractères non numériques
            
            if (phoneValue.length !== 8) {
                alert('Le numéro de téléphone doit contenir exactement 8 chiffres.');
                phoneInput.focus();
                return;
            }

            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: phoneValue, // Utilise la valeur nettoyée
                doctor: document.getElementById('doctor').value,
                date: document.getElementById('date').value,
                time: document.getElementById('time').value,
                reason: document.getElementById('reason').value
            };

            // Ajouter le nouveau rendez-vous
            appointments.push(formData);
            localStorage.setItem('appointments', JSON.stringify(appointments));

            // Réinitialiser le formulaire
            appointmentForm.reset();

            // Afficher un message de confirmation
            alert('Votre rendez-vous a été confirmé avec succès!');

            // Mettre à jour l'affichage des rendez-vous
            displayAppointments();
        });
    }

    // Fonction pour annuler un rendez-vous
    window.cancelAppointment = function(index) {
        if (confirm('Êtes-vous sûr de vouloir annuler ce rendez-vous ?')) {
            appointments.splice(index, 1);
            localStorage.setItem('appointments', JSON.stringify(appointments));
            displayAppointments();
        }
    };

    // Afficher les rendez-vous au chargement de la page
    displayAppointments();

    // Validation de la date (ne pas permettre les dates passées)
    const dateInput = document.getElementById('date');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
    }

    // Validation de l'heure (heures de consultation entre 8h et 18h)
    const timeInput = document.getElementById('time');
    if (timeInput) {
        timeInput.addEventListener('change', function() {
            const selectedTime = this.value;
            const hour = parseInt(selectedTime.split(':')[0]);
            if (hour < 8 || hour > 18) {
                alert('Les heures de consultation sont entre 8h et 18h.');
                this.value = '';
            }
        });
    }

    // Validation du numéro de téléphone en temps réel
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function() {
            // Supprime tous les caractères non numériques
            this.value = this.value.replace(/\D/g, '');
            
            // Limite à 8 chiffres
            if (this.value.length > 8) {
                this.value = this.value.slice(0, 8);
            }
        });
    }
});

// Animation du menu de navigation
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            navLinks.forEach(link => link.classList.remove('active'));
            this.classList.add('active');
        });
    });
}); 