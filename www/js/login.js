$(document).ready(function () {
    $("#connect").click(function () {
        var username = $("#user").val();
        var password = $("#pwd").val();
        var test = true;
        var myPassword = "myPassword";

        if (($.trim(username).length == 0) || ($.trim(password).length == 0)) {
            test = false;
        } else if (test == true) {
            event.preventDefault();
            $.ajax({
                type: "POST",
                url: "http://192.168.43.69:1880/user",
                timeout: 1000,
                data: { username: username },
                success: function (data) {
                    if (data == "") {
                        swal("Erreur Username !", "Username incorrect", "error");
                    }
                    else {
                        $.ajax({
                            type: "POST",
                            url: "http://192.168.43.69:1880/pwd",
                            timeout: 1000,
                            data: { username: username },
                            error: function () {
                                swal("Erreur de connexion !", "Vérifier votre connexion internet", "error");
                            },
                            success: function (data) {
                                // var encrypted = data[0].mdp;                               
                                // var decrypted = CryptoJS.AES.decrypt(encrypted, myPassword);
                                // var final = decrypted.toString(CryptoJS.enc.Utf8);
                                // alert(final);
                                if (data[0].password == password) {
                                    if (data[0].Role == "Patient") {

                                        var y = data[0].Id;
                                        var mot = y.toString();

                                        const Toast = Swal.mixin({
                                            toast: true,
                                            position: 'top-end',
                                            showConfirmButton: false,
                                            timer: 1950
                                        });
                                        Toast.fire({
                                            type: 'success',
                                            title: 'Connexion réussie !'
                                        }).then(() => {
                                            localStorage.setItem("id", mot);
                                            window.location.replace("index-2.html");
                                        });

                                    } else if (data[0].Role == "Médecin") {

                                        var y = data[0].Id;
                                        var mot = y.toString();

                                        const Toast = Swal.mixin({
                                            toast: true,
                                            position: 'top-end',
                                            showConfirmButton: false,
                                            timer: 1950
                                        });
                                        Toast.fire({
                                            type: 'success',
                                            title: 'Connexion réussie !'
                                        }).then(() => {
                                            localStorage.setItem("id", mot);
                                            window.location.replace("doctors.html");
                                        });

                                    } else if (data[0].Role == "Membre de famille") {

                                        var y = data[0].Id;
                                        var mot = y.toString();

                                        const Toast = Swal.mixin({
                                            toast: true,
                                            position: 'top-end',
                                            showConfirmButton: false,
                                            timer: 1950
                                        });
                                        Toast.fire({
                                            type: 'success',
                                            title: 'Connexion réussie !'
                                        }).then(() => {
                                            localStorage.setItem("id", mot);
                                            window.location.replace("index-3.html");
                                        });

                                    }
                                }
                                else {
                                    swal("Mot de passe est incorrect !", "Essayez de nouveau", "error");
                                }
                            }
                        });
                    }


                }, error: function (data) {
                    swal("Erreur de connexion !", "Vérifier votre connexion Internet", "error");
                }
            });
        }
    })
})