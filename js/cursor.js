/**
 * Cursor.js - Animation du curseur clignotant style terminal
 */

document.addEventListener('DOMContentLoaded', function() {
    // Gestion du curseur clignotant
    const cursor = document.getElementById('cursor');
    
    if (cursor) {
        // Le curseur clignote déjà via CSS, mais on peut ajouter des comportements supplémentaires
        setupCursorBehavior(cursor);
    }
});

/**
 * Configure des comportements spéciaux pour le curseur
 * @param {HTMLElement} cursorElement - L'élément du curseur
 */
function setupCursorBehavior(cursorElement) {
    // Modifie le style du curseur lorsqu'on tape dans le terminal
    document.addEventListener('keydown', function(event) {
        // Si l'utilisateur n'est pas en train de taper dans un champ de formulaire
        if (!isTypingInInput()) {
            // Simule un léger mouvement du curseur lors de la frappe
            cursorElement.style.transform = 'translateY(1px)';
            
            // Rétablit la position normale après un court délai
            setTimeout(() => {
                cursorElement.style.transform = 'none';
            }, 50);
            
            // Simule la frappe de texte si on est sur la page d'accueil
            simulateTyping(event.key);
        }
    });
    
    // Effet de surbrillance occasionnel pour attirer l'attention
    setInterval(() => {
        if (Math.random() < 0.1) { // 10% de chance
            // Fait briller le curseur plus intensément pendant un moment
            cursorElement.style.boxShadow = '0 0 8px var(--color-text)';
            
            setTimeout(() => {
                cursorElement.style.boxShadow = 'none';
            }, 500);
        }
    }, 5000);
}

/**
 * Vérifie si l'utilisateur est en train de taper dans un champ de saisie
 * @returns {boolean} Vrai si l'utilisateur tape dans un input/textarea
 */
function isTypingInInput() {
    const activeElement = document.activeElement;
    const inputElements = ['INPUT', 'TEXTAREA'];
    
    return inputElements.includes(activeElement.tagName);
}

/**
 * Simule la frappe de texte dans le terminal (page d'accueil uniquement)
 * @param {string} key - La touche appuyée
 */
function simulateTyping(key) {
    // On ne simule la frappe que sur la page d'accueil et si l'élément current-command existe
    const commandElement = document.getElementById('current-command');
    
    if (!commandElement) return;
    
    // Ignore certaines touches spéciales
    const ignoredKeys = ['Shift', 'Control', 'Alt', 'Meta', 'CapsLock', 'Tab', 'Escape'];
    if (ignoredKeys.includes(key)) return;
    
    // Gestion spéciale des touches
    if (key === 'Backspace') {
        // Efface le dernier caractère
        commandElement.textContent = commandElement.textContent.slice(0, -1);
    } else if (key === 'Enter') {
        // Traite la commande si Enter est pressé
        processCommand(commandElement.textContent);
        commandElement.textContent = '';
    } else if (key.length === 1) { // Touches normales (caractères simples)
        // Ajoute le caractère au texte de commande
        // Limite à 30 caractères pour éviter le débordement
        if (commandElement.textContent.length < 30) {
            commandElement.textContent += key.toUpperCase();
        }
    }
}

/**
 * Traite une commande entrée par l'utilisateur
 * @param {string} command - La commande à traiter
 */
function processCommand(command) {
    // Liste des commandes reconnues et leurs actions
    const commands = {
        'HELP': () => showHelpMessage(),
        'ALBUMS': () => window.location.href = 'albums.html',
        'BLOG': () => window.location.href = 'blog.html',
        'CONTACT': () => window.location.href = 'contact.html',
        'ABOUT': () => showAboutMessage(),
        'CLEAR': () => clearTerminal(),
        'VERSION': () => showVersionInfo(),
        'HELLO': () => sayHello(),
        'HI': () => sayHello(),
        'DATE': () => showCurrentDate(),
        'TIME': () => showCurrentDate(),
        'EXIT': () => simulateExit(),
        'QUIT': () => simulateExit()
    };
    
    // Supprime les espaces et convertit en majuscules pour la comparaison
    const normalizedCommand = command.trim().toUpperCase();
    
    // Vérifie si la commande existe
    if (commands[normalizedCommand]) {
        commands[normalizedCommand]();
    } else if (normalizedCommand) {
        showUnknownCommandMessage(normalizedCommand);
    }
}

/**
 * Affiche un message d'aide
 */
