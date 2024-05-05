//Affichage et récupération photos Menu Home

const getWorks = ()=> {
    return fetch("http://localhost:5678/api/works")
    .then((res) => res.json())
    .then((promise) => {
        console.log(promise)
    return promise
    });
};

const afficheWorksHome = (works) => {
    const elementGallery = document.querySelector('.gallery')
    elementGallery.innerHTML = ""

    works.forEach(work => {
        const figure = document.createElement("figure")
        const image = document.createElement("img")
        const figcaption = document.createElement("figcaption")

        image.src = work.imageUrl
        image.alt = work.title
        figcaption.textContent = work.title

        figure.appendChild(image)
        figure.appendChild(figcaption)
        elementGallery.appendChild(figure)
    });
}

getWorks() 
.then(works => {
    afficheWorksHome(works)
}
);

// Affichage et récupération Filtres

const getCategories = () => {
  return fetch("http://localhost:5678/api/categories")
      .then((res) => res.json())
      .then((categories) => {
        console.log(categories);
      return categories;
      });
};


const filters = document.querySelector(".filtres")

// On crée un bouton "Tous"
const boutonTous = document.createElement("button")
 // On lui met le texte "Tous"
boutonTous.innerText = "Tous"
// On met un addEventListener sur le clic de ce bouton "Tous"

boutonTous.addEventListener("click", function() {
    // On appelle la fonction getWorks()
    getWorks()
    // Dans le .then , on appelle la fonction afficheWorksHome en passant en paramètre les works obtenus
    .then (works => {
        afficheWorksHome(works)
    })
});

 // On l'insère dans filters
filters.appendChild(boutonTous)

/* On crée les boutons pour chaque catégorie dans la base de données */

const getWorksFiltered = (id) => {
    return fetch("http://localhost:5678/api/works")
        .then((res) => res.json())
        .then((works) => {
            const worksFiltered = works.filter (function(work) {
                return work.category.id === id
            })
        return worksFiltered
        })
  }

// On appelle getCategories()
getCategories()
// Dans le .then, on boucle sur chaque catégorie
  .then(categories => {
    // Pour chaque catégorie trouvée, on crée un bouton
    categories.forEach(categorie => {
        const bouton = document.createElement("button")
        // On lui met comme texte le nom de la catégorie
        bouton.textContent = categorie.name

        filters.appendChild(bouton)
        // On met un addEventListener sur le clic de ce bouton
        bouton.addEventListener("click", function(){
            // On appelle la fonction getWorksFiltered en passant en paramètre le nom de la catégorie
            getWorksFiltered(categorie.id)
            // Dans le .then , on appelle la fonction afficheWorksHome en passant en paramètre les works obtenus
            .then(works => {
                afficheWorksHome(works)
            })
        })
      })
    })


// Contact section


// PARTIE ADMIN

//Déclaration des variables
let token = localStorage.getItem("token")
// console.log(token)
const log = document.getElementById("btnLogin")
const editionMode = document.querySelector(".edition")
const modifProjet = document.querySelector(".modifProjet")
const modalsPhotos = document.querySelector(".modals")

if (token) {
    filters.style.display="none"
    log.innerText="logout"
} else {
    editionMode.style.display="none"
    modifProjet.style.display="none"
    modalsPhotos.style.display="none"
}

//Déconnexion
const logout = () => {
    localStorage.removeItem("token")
    window.location.replace("login.html")
}

log.addEventListener("click", () => {
    logout()
})

//Mode edition affichage