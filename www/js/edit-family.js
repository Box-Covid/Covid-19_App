$(document).ready(function () {
    //Fetch current user's Data from DB 
    var Id = localStorage.getItem("id");
    $.ajax({
        type: "POST",
        url: "http://192.168.43.69:1880/idFamily",
        data: { Id: Id },
        error: function () {
            swal("Erreur de connexion !", "Vérifier votre connexion Internet 😕", "error");
        },
        success: function (data) {

            $("#prenom").val(data[0].Firstname);
            $("#nom").val(data[0].Lastname);
            $("#usern").val(data[0].Username);
            $("#telNum").val(data[0].Num);
            //$("#mdp").val(data[0].password);
            //$("#cMdp").val(data[0].password);
            //$("#Mdpatient").val(data[0].passwordP);
        }
    });
    // On click on the button :
    $("#valider").click(function () {
        var prenom = $("#prenom").val();
        var nom = $("#nom").val();
        var username = $("#usern").val();
        var mdp = $("#mdp").val();
        var Cmdp = $("#cMdp").val();
        var tel = $("#telNum").val();
        var idP = $("#Mdpatient").val();

        event.preventDefault();

        if (($.trim(prenom).length != 0) && ($.trim(nom).length != 0) && ($.trim(username).length != 0) && ($.trim(tel).length != 0) && ($.trim(idP).length != 0)) {
            if (mdp == Cmdp && ($.trim(mdp).length >= 8)) {

                $.ajax({
                    type: "POST",
                    url: "http://192.168.43.69:1880/idP",
                    //timeout: 400,
                    data: { idP: idP },
                    error: function () {
                        swal("Erreur de connexion !", "Vérifier votre connexion internet 😕", "error");
                    },
                    success: function (data) {
                        if (data == "") {

                            swal("Erreur Mot de passe de votre patient !", "Mot de passe n'existe pas ❌", "error");

                        } else {


                            var idy = data[0].Id;
                            localStorage.setItem("idEdit",idy);      

                            $.ajax({
                                type: "POST",
                                url: "http://192.168.43.69:1880/editFamily",
                                timeout: 1000,
                                data: { prenom: prenom, nom: nom, username: username, tel: tel, pwd: mdp, Id: Id, idP: idy },
                                error: function () {
                                    swal("Erreur de connexion !", "Vérifier votre connexion internet 😕", "error");
                                },
                                success: function () {
                                    swal("Modification a été effectué avec succès ✔", "Bienvenu dans Box-Covid ! 😁", "success");
                                    setTimeout(() => {
                                        window.location.replace("index-3.html");
                                    }, 3000);
                                }
                            })
                        }

                    }
                })


            } else {
                swal("Mot de passe est incorrect !", "Veuillez vérifier votre mot de passe ❌", "error");
            }
        } else {
            swal("Erreur de saisie !", "Veuillez vérifier vos champs ❌", "error");
        }

    })
})