function sendMail(params) {
    var tempParams = {
    from_name: "Admin",
    to_name: "Parent",
    message: document.getElementById("message").value,
    };
    emailjs.send('service_thcra2a','template_ito7kft',tempParams) 
    .then(function(res){
    console.log("success");
    })
    }