// get username and password from the inputs and send them to the node-red:
var idMod = null;
$(document).ready(function () {
    var idu = localStorage.getItem("idEdit");
    //console.log("ggg");

    $.ajax({
        type: "POST",
        url: "http://192.168.43.69:1880/affichemedicament",
        data: { idu: idu },
        error: function () {
            swal("Check your connexion to internet!!", "Try again!", "error");
        },
        success: function (data) {
            if (data.length == 0) {
                $("#medicament").append('<div><span style="text-align:center"><h2 style= "color:#CF5338; opacity: 0.5;"><b>Aucun Médicament</b></h2></span></div>');
            } else {
                for (var i = 0; i < data.length; i++) {
                    $("#medicament").append('<div id="medicament"><div class="experience-box"><ul class="experience-list"><li><div class="experience-user"><div class="before-circle"></div></div><div class="experience-content"><div class="timeline-content"><a href="#/" class="name"><hr>Nom :</a><a style="display: block; float: right; font-size: 20px;" href="edit-Medicament.html" class="mod"><i id="' + data[i].Id + '" class="fa fa-pencil m-r-5 text-success"></i></a><a style="display: block; float: right; font-size: 20px; cursor: pointer;" class="supp"><i id="' + data[i].Id + '" class="fa fa-trash-o m-r-5 text-danger"></i></a><label style="display : none;" id="id">' + data[i].Id + '</label><div></div><span class="time" id="nommedicament"><b>' + data[i].NameDrug + '</b></span></div></div></li><li><div class="experience-user"><div class="before-circle"></div></div><div class="experience-content"><div class="timeline-content"><a href="#/" class="name">Dose :</a><span class="time" id="dose"><b>' + data[i].Dose + '</b></span></div></div></li><li><div class="experience-user"><div class="before-circle"></div></div><div class="experience-content"><div class="timeline-content"><a href="#/" class="name">Nombre de prise : </a><span class="time" id="nbrprise"><b>' + data[i].NumDrug + '</b></span></div></div></li><li><div class="experience-user"><div class="before-circle"></div></div><div class="experience-content"><div class="timeline-content"><a href="#/" class="name">Détails : </a><span class="time" id="details"><b>' + data[i].DesripDrugs + '</b></span></div><hr></div></li></ul></div>');
                }
            }
            $(document).on('click', '.supp', function (event) {
                var idSupp = $(event.target).attr("id");
                console.log(idSupp);

                $.ajax
                    ({
                        success: function () {
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
                                            url: "http://192.168.43.69:1880/suppmedicament",
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



    const idModif = localStorage.getItem('idE');
    $.ajax({
        type: "POST",
        url: "http://192.168.43.69:1880/idd",
        data: { id: idModif },

        error: function () {
        },
        success: function (data) {
            $("#nom").val(data[0].NameDrug);
            $("#dose").val(data[0].Dose);
            $("#nbrprise").val(data[0].NumDrug);
            $("#details").val(data[0].DesripDrugs);

        }
    });

    $("#modd").click(function () {
        var nom = $("#nom").val();
        var dose = $("#dose").val();
        var nbrprise = $("#nbrprise").val();
        var details = $("#details").val();

        if ($.trim(nom).length != 0 && ($.trim(dose).length != 0) && ($.trim(nbrprise).length != 0) && ($.trim(details).length != 0)) {

            $.ajax({
                type: "POST",
                url: "http://192.168.43.69:1880/modmedicament",
                data: { nom: nom, dose: dose, nbrprise: nbrprise, details: details, id: idModif },
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


        } else {
            swal("Erreur de saisie !", "Veuillez vérifier vos champs", "error");
        }

    });




});
$(document).on('click', '.mod', function (event) {
    idMod = $(event.target).attr("id");
    localStorage.setItem('idE', idMod);
});
