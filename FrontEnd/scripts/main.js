// URL de l'API
const apiUrl = 'http://localhost:5678/api/works'; // URL pour récupérer les œuvres
const apiUrl2 = 'http://localhost:5678/api/categories'; // URL pour récupérer les catégories

// Utilisation de fetch pour récupérer les œuvres
fetch(apiUrl)
	.then((response) => {
		// Vérifie si la réponse de l'API est correcte
		if (!response.ok) {
			// Si la réponse est incorrecte, lance une erreur avec le message de statut
			throw new Error('Une erreur est survenue : ' + response.statusText);
		}
		return response.json(); // Conversion de la réponse en format JSON
	})
	.then((data) => {
		const gallery = document.querySelector('.gallery'); // Sélection élément HTML pour la galerie
		data.forEach((element) => {
			// Pour chaque œuvre dans les données
			// Création :
			const figure = document.createElement('figure'); // Élément figure pour l'œuvre
			const figcaption = document.createElement('figcaption'); // Élément pour le titre de l'œuvre
			const image = document.createElement('img'); // Élément pour l'image de l'œuvre

			// Assigner les valeurs aux éléments créés
			figcaption.innerText = element.title; // Définit le texte du titre de l'œuvre
			image.src = element.imageUrl; // Définit la source de l'image
			image.alt = element.title; // Ajoute un attribut alt pour l'accessibilité

			// Ajouter un attribut data-category à la figure
			figure.dataset.category = element.categoryId; // Associe l'ID de la catégorie à l'élément figure

			// Ajout des éléments à la figure
			figure.append(image, figcaption); // Ajoute l'image et le titre à la figure

			// Ajout de la figure à la galerie
			gallery.appendChild(figure); // Ajoute la figure à la galerie
		});
	})
	.catch((error) => {
		console.error('Erreur :', error); // Affiche une erreur dans la console en cas de problème
	});

// Utilisation de fetch pour récupérer les catégories et créer les boutons filtres
fetch(apiUrl2)
	.then((response) => {
		// Vérifie si la réponse de l'API est correcte
		if (!response.ok) {
			// Si réponse est incorrecte, lance une erreur avec le message de statut
			throw new Error('Erreur dans la requête API : ' + response.statusText);
		}
		return response.json(); // Conversion de la réponse en format JSON
	})
	.then((categories) => {
		const container = document.querySelector('.filters'); // Sélection élément HTML pour les filtres

		// Création du bouton "Tous"
		const buttonTous = document.createElement('button'); // Création un bouton
		buttonTous.textContent = 'Tous'; // Définir le texte du bouton
		buttonTous.classList.add('btn'); // Ajout classe CSS au bouton
		container.appendChild(buttonTous); // Ajout du bouton au conteneur des filtres

		// Fonction pour montrer toutes les images lorsque le bouton "Tous" est cliqué
		buttonTous.addEventListener('click', () => {
			document.querySelectorAll('.gallery figure').forEach((figure) => {
				figure.classList.remove('hide'); // Retire la classe 'hide' de toutes les figures pour les montrer
			});
			document
				.querySelectorAll('.filters button')
				.forEach((btn) => btn.classList.remove('active')); // Retire la classe 'active' de tous les boutons de filtre
			buttonTous.classList.add('active'); // Ajoute la classe 'active' au bouton "Tous"
		});

		// Pour chaque catégorie reçue, créer un bouton
		categories.forEach((category) => {
			const button = document.createElement('button'); // Création bouton pour chaque catégorie
			button.textContent = category.name; // Utilise le nom de la catégorie comme texte du bouton
			button.classList.add('btn'); // Ajout une classe CSS au bouton
			button.dataset.category = category.id; // Association de l'ID de la catégorie au bouton

			// Ajouter un événement au clic pour filtrer les images par catégorie
			button.addEventListener('click', () => {
				document.querySelectorAll('.gallery figure').forEach((figure) => {
					// Vérifie si la catégorie de la figure correspond à celle du bouton cliqué
					if (figure.dataset.category === category.id.toString()) {
						figure.classList.remove('hide'); // Si oui, montre l'image
					} else {
						figure.classList.add('hide'); // Sinon, cache l'image
					}
				});
				// Gérer l'état actif des boutons
				document
					.querySelectorAll('.filters button')
					.forEach((btn) => btn.classList.remove('active')); // Retire la classe 'active' de tous les boutons
				button.classList.add('active'); // Ajoute la classe 'active' au bouton cliqué
			});

			container.appendChild(button); // Ajoute le bouton au conteneur
		});
	})
	.catch((error) => {
		console.error('Erreur :', error); // Affiche une erreur dans la console en cas de problème
	});

