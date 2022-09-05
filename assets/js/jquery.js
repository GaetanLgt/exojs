// Pour l'equivalent à "document.addEventListener("DOMContentLoaded", function())", j'ai utilisé cette syntaxe "$(function() {})" au lieu de "$( document ).ready(function())" car il semblerait qu'elle soit dépreciée avec cette version de jquery mais je n'en sui pas sure..

$(function () {
    init();

    function init() {
        loadCover();

        $("#more").on("click", function () {
            $("#question").toggle();
            $("form").on("submit", function (e) {
                e.preventDefault();
                clickVerifForm(e);
            });
        });
    }

    function loadCover() {
        let url =
            "https://api.unsplash.com/search/photos?query=animals&per_page=20&client_id=l6MMo-e2x1IzL7UkdHl8pjjbFQFK3L9jIMa9cs2DF7w";

        fetch(url)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                $("#img_cover").html(
                    '<img class="image-circle" src="' +
                        data.results[0].urls.thumb +
                        '&w=250&h=250" />'
                );
            });
    }

    // à partir de là, j'ai fait ce que j'ai pu mais j'arrive pas a faire marcher la suite du code //
    function clickVerifForm(e) {
        e.preventDefault();

        // let _certain = $("#certain");
        // let certain = null;

        // for (let i = 0; i < _certain.length; i++) {
        //     if (_certain[i].checked) {
        //         certain = _certain[i];
        //     }
        // }

        if (
            $("#espece").val() == "" ||
            $("#poil").val() == "" ||
            $("#certain").select().val() == "" ||
            $("select option:selected").val() == ""
        ) {
            alert("Veuillez remplir tous les champs !");
            return false;
        }

        $("#resultat img.image-circle").attr("src", $("img").attr("src"));

        $("#resultat p:first-child").html(
            "... je suis donc un(e) " +
                $("#espece").val() +
                " à poils " +
                $("#poil").val()
        );

        $("#resultat p:last-child").html(
            '<span class="big">... et mon continent d\'origine est : "' +
                $("select option:selected").val() +
                '"</span>'
        );

        $("#formulaire").hide();
        $("#resultat").show();

        return false;
    }
});
