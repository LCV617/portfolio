/**
 * Gallery.js - Gestion des galeries photos pour le portfolio terminal
 * Responsable de la navigation dans les albums et l'affichage des photos
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialiser la galerie si on est sur la page correspondante
    if (document.querySelector('.gallery-grid')) {
        initGallery();
    }
    
    // Initialise les interactions pour les albums sur la page d'index
    initAlbumGrid();
    
    // Initialise la navigation des photos si on est sur une page d'album
    initPhotoViewer();
});

/**
 * Initialise la grille d'albums sur la page d'index
 */
function initAlbumGrid() {
    const albumItems = document.querySelectorAll('.album-item');
    
    if (albumItems.length === 0) return;
    
    albumItems.forEach(item => {
        item.addEventListener('click', function() {
            const albumId = this.getAttribute('data-album');
            
            if (albumId) {
                // Animation avant la redirection
                applyClickAnimation(this);
                
                // Redirection vers la page de l'album
                setTimeout(() => {
                    window.location.href = `albums/${albumId}.html`;
                }, 300);
            }
        });
        
        // Ajoute un effet de survol avec glitch occasionnel
        item.addEventListener('mouseenter', function() {
            if (Math.random() < 0.3) { // 30% de chance d'avoir un glitch
                const title = this.querySelector('.album-title');
                if (title) {
                    title.classList.add('glitch');
                    
                    setTimeout(() => {
                        title.classList.remove('glitch');
                    }, 500);
                }
            }
        });
    });
    
    // Animation d'apparition progressive des albums
    animateAlbumsAppearance(albumItems);
}

/**
 * Anime l'apparition des albums un par un
 * @param {NodeList} albumItems - Les éléments d'album à animer
 */
function animateAlbumsAppearance(albumItems) {
    albumItems.forEach((item, index) => {
        // Masque initialement tous les albums
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        
        // Fait apparaître les albums un par un avec un délai
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, 100 + (index * 150)); // Délai progressif
    });
}

/**
 * Applique une animation lors du clic sur un album
 * @param {HTMLElement} element - L'élément sur lequel appliquer l'animation
 */
function applyClickAnimation(element) {
    // Effet visuel lors du clic
    element.style.transform = 'scale(0.95)';
    
    // Petit effet de glitch
    element.classList.add('glitch');
    
    // Retire les effets après l'animation
    setTimeout(() => {
        element.style.transform = '';
        element.classList.remove('glitch');
    }, 300);
}

/**
 * Initialise la visionneuse de photos pour une page d'album
 */