function showHelpMessage() {
    // Crée un élément pour afficher le message
    const helpElement = document.createElement('div');
    helpElement.classList.add('terminal-message');
    helpElement.innerHTML = `
    <p>Commandes disponibles:</p>
    <ul>
        <li>HELP - Affiche cette aide</li>
        <li>ALBUMS - Voir les albums photos</li>
        <li>BLOG - Lire les articles du blog</li>
        <li>CONTACT - Page de contact</li>
        <li>ABOUT - À propos</li>
        <li>CLEAR - Efface l'écran</li>
        <li>VERSION - Affiche la version</li>
        <li>DATE - Affiche la date et l'heure</li>
        <li>EXIT - Quitte le terminal</li>
    </ul>
    `;
    
    // Ajoute le message au terminal
    insertMessageIntoTerminal(helpElement);
}

/**
 * Affiche un message sur la commande inconnue
 * @param {string} command - La commande inconnue
 */
function showUnknownCommandMessage(command) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('terminal-message', 'error-message');
    messageElement.innerHTML = `
    <p>ERROR: Commande inconnue: '${command}'</p>
    <p>Tapez HELP pour voir la liste des commandes.</p>
    `;
    
    insertMessageIntoTerminal(messageElement);
}

/**
 * Affiche un message à propos
 */
function showAboutMessage() {
    const aboutElement = document.createElement('div');
    aboutElement.classList.add('terminal-message');
    aboutElement.innerHTML = `
    <p>Portfolio Terminal v1.0</p>
    <p>Un portfolio style rétro ASCII/DOS</p>
    <p>Créé par [Votre Nom]</p>
    <p>© 2023 Tous droits réservés</p>
    `;
    
    insertMessageIntoTerminal(aboutElement);
}

/**
 * Efface le contenu du terminal
 */
function clearTerminal() {
    // Supprime tous les messages précédents
    const messages = document.querySelectorAll('.terminal-message');
    messages.forEach(message => message.remove());
}

/**
 * Affiche les informations de version
 */
function showVersionInfo() {
    const versionElement = document.createElement('div');
    versionElement.classList.add('terminal-message');
    versionElement.innerHTML = `
    <p>Terminal OS v1.0.3</p>
    <p>Build date: 2023-05-15</p>
    <p>Système: Portfolio_Terminal</p>
    `;
    
    insertMessageIntoTerminal(versionElement);
}

/**
 * Répond à une salutation
 */
function sayHello() {
    const greetings = [
        "Bonjour! Comment puis-je vous aider?",
        "Hello! Bienvenue sur mon portfolio.",
        "Salut! Enchanté de vous rencontrer.",
        "Hey! Ravi de vous voir ici."
    ];
    
    const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];
    
    const messageElement = document.createElement('div');
    messageElement.classList.add('terminal-message');
    messageElement.innerHTML = `<p>${randomGreeting}</p>`;
    
    insertMessageIntoTerminal(messageElement);
}

/**
 * Affiche la date et l'heure actuelles
 */
function showCurrentDate() {
    const now = new Date();
    const dateString = now.toLocaleString();
    
    const dateElement = document.createElement('div');
    dateElement.classList.add('terminal-message');
    dateElement.innerHTML = `<p>Date actuelle: ${dateString}</p>`;
    
    insertMessageIntoTerminal(dateElement);
}

/**
 * Simule la fermeture du terminal
 */
function simulateExit() {
    const exitElement = document.createElement('div');
    exitElement.classList.add('terminal-message');
    exitElement.innerHTML = `<p>Fermeture du terminal...</p>`;
    
    insertMessageIntoTerminal(exitElement);
    
    // Effet de fermeture après un court délai
    setTimeout(() => {
        document.querySelector('.terminal-container').classList.add('shutting-down');
        
        // Puis recharge la page après un autre délai
        setTimeout(() => {
            window.location.reload();
        }, 1000);
    }, 800);
}

/**
 * Insère un message dans le terminal
 * @param {HTMLElement} messageElement - L'élément de message à insérer
 */
function insertMessageIntoTerminal(messageElement) {
    // Trouve l'élément parent où insérer le message
    const terminalContent = document.querySelector('.terminal-content');
    const inputLine = document.querySelector('.terminal-input-line');
    
    if (terminalContent && inputLine) {
        // Insère le message avant la ligne de commande
        terminalContent.insertBefore(messageElement, inputLine);
        
        // Fait défiler vers le bas pour montrer le nouveau message
        terminalContent.scrollTop = terminalContent.scrollHeight;
    }
} 