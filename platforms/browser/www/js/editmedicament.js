// get username and password from the inputs and send them to the node-red:
$(document).ready(function () {
  const showLoading = function () {
    swal({
      title: 'Envoi d&rsquo;ordonnance en cours... ⏳',
      allowEscapeKey: false,
      allowOutsideClick: false,
      timer: 5000,
      onOpen: () => {
        swal.showLoading();
      }
    }).then(
    )

    setTimeout(() => {
      window.location.replace("profile.html");
    }, 6000);
  };
  var idu = localStorage.getItem("idEdit");
 

  $("#sub2").click(function () {
    var nom = $("#nom").val();
    var dose = $("#dose").val();
    var nbrprise = $("#nbrprise").val();
    var details = $("#details").val();

    var test = true;


    if (($.trim(nom).length == 0) || ($.trim(dose).length == 0) || ($.trim(nbrprise).length == 0) || ($.trim(details).length == 0)) {
      test = false;
      swal(
        'Oops...',
        'Un problème est survenu ! ❌',
        'error'
      )
    }

    else if (test == true) {
      $.ajax
        ({
          type: "POST",  //Request type
          url: "http://192.168.43.69:1880/editmedicament",
          data: { nom: nom, dose: dose, nbrprise: nbrprise, details: details, idu: idu },
          error: function () {
            swal("Erreur de connexion !", "Vérifier votre connexion internet 😕", "error");
          },
          success: function () {

            //Sending mail

            /*$.ajax
              ({
                type: "POST",  //Request type
                url: "http://192.168.43.69:1880/emailMedic",
                data: { idu: idu },
                error: function () {
                  swal("Erreur de connexion !", "Vérifier votre connexion internet 😕", "error");
                },
                success: function () {*/
            showLoading();
            //}
            //});
            
            event.preventDefault();
            
            var demandeMed = "med";

            $.ajax
              ({
                type: "POST",  //Request type
                url: "http://192.168.43.69:1880/medic",
                data: { id: demandeMed },
                error: function () {
                  swal("Erreur de connexion !", "Vérifier votre connexion internet 😕", "error");
                },
                success: function () {

                }
              });

          }
        });
    }
  });
})

