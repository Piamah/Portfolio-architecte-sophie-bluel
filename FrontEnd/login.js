//   // Définition des constantes
const form = document.querySelector("form")
let token = localStorage.getItem("token")

// On ecoute l'event lorsque on soumet le formulaire
form.addEventListener("submit", (event) => {
    event.preventDefault()
    // Récupération des valeurs saisies dans username et password
            email= email.value
            password= password.value
            

fetch ('http://localhost:5678/api/users/login', {
    method: "POST",
    headers:  {
        "Content-Type": "application/json"},
        // "Authorization": "Bearer "},
    body: JSON.stringify({email: form.email.value, password: form.password.value}),
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
.then((response) => {
    if (response.status !== 200) {
        alert("Erreur dans l’identifiant ou le mot de passe")
 // Sinon on appelle la route de login 
    } else {
        response.json()
        .then ((data) => {
            localStorage.setItem("token", data.token)
            window.location.replace("index.html")
            })
        }
    })
})