function initPhotoViewer() {
    const photoViewer = document.querySelector('.photo-viewer');
    
    if (!photoViewer) return;
    
    // Récupère les contrôles de navigation
    const prevButton = document.querySelector('.photo-nav.prev');
    const nextButton = document.querySelector('.photo-nav.next');
    const fullscreenButton = document.querySelector('.fullscreen-button');
    const photoCounter = document.querySelector('.photo-counter');
    
    // Récupère toutes les photos
    const photos = document.querySelectorAll('.photo');
    let currentPhotoIndex = 0;
    
    // Si des photos sont présentes, active la première
    if (photos.length > 0) {
        photos[0].classList.add('active');
        updatePhotoCounter(currentPhotoIndex, photos.length);
    }
    
    // Gestion du bouton précédent
    if (prevButton) {
        prevButton.addEventListener('click', function() {
            navigatePhotos('prev', photos, currentPhotoIndex);
            currentPhotoIndex = (currentPhotoIndex - 1 + photos.length) % photos.length;
            updatePhotoCounter(currentPhotoIndex, photos.length);
        });
    }
    
    // Gestion du bouton suivant
    if (nextButton) {
        nextButton.addEventListener('click', function() {
            navigatePhotos('next', photos, currentPhotoIndex);
            currentPhotoIndex = (currentPhotoIndex + 1) % photos.length;
            updatePhotoCounter(currentPhotoIndex, photos.length);
        });
    }
    
    // Gestion du mode plein écran
    if (fullscreenButton) {
        fullscreenButton.addEventListener('click', function() {
            toggleFullscreen(photoViewer);
        });
    }
    
    // Navigation au clavier
    document.addEventListener('keydown', function(event) {
        if (event.key === 'ArrowLeft') {
            // Touche flèche gauche -> photo précédente
            if (prevButton) prevButton.click();
        } else if (event.key === 'ArrowRight') {
            // Touche flèche droite -> photo suivante
            if (nextButton) nextButton.click();
        } else if (event.key === 'Escape') {
            // Touche Escape -> quitte le mode plein écran
            if (document.fullscreenElement) {
                document.exitFullscreen();
            }
        } else if (event.key === 'f') {
            // Touche 'f' -> bascule le mode plein écran
            if (fullscreenButton) fullscreenButton.click();
        }
    });
    
    // Gestion des gestes tactiles (swipe)
    let touchStartX = 0;
    let touchEndX = 0;
    
    photoViewer.addEventListener('touchstart', function(event) {
        touchStartX = event.changedTouches[0].screenX;
    });
    
    photoViewer.addEventListener('touchend', function(event) {
        touchEndX = event.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const threshold = 50; // Distance minimale de swipe
        
        if (touchEndX < touchStartX - threshold) {
            // Swipe gauche -> photo suivante
            if (nextButton) nextButton.click();
        }
        
        if (touchEndX > touchStartX + threshold) {
            // Swipe droite -> photo précédente
            if (prevButton) prevButton.click();
        }
    }
}

/**
 * Navigue entre les photos avec un effet de transition
 * @param {string} direction - Direction ('prev' ou 'next')
 * @param {NodeList} photos - Les éléments photo
 * @param {number} currentIndex - Index de la photo actuellement affichée
 */
function navigatePhotos(direction, photos, currentIndex) {
    if (photos.length <= 1) return;
    
    // Calcule le nouvel index
    const nextIndex = direction === 'next' 
        ? (currentIndex + 1) % photos.length 
        : (currentIndex - 1 + photos.length) % photos.length;
    
    // Applique l'effet de glitch à la photo actuelle
    photos[currentIndex].classList.add('glitching');
    
    // Après l'animation de glitch, change l'image
    setTimeout(() => {
        // Désactive toutes les photos
        photos.forEach(photo => {
            photo.classList.remove('active', 'glitching');
        });
        
        // Active la nouvelle photo
        photos[nextIndex].classList.add('active');
        
        // Met à jour les informations de la photo si nécessaire
        updatePhotoInfo(nextIndex);
    }, 300); // Durée de l'animation de glitch
}

/**
 * Met à jour le compteur de photos
 * @param {number} currentIndex - Index actuel (base 0)
 * @param {number} total - Nombre total de photos
 */
function updatePhotoCounter(currentIndex, total) {
    const photoCounter = document.querySelector('.photo-counter');
    
    if (photoCounter) {
        // Format: [1/12]
        photoCounter.textContent = `[${currentIndex + 1}/${total}]`;
    }
}

/**
 * Met à jour les informations de la photo (titre, description, etc.)
 * @param {number} index - Index de la photo à afficher
 */
function updatePhotoInfo(index) {
    // Cette fonction peut être étendue pour mettre à jour les métadonnées
    // de la photo en fonction de l'index. Par exemple:
    const photoTitle = document.querySelector('.photo-title');
    const photoInfo = document.querySelector('.photo-info');
    
    if (photoTitle && photoInfo) {
        // On pourrait récupérer ces informations depuis un attribut data-*
        // ou depuis un objet JavaScript contenant les métadonnées des photos
        const photos = document.querySelectorAll('.photo');
        const currentPhoto = photos[index];
        
        if (currentPhoto) {
            const title = currentPhoto.getAttribute('data-title') || '';
            const info = currentPhoto.getAttribute('data-info') || '';
            
            photoTitle.textContent = title;
            photoInfo.textContent = info;
        }
    }
}

/**
 * Bascule le mode plein écran
 * @param {HTMLElement} element - L'élément à mettre en plein écran
 */
function toggleFullscreen(element) {
    if (!document.fullscreenElement) {
        // Passe en mode plein écran
        if (element.requestFullscreen) {
            element.requestFullscreen();
        } else if (element.mozRequestFullScreen) { // Firefox
            element.mozRequestFullScreen();
        } else if (element.webkitRequestFullscreen) { // Chrome, Safari, Opera
            element.webkitRequestFullscreen();
        } else if (element.msRequestFullscreen) { // IE/Edge
            element.msRequestFullscreen();
        }
        
        document.body.classList.add('fullscreen-mode');
    } else {
        // Quitte le mode plein écran
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
        
        document.body.classList.remove('fullscreen-mode');
    }
}

// Écoute les changements d'état du plein écran
document.addEventListener('fullscreenchange', handleFullscreenChange);
document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
document.addEventListener('mozfullscreenchange', handleFullscreenChange);
document.addEventListener('MSFullscreenChange', handleFullscreenChange);

/**
 * Gère les changements d'état du plein écran
 */
function handleFullscreenChange() {
    if (!document.fullscreenElement && 
        !document.webkitFullscreenElement && 
        !document.mozFullScreenElement &&
        !document.msFullscreenElement) {
        // Si on quitte le plein écran
        document.body.classList.remove('fullscreen-mode');
    }
}

/**
 * Initialise la galerie ASCII Art
 */
function initGallery() {
    const galleryGrid = document.querySelector('.gallery-grid');
    
    // Exemples de projets pour la galerie
    const projects = [
        {
            title: 'Projet 1',
            description: 'Application web React',
            asciiArt: generateASCIIArt(1)
        },
        {
            title: 'Projet 2',
            description: 'API RESTful',
            asciiArt: generateASCIIArt(2)
        },
        {
            title: 'Projet 3',
            description: 'Site statique Next.js',
            asciiArt: generateASCIIArt(3)
        },
        {
            title: 'Projet 4',
            description: 'Application mobile',
            asciiArt: generateASCIIArt(4)
        }
    ];
    
    // Créer les éléments de la galerie
    projects.forEach(project => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        
        const ascii = document.createElement('pre');
        ascii.className = 'ascii-thumbnail';
        ascii.innerHTML = project.asciiArt;
        
        const title = document.createElement('h3');
        title.textContent = project.title;
        
        const description = document.createElement('p');
        description.textContent = project.description;
        
        const link = document.createElement('a');
        link.href = '#';
        link.className = 'gallery-item-link';
        link.textContent = '[VOIR DÉTAILS]';
        link.addEventListener('click', function(e) {
            e.preventDefault();
            showProjectDetails(project);
        });
        
        galleryItem.appendChild(ascii);
        galleryItem.appendChild(title);
        galleryItem.appendChild(description);
        galleryItem.appendChild(link);
        
        galleryGrid.appendChild(galleryItem);
    });
}

