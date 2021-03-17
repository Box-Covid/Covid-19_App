$(document).ready(function () {
    var id = localStorage.getItem("id");
    $.ajax({
        type: "POST",
        url: "http://192.168.43.69:1880/idpatientConn",
        //timeout:1000,  
        data: { id: id },
        error: function () {
            swal("Erreur de connexion !", "Vérifier votre connexion Internet", "error");
        },
        success: function (data) {
            var dateN = data[0].DateBirth;
            var ch = dateN.substr(0, 10);
            // var nowDate = new Date(parseInt(dateN.substr(6)));
            // result += nowDate.format("dd/mm/yyyy") + " : dd/mm/yyyy";
            $("#nompatient").text(data[0].Firstname + " " + data[0].Lastname);
            $("#email").text(data[0].Username);
            $("#tel").text(data[0].Num);
            $("#dateNaiss").text(ch);
            $("#sexe").text(data[0].Sexe);
        }
    });
})