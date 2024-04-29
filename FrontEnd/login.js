 //   // Définition des constantes
const form = document.querySelector("form")
let token = localStorage.getItem("token")

// On ecoute l'event lorsque on soumet le formulaire
form.addEventListener("submit", (event) => {
    event.preventDefault()
    // Récupération des valeurs saisies dans username et password
        let form = { 
            email:  document.getElementById("email"),
            password: document.getElementById("password"),
            }

fetch ('http://localhost:5678/api/users/login', {
    method: "POST",
    headers:  {
        "Content-Type": "application/json"},
        // "Authorization": "Bearer "},
    body: JSON.stringify({email: form.email.value, password: form.password.value}),
})
 // Si un des deux champs est vide , on arrête tout et on alerte 
 // Si un des deux champs = une erreur, alors ... -->
.then((response) => {
    if (response.status !== 200) {
        alert("Erreur dans l’identifiant ou le mot de passe")
 // Sinon on appelle la route de login 
    } else {
        response.json()
        .then ((data) => {
            sessionStorage.setItem("token", data.token)
            window.location.replace("index.html")
            })
        }
    })
})

//Info Token
localStorage.setItem("userId", 1)
localStorage.setItem("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcxNDE0ODA4OSwiZXhwIjoxNzE0MjM0NDg5fQ.5wY-jxs-iehNYrqT60Tj4H93BD9RQxlKWq7FCkvuk1U")

