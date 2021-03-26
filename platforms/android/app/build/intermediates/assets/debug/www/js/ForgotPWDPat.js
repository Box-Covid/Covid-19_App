$(document).ready(function () {
    $("#reset").click(function () {
        function emailIsValid(username) {
            return /\S+@\S+\.\S+/.test(username);
        }

        var emailPWD = $("#userPWDPat").val();
        event.preventDefault();
        if (emailIsValid(emailPWD)) {

            $.ajax({
                type: "POST",
                url: "http://192.168.43.69:1880/searchEmailPat",
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
                        var prenomPat = data[0].Firstname;
                        var nomPat = data[0].Lastname;
                        var pwdPat = data[0].password;
                        $.ajax({
                            type: "POST",
                            url: "http://192.168.43.69:1880/sendMailPat",
                            //timeout:1000,  
                            data: { email: emailPWD, prenomPat: prenomPat, nomPat: nomPat, pwdPat: pwdPat },
                            error: function () {
                                swal("Erreur de connexion !", "Vérifier votre connexion Internet 😕", "error");
                            },
                            success: function (data) {
                                Toast.fire({
                                    type: 'success',
                                    title: 'Votre mot de passe été envoyé avec succès ✔'
                                }).then(() => {
                                    window.location.replace("index.html");
                                });


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