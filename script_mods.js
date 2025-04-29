// Données de la base de données (simulée)
const data = {
    mods: [
        {
            name: "Galaxy Eyes",
            tags: ["bibo-base", "viera", "eyes"],
            image: "medias/mod1.jpg",
            modder: {
                name: "Tesh'",
                link: "profil.html?id=1"
            }
        },
        {
            name: "Le Passeur",
            tags: ["bibo-base", "midlander", "skin"],
            image: "medias/mod1.jpg",
            modder: {
                name: "Siv",
                link: "profil.html?id=2"
            }
        },
        {
            name: "Tigress",
            tags: ["yab", "miqote", "face"],
            image: "medias/mod3.jpg",
            modder: {
                name: "Mizuki",
                link: "profil.html?id=3"
            }
        },
        {
            name: "PLACE HOLDER",
            tags: ["bibo-base", "aora", "cheveux"],
            image: "medias/mod4.jpg",
            modder: {
                name: "Siv",
                link: "profil.html?id=4"
            }
        },
        {
            name: "PLACE HOLDER",
            tags: ["bibo-base", "aora", "cheveux"],
            image: "medias/mod4.jpg",
            modder: {
                name: "Siv",
                link: "profil.html?id=4"
            }
        },
        {
            name: "PLACE HOLDER",
            tags: ["bibo-base", "aora", "cheveux"],
            image: "medias/mod4.jpg",
            modder: {
                name: "Siv",
                link: "profil.html?id=4"
            }
        },
        {
            name: "PLACE HOLDER",
            tags: ["bibo-base", "aora", "cheveux"],
            image: "medias/mod4.jpg",
            modder: {
                name: "Siv",
                link: "profil.html?id=4"
            }
        },
        {
            name: "PLACE HOLDER",
            tags: ["bibo-base", "aora", "cheveux"],
            image: "medias/mod4.jpg",
            modder: {
                name: "Siv",
                link: "profil.html?id=4"
            }
        },
        {
            name: "PLACE HOLDER",
            tags: ["bibo-base", "aora", "cheveux"],
            image: "medias/mod4.jpg",
            modder: {
                name: "Siv",
                link: "profil.html?id=4"
            }
        },
        {
            name: "PLACE HOLDER",
            tags: ["bibo-base", "aora", "cheveux"],
            image: "medias/mod4.jpg",
            modder: {
                name: "Siv",
                link: "profil.html?id=4"
            }
        },
        {
            name: "PLACE HOLDER",
            tags: ["bibo-base", "aora", "cheveux"],
            image: "medias/mod4.jpg",
            modder: {
                name: "Siv",
                link: "profil.html?id=4"
            }
        },
        {
            name: "PLACE HOLDER",
            tags: ["bibo-base", "aora", "cheveux"],
            image: "medias/mod4.jpg",
            modder: {
                name: "Siv",
                link: "profil.html?id=4"
            }
        },
        {
            name: "PLACE HOLDER",
            tags: ["bibo-base", "aora", "cheveux"],
            image: "medias/mod4.jpg",
            modder: {
                name: "Siv",
                link: "profil.html?id=4"
            }
        },
    
    ],
    filters: {
        "body-type": ["bibo-base", "yab", "rue", "gen3", "eve", "t&f", "tbse", "tbse-x", "hrbody"],
        "race": ["midlander", "highlander", "miqote", "aora", "elezen", "lalafell", "viera", "hrothgar"],
        "body-part": ["tail", "ear", "horn", "hair", "eyes", "makeup"],
        "gear": ["armor", "clothes", "weapon"],
        "other": ["furniture", "mount", "minion", "vfx", "animation", "housing"],
    }
};

const modsPerPage = 12; // Nombre de mods par page
let currentPage = 1; // Page courante

