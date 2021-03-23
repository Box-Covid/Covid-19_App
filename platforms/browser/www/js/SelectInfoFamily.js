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
            $("#pat").text(data[0].FirstnameP +" "+data[0].LastnameP);  
            
        }
    });
})