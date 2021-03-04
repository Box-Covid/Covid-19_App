$(document).ready(function () {
    var id = localStorage.getItem("id");
    $.ajax({
        type: "POST",
        url: "http://192.168.43.69:1880/fetchcmntr",
        //timeout:1000,  
        data: { id: id },
        error: function () {
            swal("Erreur de connexion !", "Vérifier votre connexion Internet", "error");
        },
        success: function (data) {
            for (var i =0 ; i < data.length ; i++) {
                if (data == "") {
                    $(".inner-main-body").append('<h4> aucun commentaire</h4>');
                } else {
                    var dateCmntr = data[i].dateC;
                                var dtc = dateCmntr.substr(0, 19);
                                //console.log(dtc);
                                $(".inner-main-body").append('<div class="card mb-2"> <div class="card-body p-2 p-sm-3"> <div class="media forum-item"> <a href="#" data-toggle="collapse" data-target=".forum-content"><img src="img/avatar1.png" class="mr-3 rounded-circle" width="50" alt="User" /></a> <div class="media-body"> <h4>'+ data[i].Firstname +" "+ data[i].Lastname +'</h4> <p class="text-secondary" style="overflow-wrap: anywhere;">📝 '+ data[i].msg +' </p> <p class="text-muted">⌚ Posted <span class="text-secondary font-weight-bold">'+ dtc +'</span> </p> </div> </div> </div> </div>');
                }
            }
            
        }
    });

    $("#send").click(function () {
        var msg = $("#cmntr").val();
        $.ajax({
            type: "POST",
            url: "http://192.168.43.69:1880/addcmntr",
            //timeout:1000,  
            data: { msg: msg, id: id },
            error: function () {
                swal("Erreur de connexion !", "Vérifier votre connexion Internet", "error");
            },
            success: function () {
                $.ajax({
                    type: "POST",
                    url: "http://192.168.43.69:1880/fetchcmntr",
                    //timeout:1000,  
                    data: { id: id },
                    error: function () {
                        swal("Erreur de connexion !", "Vérifier votre connexion Internet", "error");
                    },
                    success: function (data) {
                        for (var i =0 ; i < data.length ; i++) {
                            if (data == "") {
                                $(".inner-main-body").append('<h4> aucun commentaire</h4>');
                            } else {
                                var dateCmntr = data[i].dateC;
                                var dtc = dateCmntr.substr(0, 19);
                               // console.log(dtc);
                                $(".inner-main-body").append('<div class="card mb-2"> <div class="card-body p-2 p-sm-3"> <div class="media forum-item"> <a href="#" data-toggle="collapse" data-target=".forum-content"><img src="img/avatar1.png" class="mr-3 rounded-circle" width="50" alt="User" /></a> <div class="media-body"> <h6>'+ data[i].Firstname +" "+ data[i].Lastname +'</h6> <p class="text-secondary" style="overflow-wrap: anywhere;">📝 '+ data[i].msg +' </p> <p class="text-muted">⌚ Posted <span class="text-secondary font-weight-bold">'+ dtc +'</span> </p> </div> </div> </div> </div>');
                            }
                        }
                        
                    }
                });
            
            }
        });
    })

    $("#refresh").click(function () {
        $.ajax({
            type: "POST",
            url: "http://192.168.43.69:1880/fetchcmntr",
            //timeout:1000,  
            data: { id: id },
            error: function () {
                swal("Erreur de connexion !", "Vérifier votre connexion Internet", "error");
            },
            success: function (data) {
                for (var i =0 ; i < data.length ; i++) {
                    if (data == "") {
                        $(".inner-main-body").append('<h4> aucun commentaire</h4>');
                    } else {
                        var dateCmntr = data[i].dateC;
                                    var dtc = dateCmntr.substr(0, 19);
                                    //console.log(dtc);
                                    $(".inner-main-body").append('<div class="card mb-2"> <div class="card-body p-2 p-sm-3"> <div class="media forum-item"> <a href="#" data-toggle="collapse" data-target=".forum-content"><img src="img/avatar1.png" class="mr-3 rounded-circle" width="50" alt="User" /></a> <div class="media-body"> <h6>'+ data[i].Firstname +" "+ data[i].Lastname +'</h6> <p class="text-secondary" style="overflow-wrap: anywhere;">📝 '+ data[i].msg +' </p> <p class="text-muted">⌚ Posted <span class="text-secondary font-weight-bold">'+ dtc +'</span> </p> </div> </div> </div> </div>');
                    }
                }
                
            }
        });
    })

})