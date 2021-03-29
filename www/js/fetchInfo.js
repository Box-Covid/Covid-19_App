$(document).ready(function () {
    var Id = localStorage.getItem("id");
    
    $.ajax({
        type: "POST",
        url: "http://192.168.1.13:1880/idDr",
        //timeout:1000,  
        data: { Id: Id },
        error: function () {
          //  $(".loader").fadeOut()
            swal("Erreur de connexion !", "Vérifier votre connexion Internet 😕", "error");
        },
        success: function (data) {  
            //$(".loader").fadeOut()
            var dateN = data[0].DateBirth;
            var ch = dateN.substr(0, 10);
            // var nowDate = new Date(parseInt(dateN.substr(6)));
            // result += nowDate.format("dd/mm/yyyy") + " : dd/mm/yyyy";
            $("#bienvenu").text("Bienvenu Dr. " + data[0].Firstname + " " + data[0].Lastname);
            $("#user-name").text("Dr. " + data[0].Firstname + " " + data[0].Lastname);
            $("#tel").text(data[0].Num);
            $("#email").text(data[0].Username);
            $("#dateNaiss").text(ch);
            $("#sexe").text(data[0].Sex);
        }
    });

    $.ajax({
        type: "POST",
        url: "http://192.168.1.13:1880/nbrArch",
        //timeout:1000,  
        data: { id: Id },
        error: function () {
            //swal("Erreur de connexion !", "Vérifier votre connexion Internet 😕", "error");
        },
        success: function (data) {
            $("#badge-Arch").text(data[0].nbrArch);
        }
    });
})