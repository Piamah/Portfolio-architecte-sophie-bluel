
//Affichage et récupération photos Menu Home

const getWorks = ()=> {
    return fetch("http://localhost:5678/api/works")
    .then((res) => res.json())
    .then((promise) => {
        console.log(promise);
    return promise;
    });
};

const afficheWorksHome = (works) => {
    const elementGallery = document.querySelector('.gallery');
    elementGallery.innerHTML = ""

    works.forEach(work => {
        const figure = document.createElement("figure");
        const image = document.createElement("img");
        const figcaption = document.createElement("figcaption");

        image.src = work.imageUrl;
        image.alt = work.title;
        figcaption.textContent = work.title;

        figure.appendChild(image);
        figure.appendChild(figcaption);
        elementGallery.appendChild(figure);
    });
}

getWorks() 
.then(works => {
    afficheWorksHome(works)
}
);

// Affichage et récupération Filtres

async function getCategories (){
    let response = await fetch ("http://localhost:5678/api/categories");
    return await response.json();
}

// const getCategories = () => {
//   return fetch("http://localhost:5678/api/categories")
//       .then((res) => res.json())
//       .then((categories) => {
//         console.log(categories);
//       return categories;
//       });
// };


async function showCategories() {
    const filters = document.getElementsByClassName("filtres")
    const categories = await getCategories()
    console.log(categories)
    categories.forEach((categorie) => {
        const button= document.createElement("button")
        button.textContent = categorie.name;
        console.log(categorie.name)
        // filters.appendChild(button)
    })
}

showCategories()


// const afficheFiltres = (filtres) => {
//   const elementFiltres = document.querySelector(".filtres");
//   elementFiltres.innerHTML = "";

//   filtres.forEach(filtre => {
//     const button = document.createElement('button');
//     button.id = filtre.id;
//     button.textContent = filtre.label;
//     button.addEventListener("click", () => {
//       // Action à effectuer lorsqu'un filtre est cliqué, par exemple filtrer les projets en fonction de ce filtre
//       filterWorksByFiltre(filtre.id);
//     });
//     elementFiltres.appendChild(button);
//   });
// }

// getFiltres()
//     .then(filtres => {
//         afficheFiltres(filtres);
//     });
