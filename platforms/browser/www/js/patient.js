$(document).ready(function () {
    var id = localStorage.getItem("idEdit");
    $.ajax({
        type: "POST",
        url: "http://192.168.43.69:1880/idpatient",
        //timeout:1000,  
        data: { id: id },
        error: function () {
            swal("Erreur de connexion !", "Vérifier votre connexion Internet 😕", "error");
        },
        success: function (data) {
            var dateN = data[0].DateBirth;
            var ch = dateN.substr(0, 10);
            // var nowDate = new Date(parseInt(dateN.substr(6)));
            // result += nowDate.format("dd/mm/yyyy") + " : dd/mm/yyyy";
            $("#nompatient").text(data[0].Firstname + " " + data[0].Lastname);
            //$("#role").text(data[0].Role);
            $("#tel").text(data[0].Num);
            $("#date").text(ch);
            $("#sexe").text(data[0].Sexe);
            for (var i = 0; i < data.length; i++) {

                $("#sss").click(function () {

                    //var idSupp = $(event.target).attr("idEdit");
                    //console.log(idSupp)
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
                                                url: "http://192.168.43.69:1880/supppatient",
                                                data: { id: id },
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
    });
})