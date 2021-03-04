$(document).ready(function(){
    $(".logout").click(function(){
      //localStorage.removeItem("image64");
      
      swal({
        title: "Déconnexion",
        text:  "Voulez-vous vraiment se déconnecter ?",
        type: "warning",
        confirmButtonClass: "btn-danger",
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Oui',
        showCancelButton: true,
        cancelButtonColor: '#d33',
      })
      .then((result) => {
        if (result.value) {
            localStorage.clear();
            window.location.replace("index.html");
        }
      });
      
  
    });
  });