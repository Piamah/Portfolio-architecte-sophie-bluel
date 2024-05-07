//   // Définition des constantes
const form = document.querySelector("form")


// On ecoute l'event lorsque on soumet le formulaire
form.addEventListener("submit", (event) => {
    event.preventDefault()

    // Récupération des valeurs saisies dans username et password
    const email = document.getElementById("email").value
    const password = document.getElementById("password").value
    
    if (email ==="" || password ===""){
        alert("Merci de remplir tous les champs")
    } else {
        fetch ('http://localhost:5678/api/users/login', {
        method: "POST",
        headers:  {
        "Content-Type": "application/json"},
        body: JSON.stringify({email: email, password: password}),
    })
    .then (response => response.json())
    .then (data => {
        if (data.token) {
            localStorage.setItem("token", data.token)
            window.location ="index.html"
        }else{
            alert("Erreur dans l’identifiant ou le mot de passe")
        }
    })
    // Erreur quelconque venant du serveur (gère toutes les erreurs possibles)
    .catch(error => {
        console.log("Erreur dans la réponse du serveur")
    })
    }

})

// .then((response) => response.json())
// .then((data) => {
//     localStorage.setItem('auth', JSON.stringify(data));
//     const auth = JSON.parse(localStorage.getItem('auth'));
//     if (auth && auth.token) {
//       window.location = "index.html";
//     } else {
//       messageError.style.display = "flex";
//     }
// })
//  .catch((error) => {
//   console.error('Error:', error);
//   alert("Erreur dans l’identifiant ou le mot de passe")
// });
// })
 // Si un des deux champs est vide , on arrête tout et on alerte 
 // Si un des deux champs = une erreur, alors ... -->
