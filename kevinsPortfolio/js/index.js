
$(document).ready(function(){

    hideContent();
    displayContent();
    

    
});

function hideContent(){
    $("#description").hide();
    $("#button").hide();
}

function displayContent(){
    $("#description").slideDown(1000, function(){
        //Auto slides
    });

    $("#button").slideDown(400, function(){
        //Auto slides
    });
}