/**
 * Contact.js - Gestion du formulaire de contact style terminal
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialise le formulaire de contact s'il existe
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        initContactForm(contactForm);
    }
});

/**
 * Initialise le formulaire de contact
 * @param {HTMLFormElement} form - Le formulaire à initialiser
 */
function initContactForm(form) {
    form.addEventListener('submit', function(event) {
        // Empêche l'envoi normal du formulaire
        event.preventDefault();
        
        // Valide le formulaire
        if (validateForm(form)) {
            // Simule l'envoi du formulaire avec animations
            sendFormWithAnimation(form);
        }
    });
    
    // Ajoute des effets sur les champs lors de la saisie
    setupFormFieldEffects(form);
}

/**
 * Valide les champs du formulaire
 * @param {HTMLFormElement} form - Le formulaire à valider
 * @returns {boolean} true si le formulaire est valide, false sinon
 */
function validateForm(form) {
    // Récupère les champs requis
    const nameInput = form.querySelector('#name');
    const emailInput = form.querySelector('#email');
    const subjectInput = form.querySelector('#subject');
    const messageInput = form.querySelector('#message');
    
    // Supprime les messages d'erreur précédents
    const errorMessages = form.querySelectorAll('.error-message');
    errorMessages.forEach(message => message.remove());
    
    // Tableau pour stocker les erreurs
    let isValid = true;
    
    // Vérifie que le nom est rempli
    if (!nameInput.value.trim()) {
        showError(nameInput, 'ERROR: Veuillez entrer votre nom');
        isValid = false;
    }
    
    // Vérifie que l'email est valide
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailInput.value.trim() || !emailRegex.test(emailInput.value.trim())) {
        showError(emailInput, 'ERROR: Adresse email invalide');
        isValid = false;
    }
    
    // Vérifie que le sujet est rempli
    if (!subjectInput.value.trim()) {
        showError(subjectInput, 'ERROR: Veuillez entrer un sujet');
        isValid = false;
    }
    
    // Vérifie que le message est rempli et suffisamment long
    if (!messageInput.value.trim() || messageInput.value.trim().length < 10) {
        showError(messageInput, 'ERROR: Le message doit contenir au moins 10 caractères');
        isValid = false;
    }
    
    return isValid;
}

/**
 * Affiche un message d'erreur pour un champ
 * @param {HTMLElement} input - Le champ avec erreur
 * @param {string} message - Le message d'erreur à afficher
 */
function showError(input, message) {
    // Crée un élément pour le message d'erreur
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    errorDiv.style.color = 'var(--color-error)';
    errorDiv.style.fontSize = '0.8em';
    errorDiv.style.marginTop = '5px';
    
    // Insère le message après le champ
    input.parentNode.appendChild(errorDiv);
    
    // Met en évidence le champ avec erreur
    input.style.borderColor = 'var(--color-error)';
    input.style.boxShadow = '0 0 5px var(--color-error)';
    
    // Effet de glitch sur le champ
    input.classList.add('glitch');
    setTimeout(() => {
        input.classList.remove('glitch');
    }, 1000);
}

/**
 * Configure des effets visuels sur les champs du formulaire
 * @param {HTMLFormElement} form - Le formulaire
 */
function setupFormFieldEffects(form) {
    const inputs = form.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
        // Effet focus avec scanner
        input.addEventListener('focus', function() {
            this.style.boxShadow = '0 0 8px var(--color-text)';
            
            // Petit effet de scan sur le champ actif
            const scannerEffect = document.createElement('div');
            scannerEffect.className = 'input-scanner';
            scannerEffect.style.position = 'absolute';
            scannerEffect.style.width = '100%';
            scannerEffect.style.height = '2px';
            scannerEffect.style.background = 'var(--color-text)';
            scannerEffect.style.top = '0';
            scannerEffect.style.left = '0';
            scannerEffect.style.opacity = '0.5';
            scannerEffect.style.pointerEvents = 'none';
            scannerEffect.style.animation = 'scan 1.5s linear infinite';
            
            // Ajoute l'animation de scan
            const style = document.createElement('style');
            style.innerHTML = `
                @keyframes scan {
                    0% { top: 0; }
                    100% { top: 100%; }
                }
            `;
            document.head.appendChild(style);
            
            // Position relative pour le parent pour le positionnement
            this.parentNode.style.position = 'relative';
            this.parentNode.appendChild(scannerEffect);
        });
        
        // Supprime l'effet au blur
        input.addEventListener('blur', function() {
            this.style.boxShadow = '';
            
            // Supprime l'effet de scan
            const scanner = this.parentNode.querySelector('.input-scanner');
            if (scanner) {
                scanner.remove();
            }
        });
        
        // Supprime les messages d'erreur lors de la saisie
        input.addEventListener('input', function() {
            // Réinitialise le style du champ
            this.style.borderColor = '';
            this.style.boxShadow = '';
            
            // Supprime le message d'erreur
            const errorMessage = this.parentNode.querySelector('.error-message');
            if (errorMessage) {
                errorMessage.remove();
            }
        });
    });
}

