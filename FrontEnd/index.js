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


//Création boîte modale 1 (SUPPRIMER PROJETS)
let modal = null 

const openModal = function (e) {
    e.preventDefault()
    const target = document.querySelector(e.target.getAttribute ("href"))
    target.style.display = null
    target.removeAttribute("aria-hidden")
    target.setAttribute("aria-modal","true")
    modal = target
    modal.addEventListener("click", closeModal)
    modal.querySelector(".js-modal-close").addEventListener("click", closeModal)
    modal.querySelector(".js-modal-stop").addEventListener("click", stopPropagation)
}

//Nettoyage boîte modale
const closeModal = function (e) {
    if (modal === null) return
    e.preventDefault()
    modal.style.display = "none"
    modal.setAttribute("aria-hidden", "true")
    modal.removeAttribute("aria-modal")
    modal.removeEventListener("click", closeModal)
    modal.querySelector(".js-modal-close").removeEventListener("click", closeModal)
    modal.querySelector(".js-modal-stop").removeEventListener("click", stopPropagation)
    modal = null
}

const stopPropagation = function (e) {
    e.stopPropagation()
}

document.querySelectorAll(".js-modal").forEach(a => {
    a.addEventListener("click", openModal)

})

//Ecoute du bouton echap to close

window.addEventListener("keydown", function (e) {
    if (e.key === "Escape" || e.key === "Esc") {
        closeModal(e)
    }
})

//Création de modale 2 (AJOUT PHOTO)

const openModal2 = function (e) {
    e.preventDefault()
    const target2 = document.getElementById("modal2")
    target2.style.display = null
    target2.removeAttribute("aria-hidden")
    target2.setAttribute("aria-modal", "true")
    modal = target2
    modal.addEventListener("click", closeModal)
    modal.querySelector(".js-modal-close").addEventListener("click", closeModal)
    modal.querySelector(".js-modal-stop").addEventListener("click", stopPropagation)
}


const stopPropagation2 = function (e) {
    e.stopPropagation2()
}

document.querySelectorAll(".js-modal").forEach(a => {
    a.addEventListener("click", openModal)

})

const ajoutImage = document.querySelector(".add-photo")
    ajoutImage.addEventListener("click", openModal2)



    // TEST //
const allModals = document.querySelector(".modals")
function hideModal() {
    allModals.overflow = "none"
    }

//Constantes de la structure interne modales //
const modal1Content = document.querySelector("#modal1")
const modalPhoto = document.querySelector("#add-photo-modal")
const addPhotoBtn = document.querySelector("#add-photo-btn")
const backBtn = document.querySelector("#back-first-modal")
const closeBtn = document.querySelector("#close-btn")

// Gestion de l'affichage de la modale 
addPhotoBtn.addEventListener("click", function() {
  modal1Content.style.display = "none"
  modalPhoto.style.display = "block"
})

backBtn.addEventListener("click", function(){
  modal1Content.style.display = "flex"
  modalPhoto.style.display = "none"
})

closeBtn.addEventListener("click", hideModal)

//Ne comprends pas pq flèche ferme pas modale 1 

// HERE DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD
const imagesModal = document.querySelector(".modalContent")

function worksModal(work) {
  const figure = document.createElement("figure")
  const figureImage = document.createElement("img")
  const trashIcon = document.createElement("i") 
        
  figureImage.src = work.imageUrl
  figureImage.alt = work.title
  figure.setAttribute("data-id", work.id)
  trashIcon.className = "fa-regular fa-trash-can" 

  figure.appendChild(figureImage)
  figure.appendChild(trashIcon)

  // Gestion bouton suppression projet
  trashIcon.addEventListener("click", (e) => {
    e.preventDefault()
    deleteWorkId(work.id, figure)
  })
  return figure
}

fetch("http://localhost:5678/api/works")
  .then((response) => response.json())
  .then((data) => {
    data.forEach((work) => {
      const figure = worksModal(work)
      imagesModal.appendChild(figure)
    })
  })
  .catch((error) => {
    console.error("Erreur lors de la récupération des travaux:", error)
  })

//   FAIRE FONCTION DELETEWORKID
function deleteWorkId(worksId, figureElement) {
    const confirmation = confirm("Voulez vous vraiment supprimer ce projet?")
    if (confirmation) {
      fetch(`http://localhost:5678/api/works/${worksId}`, {
        method: "DELETE",
        headers: {
            authorization: `Bearer ${token}`,
            "Accept" : "application/json"
        }
      })
      .then ((response) => {
        if (response.ok) {
            alert("Vous avez bien supprimé le projet sélectionné")
            figureElement.remove()
        } else {
            alert("Erreur lors de la suppression du projet sélectionné")
        }
      })
      .catch((error) => {
        console.error(error)
        alert("Une erreur s'est produite lors de la suppression du projet sélectionné")
      })
    }   
}

// Champs de la modale 2

// Titre/catégorie/image/btn

const titleInputM2 = document.getElementById ("titleModalPic") 
const categorySelectM2 = document.getElementById ("categoryModalPic") 
const imageSelectM2 = document.getElementById ("add-photo2")
const submitBtnM2 = document.getElementById ("valider")

function filledForm () {
    if (titleInputM2.value !== "" && categorySelectM2.value !== "" && imageSelectM2.value !== "") {
        submitBtnM2.style.backgroundColor ="1D6154"
    }else{
        submitBtnM2.style.backgroundcolor = ""
    }
}

// VERIFIER LES CATEGORIES, PB L326
const selectCategory = function () {
document.getElementById("#categoryModalPic").innerHTML =""
option = document.querySelector("option")
document.getElementById("categoryModalPic").appendChild(option)

categories.forEach((category) => {
    option = document.createElement("option")
    option.value = category.name
    option.innerText = category.name
    option.id = category.id
    document.querySelector("#categoryModalPic").appendChild(option)
})
}


//Ajout de la nouvelle photo

submitBtnM2.addEventListener("click", addPicture)

function addPicture (e) {
    e.preventDefault()

    const token = sessionStorage.getItem("token")

    const title = document.getElementById("titleModalPic").value
    const category = document.getElementById("categoryModalPic").value
    const file = document.getElementById("add-photo2").files[0]

    // Est-ce qu'il faut préciser qu'on ne peut ajouter qu'un seul fichier
    //  à la fois? image.length>1 X / === 1 OK?
    if(!title || !category || !file) {
        alert("Merci de remplir tous les champs du formulaire")
        return
    }

    if (file.size > 4 * 1024 * 1024) {
        alert("La taille de l'image ne doit pas dépasser 4Mo.")
        return
      }

}