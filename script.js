document.addEventListener("DOMContentLoaded", function () {

    // selection des éléments
    const commentButtons = document.querySelectorAll('.comment-btn');
    const likeButtons = document.querySelectorAll('.like-btn');
    const likeCommentButtons = document.querySelectorAll('.like-btn-comment');
    const commentLists = document.querySelectorAll('.comment-list'); // Sélectionne toutes les listes de commentaires
    const sidebarToggleBtn = document.querySelector('.sidebar-toggle-btn');
    const rightbarToggleBtn = document.querySelector('.rightbar-toggle-btn');
    const sidebar = document.querySelector('.sidebar');
    const rightbar = document.querySelector('.rightbar');

    // Ferme tous les commentaires par défaut
    commentLists.forEach(commentList => {
        commentList.style.display = 'none';
    });

    // fonction pour gérer l'ouverture des commentaires
    commentButtons.forEach(button => {
        button.addEventListener('click', () => {
            const commentSection = button.parentElement.nextElementSibling;
            commentSection.style.display = commentSection.style.display === 'block' ? 'none' : 'block';
        });
    });

    // fonction pour gérer les "j'aimes" des publications
    likeButtons.forEach(button => {
        const likeImg = button.querySelector('img'); // Sélectionne l'élément img à l'intérieur du bouton
        const likeCount = button.nextElementSibling;
        const srcBlanc = likeImg ? likeImg.src : 'images/like.png'; // Source par défaut
        const srcRouge = 'images/like_cliqued.png'; // Chemin vers l'image rouge

        button.addEventListener('click', () => {
            let count = parseInt(likeCount.textContent);
            if (button.classList.contains('liked')) {
                count--;
                button.classList.remove('liked');
                if (likeImg) {
                    likeImg.src = srcBlanc; // Remet l'image blanche
                }
            } else {
                count++;
                button.classList.add('liked');
                if (likeImg && srcRouge) {
                    likeImg.src = srcRouge; // Change vers l'image rouge
                }
            }
            likeCount.textContent = isNaN(count) ? 0 : count; // Gère le cas où le texte initial n'est pas un nombre
        });
    });

    // fontion pour gérer les "j'aime" des commentaires
    likeCommentButtons.forEach(button => {
        const likeImg = button.querySelector('img'); // Sélectionne l'élément img à l'intérieur du bouton
        const likeCount = button.nextElementSibling;
        const srcBlanc = likeImg ? likeImg.src : 'images/like.png'; // Source par défaut
        const srcRougeComment = 'images/like_cliqued_comment.png'; // Chemin vers l'image rouge pour les commentaires

        button.addEventListener('click', () => {
            let count = parseInt(likeCount.textContent);
            if (button.classList.contains('liked')) {
                count--;
                button.classList.remove('liked');
                if (likeImg) {
                    likeImg.src = srcBlanc; // Remet l'image blanche
                }
            } else {
                count++;
                button.classList.add('liked');
                if (likeImg && srcRougeComment) {
                    likeImg.src = srcRougeComment; // Change vers l'image rouge du commentaire
                }
            }
            likeCount.textContent = isNaN(count) ? 0 : count; // Gère le cas où le texte initial n'est pas un nombre
        });
    });

    // Gestion de l'affichage des sidebars sur les petits écrans
    if (sidebarToggleBtn && rightbarToggleBtn && sidebar && rightbar) {
        sidebarToggleBtn.addEventListener('click', () => {
            sidebar.classList.toggle('open');
            rightbar.classList.remove('open'); // Ferme l'autre si ouvert
        });

        rightbarToggleBtn.addEventListener('click', () => {
            rightbar.classList.toggle('open');
            sidebar.classList.remove('open'); // Ferme l'autre si ouvert
        });

        // Fermer les sidebars si on clique en dehors (optionnel)
        document.addEventListener('click', (event) => {
            if (sidebar.classList.contains('open') && !event.target.closest('.sidebar-toggle-btn') && !event.target.closest('.sidebar')) {
                sidebar.classList.remove('open');
            }
            if (rightbar.classList.contains('open') && !event.target.closest('.rightbar-toggle-btn') && !event.target.closest('.rightbar')) {
                rightbar.classList.remove('open');
            }
        });
    }
});

window.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('.post .photo img');

    images.forEach(image => {
        image.onload = () => {
            const width = image.naturalWidth;
            const height = image.naturalHeight;

            if (width > 720 || height > 1720) {
                //Redimensionner l'image
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');

                //Calculer les nouvelles dimensions
                let newWidth = width;
                let newHeight = height;
                if (width / height > 720 / 1720) {
                    newWidth = 720;
                    newHeight = height * (720 / width);
                } else {
                    newHeight = 1720;
                    newWidth = width * (1720 / height);
                }

                canvas.width = newWidth;
                canvas.height = newHeight;
                ctx.drawImage(image, 0, 0, newWidth, newHeight);

                image.src = canvas.toDataURL();

            };
        };
    });
});
