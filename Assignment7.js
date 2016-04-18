$(document).ready(function() {


});



function button1() {

    var title = document.getElementById("title").value;
    var links = document.getElementById("links").value;
    var j = JSON.parse('{"title":"' + title + '","links":"' + links + '"}');
    
    console.log(j);




    $.ajax({
        url: "http://localhost:3000/links",
        type: "POST",
        dataType: "json",
        contentType: "Application/Json",
        data: JSON.stringify(j),
        success: function(data) {
            alert("Result :success");
            console.log("Title:"+data.title);
            console.log("Links :"+data.links);
            console.log("clicks :"+data.clicks);
        },
        failure: function(errMsg) {
            alert(errMsg);
        }
    });




}

function button2() {

    $.ajax({
        url: "http://localhost:3000/links",
        type: "GET",
        dataType: "json",
        contentType: "Application/Json",
        success: function(data) {
            console.log(data);

            
        },
        failure: function(errMsg) {
            alert(errMsg);
        }
    });
}


function button3() {
    console.log("BUTTON3")
    var title = "express";
    $.ajax({
        url: "http://localhost:3000/click/" + title,
        type: "GET",
        dataType: "json",
        contentType: "Application/Json",
        success: function(data) {
            

            console.log(data.links);
        },
        failure: function(errMsg) {
            alert(errMsg);
        }
    });
}

