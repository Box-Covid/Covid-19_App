$(document).ready(function () {
	// Bar Chart
	var idpatient = localStorage.getItem('id');

	//Ajax médicament

	$.ajax({
		type: "POST",
		url: "http://192.168.43.69:1880/notMedicament",
		data: { id: idpatient },
		success: function (data) {

			for (var i = data.length - 1; i >= 0; i--) {

				$("#med").append('<a href="#notmed"><div class="media"><hr><div class="media-body"><p class="noti-details"><span class="noti-title" id="nomnot"><span class="avatar"><img src="img/doctor.png" class="img-fluid"></span><b>Dr. ' + data[i].Firstname + " " + data[i].Lastname + '</b></span> <span class="noti-title" id="not"><p style= "font-family:verdana; margin-left: 40px; margin-right: 8px; color:#B50818;"><span style="color:#0C0B0B">📝 Vous a ajouté un nouveau médicament <center><b style="color: #107EC6;"><u>( ' + data[i].NameDrug + ' )</u></b></center> <img src="img/med.png" width="30px" style="margin-left: 330px; margin-top: -50px;"><hr style="margin-top: -10px;"></span></p></span></p></div></div></a>');

			}
		}
	});


	$.ajax({
		type: "POST",
		url: "http://192.168.43.69:1880/nbrMedicament",
		//timeout:1000,  
		data: { idu: idpatient },
		error: function () {
			swal("Erreur de connexion !", "Vérifier votre connexion Internet 😕", "error");
		},
		success: function (data) {
			$("#nbmed").text(data[0].nbrMed);
		}
	});

})