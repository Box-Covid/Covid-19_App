// get username and password from the inputs and send them to the node-red:

$(document).ready(function () {


    $.ajax({
      type: "POST",
      url: "http://192.168.43.69:1880/affichedoctor",
      error: function () {
      },
      success: function (data) {
        
       for (var i = 0; i < data.length; i++) {
          console.log(data);
          $("select").append('<b><option>' + data[i].Username + '</option></b>');
        }
      }
    })
  



  $("#BtnPatient").click(function () {
    var prenom = $("#firstname").val();
    var nom = $("#lastname").val();
    var dateN = $("#BirthDate").val();
    var sexe = $("[name=optradio]:checked").val();
    var username = $("#username").val();
    var tel = $("#tel").val();
    var idD = $("#medecin").val();
    var pwd = $("#pwd").val();

    var test = true;

    if (($.trim(prenom).length == 0) || ($.trim(nom).length == 0) || ($.trim(dateN).length == 0) || ($.trim(sexe).length == 0) || ($.trim(username).length == 0) || ($.trim(tel).length == 0) || ($.trim(idD).length == 0) || ($.trim(pwd).length < 8)) {
      test = false;
    }
    else if (test == true) {
      event.preventDefault();
      $.ajax({
        type: "POST",  //Request type
        url: "http://192.168.43.69:1880/userPatient",
        //timeout: 400,
        data: { username: username },
        error: function () {
          swal("Erreur de connexion !", "Vérifier votre connexion internet 😕", "error");
        },
        success: function (data) {

          if (data == "") {

            $.ajax({
              type: "POST",
              url: "http://192.168.43.69:1880/idDocteur",
              //timeout: 400,
              data: { idD: idD },
              error: function () {
                swal("Erreur de connexion !", "Vérifier votre connexion internet 😕", "error");
              },
              success: function (data) {

                var idx = data[0].Id;

                $.ajax({
                  type: "POST",
                  url: "http://192.168.43.69:1880/boxpatient",
                  //timeout: 1000,
                  data: { prenom: prenom, nom: nom, dateN: dateN, sexe: sexe, username: username, tel: tel, pwd: pwd, idD: idx },
                  error: function () {
                    swal("Erreur de connexion !", "Vérifier votre connexion internet 😕", "error");
                  },
                  success: function () {
                    swal("Inscription a été effectué avec succès", "Bienvenu dans Box-Covid !", "success");
                    setTimeout(() => {
                      window.location.replace("index.html");
                    }, 2500);
                  }
                })

              }
            })
          } else {
            swal("Erreur Username !", "Username existe déjà", "error");
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







