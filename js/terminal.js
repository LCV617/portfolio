/**
 * Terminal.js - Fonctionnalités pour un portfolio style terminal ASCII
 * Gère les effets de terminal, animation de frappe, et la séquence de démarrage
 */

document.addEventListener('DOMContentLoaded', function() {
    initTerminal();
    enhanceASCIIFrames();
});

function initTerminal() {
    console.log("Initialisation du terminal...");
    // Éléments du DOM
    const bootSequence = document.querySelector('.boot-sequence');
    const terminalMenu = document.querySelector('.terminal-menu');
    const contentSections = document.querySelectorAll('.content-section');

    if (!bootSequence) console.error("Élément .boot-sequence introuvable");
    if (!terminalMenu) console.error("Élément .terminal-menu introuvable");

    // Afficher la séquence de démarrage
    bootSequence.classList.remove('hidden');
    
    // Animation de démarrage
    setTimeout(() => {
        startBootSequence(bootSequence, () => {
            // Après l'animation de démarrage, afficher le menu
            terminalMenu.classList.remove('hidden');
        });
    }, 500);

    // Gestionnaires d'événements pour les boutons du menu
    document.querySelectorAll('.menu-item').forEach(button => {
        button.addEventListener('click', function() {
            const sectionId = this.getAttribute('data-section');
            showSection(sectionId);
        });
    });

    // Gestionnaires d'événements pour les liens de retour
    document.querySelectorAll('.prompt').forEach(prompt => {
        prompt.addEventListener('click', function() {
            hideAllSections();
            terminalMenu.classList.remove('hidden');
        });
    });

    // Ajouter des effets visuels supplémentaires
    addVisualEffects();
}

/**
 * Améliore l'apparence des cadres ASCII pour les sections et le terminal
 */
function enhanceASCIIFrames() {
    // Améliore les bordures des sections de contenu
    document.querySelectorAll('.content-section').forEach(section => {
        const title = section.getAttribute('data-title') || '';
        
        // Crée une bordure supérieure personnalisée
        const topBorder = document.createElement('div');
        topBorder.className = 'ascii-section-border top';
        
        // Dessine une bordure ASCII avec le titre
        const borderLength = 50;
        let topLine = '┌' + '─'.repeat(2);
        
        if (title) {
            topLine += '[ ' + title + ' ]';
            const remainingChars = borderLength - topLine.length - 1;
            topLine += '─'.repeat(Math.max(0, remainingChars)) + '┐';
        } else {
            topLine += '─'.repeat(borderLength - 4) + '┐';
        }
        
        topBorder.textContent = topLine;
        
        // Crée une bordure inférieure personnalisée
        const bottomBorder = document.createElement('div');
        bottomBorder.className = 'ascii-section-border bottom';
        bottomBorder.textContent = '└' + '─'.repeat(borderLength - 2) + '┘';
        
        // Crée des bordures latérales
        const leftBorder = document.createElement('div');
        leftBorder.className = 'ascii-section-border left';
        leftBorder.innerHTML = '│'.repeat(15); // Multiple lines
        
        const rightBorder = document.createElement('div');
        rightBorder.className = 'ascii-section-border right';
        rightBorder.innerHTML = '│'.repeat(15); // Multiple lines
        
        // Ajouter les bordures à la section
        section.prepend(topBorder);
        section.append(bottomBorder);
        section.prepend(leftBorder);
        section.append(rightBorder);
    });
    
    // Ajoute des caractères ASCII aux menus et boutons
    document.querySelectorAll('.terminal-menu button').forEach(button => {
        const text = button.textContent;
        
        // Entoure le texte avec des caractères ASCII
        button.innerHTML = '';
        const span = document.createElement('span');
        span.textContent = text;
        button.appendChild(span);
    });
}

// Séquence de démarrage Amiga style
function startBootSequence(bootSequence, callback) {
    const bootText = [
        "AmigaDOS ROM Boot v2.1",
        "© 1990-93 Commodore-Amiga, Inc.",
        "Tous droits réservés.",
        "",
        "Initialisation du système...",
        "Vérification de la mémoire: OK",
        "Chargement du système de fichiers: OK",
        "Initialisation du terminal: OK",
        "",
        "Système prêt."
    ];

    // Ajouter le texte avec animation
    let currentLine = 0;
    const interval = setInterval(() => {
        if (currentLine < bootText.length) {
            const line = document.createElement('div');
            line.className = 'boot-log';
            line.textContent = bootText[currentLine];
            bootSequence.appendChild(line);
            currentLine++;
        } else {
            clearInterval(interval);
            
            // Ajouter une barre de progression
            const progressContainer = document.createElement('div');
            progressContainer.className = 'boot-progress';
            
            const progressBar = document.createElement('div');
            progressBar.className = 'progress-bar';
            
            const progressFill = document.createElement('div');
            progressFill.className = 'progress-bar-fill';
            
            const progressLabel = document.createElement('div');
            progressLabel.className = 'progress-label';
            progressLabel.textContent = 'Chargement...';
            
            progressBar.appendChild(progressFill);
            progressContainer.appendChild(progressBar);
            progressContainer.appendChild(progressLabel);
            bootSequence.appendChild(progressContainer);
            
            // Animer la barre de progression
            let width = 0;
            const progressInterval = setInterval(() => {
                if (width >= 100) {
                    clearInterval(progressInterval);
                    
                    // Ajouter l'ASCII art du titre
                    const asciiArt = document.createElement('pre');
                    asciiArt.className = 'ascii-art';
                    asciiArt.innerHTML = `
 ██████╗  ██████╗ ██████╗ ████████╗███████╗ ██████╗ ██╗     ██╗ ██████╗ 
 ██╔══██╗██╔═══██╗██╔══██╗╚══██╔══╝██╔════╝██╔═══██╗██║     ██║██╔═══██╗
 ██████╔╝██║   ██║██████╔╝   ██║   █████╗  ██║   ██║██║     ██║██║   ██║
 ██╔═══╝ ██║   ██║██╔══██╗   ██║   ██╔══╝  ██║   ██║██║     ██║██║   ██║
 ██║     ╚██████╔╝██║  ██║   ██║   ██║     ╚██████╔╝███████╗██║╚██████╔╝
 ╚═╝      ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚═╝      ╚═════╝ ╚══════╝╚═╝ ╚═════╝ 
                                                                         
`;
                    bootSequence.appendChild(asciiArt);
                    
                    // Simuler des commandes "tapées"
                    simulateTyping(['HELP', 'DIR', 'LIST', 'MENU'], () => {
                        // Après la séquence, cacher la séquence de démarrage et afficher le menu
                        setTimeout(() => {
                            console.log("Animation de démarrage terminée, affichage du menu principal");
                            bootSequence.classList.add('hidden');
                            if (callback) callback();
                        }, 1000);
                    });
                } else {
                    width += 2;
                    progressFill.style.width = width + '%';
                    if (width >= 100) {
                        progressLabel.textContent = 'Terminé!';
                    }
                }
            }, 30);
        }
    }, 200);
}

