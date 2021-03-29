$(document).ready(function () {
    $("#reset").click(function () {
        function emailIsValid(username) {
            return /\S+@\S+\.\S+/.test(username);
        }

        const showLoading = function () {
            swal({
                title: 'Envoi du mot de passe en cours ⏳',
                allowEscapeKey: false,
                allowOutsideClick: false,
                timer: 5000,
                onOpen: () => {
                    swal.showLoading();
                }
            }).then(
            )
            setTimeout(() => {
                window.location.replace("index.html");
            }, 6000);
        };

        var emailPWD = $("#userEmail").val();
        event.preventDefault();
        if (emailIsValid(emailPWD)) {

            $.ajax({
                type: "POST",
                url: "http://192.168.43.69:1880/searchEmailDr",
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
                        var prenomDr = data[0].Firstname;
                        var nomDr = data[0].Lastname;
                        var pwdDoctor = data[0].password;
                        $.ajax({
                            type: "POST",
                            url: "http://192.168.43.69:1880/sendMail",
                            //timeout:1000,  
                            data: { email: emailPWD, prenomDr: prenomDr, nomDr: nomDr, pwdDoctor: pwdDoctor },
                            error: function () {
                                swal("Erreur de connexion !", "Vérifier votre connexion Internet 😕", "error");
                            },
                            success: function (data) {
                                
                            }
                        });
                        showLoading();
                       
                    }
                }
            });
        } else {
            swal("Erreur de saisie !", "Veuillez saisir un email correcte ❌", "error");

        }
    })
})



  //showLoading();
