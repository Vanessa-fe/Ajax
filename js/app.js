const app = {
  apiBaseUrl: 'https://swapi.dev/api',

  /**
   * Démarage de l'application JS consommant l'API SWAPI
   */
  init: function(){
    // On délègue le chargement du personnage #32 à une méthode dédiée
    app.loadPeople();

    // On délègue le chargement des 10 premiers vaisseaux à une méthode dédiée
    app.loadStarShips();
  },


  loadPeople: function(){
    let id = prompt('Quel ID ?');
    id = parseInt(id);
    let fetchOptions = {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache'
    };

    let endpoint = app.apiBaseUrl + '/people/' + id;
    console.log(endpoint);
    fetch(endpoint, fetchOptions) // ICI JE LANCE LA REQUETE
      .then( // ICI AVEC LE THEN, JE VAIS TRAITER LA REPONSE AVEC UNE FONCTION
        function(jsonResponse){ //fonction anonyme
          //alert('permier then');
          // Conversion de la répponse au format JSON EN UN OBJET JS (grace au .json() )
          return jsonResponse.json();
        }
      )
      .then(
        function(javaObject){ // ici javaObject va etre égal a jsonResponse.json()
          //console.log(javaObject.name);
          // Mise a jour de la page HTML
          let contentElement = document.getElementById('content');
          // h2 a inserer
          let peopleTitleElement = document.createElement('h2');
          peopleTitleElement.textContent = 'Nom du personnage #' + id;
          contentElement.appendChild(peopleTitleElement);
          // div a inserer
          let peopleElement = document.createElement('div');
          peopleElement.textContent = javaObject.name;
          contentElement.appendChild(peopleElement);
        }
      )
  },


  loadStarShips: function(){
    let fetchOptions = {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache'
    };
    // on prépare l'adresse https://swapi.dev/api/starships/
    let endpoint = app.apiBaseUrl + '/starships/';
    fetch(endpoint, fetchOptions) // ON LANCE LA REQUETE
      .then( // LORSQU'ON RECOIT UNE REPONSE,ON ARRIVE DANS LE THEN, 
            // Et la réponse arrive en argument de la fonction dans le then
        function(jsonResponse){ 
          // Cette réponse c'est du json brut, on le transforme en objet
          // et on va repartir dans un autre then
          return jsonResponse.json();
        }
      )
      .then(
        function(javaObject){
          // Ici j'ai reçu l'objet (le json brut transformé en objet grace a .json())

          // Je cible la div content de index.html
          let contentElement = document.getElementById('content');
          // je fabrique un h2
          let starShipsTitleElement = document.createElement('h2');
          starShipsTitleElement.textContent = 'Les 10 premiers vaisseaux';
          // et j'ajoute ce h2 a la div
          contentElement.appendChild(starShipsTitleElement);

          // je fabrique un ul
          let starshipsListElement = document.createElement('ul');

          // PUIS j'atteris dans une boucle qui va créer autaut de li
          // que de vaisseaux a afficher ! 

          for(let i = 0; i < javaObject.results.length; i++){
            // a chaque tour de boucle je récupère UN vaisseau
            let currentStarship = javaObject.results[i];
            // je fabrique un li
            let starshipElement = document.createElement('li');
            //  je donne le nom du vaisseau au li
            starshipElement.textContent = currentStarship.name;
            // Puis j'ajoute la li au ul
            starshipsListElement.appendChild(starshipElement);
          }
          // pour terminer j'ajoute la ul a la div content
        contentElement.appendChild(starshipsListElement);




        }
      )



  }


}



document.addEventListener('DOMContentLoaded', app.init);


