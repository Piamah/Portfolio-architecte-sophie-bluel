//************** MODALE 1 **************

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
    modal.querySelector(".close-btn").addEventListener("click", closeModal)
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
    modal.querySelector(".close-btn").removeEventListener("click", closeModal)
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

// ************** MODALE 2 **************

//Création de modale 2 (AJOUT PHOTO)
const openModal2 = function (e) {
    e.preventDefault()
    const target2 = document.getElementById("modal2")
    target2.style.display = null
    target2.removeAttribute("aria-hidden")
    target2.setAttribute("aria-modal", "true")
    modal = target2
    // Clic en dehors des modales pour les fermer
    modal.addEventListener("click", closeModal)
    modal.querySelector(".close-btn").addEventListener("click", closeModal)
    modal.querySelector(".js-modal-stop").addEventListener("click", stopPropagation)
}

document.querySelectorAll(".js-modal").forEach(a => {
    a.addEventListener("click", openModal)
})

//Fonctions pour cacher les modales
const ajoutImage = document.querySelector(".add-photo")
    ajoutImage.addEventListener("click", openModal2)

const allModals = document.querySelector(".modal")
const modal2 = document.querySelector("#modal2")


function hideModal() {
    allModals.style.display = "none"
}

function hideModal2 () {
    modal2.style.display = "none"
}

//Constantes de la structure interne modales pour affichage
const modal1Content = document.querySelector("#modal1")
const modalPhoto = document.querySelector("#add-photo-modal")
const addPhotoBtn = document.querySelector("#add-photo-btn")
const backBtn = document.querySelector("#back-first-modal")
const closeBtn = document.querySelector("#close-btn")
const closeBtn1 = document.querySelector("#close-btn1")

// Gestion de l'affichage de la modale 
addPhotoBtn.addEventListener("click", function() {
    modal1Content.style.display = "none"
    modalPhoto.style.display = "flex"
})

backBtn.addEventListener("click", function(){
  modal1Content.style.display = "flex"
  modalPhoto.style.display = "none"
})

closeBtn.addEventListener("click", closeModalBtn)
closeBtn1.addEventListener("click", closeModalBtn)
backBtn.addEventListener("click", hideModal2)

function closeModalBtn () {
    allModals.style.display ="none"
    modal1Content.style.display = "none"
    modalPhoto.style.display = "none"
    document.getElementById("modal1").setAttribute("aria-hidden", "true")
    document.getElementById("modal2").setAttribute("aria-hidden", "true")
    document.getElementById("modal2").removeAttribute("aria-modal")
    document.getElementById("modal2").style.display = "none"
}

// Affichage des projets et des poubelles
const worksModal = (works) => {
    const imagesModal = document.querySelector(".modalContent")
    imagesModal.innerHTML = ""

    works.forEach(work => {
        const figure = document.createElement("figure")
        const figureImage = document.createElement("img")
        const trashIcon = document.createElement("i") 
              
        figureImage.src = work.imageUrl
        figureImage.alt = work.title
        trashIcon.className = "fa-regular fa-trash-can" 
      
        figure.appendChild(figureImage)
        figure.appendChild(trashIcon)
      
        // Gestion du bouton suppression projet (poubelles)
        trashIcon.addEventListener("click", (e) => {
          e.preventDefault()
          const workId = figure.getAttribute("data-id")
          deleteWorkId(work.id, figure)
        })
        imagesModal.appendChild(figure)
    })
}

getWorks() 
.then(works => {
    worksModal(works)
})

