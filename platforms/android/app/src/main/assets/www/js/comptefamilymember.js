// get username and password from the inputs and send them to the node-red:

$(document).ready(function () {

  $("#BtnFamily").click(function () {
    function emailIsValid(username) {
      return /\S+@\S+\.\S+/.test(username);
    }
    var prenom = $("#firstname").val();
    var nom = $("#lastname").val();
    var username = $("#username").val();
    var tel = $("#tel").val();
    var pwd = $("#pwd").val();
    var idP = $("#pwdpatient").val();
    var emailidP = $("#emailpatient").val();

    var test = true;

    if (($.trim(prenom).length == 0) || ($.trim(nom).length == 0) || ($.trim(username).length == 0) || ($.trim(tel).length == 0) || ($.trim(emailidP).length == 0) || ($.trim(pwd).length < 8) || ($.trim(idP).length < 8)) {
      test = false;
    } else if (!emailIsValid(username)) {
      swal("Erreur de saisie!", "Veuillez saisir un email valide 📧", "error");
      test = false;
      setTimeout(() => {

      }, 3000);

    }
    else if (test == true) {
      event.preventDefault();
      $.ajax({
        type: "POST",  //Request type
        url: "http://192.168.43.69:1880/userFamilyMember",
        //timeout: 400,
        data: { username: username },
        error: function () {
          swal("Erreur de connexion !", "Vérifier votre connexion internet 😕", "error");
        },
        success: function (data) {

          if (data == "") {

            $.ajax({
              type: "POST",
              url: "http://192.168.43.69:1880/idP",
              //timeout: 400,
              data: { idP: idP, emailP: emailidP },
              error: function () {
                swal("Erreur de connexion !", "Vérifier votre connexion internet😕", "error");
              },
              success: function (data) {

                if (data == "") {

                  swal("Mot de passe ou email n'existe pas !","Veuillez vérifier le mot de passe ou l'email de votre patient ! ❌", "error");

                } else {

                  var idy = data[0].Id;

                  $.ajax({
                    type: "POST",
                    url: "http://192.168.43.69:1880/boxfamily",
                    //timeout: 1000,
                    data: { prenom: prenom, nom: nom, username: username, tel: tel, pwd: pwd, emailidP: idy, idP: idy },
                    error: function () {
                      swal("Erreur de connexion !", "Vérifier votre connexion internet😕", "error");
                    },
                    success: function () {
                      swal("Inscription a été effectué avec succès ✔", "Bienvenu dans Box-Covid ! 😁", "success");
                      setTimeout(() => {
                        window.location.replace("index.html");
                      }, 2500);
                    }
                  })
                }
              }
            });
          } else {
            swal("Erreur Email !", "Email existe déjà ❌", "error");
          }
        }
      });
    }
  });
})


  // function hasNumbers(t){
  // return /\d/.test(t);
  // }

  // function emailIsValid (email) {
  // return /\S+@\S+\.\S+/.test(email);
  // }







