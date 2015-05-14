/**
 * Created by chelsea on 5/12/15.
 */

var result = null;
var displayed = "";
var operation;

function display(input) {
    $('#window').empty();
    $('#window').append(input);
    $.ajax({
        url: '/calculation',
        type: 'POST',
        data: {
            calculation: input
        },
        dataType: 'json',
        complete: function () {
            console.log('ajax complete');
            historyRefresh();
        },
        success: function (response) {
            console.log(response);
        },
        error: function (xhr, status) {
            console.log("Error: " + status);
        }
    });
}

function historyRefresh() {
    $.ajax({
        url: '/calculation',
        type: 'GET',
        dataType: 'json',
        complete: function () {
            console.log('ajax complete');
        },
        success: function (response) {
            console.log(response);
            for (var i = 0; i < response.length; i++) {
                $('.results').prepend("<div class='well-sm well result col-xs-1'>" + response[i].calculation + "</div>");
            }
        },
        error: function (xhr, status) {
            console.log("Error: " + status);
        }
    });
}

$(document).ready(function () {
    $('body').on('click', '.btn', function () {
        console.log($(this).attr('id'));
        var id = $(this).attr('id');
        console.log("Before anything result = " + result);
        if (result == null) {
            if (id == "-") {
                operation = "subtract";
                result = parseInt(displayed);
                displayed = "";
                console.log("After clicking minus, result = " + result);
            } else if (id == "+") {
                operation = "add";
                result = parseInt(displayed);
                displayed = "";
                console.log("After clicking add, result = " + result);
            } else if (id == "/") {
                operation = "divide";
                result = parseInt(displayed);
                displayed = "";
                console.log("After clicking divide, result = " + result);
            } else if (id == "*") {
                operation = "multiply";
                result = parseInt(displayed);
                displayed = "";
                console.log("After clicking multiply, result = " + result);
            } else if (id == "=") {
                display(displayed);
            } else if (id == "clear") {
                $('#window').empty();
                result = null;
                displayed = "";
            } else {
                displayed += id;
                display(displayed);
                console.log("The 1st else ran");
            }
        } else {
            if (id == "-") {
                result -= parseInt(displayed);
                displayed = "";
                display(result);
                console.log("After actually subtracting, result = " + result);
            } else if (id == "+") {
                result += parseInt(displayed);
                displayed = "";
                display(result);
                console.log("After actually adding, result = " + result);
            } else if (id == "/") {
                result = parseInt(displayed);
                displayed /= "";
                display(result);
                console.log("After actually dividing, result = " + result);
            } else if (id == "*") {
                result *= parseInt(displayed);
                displayed = "";
                display(result);
                console.log("After actually multiplying, result = " + result);
            } else if (id == "=") {
                if (operation == "subtract") {
                    result -= parseInt(displayed);
                    display(result);
                } else if (operation == "add") {
                    result += parseInt(displayed);
                    display(result);
                } else if (operation == "multiply") {
                    result *= parseInt(displayed);
                    display(result);
                } else if (operation == "divide") {
                    result /= parseInt(displayed);
                    display(result);
                }
            } else if (id == "clear") {
                $('#window').empty();
                result = null;
                displayed = "";
            } else {
                displayed += id;
                display(displayed);
                console.log("The 2nd else ran");
            }
        }
    });
});
