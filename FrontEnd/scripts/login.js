//URL de l'API
const apiUrl3 = 'http://localhost:5678/api/users/login';

const bouton = document.querySelector('#submit');
const email = document.querySelector('#email');
const mdp = document.querySelector('#mdp');

//Aucun message d'erreur n'est encore affiché
let errorCheck = false;

bouton.addEventListener('click', submitClick);

function submitClick(event) {
	event.preventDefault(); // Empêche le rechargement de la page lors de la soumission du formulaire
	fetch(apiUrl3, {
		// Envoi des données à l'API via une requête POST
		method: 'POST',
		headers: {
			Accept: 'application/json', // Indique que la réponse attendue est au format JSON
			'Content-type': 'application/json', // Indique que les données envoyées sont au format JSON
		},
		body: JSON.stringify({
			// Transforme les données en chaîne JSON
			email: email.value, // Valeur de l'input email
			password: mdp.value, // Valeur de l'input mot de passe
		}),
	})
		.then((r) => {
			// Vérifie si la requête a réussi
			if (r.ok) {
				return r.json(); // Si oui, retourne la réponse au format JSON
			} else {
				throw new Error('Erreur serveur', { cause: r }); // Si non, lance une erreur avec les détails de la réponse
			}
		})
		.then((reponse) => {
			// Traitement de la réponse en cas de succès
			localStorage.setItem('token', reponse.token); // Stocke le token dans le localStorage
			// Crée un message de succès
			const trueMessage = document.createElement('p');
			const divForm = document.querySelector('#login'); // Sélectionne la div contenant le formulaire
			divForm.appendChild(trueMessage); // Ajoute le message de succès à la div

			trueMessage.style.color = 'green';
			count(); // Appelle la fonction du compte à rebours
		})

		.catch((e) => {
			// Gestion des erreurs
			if (!errorCheck) {
				// Vérifie si un message d'erreur est déjà affiché
				errorCheck = true; // Bloque l'affichage d'autres messages d'erreur

				// Crée un message d'erreur
				const errorMessage = document.createElement('p');
				const divForm = document.querySelector('#login');
				divForm.appendChild(errorMessage);
				errorMessage.setAttribute('data-error', 'true'); // Ajoute un attribut pour identifier l'erreur

				errorMessage.innerText =
					"L'identifiant et/ou le mot de passe est incorrect.";
				errorMessage.style.color = 'red';

				email.style.border = '1px solid red';
				mdp.style.border = '1px solid red';

				// Ajoute des événements pour supprimer le message d'erreur en cliquant sur les champs
				email.addEventListener('click', removeErrorMessage);
				mdp.addEventListener('click', removeErrorMessage);
			} else {
				// Si un message d'erreur est déjà présent, ne fait rien
				return;
			}
		});
}

function removeErrorMessage() {
	const existingErrorMessage = document.querySelector('[data-error="true"]');
	if (existingErrorMessage) {
		existingErrorMessage.remove(); // Supprime le message d'erreur
		email.style.border = '1px solid #ccc'; // Réinitialise la bordure des champs
		mdp.style.border = '1px solid #ccc';
		errorCheck = false; // Réinitialise la variable d'erreur

		//Supprimer l'écouteur une fois que l'erreur est supprimée
		email.removeEventListener('click', removeErrorMessage);
		mdp.removeEventListener('click', removeErrorMessage);
	}
}

function count() {
	// Durée du compte à rebours en secondes
	let countdownTime = 3;

	// Fonction pour mettre à jour le texte du compte à rebours
	const countP = document.createElement('p');
	const divCount = document.querySelector('#login');
	divCount.appendChild(countP);
	countP.setAttribute('id', 'countdown');
	const countdownElement = document.getElementById('countdown');
	countdownElement.style.color = 'green';

	// Mise à jour du texte et démarrage du compte à rebours
	const interval = setInterval(() => {
		if (countdownTime > 0) {
			countdownElement.textContent = `Identification réussie. Redirection dans ${countdownTime} secondes.`;
			countdownTime--;
		} else {
			// Arrêter le compte à rebours
			clearInterval(interval);
			// Redirection vers une autre page
			window.location.href = 'index.html';
		}
	}, 1000);
}

//Redirection vers page principale en appuyant sur le logo
let mainPage = document.querySelector('h1');
mainPage.addEventListener('click', function () {
	window.location.href = 'index.html';
});
