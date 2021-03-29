$(document).ready(function () {
    $(".desac").click(function () {
        swal({
            title: "Voulez-vous vraiment désactiver votre compte ?",
            text: "Attention ! Une fois supprimé, vous ne pourrez plus récupérer vos données.",
            type: "warning",
            confirmButtonClass: "btn-danger",
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Oui',
            showCancelButton: true,
            cancelButtonText: 'Annuler',
            cancelButtonColor: '#d33',
        })
            .then((result) => {
                if (result.value) {
                    var id = localStorage.getItem("id");
                    event.preventDefault();
                    $.ajax({
                        type: "POST",  //Request type
                        url: "http://192.168.1.13:1880/desac",
                        data: { id: id },
                        error: function () {
                            swal("Erreur de connexion !", "Vérifier votre connexion internet", "error");
                        },
                        success: function () {
                            swal("Votre compte a été bien désactivé 🙁", {
                                buttons: [true],
                            });

                            setTimeout(() => {
                                localStorage.clear();
                                window.location.replace("index.html");
                            }, 2500);
                        }
                    });
                }
            });
    })
})