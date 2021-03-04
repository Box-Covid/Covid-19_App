// get username and password from the inputs and send them to the node-red:

$(document).ready(function () {
  $("#BtnReg").click(function () {
    var prenom = $("#firstname").val();
    var nom = $("#lastname").val();
    var dateN = $("#BirthDate").val();
    var sexe = $("[name=optradio]:checked").val();
    var username = $("#username").val();
    var tel = $("#tel").val();
    // var add = $("#add").val();
    var role = $("#role").val();
    var pwd = $("#pwd").val();

   
      //var myPassword = "myPassword";
      // var mot = pwd;
      // var encrypted = CryptoJS.AES.encrypt(mot, myPassword);
      // mot = encrypted.toString();
    
      var test = true;


    if (($.trim(prenom).length == 0) || ($.trim(nom).length == 0) || ($.trim(dateN).length == 0) || ($.trim(sexe).length == 0) || ($.trim(username).length == 0) || ($.trim(tel).length == 0) || ($.trim(role).length == 0) || ($.trim(pwd).length < 8)) {
      test = false;

    } else if (test == true) {
      event.preventDefault();
      $.ajax({
        type: "POST",  //Request type
        url: "http://192.168.43.69:1880/user",
        timeout: 400,
        //data: { prenom: prenom, nom: nom, dateN: dateN, sexe: sexe, username: username, tel: tel, role: role, pwd, pwd },
        data: { username: username },
        error: function () {
          swal("Erreur de connexion !", "Vérifier votre connexion internet", "error");
        },
        success: function (data) {
          if (data == "") {
            $.ajax({
              type: "POST",
              url: "http://192.168.43.69:1880/box",
              timeout: 1000,
              data: { prenom: prenom, nom: nom, dateN: dateN, sexe: sexe, username: username, tel: tel, role: role, pwd: pwd },
              error: function () {
                swal("Erreur de connexion !", "Vérifier votre connexion internet", "error");
              },
              success: function () {
                swal("Inscription a été effectué avec succès", "Bienvenu dans Box-Covid !", "success");
                setTimeout(() => {
                  window.location.replace("index.html");
                }, 2500);
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