let identificationLogin = document.querySelector('.identification');
identificationLogin.addEventListener('click', function () {
	window.location.href = 'login.html';
});

async function loginUserPage() {
	const token = localStorage.getItem('token');
	if (token) {
		console.log(token);
		const container = document.querySelector('.filters');
		container.classList.add('hide');

		//Modale
		const modal = document.querySelector('.modal-overlay');
		const closeBtn = document.querySelector('.close-modal-btn');

		async function openModal() {
			modal.classList.remove('hide');
		}

		async function closeModal(e, clickedOutside) {
			if (clickedOutside) {
				if (e.target.classList.contains('modal-overlay'))
					modal.classList.add('hide');
			} else modal.classList.add('hide');
		}

		// Création du bouton "Modifier"
		const buttonModif = document.createElement('button');
		buttonModif.setAttribute('id', 'newbtn');

		// Création de l'icône
		const iconeModifier = document.createElement('i');
		iconeModifier.setAttribute('class', 'fa-regular fa-pen-to-square'); // Utilise FontAwesome ou une autre bibliothèque d'icônes

		// Ajout de l'icône avant le texte
		buttonModif.appendChild(iconeModifier); // Ajoute l'icône dans le bouton
		buttonModif.append(' Modifier'); // Ajoute le texte après l'icône
		buttonModif.classList.add('open-modal-btn');

		// Création de la div pour le titre et le bouton
		const titleButtonDiv = document.createElement('div');
		titleButtonDiv.classList.add('title-button-container'); // Ajout d'une classe pour le style

		// Ajout du titre et du bouton à la div
		const title = document.querySelector('#portfolio h2');
		titleButtonDiv.appendChild(title); // Ajoute le titre à la div
		titleButtonDiv.appendChild(buttonModif); // Ajoute le bouton à la div

		const portfolio = document.querySelector('#portfolio');
		portfolio.insertBefore(titleButtonDiv, portfolio.firstChild);

		// Modification du texte du bouton de login à "logout"
		let identificationLogin = document.querySelector('.identification');
		identificationLogin.innerText = 'logout';

		//Lors du clic sur Logout
		identificationLogin.addEventListener('click', function () {
			// Supprimer le token du localStorage
			localStorage.removeItem('token');
			// Rediriger vers la page de connexion
			window.location.href = 'login.html';
		});
	}
}

// Appelle la fonction immédiatement
loginUserPage();

//Modale
const modal = document.querySelector('.modal-overlay');
const closeBtn = document.querySelector('.close-modal-btn');
const buttonModif = document.querySelector('.open-modal-btn');

async function openModal() {
	modal.classList.remove('hide');
}

async function closeModal(e, clickedOutside) {
	if (clickedOutside) {
		if (e.target.classList.contains('modal-overlay'))
			modal.classList.add('hide');
	} else modal.classList.add('hide');
}

buttonModif.addEventListener('click', openModal);
modal.addEventListener('click', (e) => closeModal(e, true));
closeBtn.addEventListener('click', closeModal);

