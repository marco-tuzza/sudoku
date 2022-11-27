$( ".cell" ).on( "click", function() {
    $(".cell").removeClass("active");
    
    if (!$(this).hasClass("blocked")) 
    {
        $(this).addClass("active");
    }
});

$( ".number" ).on( "click", function() {
    var number = $(this).text();

    $(".cell.active > span").text(number)
    $(".cell.active").removeClass("active");
});

$( ".bin" ).on( "click", function() {
    $(".cell.active > span").text("")
    $(".cell.active").removeClass("active");
});

$(document).mouseup(function(e) 
{
    var container = $(".board");
    var numbers = $(".numbers");

    // if the target of the click isn't the container nor a descendant of the container
    if (!container.is(e.target) && !numbers.is(e.target) && container.has(e.target).length === 0 && numbers.has(e.target).length === 0) 
    {
        $(".cell").removeClass("active");
    }
});