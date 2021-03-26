
$(document).ready(function () {
    var t = $('#example').DataTable();
    var idDr = localStorage.getItem("id");

    $.ajax({
        type: "POST",
        url: "http://192.168.43.69:1880/nbrArch",
        //timeout:1000,  
        data: { id: idDr },
        error: function () {
            swal("Erreur de connexion !", "Vérifier votre connexion Internet", "error");
        },
        success: function (data) {
            $("#badge-Arch").text(data[0].nbrArch);
        }
    });

    $.ajax({
        type: "POST",
        url: "http://192.168.43.69:1880/nbrPatActif",
        //timeout:1000,  
        data: { id: idDr },
        error: function () {
            swal("Erreur de connexion !", "Vérifier votre connexion Internet", "error");
        },
        success: function (data) {
            $("#nbrPat").text(data[0].nbrPat);
        }
    });

    $.ajax({
        type: "POST",
        url: "http://192.168.43.69:1880/affichepatients",
        data: { idDr: idDr },
        error: function () {
            swal("Erreur de connexion !", "Vérifier votre connexion Internet", "error");
        },
        success: function (data) {

            if (data.length == 0) {
                $("#pp").append('<div><span><h4 style="font-family:verdana; color:#CF5338;"><b>Aucun Patient</b></h4></span></div>');
            } else {
                for (var i = 0; i < data.length; i++) {
                    var dateN = data[i].DateBirth;
                    var ch = dateN.substr(0, 10);
                    //     $("#TBDT").append('<tr> <td>'+data[i].Firstname+'</td><td>'+data[i].Lastname+'</td><td>'+ch+'</td><td>'+data[i].Sexe+'</td><td>'+data[i].Num+'</td></tr>');
                    // }
                    t.row.add([
                        i,
                        data[i].Firstname,
                        data[i].Lastname,
                        ch,
                        data[i].Sexe,
                        data[i].Num,
                        ('<center><a href="profile.html" class="profile" style="cursor: pointer;" id="' + data[i].Id + '"><i id="' + data[i].Id + '" class="fa fa-user m-r-10" style="color:#009999;font-size: x-large;"></i></a> <a class="supprimer" style="cursor: pointer;" id="' + data[i].Id + '"><i id="' + data[i].Id + '" class="fa fa-trash" style="color:red;font-size: x-large;"></i></a> </center>')
                    ]).draw(false);
                    // var name = data[i].Firstname + " " + data[i].Lastname;
                    //Delete Patient from Archive List : 
                    $(document).on('click', '.supprimer', function (event) {

                        var idSupp = $(event.target).attr("id");
                        $.ajax
                            ({

                                success: function () {
                                    Swal.fire({
                                        title: 'Supprimer patient ! ❌',
                                        text: 'Voulez-vous supprimer ce patient ?',
                                        type: 'warning',
                                        showCancelButton: true,
                                        confirmButtonColor: '#3085d6',
                                        cancelButtonColor: '#d33',
                                        confirmButtonText: 'Oui',
                                        cancelButtonText: 'Non'
                                    }).then((result) => {
                                        if (result.value) {
                                            $.ajax
                                                ({
                                                    type: "POST",  //Request type                                         
                                                    url: "http://192.168.43.69:1880/supppatient",
                                                    data: { id: idSupp },
                                                });
                                            window.location.href = "doctorsTable.html";

                                        }
                                    })
                                },
                                error: function () {
                                    swal(
                                        'Oops...',
                                        'Un problème est survenu ! ❌',
                                        'error'
                                    )
                                }
                            });
                    });

                    //Back to the main List : 
                    $(document).on('click', '.profile', function (event) {
                        idMod = $(event.target).attr("id");
                        localStorage.setItem('idEdit', idMod);
                        //window.location.href = "profile.html";
                        //alert(idMod);
                    });

                }
            }

        }
    });

    $.ajax({
        type: "POST",
        url: "http://192.168.43.69:1880/FLpatient",
        data: { id: idDr },
        success: function (data) {
            for (var i = data.length - 1; i >= 0; i--) {
                $("#imgg").append('<a href="#"><div class="media"><hr><div class="media-body"><span class="noti-title" id="nomnot"><span class="avatar"><img src="img/user-07.png" class="img-fluid"></span><b> ' + data[i].Firstname + " " + data[i].Lastname + '</b>' + " vous a été ajouté." + '<img src="img/add-friend.png" width="30px" class="pull-right"></span><hr></span></div></div></a>');
            }
        }
    });
    $.ajax({
        type: "POST",
        url: "http://192.168.43.69:1880/nbrPatActif",
        //timeout:1000,  
        data: { id: idDr },
        error: function () {
            swal("Erreur de connexion !", "Vérifier votre connexion Internet", "error");
        },
        success: function (data) {
            $("#nbrP").text(data[0].nbrPat);
        }
    });

    $.ajax({
        type: "POST",
        url: "http://192.168.43.69:1880/archive",
        data: { id: idDr },
        success: function (data) {
            for (var i = data.length - 1; i >= 0; i--) {
                $("#archive").append('<a href="#"><div class="media"><hr><div class="media-body"><span class="noti-title" id="nomnot"><span class="avatar"><img src="img/user-07.png" class="img-fluid"></span><b> ' + data[i].Firstname + " " + data[i].Lastname + '</b>' + " vous a été archivé.  " + '<img src="img/add-friend.png" width="30px" class="pull-right"></span><hr></span></div></div></a>');
            }
        }
    });
    $.ajax({
        type: "POST",
        url: "http://192.168.43.69:1880/nbrArch",
        //timeout:1000,  
        data: { id: idDr },
        error: function () {
            swal("Erreur de connexion !", "Vérifier votre connexion Internet", "error");
        },
        success: function (data) {
            $("#Arch").text(data[0].nbrArch);
        }
    });

});