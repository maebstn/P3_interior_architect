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
		console.log(data);
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

//modalGallery
// Sélection des éléments modale, bouton de fermeture et bouton d'ouverture
const modal = document.querySelector('.modal-overlay');
const closeBtn = document.querySelector('.close-modal-btn');
const buttonModif = document.querySelector('.open-modal-btn');

// Fonction pour ouvrir la modale (retire la classe 'hide' pour la rendre visible)
async function openModal() {
	modal.classList.remove('hide');
}

// Fonction pour fermer la modale si clic en dehors modale
async function closeModal(e, clickedOutside) {
	if (clickedOutside) {
		// Si le clic est en dehors de la modale (sur l'overlay), on la cache
		if (e.target.classList.contains('modal-overlay'))
			modal.classList.add('hide');
	} else modal.classList.add('hide');
}

// Ouvre la modale au clic sur le bouton d'ouverture
buttonModif.addEventListener('click', openModal);

// Ferme la modale si l'utilisateur clique à l'extérieur
modal.addEventListener('click', (e) => closeModal(e, true));

// Ferme la modale en cliquant sur le bouton de fermeture
closeBtn.addEventListener('click', closeModal);

// Fonction pour recharger la galerie d'œuvres après une action
async function reloadGallery(e) {
	const gallery = document.querySelector('.modal-content');
	gallery.innerHTML = ''; // Vider la galerie existante

	// Fetch des œuvres pour mettre à jour la galerie
	fetch(apiUrl)
		.then((response) => response.json())
		.then((data) => {
			data.forEach((element) => {
				// Création des éléments figure et image pour chaque œuvre
				const figure = document.createElement('figure');
				const image = document.createElement('img');
				image.src = element.imageUrl;
				image.alt = element.title;
				figure.appendChild(image);
				gallery.appendChild(figure);

				// Création d'un bouton de suppression avec une icône de poubelle
				const deleteButton = document.createElement('button');
				const deleteIcon = document.createElement('i');
				deleteIcon.classList.add('fa-solid', 'fa-trash-can');
				deleteButton.appendChild(deleteIcon);
				figure.appendChild(deleteButton);

				// Ajout d'un événement pour supprimer l'œuvre au clic
				deleteButton.addEventListener('click', function () {
					const resourceId = element.id; // Récupère l'ID de l'œuvre
					const apiUrl3 = `http://localhost:5678/api/works/${resourceId}`;

					// Suppression de l'œuvre via l'API
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
								reloadGallery(); // Recharge la galerie après suppression
							} else {
								response.json().then((data) => {
									console.error('Erreur lors de la suppression:', data);
								});
							}
						})
						.catch((error) => console.error('Erreur réseau ou autre', error));
				});
			});
		})
		.catch((error) =>
			console.error('Erreur lors du rechargement de la galerie', error)
		);
}

