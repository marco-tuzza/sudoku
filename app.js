// Triggers
$(".cell").click(activeCell);
$(".number").click(insertNumber);
$(".bin").click(deleteNumber);
$(document).mouseup(removeActive);

function activeCell() {
    // Get the active cell
    var activeCell = $(this);

    // Check if the active cell has the "data-row" and "data-column" attributes set
    if (activeCell.attr("data-row") && activeCell.attr("data-column")) {
        // Remove the "active" class from all cells
        $(".cell.active").removeClass("active");

        // Remove the "soft-active" class from all cells
        $(".cell.soft-active").removeClass("soft-active");

        // Add the "active" class to the active cell
        activeCell.addClass("active");

        // Get the row and column of the active cell
        var row = activeCell.data("row");
        var column = activeCell.data("column");

        // Select all cells in the same row and column as the active cell
        var rowElements = $('.cell[data-row="' + row + '"]');
        var columnElements = $('.cell[data-column="' + column + '"]');

        // Add the "soft-active" class to the selected cells
        $(rowElements).addClass("soft-active");
        $(columnElements).addClass("soft-active");
    }
}

function insertNumber() {
    // Take the active cell
    var cell = $(".cell.active");

    // Convert the number to an integer
    var number = parseInt($(this).text());

    // Check if the cell has the "blocked" class
    if (!cell.hasClass("blocked")) {
        // Check if the number is valid (i.e. an integer between 1 and 9)
        if (Number.isInteger(number) && number >= 1 && number <= 9) {
            // Insert the number into the cell
            cell.find("span").text(number);

            // Set the "data-value" attribute of the cell to the number
            cell.attr("data-value", number);

            // Check for errors
            checkErrors();
        } else {
            // Add the "error" class to the cell
            cell.addClass("error");
        }
    }
}

function deleteNumber() {
    // Check if the currently selected cell has the "blocked" class
    if (!$(".cell.active").hasClass("blocked")) {
        // Remove the content of the currently selected cell
        $(".cell.active > span").text("");

        // Remove the "error" class from the currently selected cell
        $(".cell.active").removeClass("error");

        // Set the "data-value" attribute of the currently selected cell to 0
        $(".cell.active").attr("data-value", 0);

        // Call the "checkErrors" function
        checkErrors();
    }
}

function removeActive(e) {
    // Select the "board" element
    var container = $(".board");

    // Select the elements with the "numbers" class
    var numbers = $(".numbers");

    // Check if the target of the click is not the container or a descendant of the container, and if it is not the numbers grid or a descendant of the numbers grid
    if (
        !container.is(e.target) &&
        !numbers.is(e.target) &&
        container.has(e.target).length === 0 &&
        numbers.has(e.target).length === 0
    ) {
        // Remove the "active" class from all cells
        $(".cell").removeClass("active");

        // Remove the "soft-active" class from all cells
        $(".cell.soft-active").removeClass("soft-active");
    }
}

function checkErrors() {
    // iterate through all columns
    for (var i = 1; i <= 9; i++) {
        var cellsArray = [];
        var errors = [];

        // iterate through all cells in the current column
        for (var j = 1; j <= 9; j++) {
            var cellValue = $(
                "[data-row='" + j + "'][data-column='" + i + "']"
            ).data("value");

            if (cellValue != 0) {
                if (cellsArray.includes(cellValue)) {
                    errors.push(cellValue);
                }

                cellsArray.push(cellValue);
            }
        }

        console.log(errors);
    }
}
