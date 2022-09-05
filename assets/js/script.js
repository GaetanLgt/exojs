// LA PLUPART DES CLASSES DONNEES AUX ELEMENTS DU HTML SONT RELIEES A BOOTSTRAP ET PERMETTENT L'APPLICATION DE STYLE DEFINIS PAR CETTE MEME BIBLIOTHEQUE //

document.addEventListener("DOMContentLoaded", function() {
    // une fois que le navigateur a chargé le html (certains elements ne seront peut etre pas chargé comme les ressources externes, img, stylesheets etc..) et que le DOM est construit on lance la fonction => init() dans ce cas (voir plus bas lg 13)//

    var more = document.getElementById('more');        
    //déclaration d'une variable interne "more" qui contiendra un element du DOM <a> id="more" ce qui permet de le manipuler ensuite //

    var form = document.getElementById('formulaire'); 
    //déclaration d'une variable interne "form" qui contiendra un element du DOM <div> id="formulaire" ce qui permet de le manipuler ensuite //

    init();
    // appel de la fonction init() //

    function init(){
        // fonction "init()" qui permet d'initialiser le script en quelques sortes une fois "DOMContentLoaded"//

        loadCover();
        // appel de la fonction loadCover() (voir plus bas lg 31) //

        more.addEventListener('click', function(evenement){ 
            clickMoreFunction(evenement);
        });
        // ajout d'un écouteur d'evenement "click" sur l'element du DOM "more" et l'appel de la fonction "clickMoreFunction()" (voir plus bas lg 51) si il y a bien eu click sur l'element susnommé //

        form.addEventListener('submit', function(evenement){    
            clickVerifForm(evenement);
        }, false);
        // ajout d'un écouteur d'evenement "submit" sur l'element du DOM input de type "submit" et l'appel de la fonction "clickVerifForm()" (voir plus bas lg 68) si il y a bien eu click sur le bouton sumbit. Avec un parametre "false" (voir fonction "clickVerifForm" plus bas) //

    }

    function loadCover(){
        // fonction loadCover() qui permet de récuper l'image de couverture avec le bouledogue francais et l'arriere plan bleu à l'aide d'une requete fetch => si il y a une réponse de la source, alors retourne la réponse au format json, alors/ensuite manipule cette "data" =>  récupère l'element "img_cover" et rajoute dans cette balise (directement dans le html) la "data" autrement dis l'image //

        var url = "https://api.unsplash.com/search/photos?query=animals&per_page=20&client_id=l6MMo-e2x1IzL7UkdHl8pjjbFQFK3L9jIMa9cs2DF7w";
        // variable "url" contenant la source de l'image //

        fetch(url)
            .then(response => {
                return response.json();
            })
            .then(data => {
                var container = document.getElementById('img_cover');
                // variable interne qui contient l'element <div> img_cover pour ensuite la manipuler //

                container.innerHTML = '<img class="image-circle" src="'+data.results[0].urls.thumb+'&w=250&h=250" />';
                // modifie/ecrit dans le html à l'endroit d'éclarer par la variable container ('img_cover') => ajoute une balise <img> avec une classe Bootstrap et un style défini par la bibliotheque. Ajoute ensuite l'image de couverture une fois toutes les étapes precedentes effectuées //
            });
    }


    function clickMoreFunction(evenement){
        // fonction qui permet de changer l'état d'une balise directement dans le DOM d'un display "none" à "block" (affiche les elements) si les conditions sont réunies //

        evenement.preventDefault();
        // "preventDefault()" annule le comportement par defaut d'un evenement //

        var cible = document.getElementById('question');
        // declaration d'une variable interne "cible" qui contient l'element du DOM <div> id="question" //

        if(cible.style.display == 'none'){
            // si evenement "click" sur l'element <a> "more" (voir plus haut lg 19) et que "cible" ("question") est en display "none" alors => //

            cible.style.display = 'block';
            // mettre "cible" en display "block" (affiche la <div> "question" au click) //

        }else{
            cible.style.display = 'none';
            // sinon laisser/mettre "cible" en display "none" //

        }
        return false;
    }


    function clickVerifForm(evenement){
        // fonction qui permet de verifier si les inputs sont remplis, les checkbox cochées et rajouter les resultats dans le DOM, permet aussi de rendre le form invisible et le resusltat visible//

        evenement.preventDefault();
        // voir lg 54 //

        var image = form.querySelector('img.image-circle');
        // variable qui contient la balise <img> de classe .image-circle ajouter plus haut (voir lg 46) de l'element du DOM <div> id="formulaire" lui meme contenu dans la viraible "form" (voir lg 7-8) //

        var espece = document.getElementById('espece');
        var poil = document.getElementById('poil');
        var _certain = document.getElementsByName('certain');
        var certain = null;
        // déclaration de 5 variables internes qui contienent pour 4 d'entres elles des elements du DOM et permetront ensuite de les manipuler, qu'en a "var certain = null" elle permet de verifier/comparer un resultat en fin de boucle, voir lg 93 //

        for(var i = 0; i<_certain.length; i++){
            if(_certain[i].checked){
                certain = _certain[i];
            }
        }
        // boucle for qui permet de parcourir tout les element "certain" dans le DOM, ici ce sont des <input> et verifier si "certain" n'est plus "null" mais egal à _certain, en d'autres termes si les <input> ou les "checkbox" sont cochés //

        var continent = form.querySelector('select');
        // variable qui contient la balise <select> du formulaire <form> //

        var continent_valeur = continent.options[continent.selectedIndex].value;
        // variable qui contiendra la valeur choisi par l'utilisateur parmis les differentes options du selecteur "select" //

        if(espece.value == '' || poil.value == '' || certain.value == '' || continent_valeur == ""){
            // si au "click" sur l'element <input> "ok" les/une des valeures de "espece", "poil", "certain" et "continent_valeur" est/sont vides (l'utilisateur n'a pas rempli les champs), alors => //

            alert("Veuillez remplir tous les champs !");
            // afficher une alert "Veuillez remplir tous les champs !" //

            return false;
        }

        var resultat = document.getElementById('resultat');
        // variable qui contient l'element du DOM <div> id="resulalt" //

        var _paragraphes = resultat.getElementsByTagName('p');
        // variable qui contient les elements du DOM <p> de la <div> id="resulalt" //
        
        var valeur_image = image.getAttribute('src');            
        // variable qui contient la source de l'image de couverture pointer grace à l'attribut "src" //

        var image_resultat = resultat.querySelector('img.image-circle');                           
        image_resultat.setAttribute('src', valeur_image);
        // variable qui contient l'element <img> de classe .image-circle (lg 94 css) de la <div> id="resultat". Dans laquelle, on va mettre dans l'attribut "src" (la source de l'image) la source de l'image du chien avec fond bleu, autrement dis quand la fonction "clickVerifForm" est appelée, et que le script se deroule jusqu'ici, il ajoute à cette balise <img> la src de l'image du chien //
 
        var valeur_espece_poil = '... je suis donc un(e) '+espece.value+' à poils '+poil.value;
        // variable qui contient une concaténation de string = '... je suis donc un(e) ' et ' à poils ' ainsi  que les valeurs des variables "espece" et "poil" (voir lg 84-85) //

        var paragraphepremier =_paragraphes[0];
        paragraphepremier.innerHTML  = valeur_espece_poil;
        // variable qui contient le premier <p> de la <div> class="bloc" elle meme dans la <div> id="resultat" et applique la valeur (données par l'utilisateur) de "espece" et de "poil" dans le <p> au click sur <input> de value="ok" //

        var valeur_continent  = '<span class="big">... et mon continent d\'origine est : "'+continent_valeur+'"</span>';
        // variable qui contient une concaténation d'un <span> qui contient des caracteres et de la variable "continent_valeur". Ce qui servira par la suite a ajouter ce <span> dans le 2eme <p> de la <div> class="bloc" elle meme dans la <div> id="resultat" //

        var dernierparagraphe = _paragraphes[_paragraphes.length-1];
        dernierparagraphe.innerHTML = valeur_continent;
        // Voir plus haut (lg 135) //

        form.style.display = "none";
        // passe la variable "form" qui contient [...] (voir plus haut lg 9-10) en display "none" => "désaffiche" le contenu de <div class="container" id="formulaire"> //

        resultat.style.display = "block";
        // passe la variable "resultat" qui contient [...] (voir plus haut lg 114-115) en display "block" => affiche le resulat au click sur <input> de value="ok" //

        return false;
    }
});