/**
 * Génère un ASCII art simple pour un projet
 * @param {number} type - Type de projet (1-4)
 * @returns {string} ASCII art du projet
 */
function generateASCIIArt(type) {
    const artCollection = [
        // Projet 1 - Terminal/Interface
        `+---------------+
|  [ PROJECT 1 ]  |
|   ___________   |
|  |           |  |
|  | $ _ |     |  |
|  |___________|  |
|               |
+---------------+`,

        // Projet 2 - Base de données/API
        `+---------------+
|  [ PROJECT 2 ]  |
|    _______     |
|   /      /|    |
|  +------+ |    |
|  |  DB  | |    |
|  +------+/     |
|   API REST     |
+---------------+`,

        // Projet 3 - Site Web
        `+---------------+
|  [ PROJECT 3 ]  |
|  ___      ___  |
| |   | /\\ |   | |
| |___||__||___| |
|  |  WEBSITE |  |
|  +---------+   |
|               |
+---------------+`,

        // Projet 4 - Application Mobile
        `+---------------+
|  [ PROJECT 4 ]  |
|    _______     |
|   |       |    |
|   |  APP  |    |
|   |   []  |    |
|   |_______|    |
|    MOBILE      |
+---------------+`
    ];
    
    // Index de 0 à 3 pour correspondre au tableau
    const index = Math.min(Math.max(0, type - 1), artCollection.length - 1);
    return artCollection[index];
}

/**
 * Affiche les détails d'un projet
 * @param {Object} project - Projet à afficher
 */
function showProjectDetails(project) {
    // Créer une boîte de dialogue modale en style terminal
    const modal = document.createElement('div');
    modal.className = 'terminal-modal';
    
    const modalContent = document.createElement('div');
    modalContent.className = 'terminal-modal-content';
    
    const modalHeader = document.createElement('div');
    modalHeader.className = 'terminal-modal-header';
    modalHeader.innerHTML = `
        <span class="modal-title">${project.title}</span>
        <span class="modal-close">x</span>
    `;
    
    const modalBody = document.createElement('div');
    modalBody.className = 'terminal-modal-body';
    modalBody.innerHTML = `
        <pre class="modal-ascii">${project.asciiArt}</pre>
        <div class="modal-description">
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula.</p>
            <div class="modal-tech">
                <h4>Technologies:</h4>
                <ul>
                    <li>HTML/CSS/JavaScript</li>
                    <li>React.js</li>
                    <li>Node.js</li>
                </ul>
            </div>
            <a href="#" class="modal-link">[VISITER LE PROJET]</a>
        </div>
    `;
    
    modalContent.appendChild(modalHeader);
    modalContent.appendChild(modalBody);
    modal.appendChild(modalContent);
    
    // Ajouter au corps du document
    document.body.appendChild(modal);
    
    // Animation d'ouverture
    setTimeout(() => {
        modal.classList.add('active');
    }, 10);
    
    // Gestionnaire de fermeture
    const closeButton = modal.querySelector('.modal-close');
    closeButton.addEventListener('click', function() {
        closeModal(modal);
    });
    
    // Fermeture en cliquant en dehors
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal(modal);
        }
    });
    
    // Fermeture avec échap
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal(modal);
        }
    });
}

/**
 * Ferme la boîte de dialogue modale
 * @param {HTMLElement} modal - Élément modal à fermer
 */
function closeModal(modal) {
    modal.classList.remove('active');
    setTimeout(() => {
        modal.remove();
    }, 300);
} 