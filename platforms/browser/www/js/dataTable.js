$(document).ready(function () {
    var t = $('#example').DataTable();

    //Fetching Deleted Patients : 
    var id = localStorage.getItem("id");
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
                //     var dateN = data[i].DateBirth;
                //     var ch = dateN.substr(0, 10);
                //     $("#TBDT").append('<tr> <td>'+data[i].Firstname+'</td><td>'+data[i].Lastname+'</td><td>'+ch+'</td><td>'+data[i].Sexe+'</td><td>'+data[i].Num+'</td></tr>');
                // }
                t.row.add([
                    data[i].Firstname,
                    data[i].Lastname,
                    data[i].DateBirth,
                    data[i].Sexe,
                    data[i].Num
                ]).draw(false);
            }
        }
    });
});