async function reloadGallery() {
	const gallery = document.querySelector('.modal-content');
	gallery.innerHTML = ''; // Vider la galerie existante

	// Répéter le fetch des données pour récupérer les œuvres mises à jour
	fetch(apiUrl)
		.then((response) => response.json())
		.then((data) => {
			data.forEach((element) => {
				const figure = document.createElement('figure');
				const image = document.createElement('img');
				image.src = element.imageUrl;
				image.alt = element.title;
				figure.appendChild(image);
				gallery.appendChild(figure);
			});
		})
		.catch((error) =>
			console.error('Erreur lors du rechargement de la galerie', error)
		);
}

function modalGallery() {
	fetch(apiUrl)
		.then((response) => {
			// Vérifie si la réponse de l'API est correcte
			if (!response.ok) {
				// Si la réponse est incorrecte, lance une erreur avec le message de statut
				throw new Error('Une erreur est survenue : ' + response.statusText);
			}
			return response.json(); // Conversion de la réponse en format JSON
		})
		.then((data) => {
			const gallery = document.querySelector('.modal-content'); // Sélection élément HTML pour la galerie
			data.forEach((element) => {
				// Pour chaque œuvre dans les données
				// Création :
				const figure = document.createElement('figure'); // Élément figure pour l'œuvre
				const image = document.createElement('img'); // Élément pour l'image de l'œuvre
				const deleteButton = document.createElement('button'); // Elément pour l'icône supprimer
				const deleteIcon = document.createElement('i');

				// Assigner les valeurs aux éléments créés
				image.src = element.imageUrl; // Définit la source de l'image
				image.alt = element.title; // Ajoute un attribut alt pour l'accessibilité

				// Ajouter un attribut data-category à la figure
				figure.dataset.category = element.categoryId; // Associe l'ID de la catégorie à l'élément figure

				//Ajouter class à l'icône supprimer
				deleteIcon.classList.add('fa-solid', 'fa-trash-can');
				deleteButton.appendChild(deleteIcon);

				// Ajout des éléments à la figure
				figure.appendChild(image); // Ajoute l'image et le titre à la figure
				figure.appendChild(deleteButton);

				// Ajout de la figure à la galerie
				gallery.appendChild(figure); // Ajoute la figure à la galerie

				deleteButton.addEventListener('click', function () {
					const resourceId = element.id; // Remplace par l'ID ou la variable qui contient l'ID de la ressource
					const apiUrl3 = `http://localhost:5678/api/works/${resourceId}`; // L'URL de l'API à modifier

					fetch(apiUrl3, {
						method: 'DELETE',
						headers: {
							'Content-Type': 'application/json',
							Authorization: `Bearer ${localStorage.getItem('token')}`,
						},
					})
						.then((response) => {
							if (response.ok) {
								console.log("Suppression de l'oeuvre avec succès");
								reloadGallery();
							} else {
								response.json().then((data) => {
									console.error('Erreur lors de la suppression:', data);
								});
							}
						})
						.catch((error) => console.error('Erreur réseau ou autre', error));
				});
			});

			// Création et ajout de la ligne de séparation dans la modale
			const separator = document.createElement('hr');
			const modalGallery = document.querySelector('.modal-wrapper');
			modalGallery.appendChild(separator);

			// Création et ajout du bouton Ajout photo dans modale
			const submitButton = document.createElement('input');
			submitButton.setAttribute('type', 'submit');
			submitButton.setAttribute('value', 'Ajouter une photo');
			modalGallery.appendChild(submitButton);

			//Quand click sur Ajout photo, ccaher et changer contenu modale
			submitButton.addEventListener('click', function () {
				gallery.style.visibility = 'hidden';
				const modalTitle = document.querySelector('h3');
				modalTitle.textContent = 'Ajouter une photo';
				submitButton.setAttribute('value', 'Valider');
				submitButton.style.background = '#A7A7A7';
			});
		})
		.catch((error) => {
			console.error('Erreur :', error); // Affiche une erreur dans la console en cas de problème
		});
}

modalGallery();