// Fonction pour créer des filtres
function createFilters(filterData, containerId) {
    const container = document.getElementById(containerId);
    for (const filterGroup in filterData) {
        const group = document.createElement('div');
        group.className = 'filter-group';
        const label = document.createElement('label');
        label.textContent = filterGroup.charAt(0).toUpperCase() + filterGroup.slice(1);
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = filterGroup;
        label.prepend(checkbox);
        group.appendChild(label);

        const subFilter = document.createElement('div');
        subFilter.className = 'sub-filter';
        for (const filter of filterData[filterGroup]) {
            const subGroup = document.createElement('div');
            subGroup.className = 'sub-filter-group';
            const subLabel = document.createElement('label');
            const subCheckbox = document.createElement('input');
            subCheckbox.type = 'checkbox';
            subCheckbox.name = 'filter';
            subCheckbox.value = filter;
            subLabel.textContent = filter.charAt(0).toUpperCase() + filter;
            subLabel.prepend(subCheckbox);
            subGroup.appendChild(subLabel);
            subFilter.appendChild(subGroup);
        }
        group.appendChild(subFilter);
        container.appendChild(group);
    }
}

// Fonction pour créer les cartes de mods
function createModCards(modData) {
    const container = document.querySelector('.mods-grid');
    container.innerHTML = ''; // Effacer le contenu précédent

    const startIndex = (currentPage - 1) * modsPerPage;
    const endIndex = Math.min(startIndex + modsPerPage, modData.length);

    for (let i = startIndex; i < endIndex; i++) {
        const mod = modData[i];
        const card = document.createElement('div');
        card.className = 'mod-card';
        const image = document.createElement('img');
        image.src = mod.image;
        image.alt = mod.name;
        card.appendChild(image);
        const name = document.createElement('h3');
        name.textContent = mod.name;
        card.appendChild(name);
        const modderLink = document.createElement('a');
        modderLink.href = mod.modder.link;
        modderLink.textContent = mod.modder.name;
        card.appendChild(modderLink);
        const tags = document.createElement('div');
        tags.className = 'tags';
        for (const tag of mod.tags) {
            const tagElement = document.createElement('span');
            tagElement.className = 'tag';
            tagElement.textContent = '#' + tag;
            tags.appendChild(tagElement);
        }
        card.appendChild(tags);
        container.appendChild(card);
    }
}

// Fonction pour mettre à jour la pagination
function updatePagination(mods) {
    const pagination = document.querySelector('.pagination');
    pagination.innerHTML = '';

    const totalPages = Math.ceil(mods.length / modsPerPage);

    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement('button');
        button.textContent = i;
        button.addEventListener('click', () => {
            currentPage = i;
            displayMods(mods);
            updatePagination(mods);
        });
        if (i === currentPage) {
            button.classList.add('active');
        }
        pagination.appendChild(button);
    }
}

// Fonction pour trier les mods par date (du plus récent au plus ancien)
function sortModsByDate(mods) {
// Ici -> Mettre la logique de tri
    return mods;
}

// Créer les filtres
createFilters(data.filters, 'body-type-filter');
createFilters(data.filters, 'race-filter');
createFilters(data.filters, 'body-part-filter');
createFilters(data.filters, 'gear-filter');
createFilters(data.filters, 'other-filter');

// Afficher tous les mods au chargement de la page (triés par date)
const sortedMods = sortModsByDate(data.mods);
displayMods(sortedMods);
updatePagination(sortedMods);

// Code pour gérer les filtres
const form = document.getElementById('filter-form');
const checkboxes = form.querySelectorAll('input[type="checkbox"]');
const modCards = document.querySelectorAll('.mod-card');

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const selectedFilters = Array.from(checkboxes)
        .filter(checkbox => checkbox.checked)
        .map(checkbox => checkbox.value);

    modCards.forEach(card => {
        const cardTags = card.querySelectorAll('.tag');
        const cardTagsArray = Array.from(cardTags).map(tag => tag.textContent.trim().substring(1));

        let shouldShow = false;
        if (selectedFilters.length === 0) {
            shouldShow = true;
        } else {
            for (const filter of selectedFilters) {
                if (cardTagsArray.includes(filter)) {
                    shouldShow = true;
                    break;
                }
            }
        }

        if (shouldShow) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
});