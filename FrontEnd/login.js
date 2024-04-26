 //   // Définition des constantes 
let emailInput = document.getElementById("emailUser")
let passwordInput = document.getElementById("passwordUser")
let email = emailInput.value
let password = passwordInput.value
let message = []
console.log(email)
// Mettre les autres valeurs ici ? .log => 0

const login = (form)=> {
    fetch ('http://localhost:5678/api/users/login', {
        method: "POST",
        headers:  {
            "Content-Type": "application/json"},
            // "Authorization": "Bearer "},
        body: JSON.stringify({email, password}),
    })
        form.addEventListener("submit", event => {
            event.preventDefault()

        //     // Récupération des valeurs saisies dans username et password

            if(email === null || email === '' && password ==null || password === '') {
                message.push("Erreur dans l’identifiant ou le mot de passe")
                return

            }else{

                login()
            }
            
        })
}

localStorage.setItem("userId", 1)
localStorage.setItem("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcxNDE0ODA4OSwiZXhwIjoxNzE0MjM0NDg5fQ.5wY-jxs-iehNYrqT60Tj4H93BD9RQxlKWq7FCkvuk1U")

// Quand les 2 sont incorrects : Erreur dans l’identifiant ou le mot de passe

//     // Si un des deux champs est vide , on arrête tout et on alerte

//     // Sinon on appelle la route de login en faisant attention
// à la manière dont on passe les infos

//     // S'il y a un soucis avec la réponse de l'API, on prévient
// l'utilisateur
//     // Si tout s'est bien passé, on récupère le token renvoyé
// par l'API, on le stocke dans le localstorage, et on redirige
// vers index.html

// 

// En suivant la maquette, intégrer le formulaire de connexion au site. 

// Lorsque le couple identifiant et mot de passe n’est pas bon pour se
//  connecter il faut afficher le message d’erreur: 

// “Erreur dans l’identifiant ou le mot de passe”

// Lorsque le couple identifiant et mot de passe est correct. 

// Alors il faut rediriger vers la page du site avec cette fois 
// ci des boutons d’actions pour éditer le site.