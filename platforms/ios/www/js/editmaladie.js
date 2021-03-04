// get username and password from the inputs and send them to the node-red:

$(document).ready(function () {
  var idu = localStorage.getItem("idEdit");
  $("#sub1").click(function () {
    var nom = $("#nommaladie").val();
    var degre = $("#degremaladie").val();
    var description = $("#descriptionmaladie").val();

    var test = true;


    if (($.trim(nom).length == 0) || ($.trim(degre).length == 0) || ($.trim(description).length == 0)) {
      test = false;
      swal(
        'Oops...',
        'Un problème est survenu!!',
        'error'
      )
    }

    else if (test == true) {
      $.ajax
        ({
          type: "POST",  //Request type
          url: "http://192.168.43.69:1880/editmaladie",
          data: { nommaladie: nom, degremaladie: degre, descriptionmaladie: description, idu: idu },
          error: function () {
            swal("Erreur de connexion !", "Vérifier votre connexion internet", "error");
          },
          success: function () {
            swal("Maladie a été ajouté avec succès", "Bienvenu dans Box-Covid !", "success");
            setTimeout(() => {
              window.location.replace("profile.html");
            }, 2000);

          }
        });
    }
  });
});
  

