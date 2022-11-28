$( ".cell" ).on( "click", function() {
    $(".cell").removeClass("active");
    $(this).addClass("active");

    const activeCell = $(".cell.active");
    const row = activeCell.data("row");
    const column = activeCell.data("column");

    $(".cell").removeClass("soft-active");

    var rowElements = $('.cell[data-row="' + row + '"]');
    var columnElements = $('.cell[data-column="' + column + '"]');

    $(rowElements).addClass("soft-active");
    $(columnElements).addClass("soft-active");
});

$( ".number" ).on( "click", function() {
    var number = $(this).text();
    var number = parseInt(number);

    if (!$(".cell.active").hasClass("blocked")) 
    {
        $(".cell.active > span").text(number)
        checkErrors(number)
        $(".cell.active").attr("data-value", number)
    }
});

$( ".bin" ).on( "click", function() {
    $(".cell.active > span").text("")
    $(".cell.active").removeClass("error")

    const activeCell = $(".cell.active");
    const square = activeCell.data("square");
    const value = activeCell.data("value");
    const row = activeCell.data("row");
    const column = activeCell.data("column");

    var squareElements = $('.cell[data-square="' + square + '"]');
    squareElements.removeClass('error');
    var element = $('.cell[data-square="' + square + '"][data-value="' + value + '"]');

    if ($(element).length) {
        $(element).removeClass("error");
    }

    var rowElements = $('.cell[data-row="' + row + '"]');
    rowElements.removeClass('error');
    var element = $('.cell[data-row="' + row + '"][data-value="' + value + '"]');

    if ($(element).length) {
        $(element).removeClass("error");
    }

    var rowElements = $('.cell[data-column="' + column + '"]');
    rowElements.removeClass('error');
    var element = $('.cell[data-row="' + column + '"][data-value="' + value + '"]');

    if ($(element).length) {
        $(element).removeClass("error");
    }

    $(".cell.active").attr("data-value", 0)
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

function checkErrors (number) 
{
    const activeCell = $(".cell.active");
    const square = activeCell.data("square");
    const row = activeCell.data("row");
    const column = activeCell.data("column");
    const value = number;

    var squareElements = $('.cell[data-square="' + square + '"]');
    squareElements.removeClass('error');
    var elementSquare = $('.cell[data-square="' + square + '"][data-value="' + value + '"]');
    
    var rowElements = $('.cell[data-row="' + row + '"]');
    rowElements.removeClass('error');
    var elementRow = $('.cell[data-row="' + row + '"][data-value="' + value + '"]');

    var columnElements = $('.cell[data-column="' + column + '"]');
    columnElements.removeClass('error');
    var elementColumn = $('.cell[data-column="' + column + '"][data-value="' + value + '"]');
    
    if (elementSquare.length || elementRow.length || elementColumn.length) {
        activeCell.addClass("error")
        elementSquare.addClass("error")
        elementRow.addClass("error")
        elementColumn.addClass("error")
    }
}