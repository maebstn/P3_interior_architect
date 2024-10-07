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

// Attendre que le DOM soit chargé
document.addEventListener('DOMContentLoaded', function () {
	let identificationLogin = document.querySelector('.identification');
	identificationLogin.addEventListener('click', function () {
		window.location.href = 'login.html';
	});
});
