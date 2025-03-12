# Portfolio Terminal

Un portfolio web au style ASCII/rétro inspiré des interfaces de terminal et des anciens systèmes DOS/BBS.

![Version](https://img.shields.io/badge/version-1.0.0-green.svg)
![Licence](https://img.shields.io/badge/licence-MIT-blue.svg)

## 📋 Présentation

Ce portfolio adopte une esthétique "terminal" rétro avec effets ASCII art, animations typographiques et design minimaliste. Il comprend plusieurs sections:

- **Accueil** avec séquence de démarrage type BIOS/DOS
- **Albums** pour présenter des portfolios photo
- **Blog** pour partager des articles et réflexions
- **Contact** avec formulaire au style terminal

## 🌟 Caractéristiques

- Design inspiré des terminaux ASCII et interfaces DOS
- Animations de texte qui se tape caractère par caractère
- Effets visuels: scanlines, glitch, curseur clignotant
- Navigation par commandes de terminal
- Structure responsive adaptée à tous les appareils
- Interface minimaliste et légère
- Code modulaire et facilement personnalisable

## 🛠️ Technologies utilisées

- HTML5
- CSS3
- JavaScript (Vanilla)
- Pas de frameworks ni dépendances externes

## 🚀 Installation

1. Clonez ce dépôt:
```bash
git clone https://github.com/votre-username/portfolio.git
cd portfolio
```

2. Ouvrez le fichier `index.html` dans votre navigateur pour tester localement.

## 🔧 Personnalisation

### Modification du contenu

1. **Informations personnelles**: Modifiez les infos de contact dans `contact.html`
2. **Albums photos**: 
   - Ajoutez vos photos dans le dossier `img/photos/[album-name]/`
   - Créez de nouvelles pages d'album en dupliquant `albums/album1.html`
   - Mettez à jour la liste des albums dans `albums.html`
3. **Articles de blog**:
   - Créez de nouveaux articles en dupliquant `blog/article1.html`
   - Mettez à jour la liste des articles dans `blog.html`

### Modification du style

1. **Palette de couleurs**: Modifiez les variables CSS dans `css/main.css`:
```css
:root {
    --color-bg: #000000;       /* Couleur de fond */
    --color-text: #33FF33;     /* Couleur de texte principale */
    --color-accent: #00FFFF;   /* Couleur d'accentuation */
    --color-accent-alt: #FF00FF; /* Couleur alternative */
    /* ... autres variables ... */
}
```

2. **ASCII Art**: Générez votre propre ASCII art avec des outils en ligne comme [Text to ASCII Art Generator](https://patorjk.com/software/taag) et intégrez-les dans les balises avec l'id `ascii-title`.

3. **Animations**: Ajustez les paramètres d'animation dans `js/terminal.js` et `css/terminal.css`.

## 📱 Responsive Design

Le portfolio s'adapte à différentes tailles d'écran:
- Desktop (>1024px)
- Tablette (768px-1024px)
- Mobile (<768px)

## 📤 Déploiement

### Méthode recommandée: GitHub Pages

1. Créez un dépôt GitHub ou utilisez un existant
2. Pushez votre code:
```bash
git add .
git commit -m "Initial commit"
git push origin main
```
3. Dans les paramètres du dépôt GitHub, activez GitHub Pages et sélectionnez la branche main

### Autres options de déploiement

- **Netlify**: Créez un compte, connectez votre dépôt GitHub et déployez
- **Vercel**: Similaire à Netlify avec déploiement automatique
- **Hébergement classique**: Transférez les fichiers via FTP sur votre hébergeur

## 🔍 Structure des fichiers

```
portfolio/
│
├── index.html               # Page d'accueil
├── albums.html              # Page des albums photos
├── blog.html                # Page du blog
├── contact.html             # Page de contact
│
├── css/
│   ├── main.css             # Styles principaux
│   ├── terminal.css         # Styles du terminal
│   ├── gallery.css          # Styles des galeries
│   └── responsive.css       # Styles responsives
│
├── js/
│   ├── terminal.js          # Fonctionnalités du terminal
│   ├── cursor.js            # Animation du curseur
│   ├── gallery.js           # Navigation dans les albums
│   └── contact.js           # Gestion du formulaire
│
├── albums/                  # Pages individuelles d'albums
│   └── album1.html
│
├── blog/                    # Articles de blog
│   └── article1.html
│
└── img/                     # Images
    ├── photos/              # Photos des albums
    ├── bg/                  # Arrière-plans
    └── ui/                  # Éléments d'interface
```

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 👤 Auteur

- **[Votre Nom]** - [GitHub](https://github.com/votre-username)

---

*Fait avec ❤️ en HTML, CSS et JavaScript pur* 