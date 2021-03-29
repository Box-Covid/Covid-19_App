$(document).ready(function () {
    var idu = localStorage.getItem("idEdit");
    var idDr = localStorage.getItem("id");


    $.ajax({
        type: "POST",
        url: "http://192.168.1.13:1880/fetchcmntrD",
        //timeout:1000,  
        data: { idP: idu, idD: idDr },
        timeout: 2000,
        error: function () {
            swal("Erreur de connexion !", "Vérifier votre connexion internet 😕", "error");
        },
        success: function (data) {
            if (data.length == 0) {
                $(".inner-main-body").append('<div><span style="text-align:center"><h2 style= "color:#CF5338; opacity: 0.5; margin-bottom: 20px;"><b>Aucun Message</b></h2></span></div>');
            } else {
                for (var i = 0; i < data.length; i++) {
                    var dateCmntr = data[i].dateC;
                    var dtc = dateCmntr.substr(0, 19);
                    if (data[i].source == 0) {
                        //console.log(dtc);
                        $(".inner-main-body").append('<div class="card mb-2"> <div class="card-body p-2 p-sm-3"> <div class="media forum-item"> <a href="#" data-toggle="collapse" data-target=".forum-content"><img src="img/user-07.png" class="mr-3 rounded-circle" width="50" alt="User" /></a> <div class="media-body"> <h4>' + data[i].FirstnameP + " " + data[i].LastnameP + '</h4> <p class="text-secondary" style="overflow-wrap: anywhere;">📝 ' + data[i].msg + ' </p> <p class="text-muted">⌚ Posted <span class="text-secondary font-weight-bold">' + dtc + '</span> </p> </div> </div> </div> </div>');

                    } else if (data[i].source == 1) {
                        $(".inner-main-body").append('<div class="card mb-2"> <div class="card-body p-2 p-sm-3"> <div class="media forum-item"> <a href="#" data-toggle="collapse" data-target=".forum-content"><img src="img/doctor.png" class="mr-3 rounded-circle" width="50" alt="User" /></a> <div class="media-body"> <h4>' + data[i].FirstnameD + " " + data[i].LastnameD + '</h4> <p class="text-secondary" style="overflow-wrap: anywhere;">📝 ' + data[i].msg + ' </p> <p class="text-muted">⌚ Posted <span class="text-secondary font-weight-bold">' + dtc + '</span> </p> </div> </div> </div> </div>');
                    }
                }
            }

        }
    });

    

    $("#send").click(function () {
        var msg = $("#cmntr").val();
        $.ajax({
            type: "POST",
            url: "http://192.168.1.13:1880/addcmntr",
            //timeout:1000,  
            data: { msg: msg, idP: idu, idD: idDr },
            error: function () {
                swal("Erreur de connexion !", "Vérifier votre connexion internet 😕", "error");
            },
            success: function () {
                window.location.replace("profile-messages.html");
            }
        });
    })

    $("#refresh").click(function () {
        $.ajax({
            type: "POST",
            url: "http://192.168.1.13:1880/fetchcmntrD",
            //timeout:1000,  
            data: { idP: idu, idD: idDr },
            error: function () {
                swal("Erreur de connexion !", "Vérifier votre connexion internet 😕", "error");
            },
            success: function (data) {
                window.location.replace("profile-messages.html");
            }
        });
    })

})