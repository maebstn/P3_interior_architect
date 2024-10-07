//URL de l'API
const apiUrl3 = 'http://localhost:5678/api/users/login';

const bouton = document.querySelector('#submit');
const email = document.querySelector('#email');
const mdp = document.querySelector('#mdp');

//Aucun message d'erreur n'est encore affiché
let errorCheck = false;

bouton.addEventListener('click', submitClick);

function submitClick(event) {
	event.preventDefault();

	fetch(apiUrl3, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-type': 'application/json',
		},
		body: JSON.stringify({
			email: email.value,
			password: mdp.value,
		}),
	})
		.then((r) => {
			if (r.ok) {
				return r.json();
			} else {
				throw new Error('Erreur serveur', { cause: r });
			}
		})
		.then((reponse) => {
			localStorage.setItem('token', reponse.token);
			const trueMessage = document.createElement('p');
			const divForm = document.querySelector('#login');
			divForm.appendChild(trueMessage);

			trueMessage.style.color = 'green';
			count();
		})

		.catch((e) => {
			if (!errorCheck) {
				errorCheck = true;
				const errorMessage = document.createElement('p');
				const divForm = document.querySelector('#login');
				divForm.appendChild(errorMessage);
				errorMessage.setAttribute('data-error', 'true');

				errorMessage.innerText =
					"L'identifiant et/ou le mot de passe est incorrect.";
				errorMessage.style.color = 'red';

				email.style.border = '1px solid red';
				mdp.style.border = '1px solid red';

				email.addEventListener('click', removeErrorMessage);
				mdp.addEventListener('click', removeErrorMessage);
			} else {
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
