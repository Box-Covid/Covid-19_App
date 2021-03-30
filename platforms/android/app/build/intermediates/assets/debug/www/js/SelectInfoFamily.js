$(document).ready(function () {
    var id = localStorage.getItem("id");
    $.ajax({
        type: "POST",
        url: "http://192.168.43.69:1880/idFamily",
        //timeout:1000,  
        data: { Id: id },
        error: function () {
            swal("Erreur de connexion !", "Vérifier votre connexion Internet 😕", "error");
        },
        success: function (data) {
            // var nowDate = new Date(parseInt(dateN.substr(6)));
            // result += nowDate.format("dd/mm/yyyy") + " : dd/mm/yyyy";
            $("#bienvenu").text("Bienvenu Mme/M. " + data[0].Firstname + " " + data[0].Lastname);
            $("#user-name").text(data[0].Firstname + " " + data[0].Lastname);
            $("#email").text(data[0].Username);
            $("#tel").text(data[0].Num);
            $("#pat").text(data[0].FirstnameP + " " + data[0].LastnameP);

            var x = data[0].IdP;
            console.log(x);

            $.ajax({
                type: "POST",
                url: "http://192.168.43.69:1880/notMedicamentF",
                data: { id: x },
                success: function (data) {
        
                    for (var i = data.length - 1; i >= 0; i--) {
                        $("#medF").append('<a href="#notmed"><div class="media"><hr><div class="media-body"><p class="noti-details"><span class="noti-title" id="nomnot"><span class="avatar"><img src="img/doctor.png" class="img-fluid"></span><b>Dr. ' + data[i].Firstname +" "+ data[i].Lastname + '</b></span> <span class="noti-title" id="not"><p style= "font-family:verdana; margin-left: 40px; margin-right: 8px; color:#B50818;"><span style="color:#0C0B0B">📝 A ajouté un nouveau médicament <center><b style="color: #107EC6;"><u>( ' + data[i].NameDrug + ' )</u></b><span style="color:#0C0B0B"> à votre patient.</span></center> <img src="img/med.png" width="30px" style="margin-left: 330px; margin-top: -50px;"><hr style="margin-top: -10px;"></span></p></span></p></div></div></a>');
                    }
                }
            });

            $.ajax({
                type: "POST",
                url: "http://192.168.43.69:1880/nbrMedicamentF",
                //timeout:1000,  
                data: { id: x },
                error: function () {
                    swal("Erreur de connexion !", "Vérifier votre connexion Internet 😕", "error");
                },
                success: function (data) {
                    $("#nbmed").text(data[0].nbrMed);
                }
            });

        }
    });

})