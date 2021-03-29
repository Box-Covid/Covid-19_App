
$(document).ready(function () {
    var idDr = localStorage.getItem("id");

    $.ajax({
        type: "POST",
        url: "http://192.168.1.13:1880/archive",
        data: { id: idDr },
        success: function (data) {
            for (var i = data.length-1; i >= 0; i--) {
                $("#archive").append('<a href="#"><div class="media"><hr><div class="media-body"><span class="noti-title" id="nomnot"><span class="avatar"><img src="img/user-07.png" class="img-fluid"></span><b> ' + data[i].Firstname + " " + data[i].Lastname + '</b>' + " est devenu dans la liste d'archive."+'<br><img src="img/document.png" width="20px" class="pull-right"></span><hr></span></div></div></a>');
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
