
$(document).ready(function () {
    var idDr = localStorage.getItem("id");

    $.ajax({
        type: "POST",
        url: "http://192.168.1.13:1880/nbrArch",
        //timeout:1000,  
        data: { id: idDr },
        error: function () {
            swal("Erreur de connexion !", "Vérifier votre connexion Internet 😕", "error");
        },
        success: function (data) {
            $("#badge-Arch").text(data[0].nbrArch);
        }
    });

    $.ajax({
        type: "POST",
        url: "http://192.168.1.13:1880/nbrPatActif",
        //timeout:1000,  
        data: { id: idDr },
        error: function () {
            swal("Erreur de connexion !", "Vérifier votre connexion Internet 😕", "error");
        },
        success: function (data) {
            $("#nbrPat").text(data[0].nbrPat);
        }
    });

    $.ajax({
        type: "POST",
        url: "http://192.168.1.13:1880/affichepatients",
        data: { idDr: idDr },
        error: function () {
            swal("Erreur de connexion !", "Vérifier votre connexion Internet 😕", "error");
        },
        success: function (data) {

            if (data.length == 0) {
                $("#pp").append('<div><span><h4 style="font-family:verdana; color:#CF5338;"><b>Aucun Patient</b></h4></span></div>');
            } else {
                for (var i = 0; i < data.length; i++) {

                    $("#patient").append('<div class="col-md-4 col-sm-4 col-lg-3"><div class="profile-widget" ><div class="doctor-img"><a class="profile" style="cursor: pointer;" id="' + data[i].Id + '" href="profile.html"><img class="avatar" src="img/user-07.png" id="' + data[i].Id + '" alt=""></a></div><div class="dropdown profile-action"><a href="#" class="action-icon dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i class="fa fa-ellipsis-v"></i></a><div class="dropdown-menu dropdown-menu-right"><a class="profile" style="cursor: pointer; margin-left: 23px;" id="' + data[i].Id + '" href="profile.html"><i id="' + data[i].Id + '" class="fa fa-user m-r-5" style="color:yellowgreen;"></i> Profil</a><br><a class="supprimer" style="cursor: pointer; margin-left: 23px;" id="' + data[i].Id + '"><i id="' + data[i].Id + '" class="fa fa-trash-o m-r-5" style="color:red;"></i> Supprimer</a></div></div><label style="display : none;" id="id">' + data[i].Id + '</label><h4 class="doctor-name text-ellipsis"><a id="nom" style="font-family:verdana;"> <i class="fa fa-user"></i>' + " " + data[i].Firstname + '' + " " + '' + data[i].Lastname + '</a></h4><div class="user-country"><i class="fa fa-phone" id="num">' + " " + '' + data[i].Num + '</i></div></div></div>');

                        
                    $(document).on('click', '.profile', function (event) {
                        idMod = $(event.target).attr("id");
                        localStorage.setItem('idEdit', idMod);
                        //window.location.href = "profile.html";
                        //alert(idMod);
                    });

                    //suppression
                    $(document).on('click', '.supprimer', function (event) {

                        var idSupp = $(event.target).attr("id");
                        console.log(idSupp)
                        $.ajax
                            ({
                                success: function () {
                                    Swal.fire({
                                        title: 'Suppression patient !',
                                        text: "Voulez-vous supprimer ce patient ?",
                                        type: 'warning',
                                        showCancelButton: true,
                                        confirmButtonColor: '#3085d6',
                                        cancelButtonColor: '#d33',
                                        confirmButtonText: 'Oui',
                                        cancelButtonText: 'Annuler'
                                    }).then((result) => {
                                        if (result.value) {
                                            $.ajax
                                                ({
                                                    type: "POST",  //Request type                                         
                                                    url: "http://192.168.1.13:1880/supppatient",
                                                    data: { id: idSupp },
                                                });
                                            window.location.href = "doctors.html";

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
                }
            }

        }
    });

    $.ajax({
        type: "POST",
        url: "http://192.168.1.13:1880/FLpatient",
        data: { id: idDr },
        success: function (data) {
            for (var i = data.length-1; i >= 0; i--) {
                $("#imgg").append('<a href="#"><div class="media"><hr><div class="media-body"><span class="noti-title" id="nomnot"><span class="avatar"><img src="img/user-07.png" class="img-fluid"></span><b> ' + data[i].Firstname + " " + data[i].Lastname + '</b>' + " vous a été ajouté." + '<img src="img/add-friend.png" width="30px" class="pull-right"></span><hr></span></div></div></a>');
            }
        }
    });
    $.ajax({
        type: "POST",
        url: "http://192.168.1.13:1880/nbrPatActif",
        //timeout:1000,  
        data: { id: idDr },
        error: function () {
            swal("Erreur de connexion !", "Vérifier votre connexion Internet 😕", "error");
        },
        success: function (data) {
            $("#nbrP").text(data[0].nbrPat);
        }
    });

    $.ajax({
        type: "POST",
        url: "http://192.168.1.13:1880/archive",
        data: { id: idDr },
        success: function (data) {
            for (var i = data.length-1; i >= 0; i--) {
                $("#archive").append('<a href="#"><div class="media"><hr><div class="media-body"><span class="noti-title" id="nomnot"><span class="avatar"><img src="img/user-07.png" class="img-fluid"></span><b> ' + data[i].Firstname + " " + data[i].Lastname + '</b>' + " vous a été archivé.  " + '<img src="img/add-friend.png" width="30px" class="pull-right"></span><hr></span></div></div></a>');
            }
        }
    });
    $.ajax({
        type: "POST",
        url: "http://192.168.1.13:1880/nbrArch",
        //timeout:1000,  
        data: { id: idDr },
        error: function () {
            swal("Erreur de connexion !", "Vérifier votre connexion Internet 😕", "error");
        },
        success: function (data) {
            $("#Arch").text(data[0].nbrArch);
        }
    });

});