$(document).ready(function(){

    hideContent();
    displayContent();


});

function hideContent(){
    $("#welcomeDescription").hide();
    $("#card-1").hide();
    $("#card-2").hide();
    $("#card-3").hide();
}

function displayContent(){
    $("#card-1").slideToggle(400, function(){
        
    });

    $("#card-2").slideDown(600, function(){
        
    });

    $("#card-3").slideDown(800, function(){
        
    });

    $("#welcomeDescription").slideDown(800, function(){
       
    });
}