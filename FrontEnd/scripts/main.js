// URL de l'API
const apiUrl = 'http://localhost:5678/api/works';
const apiUrl2 = 'http://localhost:5678/api/categories';

// Utilisation de fetch pour faire une requête GET
fetch(apiUrl)
	.then((response) => {
		if (!response.ok) {
			throw new Error('Une erreur est survenue : ' + response.statusText);
		}
		return response.json(); // Conversion en JSON
	})
	.then((data) => {
		data.forEach((element) => {
			// Créer les éléments
			const figure = document.createElement('figure');
			const figcaption = document.createElement('figcaption');
			const imagejavascript = document.createElement('img');

			// Assigner les valeurs aux éléments
			figcaption.innerText = element.title;
			imagejavascript.src = element.imageUrl;
			imagejavascript.alt = element.title; // Ajouter un attribut alt pour l'accessibilité

			// Ajouter les éléments à la figure
			figure.append(imagejavascript, figcaption);

			// Ajouter la figure à la galerie
			document.querySelector('.gallery').appendChild(figure);
		});
	})

	.catch((error) => {
		console.error('Erreur :', error); // Gestion des erreurs
	});

fetch(apiUrl2)
	.then((response) => {
		if (!response.ok) {
			throw new Error('Erreur dans la requête API : ' + response.statusText);
		}
		return response.json(); // Convertir la réponse en JSON
	})
	.then((categories) => {
		// Pour chaque catégorie reçue, créer un bouton
		categories.forEach((category) => {
			const container = document.querySelector('.filters');
			const button = document.createElement('button');
			button.textContent = category.name; // Utilise le nom de la catégorie
			button.classList.add('btn'); // Ajoute une classe pour le style
			button.addEventListener('click', function () {
				alert(`Vous avez sélectionné la catégorie : ${category.name}`);
			});
			container.appendChild(button); // Ajoute le bouton au conteneur
		});
	})
	.catch((error) => {
		console.error('Erreur :', error); // Gestion des erreurs
	});