//Fonction de suppression du travail en fonction de son ID
function deleteWorkId(workId, figureElement) {
    console.log(workId);
    const confirmation = confirm("Voulez vous vraiment supprimer ce projet?")
    if (confirmation) {
        const token = localStorage.getItem("token")
      fetch(`http://localhost:5678/api/works/${workId}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
            "Accept" : "application/json"
        }
      })
      .then ((res) => {
        if (res.ok) {
            getWorks() 
                .then(works => {
                    afficheWorksHome(works)
                    worksModal(works)
                })
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

//Ajouter les catégories dans le formulaire
const selectCategory = function (categories) {
    const categorySelect = document.getElementById("categoryModalPic")
    categorySelect.innerHTML = ""
    // Ajout d'un champ vide
    const emptyField = document.createElement("option")
    emptyField.value = ""
    emptyField.innerText = ""
    emptyField.selected = true
    categorySelect.appendChild(emptyField)
    //Affichage des catégories
    categories.forEach((category) => {
        const option = document.createElement("option")
        option.value = category.id
        option.innerText = category.name
        categorySelect.appendChild(option)
    });
}

getCategories()
    .then (categories => {
        selectCategory(categories)
    })


//Prévisualisation de l'image de la modale 2
document.getElementById("add-photo2").addEventListener("change", function(e) {
    const file = e.target.files[0]
    if (file) {
        const reader = new FileReader()
        reader.onload = function (e) {
            const preview = document.getElementById("preview")
            const icon = document.getElementById("imageMod2")
            const label = document.getElementById("labelImageM2")
            const txt = document.querySelector(".addPicZone p")
            const previewPhotoLabel = document.querySelector(".preview-picture")

            preview.src = e.target.result
            preview.style.display = "block"
            previewPhotoLabel.style.display = "block"

            // Cacher les éléments quand prévisualisation
            icon.style.display ="none"
            label.style.display ="none"
            txt.style.display ="none"
        }
        reader.readAsDataURL(file)
    }    
})

//Reset du formulaire

function resetForm () {
    document.getElementById("add-photo-form").reset ()
    const preview = document.getElementById("preview")
    preview.src=""
    preview.style.display ="none"

    const previewPhotoLabel = document.querySelector(".preview-picture")
    previewPhotoLabel.style.display = "none"

    //Réaffichage des éléments lorsque réinitialisation
    const icon = document.getElementById("imageMod2")
    const label = document.getElementById("labelImageM2")
    const txt = document.querySelector(".addPicZone p")

    icon.style.display ="flex"
    label.style.display ="flex"
    txt.style.display ="flex"
    
    const submitBtnM2 = document.getElementById("valider")
    submitBtnM2.style.backgroundColor =""
}

document.getElementById("close-btn").addEventListener("click", resetForm)
document.getElementById("back-first-modal").addEventListener("click", resetForm)
document.getElementById("close-btn1").addEventListener("click", resetForm)

//Appeler filledForm chaque fois qu'un champ est rempli dans formulaire &
//récupération des valeurs du formulaire
const filledForm = function () {
    const title = document.getElementById ("titleModalPic").value
    const category = document.getElementById ("categoryModalPic").value
    const file = document.getElementById ("add-photo2").files[0]
    const submitBtnM2 = document.getElementById ("valider")

    //Vérification des champs
    if (title !== "" && category !== "" && file) {
        submitBtnM2.style.backgroundColor = "#1D6154"
    }else {
        submitBtnM2.style.backgroundColor = ""
    }
}

//Ecouteur des champs pour la nouvelle photo de la modale 2
document.getElementById("titleModalPic").addEventListener("input", filledForm)
document.getElementById("categoryModalPic").addEventListener("change", filledForm)
document.getElementById("add-photo2").addEventListener("change", filledForm)

//Ajout de la nouvelle photo et écouteur du bouton valider
document.getElementById("valider").addEventListener("click", function(e) {
    e.preventDefault()

    const token = localStorage.getItem("token")
    const title = document.getElementById("titleModalPic").value
    const category = document.getElementById("categoryModalPic").value
    const file = document.getElementById("add-photo2").files[0]

    if(!title || !category || !file) {
        alert("Merci de remplir tous les champs du formulaire")
        return
    }

    if (file.size > 4 * 1024 * 1024) {
        alert("La taille de l'image ne doit pas dépasser 4Mo.")
        return
    }

//Ajout de la nouvelle photo dans la liste des works
//Créer un nouveau work
const formData = new FormData ()
formData.append("title", title)
formData.append("category", category)
formData.append("image", file)

// l'envoyer au serveur
fetch("http://localhost:5678/api/works", {
    method: "POST",
    headers: {
        Authorization: `Bearer ${token}`
    },
    body: formData
})
.then ((res) => {
    if (res.ok) {
        return res.json()
    } else {
        alert("Erreur lors de l'ajout du projet")
    }
})
//Mettre à jour les données et l'affichage des works
.then ((newWork) => {
    getWorks()
    .then (works => {
        afficheWorksHome(works)
        worksModal(works)
    })
        resetForm()
        closeModalBtn()
    })
})