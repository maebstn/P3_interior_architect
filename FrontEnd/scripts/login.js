//URL de l'API
const apiUrl3 = 'http://localhost:5678/api/users/login';

const bouton = document.querySelector('#submit');
const email = document.querySelector('#email');
const mdp = document.querySelector('#mdp');

bouton.addEventListener('click', submitClick);

function submitClick(event) {
	event.preventDefault();
	console.log(email.value);
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
			const errorMessage = document.createElement('p');
			const divForm = document.querySelector('#login');
			divForm.appendChild(errorMessage);

			errorMessage.innerText =
				"L'identifiant et/ou le mot de passe est incorrect.";
			errorMessage.style.color = 'red';

			email.style.border = '1px solid red';
			mdp.style.border = '1px solid red';
		});
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
