$(document).ready(function () {
	// Bar Chart
	var idpatient = localStorage.getItem('id');

	$.ajax({
		type: "POST",
		url: "http://192.168.43.69:1880/idpatientStat",
		data: { id: idpatient },
		success: function (data) {
			var dated=data[0].DateMess;
			var datedebut=dated.substr(0,10);
			var datef=data[1].DateMess;
			var datefin=datef.substr(0,10);
			console.log(datefin);
			console.log(datedebut);
			for(let i=0; i<19; i++)
			{
				var aux= "";
				aux=data[i].DateMess;
				data[i].DateMess=aux.substring(11,16);
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

			//Date mesures
			$(".datedebut").append(
				 "<i>"+"du "+datedebut+" au "+"</i>" );
			 $(".datefin").append(
				"<i>"+datefin+"</i>" );
			// Line Chart TempBody

			var lineChartData = {
				labels: [data[18].DateMess,data[17].DateMess,data[16].DateMess,data[15].DateMess,data[14].DateMess,data[13].DateMess,data[12].DateMess,data[11].DateMess,data[10].DateMess,data[9].DateMess, data[8].DateMess, data[7].DateMess, data[6].DateMess, data[5].DateMess,data[4].DateMess, data[3].DateMess, data[2].DateMess, data[1].DateMess, data[0].DateMess],
				datasets: [{
					label: "Valeur mesurée",
					backgroundColor: "rgba(255, 188, 53, 0.5)",
					data: [data[18].TempBody,data[17].TempBody,data[16].TempBody,data[15].TempBody,data[14].TempBody,data[13].TempBody,data[12].TempBody,data[11].TempBody,data[10].TempBody,data[9].TempBody,data[8].TempBody,data[7].TempBody,data[6].TempBody,data[5].TempBody,data[4].TempBody,data[3].TempBody,data[2].TempBody,data[1].TempBody,data[0].TempBody]
				}, {
					label: "Seuil maximal",
					backgroundColor: "rgba(218, 47, 47, 0.5)",
					fill: false,
					pointRadius: 0,
					borderColor: "rgba(218, 47, 47,0.5)",
					data: [38, 38, 38, 38, 38, 38, 38, 38, 38, 38, 38, 38,38, 38, 38, 38, 38, 38, 38, 38, 38, 38, 38]
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
				labels: [data[18].DateMess,data[17].DateMess,data[16].DateMess,data[15].DateMess,data[14].DateMess,data[13].DateMess,data[12].DateMess,data[11].DateMess,data[10].DateMess,data[9].DateMess, data[8].DateMess, data[7].DateMess, data[6].DateMess, data[5].DateMess,data[4].DateMess, data[3].DateMess, data[2].DateMess, data[1].DateMess, data[0].DateMess],
				datasets: [{
					label: "Valeur mesurée",
					backgroundColor: "rgba(85, 206, 99, 0.5)",
					data: [data[18].HeartRate,data[17].HeartRate,data[16].HeartRate,data[15].HeartRate,data[14].HeartRate,data[13].HeartRate,data[12].HeartRate,data[11].HeartRate,data[10].HeartRate,data[9].HeartRate,data[8].HeartRate,data[7].HeartRate,data[6].HeartRate,data[5].HeartRate,data[4].HeartRate,data[3].HeartRate,data[2].HeartRate,data[1].HeartRate,data[0].HeartRate]
				}, {
					label: "Seuil maximal",
					backgroundColor: "rgba(255, 188, 53, 0.5)",
					fill: false,
					pointRadius: 0,
					borderColor: "rgba(220,20,60,0.5)",
					data: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100,100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100]
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
				labels: [data[18].DateMess,data[17].DateMess,data[16].DateMess,data[15].DateMess,data[14].DateMess,data[13].DateMess,data[12].DateMess,data[11].DateMess,data[10].DateMess,data[9].DateMess, data[8].DateMess, data[7].DateMess, data[6].DateMess, data[5].DateMess,data[4].DateMess, data[3].DateMess, data[2].DateMess, data[1].DateMess, data[0].DateMess],
				datasets: [{
					label: "Valeur mesurée",
					backgroundColor: "rgba(0, 158, 251, 0.5)",
					data: [data[18].spo2,data[17].spo2,data[16].spo2,data[15].spo2,data[14].spo2,data[13].spo2,data[12].spo2,data[11].spo2,data[10].spo2,data[9].spo2,data[8].spo2,data[7].spo2,data[6].spo2,data[5].spo2,data[4].spo2,data[3].spo2,data[2].spo2,data[1].spo2,data[0].spo2]
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
			swal("Erreur de connexion !", "Vérifier votre connexion internet", "error");
		}
	});

	//Ajax médicament


    $.ajax({
        type:"POST", 
        url: "http://192.168.43.69:1880/medicament", 
        timeout:1000,  
        data:{id:idpatient},
        success:function(data) {
			//médicament
			$(".medicament").append(
				"<tr>" +

					"<td >" +
					"<h5 >" + "Nom médicament" +"</h5>" +
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

            
        },error:function(data){
			swal("Erreur de connexion !", "Vérifier votre connexion internet", "error");
        }
    });


	//Ajax maladie


    $.ajax({
        type:"POST", 
        url: "http://192.168.43.69:1880/maladie", 
        timeout:1000,  
        data:{id:idpatient},
        success:function(data) {

						// maladie

						$(".maladie").append(
							"<tr>" +
								"<td >" +
								"<h5 >" + "Nom maladie" +"</h5>" +
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

            
        },error:function(data){
			swal("Erreur de connexion !", "Vérifier votre connexion internet", "error");
        }
    });
	/*	var barChartData = {
			labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
			datasets: [{
				label: 'Dataset 1',
				backgroundColor: 'rgba(0, 158, 251, 0.5)',
				borderColor: 'rgba(0, 158, 251, 1)',
				borderWidth: 1,
				data: [35, 59, 80, 81, 56, 55, 40]
			}, {
				label: 'Dataset 2',
				backgroundColor: 'rgba(255, 188, 53, 0.5)',
				borderColor: 'rgba(255, 188, 53, 1)',
				borderWidth: 1,
				data: [28, 48, 40, 19, 86, 27, 90]
			}]
		};
	
		var ctx = document.getElementById('bargraph').getContext('2d');
		window.myBar = new Chart(ctx, {
			type: 'bar',
			data: barChartData,
			options: {
				responsive: true,
				legend: {
					display: false,
				}
			}
		});*/


	// Bar Chart 2

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

/*


					// Line Chart

			var lineChartData = {
				labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
				datasets: [{
					label: "My First dataset",
					backgroundColor: "rgba(0, 158, 251, 0.5)",
					data: [data[0].Temp,data[1].Temp,data[2].Temp,data[3].Temp,data[4].Temp]

				}, {
				label: "My Second dataset",
				backgroundColor: "rgba(255, 188, 53, 0.5)",
				fill: true,
				data: [28, 48, 40, 19, 86, 27, 20, 90, 50, 20, 90, 20]
				}]
			};

			var linectx = document.getElementById('linegraph').getContext('2d');
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

*/