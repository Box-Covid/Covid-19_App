$(document).ready(function () {
    var idpatient = localStorage.getItem('id');

    $("#demande").click(function () {
        event.preventDefault();
        var demande = "on";
        $.ajax({
            type: "POST",
            url: "http://192.168.43.69:1880/iddemande",
            data: { id: demande },
            success: function (data) {

                swal("Votre demande a été envoyée avec succès!  ✔", "", "success");
                setTimeout(() => {
                    window.location.replace("profil-Dashboard.html");
                }, 5000);
              
            }, error: function (data) {
                // swal("Check your connexion to internet!!", "Try again!", "error");
            }
        });


    })
})