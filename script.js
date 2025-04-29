document.addEventListener("DOMContentLoaded", function () {

    // selection des éléments
    const commentButtons = document.querySelectorAll('.comment-btn');
    const likeButtons = document.querySelectorAll('.like-btn');
    const likeCommentButtons = document.querySelectorAll('.like-btn-comment');

    // fonction pour gérer l'ouverture des commentaires
    commentButtons.forEach(button => {
        button.addEventListener('click', () => {
            const commentSection = button.parentElement.nextElementSibling;
            commentSection.style.display = commentSection.style.display === 'block' ? 'none' : 'block';
        });
    });

    // fonction pour gérer les "j'aimes"
    likeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const likeCount = button.nextElementSibling;
            let count = parseInt(likeCount.textContent);
            if (button.classList.contains('liked')) {
                count--;
                button.classList.remove('liked');
            } else {
                count++;
                button.classList.add('liked');
            }
            likeCount.textContent = count;
        });
    });

    // fontion pour gérer les "j'aime" des commentaires
    likeCommentButtons.forEach(button => {
        button.addEventListener('click', () => {
            const likeCount = button.nextElementSibling;
            let count = parseInt(likeCount.textContent);
            if (button.classList.constains('liked')) {
                count--;
                button.classList.remove('liked');
            } else {
                count++;
                button.classList.add('liked');
            }
            likeCount.textContent = count;
        });
    });
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