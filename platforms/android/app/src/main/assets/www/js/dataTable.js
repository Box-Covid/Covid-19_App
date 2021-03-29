$(document).ready(function () {
    var t = $('#example').DataTable();

    //Fetching Deleted Patients : 
    var id = localStorage.getItem("id");
    $.ajax({
        type: "POST",
        url: "http://192.168.43.69:1880/nbrArch",
        //timeout:1000,  
        data: { id: id },
        error: function () {
            swal("Erreur de connexion !", "Vérifier votre connexion Internet 😕", "error");
        },
        success: function (data) {
            $("#badge-Arch").text(data[0].nbrArch);
        }
    });
    $.ajax({
        type: "POST",
        url: "http://192.168.43.69:1880/selectArch",
        //timeout:1000,  
        data: { Id: id },
        error: function () {
            swal("Erreur de connexion !", "Vérifier votre connexion Internet 😕", "error");
        },
        success: function (data) {
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
                    ('<center> <a class="retour" style="cursor: pointer;" id="' + data[i].Id + '"><i id="' + data[i].Id + '" class="fa fa-arrow-circle-left m-r-10" style="color:#009999;font-size: x-large;"></i></a>   <a class="supprimer" style="cursor: pointer;" id="' + data[i].Id + '"><i id="' + data[i].Id + '" class="fa fa-trash" style="color:red;font-size: x-large;"></i></a> </center>')
                ]).draw(false);
                // var name = data[i].Firstname + " " + data[i].Lastname;
                //Delete Patient from Archive List : 
                $(document).on('click', '.supprimer', function (event) {

                    var idSupp = $(event.target).attr("id");
                    $.ajax
                        ({

                            success: function () {
                                Swal.fire({
                                    title: 'Supprimer patient archivé ! ❌',
                                    text: 'Voulez-vous supprimer définitivement ce patient ?',
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
                                                url: "http://192.168.43.69:1880/supppatientArchv",
                                                data: { id: idSupp },
                                            });
                                        window.location.href = "Archives.html";

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
                $(document).on('click', '.retour', function (event) {

                    var idBack = $(event.target).attr("id");
                    $.ajax
                        ({

                            success: function () {
                                Swal.fire({
                                    title: 'Retourner patient dans votre liste principale ! 🔙',
                                    text: 'Voulez-vous retourner ce patient dans votre liste principale ?',
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
                                                url: "http://192.168.43.69:1880/BackpatientArchv",
                                                data: { id: idBack },
                                            });
                                        window.location.href = "Archives.html";

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
    });

});