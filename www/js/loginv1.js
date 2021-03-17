$(document).ready(function () {
    $("#connect").click(function () {
        var username = $("#user").val();
        var password = $("#pwd").val();
        var test = true;
       // var myPassword = "myPassword";

        if (($.trim(username).length == 0) || ($.trim(password).length == 0)) {
            test = false;
        } else if (test == true) {
            event.preventDefault();
            $.ajax({
                type: "POST",
                url: "http://192.168.43.69:1880/userDoctor",
                
                data: { username: username },
                success: function (data) {
                    if (data == "") {
                        $.ajax({
                            type: "POST",
                            url: "http://192.168.43.69:1880/userPatient",
                            
                            data: { username: username },
                            success: function (data) {
                                if (data == "") {
                                    $.ajax({
                                        type: "POST",
                                        url: "http://192.168.43.69:1880/userFamilyMember",
                                       
                                        data: { username: username },
                                        success: function (data) {
                                            if (data == "") {
                                                swal("Erreur Username !", "Username incorrect", "error");
                                            } else {
                                                $.ajax({
                                                    type: "POST",
                                                    url: "http://192.168.43.69:1880/userFamilyMember",
                                                    data: { username: username },
                                                    error: function () {
                                                        swal("Erreur de connexion !", "Vérifier votre connexion internet", "error");
                                                    }, success: function (data) {
                                                        if (data == "") {
                                                            swal("Erreur de saisie !", "Username inscorrect !", "error");
                                                        }else{
                                                            $.ajax({
                                                                type: "POST",
                                                                url: "http://192.168.43.69:1880/pwdFamily",
                                                               
                                                                data: { username: username },
                                                                error: function () {
                                                                    swal("Erreur de connexion !", "Vérifier votre connexion internet", "error");
                                                                },
                                                                success: function (data) {
                                                                    if (data[0].password == password) {
                                                                        var y = data[0].Id;
                                                                        var mot = y.toString();
                                                                        const Toast = Swal.mixin({
                                                                            toast: true,
                                                                            position: 'top-end',
                                                                            showConfirmButton: false,
                                                                            timer: 2200
                                                                        });
                                                                        Toast.fire({
                                                                            type: 'success',
                                                                            title: 'Connexion réussie Mme/M. '+data[0].Firstname+" "+data[0].Lastname+" !"
                                                                        }).then(() => {
                                                                            localStorage.setItem("id", mot);
                                                                            window.location.replace("index-3.html");
                                                                        });
                                                                    } else {
                                                                        swal("Erreur de saisie !", "Mot de passe incorrect !", "error");
                                                                    }
                                                                }
                                                            })
                                                        }
                                                    }


                                                })
                                            }
                                        }
                                    })
                                } else {
                                    $.ajax({
                                        type: "POST",
                                        url: "http://192.168.43.69:1880/pwdPatient",
                                       
                                        data: { username: username },
                                        error: function () {
                                            swal("Erreur de connexion !", "Vérifier votre connexion internet", "error");
                                        },
                                        success: function (data) {
                                            if (data[0].password == password) {
                                                var y = data[0].Id;
                                                var mot = y.toString();
                                                const Toast = Swal.mixin({
                                                    toast: true,
                                                    position: 'top-end',
                                                    showConfirmButton: false,
                                                    timer: 2200
                                                });
                                                Toast.fire({
                                                    type: 'success',
                                                    title: 'Connexion réussie Mme/M. ' +data[0].Firstname+" "+data[0].Lastname+" !"
                                                }).then(() => {
                                                    localStorage.setItem("id", mot);
                                                    window.location.replace("index-2.html");
                                                });
                                            } else {
                                                swal("Erreur de saisie !", "Mot de passe incorrect !", "error");
                                            }
                                        }
                                    })
                                }
                            }
                        })
                    } else if (data != "") {
                        $.ajax({
                            type: "POST",
                            url: "http://192.168.43.69:1880/pwdDr",
                            data: { username: username },
                            error: function () {
                                swal("Erreur de connexion !", "Vérifier votre connexion internet", "error");
                            },
                            success: function (data) {
                                if (data[0].password == password) {
                                    var y = data[0].Id;
                                    var mot = y.toString();
                                    const Toast = Swal.mixin({
                                        toast: true,
                                        position: 'top-end',
                                        showConfirmButton: false,
                                        timer: 2200
                                    });
                                    Toast.fire({
                                        type: 'success',
                                        title: 'Connexion réussie Dr. '+data[0].Firstname+" "+data[0].Lastname+" !"
                                    }).then(() => {
                                        localStorage.setItem("id", mot);
                                        window.location.replace("doctors.html");
                                    });
                                } else {
                                    swal("Erreur de saisie !", "Mot de passe incorrect !", "error");
                                }
                            }
                        })
                    }else{
                        swal("Erreur de connexion !", "Vérifier votre connexion internet", "error");
                    }

                },
                error: function (){
                    swal("Erreur de connexion !", "Vérifier votre connexion internet", "error");
                }
            })
        }

    })
})