// Fonction pour initialiser et afficher la galerie dans la modale
function modalGallery() {
	// Fetch pour récupérer les œuvres à afficher
	fetch(apiUrl)
		.then((response) => {
			if (!response.ok) {
				throw new Error('Une erreur est survenue : ' + response.statusText);
			}
			return response.json();
		})
		.then((data) => {
			// Sélectionne la galerie
			const gallery = document.querySelector('.modal-content');
			data.forEach((element) => {
				// Création de la structure pour chaque œuvre (figure, image, bouton de suppression)
				const figure = document.createElement('figure');
				const image = document.createElement('img');
				const deleteButton = document.createElement('button');
				const deleteIcon = document.createElement('i');

				image.src = element.imageUrl; // Lien de l'image
				image.alt = element.title; // Titre de l'œuvre
				figure.dataset.category = element.categoryId; // Catégorie

				deleteIcon.classList.add('fa-solid', 'fa-trash-can');
				deleteButton.appendChild(deleteIcon);
				figure.appendChild(image);
				figure.appendChild(deleteButton);
				gallery.appendChild(figure);

				// Événement pour supprimer l'œuvre au clic du bouton
				deleteButton.addEventListener('click', function () {
					const resourceId = element.id;
					const apiUrl3 = `http://localhost:5678/api/works/${resourceId}`;

					// Suppression de l'œuvre via l'API
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
								reloadGallery(); // Recharge la galerie après suppression
							} else {
								response.json().then((data) => {
									console.error('Erreur lors de la suppression:', data);
								});
							}
						})
						.catch((error) => console.error('Erreur réseau ou autre', error));
				});
			});

			// Ajoute une ligne de séparation et un bouton "Ajouter une photo"
			const separator = document.createElement('hr');
			const modalGallery = document.querySelector('.modal-wrapper');
			modalGallery.appendChild(separator);

			const submitButton = document.createElement('input');
			submitButton.setAttribute('type', 'submit');
			submitButton.setAttribute('value', 'Ajouter une photo');
			modalGallery.appendChild(submitButton);

			gallery.style.display = 'flex';
			const addPhotoModal = document.querySelector('.modal-add-photo');
			addPhotoModal.style.display = 'none'; // Cache la section d'ajout de photo par défaut

			// Ouvre la section d'ajout de photo au clic du bouton "Ajouter une photo"
			submitButton.addEventListener('click', function () {
				gallery.style.display = 'none'; //Cache la galerie
				addPhotoModal.style.display = 'flex'; // Affiche la section d'ajout de photo
				const modalTitle = document.querySelector('h3');
				modalTitle.textContent = 'Ajouter une photo'; // Modifie le titre de la modale
				submitButton.style.display = 'none'; // Cache le bouton "Ajouter une photo"

				// Ajoute un bouton retour en haut de la modale
				const iconeArrow = document.createElement('i');
				const buttonArrow = document.createElement('button');
				iconeArrow.classList.add('fas', 'fa-arrow-left');
				buttonArrow.appendChild(iconeArrow);
				buttonArrow.classList.add('arrow-btn-wrapper');
				const enteteIcon = document.querySelector('.close-btn-wrapper');
				enteteIcon.appendChild(buttonArrow);

				// Création du formulaire d'ajout de photo
				const form = document.createElement('form');
				form.setAttribute('action', '#');
				form.setAttribute('method', 'post');

				const divAddPhoto = document.createElement('div');
				divAddPhoto.classList.add('add-photo');

				const icon = document.createElement('i');
				icon.classList.add('fa-regular', 'fa-image');

				const button = document.createElement('button');
				button.classList.add('add-photo-btn');

				const inputFile = document.createElement('input');
				inputFile.setAttribute('type', 'file');
				inputFile.setAttribute('accept', 'image/png, image/jpeg');

				const buttonText = document.createElement('p');
				buttonText.textContent = '+ Ajouter photo';

				const fileInfo = document.createElement('p');
				fileInfo.textContent = 'jpg, png : 4mo max';

				const imgPreview = document.createElement('img');
				imgPreview.style.display = 'none';
				imgPreview.style.maxHeight = '169px'; // Limite la taille de l'aperçu de l'image
				//mettre max taille fichier

				// Gestionnaire pour afficher un aperçu de l'image sélectionnée
				inputFile.addEventListener('change', function (event) {
					const file = event.target.files[0]; // Fichier sélectionné

					if (file) {
						const reader = new FileReader();

						reader.onload = function (e) {
							imgPreview.setAttribute('src', e.target.result); // Affiche l'image
							imgPreview.style.display = 'block'; // Affiche l'aperçu
						};

						reader.readAsDataURL(file); // Lit le fichier

						//Cache le contenu du rectangle bleu pour laisser place à la photo
						fileInfo.style.display = 'none';
						buttonText.style.display = 'none';
						icon.style.display = 'none';
						button.style.display = 'none';
					}
				});

				// Ajoute les éléments dans le formulaire
				button.appendChild(inputFile);
				button.appendChild(buttonText);
				divAddPhoto.appendChild(icon);
				divAddPhoto.appendChild(button);
				divAddPhoto.appendChild(fileInfo);
				divAddPhoto.appendChild(imgPreview);

				// Création de l'élément label pour le titre de la photo
				const labelTitle = document.createElement('label');
				labelTitle.setAttribute('for', 'title-photo'); // Attribut 'for' lié à l'ID de l'input pour l'accessibilité
				labelTitle.textContent = 'Titre';

				// Création de l'élément input pour le titre de la photo
				const inputTitle = document.createElement('input');
				inputTitle.setAttribute('type', 'text');
				inputTitle.setAttribute('name', 'title');
				inputTitle.setAttribute('id', 'title-photo'); // ID pour associer avec le label

				// Création de l'élément label pour la catégorie de la photo
				const labelCategory = document.createElement('label');
				labelCategory.setAttribute('for', 'photo-category'); // Attribut 'for' lié à l'ID de l'élément select
				labelCategory.textContent = 'Catégorie';

				// Création de l'élément select pour choisir la catégorie de la photo
				const selectCategory = document.createElement('select');
				selectCategory.setAttribute('name', 'category');
				selectCategory.setAttribute('id', 'photo-category'); //ID pour associer avec le label

				// Création du bouton de validation
				const addButton = document.createElement('input');
				addButton.setAttribute('type', 'submit');
				addButton.setAttribute('value', 'Valider');
				addButton.style.background = '#A7A7A7'; // Couleur grisée (indiquant qu'il est désactivé au départ)

				// Ajout des éléments au formulaire
				form.appendChild(divAddPhoto);
				form.appendChild(labelTitle);
				form.appendChild(inputTitle);
				form.appendChild(labelCategory);
				form.appendChild(selectCategory);
				form.appendChild(separator);
				form.appendChild(addButton);

				// Ajout du formulaire à la modale
				addPhotoModal.appendChild(form);

				// Sélection de l'élément select pour la catégorie
				const categoryChoice = document.getElementById('photo-category');
				categoryChoice.innerHTML = ''; // Vide le contenu de l'élément pour éviter les doublons

				// Fetch pour obtenir les catégories à afficher dans le menu déroulant
				fetch(apiUrl2)
					.then((response) => {
						if (!response.ok) {
							throw new Error(
								'Erreur dans la requête API : ' + response.statusText
							);
						}
						return response.json();
					})
					.then((categories) => {
						// Filtrer les catégories pour éviter les doublons
						const uniqueCategories = categories.filter(
							(category, index, self) =>
								index === self.findIndex((cat) => cat.id === category.id)
						);

						// Boucle pour créer une option dans le select pour chaque catégorie unique
						uniqueCategories.forEach((category) => {
							const optionCategory = document.createElement('option');
							optionCategory.textContent = category.name; // Affichage du nom de la catégorie
							optionCategory.value = category.id; // Valeur envoyée avec le formulaire
							categoryChoice.appendChild(optionCategory); // Ajout de l'option au select
						});
					})
					.catch((error) => {
						console.error('Erreur :', error);
					});

				// Fonction pour vérifier si le formulaire est correctement rempli
				function checkForm() {
					// Si tous les champs sont remplis, on active le bouton de validation
					if (
						inputTitle.value &&
						selectCategory.value &&
						inputFile.files.length > 0
					) {
						addButton.disabled = false;
						addButton.style.backgroundColor = '#1d6154'; // Changer la couleur du bouton en vert (activé)
					} else {
						addButton.disabled = true; // Désactivation du bouton si des champs manquent
						addButton.style.backgroundColor = '#A7A7A7'; // Garder le bouton en gris
					}
				}

				// Ajouter des écouteurs d'événements pour vérifier en temps réel si le formulaire est rempli
				inputTitle.addEventListener('input', checkForm);
				selectCategory.addEventListener('input', checkForm);
				inputFile.addEventListener('change', checkForm);

				// Add event listener sur la soumission du formulaire
				form.addEventListener('submit', function (event) {
					event.preventDefault(); // Empêche la soumission par défaut
					// Vérification finale des champs
					if (
						inputTitle.value &&
						selectCategory.value &&
						inputFile.files.length > 0
					) {
						alert('Formulaire soumis avec succès !');
					} else {
						alert('Veuillez compléter tous les champs avant de soumettre.');
					}
				});

				// Écouter le clic sur le bouton de soumission
				addButton.addEventListener('click', function (event) {
					event.preventDefault(); // Empêche le comportement par défaut
					// Récupération des valeurs du formulaire
					const titleInput = document.querySelector('#title-photo').value;
					const categorySelect =
						document.querySelector('#photo-category').value;

					// Vérification des champs avant envoi
					if (!inputFile || !titleInput || !categorySelect) {
						console.error('Veuillez remplir tous les champs.');
						return;
					}

					// Création d'un objet FormData pour envoyer les données du formulaire avec le fichier
					const formData = new FormData();
					formData.append('title', titleInput); //Ajout du titre
					formData.append('image', inputFile.files[0]); //Ajout de l'image sélectionnée
					formData.append('category', selectCategory.value); //Ajout de la catégorie

					// Envoi des données via l'API
					fetch(apiUrl, {
						method: 'POST',
						headers: {
							Authorization: `Bearer ${localStorage.getItem('token')}`,
						},
						body: formData,
					})
						.then((response) => {
							if (!response.ok) {
								throw new Error(
									"Erreur lors de l'ajout de l'œuvre : " + response.statusText
								);
							}
							return response.json();
						})
						.then((data) => {
							console.log('Œuvre ajoutée avec succès :', data);
							reloadGallery(); // Recharge la galerie pour afficher l'œuvre ajoutée
							form.reset(); // Réinitialise le formulaire après soumission
						})
						.catch((error) => console.error('Erreur :', error));
				});
			});
		});
}

modalGallery();