// Simuler la frappe de texte
function simulateTyping(commands, callback) {
    if (commands.length === 0) {
        if (callback) callback();
        return;
    }
    
    const command = commands.shift();
    
    const cmdContainer = document.createElement('div');
    cmdContainer.className = 'prompt';
    
    const promptSymbol = document.createElement('span');
    promptSymbol.className = 'prompt-symbol';
    promptSymbol.textContent = '>';
    
    const inputLine = document.createElement('div');
    inputLine.className = 'input-line';
    
    cmdContainer.appendChild(promptSymbol);
    cmdContainer.appendChild(inputLine);
    
    document.querySelector('.boot-sequence').appendChild(cmdContainer);
    
    // Écrire la commande caractère par caractère
    let i = 0;
    const typeInterval = setInterval(() => {
        if (i < command.length) {
            inputLine.textContent += command.charAt(i);
            i++;
        } else {
            clearInterval(typeInterval);
            
            // Créer une réponse pour la commande
            let response;
            if (command === 'HELP') {
                response = "Commandes disponibles : DIR, LIST, MENU, HELP";
            } else if (command === 'DIR' || command === 'LIST') {
                response = "ABOUT.TXT\nSKILLS.DAT\nPROJECTS.DAT\nCONTACT.EXE\nGALLERY.IMG\nBLOG.TXT";
            } else if (command === 'MENU') {
                response = "Chargement du menu...";
            }
            
            if (response) {
                const outputLine = document.createElement('div');
                outputLine.className = 'output-line';
                outputLine.textContent = response;
                document.querySelector('.boot-sequence').appendChild(outputLine);
            }
            
            // Passer à la commande suivante
            setTimeout(() => {
                simulateTyping(commands, callback);
            }, 500);
        }
    }, 50);
}

// Afficher une section spécifique et cacher les autres
function showSection(sectionId) {
    const terminalMenu = document.querySelector('.terminal-menu');
    const allSections = document.querySelectorAll('.content-section');
    
    // Cacher d'abord tout
    terminalMenu.classList.add('hidden');
    allSections.forEach(section => {
        section.classList.add('hidden');
    });
    
    // Afficher la section demandée
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.remove('hidden');
        
        // Ajouter une petite animation pour simuler le terminal qui écrit
        const content = targetSection.innerHTML;
        targetSection.innerHTML = '';
        
        let i = 0;
        const typeInterval = setInterval(() => {
            if (i < content.length) {
                targetSection.innerHTML += content.charAt(i);
                i++;
            } else {
                clearInterval(typeInterval);
                // Remettre le contenu complet pour éviter des problèmes avec les événements
                targetSection.innerHTML = content;
                
                // Réattacher les événements pour les liens de retour
                const prompt = targetSection.querySelector('.prompt');
                if (prompt) {
                    prompt.addEventListener('click', function() {
                        hideAllSections();
                        terminalMenu.classList.remove('hidden');
                    });
                }
                
                // Réappliquer les cadres ASCII
                enhanceASCIIFrames();
            }
        }, 1); // Très rapide pour ne pas ennuyer l'utilisateur
    }
}

// Cacher toutes les sections
function hideAllSections() {
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.add('hidden');
    });
}

// Ajouter des effets visuels supplémentaires
function addVisualEffects() {
    // Effet de scintillement aléatoire pour l'effet CRT
    setInterval(() => {
        if (Math.random() > 0.95) {
            document.body.classList.add('flicker');
            setTimeout(() => {
                document.body.classList.remove('flicker');
            }, 100 + Math.random() * 100);
        }
    }, 1000);
    
    // Effet de glitch aléatoire
    setInterval(() => {
        if (Math.random() > 0.97) {
            const glitchDuration = 100 + Math.random() * 200;
            document.body.classList.add('glitch');
            setTimeout(() => {
                document.body.classList.remove('glitch');
            }, glitchDuration);
        }
    }, 2000);
}

// Ajoutez une solution de secours au cas où l'animation resterait bloquée
setTimeout(() => {
    const bootSequence = document.querySelector('.boot-sequence');
    const terminalMenu = document.querySelector('.terminal-menu');
    
    if (bootSequence && !bootSequence.classList.contains('hidden')) {
        console.log("Animation de démarrage bloquée, forçage du menu principal");
        bootSequence.classList.add('hidden');
        if (terminalMenu) terminalMenu.classList.remove('hidden');
    }
}, 10000); // Force l'affichage du menu après 10 secondes 