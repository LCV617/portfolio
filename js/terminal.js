/**
 * Terminal.js - Fonctionnalités pour un portfolio style terminal ASCII
 * Gère les effets de terminal, animation de frappe, et la séquence de démarrage
 */

document.addEventListener('DOMContentLoaded', function() {
    // Séquence de démarrage du terminal
    if (document.getElementById('boot-text')) {
        startBootSequence();
    }
    
    // Active les interactions sur les éléments de navigation
    setupNavigation();
    
    // Initialise les effets de glitch occasionnels
    setupGlitchEffects();
});

/**
 * Démarre la séquence d'animation de démarrage type DOS/BIOS
 */
function startBootSequence() {
    const bootTextElement = document.getElementById('boot-text');
    const mainContent = document.getElementById('main-content');
    
    // Texte de la séquence de démarrage
    const bootSequenceText = `
BIOS Version 3.64    
Copyright (C) 1984-2023

CPU: 486DX 66MHz
Memory Test: 16384K OK

Initializing System...
Loading Terminal OS...
[OK] Checking file system...
[OK] Mounting main drive...
[OK] Loading user profile...
[OK] Initializing display...
[OK] Checking network...

TERMINAL READY.

Type HELP for commands
`;

    // Animation pour taper le texte caractère par caractère
    let i = 0;
    const typingInterval = setInterval(() => {
        // Ajoute le caractère suivant
        bootTextElement.textContent += bootSequenceText.charAt(i);
        
        // Fait défiler vers le bas pour montrer le nouveau texte
        bootTextElement.scrollTop = bootTextElement.scrollHeight;
        
        i++;
        
        // Si on a fini de taper tout le texte
        if (i >= bootSequenceText.length) {
            clearInterval(typingInterval);
            
            // Affiche le contenu principal après un délai
            setTimeout(() => {
                document.querySelector('.boot-sequence').classList.add('hidden');
                mainContent.classList.remove('hidden');
                
                // Animation pour taper le titre ASCII (si présent)
                if (document.getElementById('ascii-title')) {
                    typeAsciiArt();
                }
            }, 800);
        }
    }, 30); // Vitesse de frappe
}

/**
 * Tape le titre ASCII art caractère par caractère
 */
function typeAsciiArt() {
    const asciiTitleElement = document.getElementById('ascii-title');
    
    // Titre ASCII art
    const asciiArt = `
    _____ _____ _____ __  __ _____ _   _    _    _     
   |_   _| ____|  __ \\|  \\/  |_   _| \\ | |  / \\  | |    
     | | |  _| | |__) | |\\/| | | | |  \\| | / _ \\ | |    
     | | | |___|  _  /| |  | | | | | |\\  |/ ___ \\| |___ 
     |_| |_____|_| \\_\\_|  |_| |_| |_| \\_/_/   \\_\\_____|
                                                    
     ______  _____ ____  _____  _____ ___  _     ___ ___  
    |  _ \\ \\/ / _ \\___ \\|_   _|/ ____/ _ \\| |   |_ _/ _ \\ 
    | |_) \\  / | | |__) | | | | |   | | | | |    | | | | |
    |  __//  \\ |_| / __/  | | | |___| |_| | |___ | | |_| |
    |_|  /_/\\_\\___/_____| |_|  \\_____\\___/|_____|___\\___/ 
                                                        
`;

    asciiTitleElement.innerHTML = '';
    let i = 0;
    
    const typingInterval = setInterval(() => {
        // Gérer les sauts de ligne
        if (asciiArt.charAt(i) === '\n') {
            asciiTitleElement.innerHTML += '<br>';
        } else {
            asciiTitleElement.innerHTML += asciiArt.charAt(i);
        }
        
        i++;
        
        // Si on a fini de taper l'ASCII art
        if (i >= asciiArt.length) {
            clearInterval(typingInterval);
            startCommandPrompt();
        }
    }, 10); // Plus rapide pour l'ASCII art
}

/**
 * Démarre l'animation du prompt de commande
 */
function startCommandPrompt() {
    const commandElement = document.getElementById('current-command');
    
    // Texte de la commande à simuler
    const commands = ['HELP', 'LIST', 'MENU', 'START'];
    
    // Tape chaque commande successivement
    let commandIndex = 0;
    let charIndex = 0;
    
    function typeCommand() {
        if (commandIndex >= commands.length) {
            return;
        }
        
        const currentCommand = commands[commandIndex];
        
        if (charIndex < currentCommand.length) {
            // Tape la commande caractère par caractère
            commandElement.textContent += currentCommand.charAt(charIndex);
            charIndex++;
            setTimeout(typeCommand, 150);
        } else {
            // Pause avant d'effacer
            setTimeout(eraseCommand, 800);
        }
    }
    
    function eraseCommand() {
        if (charIndex > 0) {
            // Efface la commande caractère par caractère
            commandElement.textContent = commandElement.textContent.slice(0, -1);
            charIndex--;
            setTimeout(eraseCommand, 50);
        } else {
            // Passe à la commande suivante
            commandIndex++;
            if (commandIndex < commands.length) {
                setTimeout(typeCommand, 300);
            }
        }
    }
    
    typeCommand();
}

/**
 * Configure les éléments de navigation
 */
function setupNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            const command = this.getAttribute('data-command');
            
            // Animation de frappe de la commande
            const commandElement = document.getElementById('current-command');
            
            // Efface tout texte précédent
            commandElement.textContent = '';
            
            // Type la commande
            let i = 0;
            const typeInterval = setInterval(() => {
                if (i < command.length) {
                    commandElement.textContent += command.charAt(i);
                    i++;
                } else {
                    clearInterval(typeInterval);
                    
                    // Redirection après que la commande ait été "tapée"
                    setTimeout(() => {
                        switch(command) {
                            case 'ALBUMS':
                                window.location.href = 'albums.html';
                                break;
                            case 'BLOG':
                                window.location.href = 'blog.html';
                                break;
                            case 'CONTACT':
                                window.location.href = 'contact.html';
                                break;
                            case 'ABOUT':
                                // Peut ouvrir une modal ou une autre page
                                alert('À propos: en construction');
                                break;
                            default:
                                console.log('Commande inconnue:', command);
                        }
                    }, 500);
                }
            }, 100);
        });
    });
}

/**
 * Configure des effets de glitch aléatoires
 */
function setupGlitchEffects() {
    // Applique parfois un glitch aux titres et éléments principaux
    const glitchTargets = document.querySelectorAll('h1, h2, .terminal-title, .nav-item');
    
    glitchTargets.forEach(element => {
        // Chaque élément a une chance de glitcher périodiquement
        setInterval(() => {
            if (Math.random() < 0.05) { // 5% de chance chaque intervalle
                // Sauvegarde le texte pour l'attribut data-text
                const originalText = element.textContent;
                element.setAttribute('data-text', originalText);
                
                // Applique la classe de glitch
                element.classList.add('glitch');
                
                // Retire la classe après l'animation
                setTimeout(() => {
                    element.classList.remove('glitch');
                }, 1000);
            }
        }, 10000); // Vérifie toutes les 10 secondes
    });
} 