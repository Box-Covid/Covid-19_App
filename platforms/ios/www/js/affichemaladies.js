// get username and password from the inputs and send them to the node-red:
var idMod=null;
$(document).ready(function () {
    var idu = localStorage.getItem("idEdit");
    //console.log("ggg");

    $.ajax({
        type: "POST",
        url: "http://192.168.43.69:1880/affichemaladies",
        data: {idu: idu},
        error: function () {

        },
        success: function (data) {
           // console.log(data.length);
            if (data.length == 0) {
                $("#maladie").append('<div><span style="text-align:center"><h2 style= "color:#CF5338; opacity: 0.5;"><b>Aucune Maladie</b></h2></span></div>');
            } else {
                for (var i = 0; i < data.length; i++) {

                    $("#maladie").append('<div id="maladie"><div class="experience-box"><ul class="experience-list"><li><div class="experience-user"><div class="before-circle"></div></div><div class="experience-content"><div class="timeline-content"><a href="#/" class="name"><hr>Nom :</a><a style="display: block; float: right; font-size: 20px;"href="edit-Maladie.html" class="modifier"><i id="' + data[i].Id + '" class="fa fa-pencil m-r-5 text-success"></i></a><a style="display: block; float: right; font-size: 20px;" class="supprimer" style="cursor: pointer;"><i id="' + data[i].Id + '" class="fa fa-trash-o m-r-5 text-danger"></i></a><label style="display : none;" id="id">' + data[i].Id + '</label><div></div><span class="time" id="nommaladie"><b>' + data[i].NameDis + '</b></span></div></div></li><li><div class="experience-user"><div class="before-circle"></div></div><div class="experience-content"><div class="timeline-content"><a href="#/" class="name">Degré :</a><div></div><span class="time" id="degremaladie"><b>' + data[i].DegDis + '</b></span></div></div></li><li><div class="experience-user"><div class="before-circle"></div></div><div class="experience-content"><div class="timeline-content"><a href="#/" class="name">Détails :</a><div></div><span class="time" id="descriptionmaladie"><b>' + data[i].DesripDis + '</b></span></div><hr></div></li></ul></div>');
                }
            }
            $(document).on('click', '.supprimer', function (event) {

                var idSupp = $(event.target).attr("id");
                $.ajax
                    ({

                        success: function () {
                            //'id='+id,          
                            Swal.fire({
                                title: 'Are you sure?',
                                text: "You won't be able to revert this!",
                                type: 'warning',
                                showCancelButton: true,
                                confirmButtonColor: '#3085d6',
                                cancelButtonColor: '#d33',
                                confirmButtonText: 'Yes, delete it!'
                            }).then((result) => {
                                if (result.value) {
                                    $.ajax
                                        ({
                                            type: "POST",  //Request type                                         
                                            url: "http://192.168.43.69:1880/suppmaladie",
                                            data: { id: idSupp },
                                        });

                                    window.location.href = "profile.html";
                                }
                            })


                        },

                        error: function () {
                            swal(
                                'Oops...',
                                'Un problème est survenu!!',
                                'error'
                            )
                        }

                    });
            });

        }
    });

   
    const idModif = localStorage.getItem('idM');
    //console.log(idModif);
    $.ajax({
        type: "POST",
        url: "http://192.168.43.69:1880/idM",
        data: { id: idModif },

        error: function () {
        },
        success: function (data) {             
            $("#nommaladie").val(data[0].NameDis);
            $("#degremaladie").val(data[0].DegDis);
            $("#descriptionmaladie").val(data[0].DesripDis);
        }
    });

    $("#mod").click(function () {
        var nom = $("#nommaladie").val();
        var degre = $("#degremaladie").val();
        var description = $("#descriptionmaladie").val();


        if ($.trim(nom).length != 0 && ($.trim(degre).length != 0) && ($.trim(description).length != 0)) {

                $.ajax({
                    type: "POST",
                    url: "http://192.168.43.69:1880/modmaladie",
                    data: { nommaladie: nom, degremaladie: degre, descriptionmaladie: description, id: idModif},
                    error: function () {
                        swal("Erreur de connexion !", "Vérifier votre connexion internet", "error");
                    },
                    success: function () {
                        swal("Modification a été effectué avec succès", "Bienvenu dans Box-Covid !", "success");
                        setTimeout(() => {
                            window.location.replace("profile.html");
                        }, 2000);
                    }
                })


            }else {
            swal("Erreur de saisie !", "Veuillez vérifier vos champs", "error");
        }

    });


});
$(document).on('click', '.modifier', function (event) {
    idMod = $(event.target).attr("id");
    localStorage.setItem('idM', idMod);
});
