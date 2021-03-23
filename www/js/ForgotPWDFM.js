$(document).ready(function () {
    $("#reset").click(function () {
        function emailIsValid(username) {
          return /\S+@\S+\.\S+/.test(username);
        }

        var emailPWD = $("#userpwdFM").val();
        event.preventDefault();
        if (emailIsValid(emailPWD)) {
           
            $.ajax({
                type: "POST",
                url: "http://192.168.43.69:1880/searchEmailFM",
                //timeout:1000,  
                data: { emailpwd: emailPWD },
                error: function () {
                    swal("Erreur de connexion !", "Vérifier votre connexion Internet 😕", "error");
                },
                success: function (data) {
                    if (data == "") {
                        swal("Erreur email !", "L'email n'existe pas ou incorrect ❌", "error");
                        setTimeout(() => {
                            
                        }, 3000);
                    } else {
                        $.ajax({
                            type: "POST",
                            url: "http://192.168.43.69:1880/sendMail",
                            //timeout:1000,  
                            data: { newpwd: emailPWD },
                            error: function () {
                                swal("Erreur de connexion !", "Vérifier votre connexion Internet 😕", "error");
                            },
                            success: function (data) {
                                swal("Envoie mot de passe réussi ! ✔", "Vérifier votre email pour récupérer votre mot de passe 📧", "error");
                            }
                        });
                    }
                }
            });
        } else {
            swal("Erreur de saisie !", "Veuillez saisir un email correcte ❌", "error");
    
        }
    })
})