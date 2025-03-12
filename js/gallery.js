/**
 * Gallery.js - Gestion des galeries photos pour le portfolio terminal
 * Responsable de la navigation dans les albums et l'affichage des photos
 */

document.addEventListener('DOMContentLoaded', function() {
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