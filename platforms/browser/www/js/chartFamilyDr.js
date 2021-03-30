$(document).ready(function () {
	// Bar Chart
	var idpatient = localStorage.getItem('idEdit');

	$.ajax({
		type: "POST",
		url: "http://192.168.43.69:1880/idpatientStat",
		data: { id: idpatient },
		success: function (data) {
			var dated = data[0].DateMess;
			var datedebut = dated.substr(0, 10);
			var datef = data[1].DateMess;
			var datefin = datef.substr(0, 10);

			var DateFin = datef.substr(0, 16);

			for (let i = 0; i < 19; i++) {
				var aux = "";
				aux = data[i].DateMess;
				data[i].DateMess = aux.substring(11, 16);

			}

			var temp = data[0].Temp + "°C";
			$('.temp').html(temp);

			var hum = data[0].Hum + "%";
			$('.humidity').html(hum);

			var press = data[0].Press + "%";
			$('.pressure').html(press);

			var tempCorp = data[0].TempBody + "°C";
			$('.TempCorp').html(tempCorp);

			var HeartRate = data[0].HeartRate + "bpm";
			$('.HR').html(HeartRate);

			var spo2 = data[0].spo2 + "%";
			$('.spo2').html(spo2);

			
			var nb = 0 ;
			if (data[0].TempBody >= 38) {
				$("#img").append('<a href="#"><div class="media"><hr><div class="media-body"><p class="noti-details"><span class="noti-title" id="nomnot"><span class="avatar"><img src="img/user-07.png" class="img-fluid"></span><b> ' + data[0].Firstname + " " + data[0].Lastname + '</b></span> <span class="noti-title" id="not"><p style= "font-family:verdana; margin-left: 5px; color:#B50818;"><img src="img/xx.jpg" style= "margin-left: 40px; margin-right: 8px; width:20px ; height:20px ;"><b>Alerte: </b><span style="color:#0C0B0B"> La température corporelle du patient ' + data[0].Firstname + " " + data[0].Lastname + ' a dépassé le seuil.</span><br><p class="text-muted"><span style="margin-left: 215px" class="text-secondary"><i class="fa fa-calendar"> </i>' +" "+ DateFin + '</span> </p></p><hr></span></p></div></div></a>');
				nb++;
			}
			if (data[0].HeartRate >= 100) {
				$("#img").append('<a href="#"><div class="media"><hr><div class="media-body"><p class="noti-details"><span class="noti-title" id="nomnot"><span class="avatar"><img src="img/user-07.png" class="img-fluid"></span><b> ' + data[0].Firstname + " " + data[0].Lastname + '</b></span> <span class="noti-title" id="not"><p style= "font-family:verdana; margin-left: 5px; color:#B50818;"><img src="img/xx.jpg" style= "margin-left: 40px; margin-right: 8px; width:20px ; height:20px ;"><b>Alerte: </b><span style="color:#0C0B0B"> La fréquence cardiaque du patient ' + data[0].Firstname + " " + data[0].Lastname + ' a dépassé le seuil.</span><br><p class="text-muted"><span style="margin-left: 215px" class="text-secondary"><i class="fa fa-calendar"> </i>' +" "+ DateFin + '</span> </p></p><hr></span></p></div></div></a>');
				nb++;
			}
			if (data[0].spo2 >= 100) {
				$("#img").append('<a href="#"><div class="media"><hr><div class="media-body"><p class="noti-details"><span class="noti-title" id="nomnot"><span class="avatar"><img src="img/user-07.png" class="img-fluid"></span><b> ' + data[0].Firstname + " " + data[0].Lastname + '</b></span> <span class="noti-title" id="not"><p style= "font-family:verdana; margin-left: 5px; color:#B50818;"><img src="img/xx.jpg" style= "margin-left: 40px; margin-right: 8px; width:20px ; height:20px ;"><b>Alerte: </b><span style="color:#0C0B0B"> La saturation d&lsquo;oxygène dans le sang (SPO2) du patient ' + data[0].Firstname + " " + data[0].Lastname + ' a dépassé le seuil.</span><br><p class="text-muted"><span style="margin-left: 215px" class="text-secondary"><i class="fa fa-calendar"> </i>' +" "+ DateFin + '</span> </p></p><hr></span></p></div></div></a>');
				nb++;
			}
			 $("#nb").text(nb);

			//Date mesures
			$(".datedebut").append(
				"<i>" + "du " + datedebut + " au " + "</i>");
			$(".datefin").append(
				"<i>" + datefin + "</i>");
			// Line Chart TempBody

			var lineChartData = {
				labels: [data[18].DateMess, data[17].DateMess, data[16].DateMess, data[15].DateMess, data[14].DateMess, data[13].DateMess, data[12].DateMess, data[11].DateMess, data[10].DateMess, data[9].DateMess, data[8].DateMess, data[7].DateMess, data[6].DateMess, data[5].DateMess, data[4].DateMess, data[3].DateMess, data[2].DateMess, data[1].DateMess, data[0].DateMess],
				datasets: [{
					label: "Valeur mesurée",
					backgroundColor: "rgba(255, 188, 53, 0.5)",
					data: [data[18].TempBody, data[17].TempBody, data[16].TempBody, data[15].TempBody, data[14].TempBody, data[13].TempBody, data[12].TempBody, data[11].TempBody, data[10].TempBody, data[9].TempBody, data[8].TempBody, data[7].TempBody, data[6].TempBody, data[5].TempBody, data[4].TempBody, data[3].TempBody, data[2].TempBody, data[1].TempBody, data[0].TempBody]
				}, {
					label: "Seuil maximal",
					backgroundColor: "rgba(218, 47, 47, 0.5)",
					fill: false,
					pointRadius: 0,
					borderColor: "rgba(218, 47, 47,0.5)",
					data: [38, 38, 38, 38, 38, 38, 38, 38, 38, 38, 38, 38, 38, 38, 38, 38, 38, 38, 38, 38, 38, 38, 38]
				}]
			};

			var linectx = document.getElementById('tempcorphum').getContext('2d');
			window.myLine = new Chart(linectx, {
				type: 'line',
				data: lineChartData,
				options: {
					responsive: true,
					legend: {
						display: false,
					},
					tooltips: {
						mode: 'index',
						intersect: false,
					}
				}
			});


			// Line Chart Heat Rate

			var lineChartData = {
				labels: [data[18].DateMess, data[17].DateMess, data[16].DateMess, data[15].DateMess, data[14].DateMess, data[13].DateMess, data[12].DateMess, data[11].DateMess, data[10].DateMess, data[9].DateMess, data[8].DateMess, data[7].DateMess, data[6].DateMess, data[5].DateMess, data[4].DateMess, data[3].DateMess, data[2].DateMess, data[1].DateMess, data[0].DateMess],
				datasets: [{
					label: "Valeur mesurée",
					backgroundColor: "rgba(85, 206, 99, 0.5)",
					data: [data[18].HeartRate, data[17].HeartRate, data[16].HeartRate, data[15].HeartRate, data[14].HeartRate, data[13].HeartRate, data[12].HeartRate, data[11].HeartRate, data[10].HeartRate, data[9].HeartRate, data[8].HeartRate, data[7].HeartRate, data[6].HeartRate, data[5].HeartRate, data[4].HeartRate, data[3].HeartRate, data[2].HeartRate, data[1].HeartRate, data[0].HeartRate]
				}, {
					label: "Seuil maximal",
					backgroundColor: "rgba(255, 188, 53, 0.5)",
					fill: false,
					pointRadius: 0,
					borderColor: "rgba(220,20,60,0.5)",
					data: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100]
				}, {
					label: "Seuil minimal",
					backgroundColor: "rgba(255, 188, 53, 0.5)",
					fill: false,
					pointRadius: 0,
					borderColor: "rgba(220,20,60,0.5)",
					data: [60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60]
				}]
			};

			var linectx = document.getElementById('heartrate').getContext('2d');
			window.myLine = new Chart(linectx, {
				type: 'line',
				data: lineChartData,
				options: {
					responsive: true,
					legend: {
						display: false,
					},
					tooltips: {
						mode: 'index',
						intersect: false,
					}
				}
			});

			// Line Chart SPO2

			var lineChartData = {
				labels: [data[18].DateMess, data[17].DateMess, data[16].DateMess, data[15].DateMess, data[14].DateMess, data[13].DateMess, data[12].DateMess, data[11].DateMess, data[10].DateMess, data[9].DateMess, data[8].DateMess, data[7].DateMess, data[6].DateMess, data[5].DateMess, data[4].DateMess, data[3].DateMess, data[2].DateMess, data[1].DateMess, data[0].DateMess],
				datasets: [{
					label: "Valeur mesurée",
					backgroundColor: "rgba(0, 158, 251, 0.5)",
					data: [data[18].spo2, data[17].spo2, data[16].spo2, data[15].spo2, data[14].spo2, data[13].spo2, data[12].spo2, data[11].spo2, data[10].spo2, data[9].spo2, data[8].spo2, data[7].spo2, data[6].spo2, data[5].spo2, data[4].spo2, data[3].spo2, data[2].spo2, data[1].spo2, data[0].spo2]
				}, {
					label: "Seuil max",
					backgroundColor: "rgba(255, 188, 53, 0.5)",
					fill: false,
					pointRadius: 0,
					borderColor: "rgba(220,20,60,0.5)",
					data: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100]
				}, {
					label: "Seuil min",
					backgroundColor: "rgba(255, 188, 53, 0.5)",
					fill: false,
					pointRadius: 0,
					borderColor: "rgba(220,20,60,0.5)",
					data: [90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90]
				}]

			};

			var linectx = document.getElementById('spo2').getContext('2d');
			window.myLine = new Chart(linectx, {
				type: 'line',
				data: lineChartData,
				options: {
					responsive: true,
					legend: {
						display: false,
					},
					tooltips: {
						mode: 'index',
						intersect: false,
					}
				}
			});

		}, error: function (data) {
			swal("Erreur de connexion !", "Vérifier votre connexion internet 😕", "error");
		}
	});

	//Ajax médicament
	$.ajax({
		type: "POST",
		url: "http://192.168.43.69:1880/medicament",
		timeout: 1000,
		data: { id: idpatient },
		success: function (data) {
			//médicament
			$(".medicament").append(
				'<tr class="table-primary">' +

				"<td >" +
				"<h5 >" + "Nom médicament" + "</h5>" +
				"</td>" +

				"<td>" +
				"<h5 >" + "Dose" + "</h5>" +
				"</td>" +

				"<td>" +
				"<h5 >" + "Nombre de prises" + "</h5>" +
				"</td>" +

				"<td>" +
				"<h5 >" + "Détail" + "</h5>" +
				"</td>" +

				"</tr>");
			for (let i = 0; i < data.length; i++) {

				//Tableau médicaments
				$(".medicament").append(
					"<tr>" +

					"<td >" +
					"<p>" + data[i].NameDrug + "</p>" +
					"</td>" +

					"<td>" +
					"<p>" + data[i].Dose + "</p>" +
					"</td>" +

					"<td>" +
					"<p>" + data[i].NumDrug + "</p>" +
					"</td>" +

					"<td>" +
					"<p>" + data[i].DesripDrugs + "</p>" +
					"</td>" +

					"</tr>");
			}


		}, error: function (data) {
			swal("Erreur de connexion !", "Vérifier votre connexion internet 😕", "error");
		}
	});


	//Ajax maladie


	$.ajax({
		type: "POST",
		url: "http://192.168.43.69:1880/maladie",
		timeout: 1000,
		data: { id: idpatient },
		success: function (data) {

			// maladie

			$(".maladie").append(
				'<tr class="table-success">' +
				"<td >" +
				"<h5 >" + "Nom maladie" + "</h5>" +
				"</td>" +

				"<td>" +
				"<h5 >" + "Degré de gravité" + "</h5>" +
				"</td>" +

				"<td>" +
				"<h5 >" + "Description" + "</h5>" +
				"</td>" +

				"</tr>");

			for (let i = 0; i < data.length; i++) {
				//indicem++;

				//Tableau maladies
				$(".maladie").append(
					"<tr>" +

					"<td >" +
					"<p>" + data[i].NameDis + "</p>" +
					"</td>" +

					"<td>" +
					"<p>" + data[i].DegDis + "</p>" +
					"</td>" +

					"<td>" +
					"<p>" + data[i].DesripDis + "</p>" +
					"</td>" +

					"</tr>");

			}


		}, error: function (data) {
			swal("Erreur de connexion !", "Vérifier votre connexion internet 😕", "error");
		}
	});
	
	barChart();

	$(window).resize(function () {
		barChart();
	});

	function barChart() {
		$('.bar-chart').find('.item-progress').each(function () {
			var itemProgress = $(this),
				itemProgressWidth = $(this).parent().width() * ($(this).data('percent') / 100);
			itemProgress.css('width', itemProgressWidth);
		});
	};
});