/**
 * Simule l'envoi du formulaire avec une animation
 * @param {HTMLFormElement} form - Le formulaire à envoyer
 */
function sendFormWithAnimation(form) {
    // Récupère les éléments du formulaire
    const submitButton = form.querySelector('button[type="submit"]');
    const formResponse = document.getElementById('form-response');
    
    // Désactive le bouton d'envoi et change son texte
    if (submitButton) {
        submitButton.disabled = true;
        submitButton.innerHTML = '<span class="command-prefix">></span> ENVOI EN COURS...';
    }
    
    // Animation de transmission des données
    const transmissionAnimation = document.createElement('div');
    transmissionAnimation.className = 'transmission-animation';
    transmissionAnimation.innerHTML = `
        <div class="transmission-text">
            <p>Connexion au serveur...</p>
            <p>Chiffrement des données...</p>
            <p>Transmission en cours...</p>
        </div>
        <div class="transmission-progress">
            <div class="progress-bar"></div>
        </div>
    `;
    
    // Style pour l'animation
    transmissionAnimation.style.marginTop = '1rem';
    
    const progressBar = transmissionAnimation.querySelector('.progress-bar');
    progressBar.style.height = '10px';
    progressBar.style.background = 'var(--color-text)';
    progressBar.style.width = '0%';
    progressBar.style.transition = 'width 2s';
    
    // Insère l'animation
    form.appendChild(transmissionAnimation);
    
    // Anime la barre de progression
    setTimeout(() => {
        progressBar.style.width = '100%';
    }, 100);
    
    // Simule l'envoi (remplacer par un vrai envoi AJAX dans un projet réel)
    setTimeout(() => {
        // Supprime l'animation de transmission
        transmissionAnimation.remove();
        
        // Affiche le message de succès
        if (formResponse) {
            formResponse.classList.remove('hidden');
            formResponse.classList.add('success-message');
            formResponse.innerHTML = `
                <p>[OK] Message envoyé avec succès!</p>
                <p>Merci de m'avoir contacté. Je vous répondrai dès que possible.</p>
            `;
        }
        
        // Réinitialise le formulaire
        form.reset();
        
        // Réactive le bouton
        if (submitButton) {
            submitButton.disabled = false;
            submitButton.innerHTML = '<span class="command-prefix">></span> ENVOYER';
        }
    }, 2500); // Délai simulant l'envoi
}

/**
 * Pour un projet réel, cette fonction enverrait réellement les données du formulaire
 * @param {HTMLFormElement} form - Le formulaire à envoyer
 */
function sendFormData(form) {
    // Exemple d'envoi de données via fetch API (pour un projet réel)
    const formData = new FormData(form);
    
    fetch('submit.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        // Traiter la réponse du serveur
        if (data.success) {
            // Afficher un message de succès
            const formResponse = document.getElementById('form-response');
            formResponse.classList.remove('hidden');
            formResponse.classList.add('success-message');
            formResponse.innerHTML = `<p>${data.message}</p>`;
            
            // Réinitialiser le formulaire
            form.reset();
        } else {
            // Afficher un message d'erreur
            const formResponse = document.getElementById('form-response');
            formResponse.classList.remove('hidden');
            formResponse.classList.add('error-message');
            formResponse.innerHTML = `<p>ERROR: ${data.message}</p>`;
        }
    })
    .catch(error => {
        console.error('Erreur lors de l\'envoi du formulaire:', error);
        
        // Afficher un message d'erreur
        const formResponse = document.getElementById('form-response');
        formResponse.classList.remove('hidden');
        formResponse.classList.add('error-message');
        formResponse.innerHTML = `<p>ERROR: Une erreur s'est produite lors de l'envoi du formulaire.</p>`;
    });
} 