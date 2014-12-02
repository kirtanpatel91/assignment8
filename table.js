//Kirtan Patel
//kirtan_patel@student.uml.edu
//Umass Lowell Computer Science 91.461 GUI Programming I
//Created: October 26, 2014
//This website is mainly for creating a multiplcation table by using javascript and css files. I was having some difficulties with javascript so i got helped for it. 

$(document).ready(function() {
    var tabs = $("#tabs").tabs();
    // validator
    $.validator.addMethod('greaterThanRowStart', function(value, element, param){
        if (pTwo.value === "") {
            return true;
        }
        return parseInt(pTwo.value) >= parseInt(pOne.value);
    }, "The ending point must be greater than the starting point.");

    $.validator.addMethod('greaterThanColStart', function(value, element, param){
        return parseInt(pFour.value) >= parseInt(pThree.value);
    }, "The ending point must be greater than the starting point.");

    $('#form').validate({
        rules: {
            pOne: {
                required: true,
                digits: true
            },
            pTwo: {
                required: true,
                digits: true,
                greaterThanRowStart: true
            },
            pThree: {
                required: true,
                digits: true
            },
            pFour: {
                required: true,
                digits: true,
                greaterThanColStart: true
            }
        },
        onkeyup: function(element) {
            if ($('form').valid()) {
                $('form').find(":submit").attr("disabled",
                    false);
            } else {
                $('form').find(":submit").attr("disabled",
                    true);
            }
        },
        /* "The validation plugin allows you to configure these class names"
         * http://stackoverflow.com/questions/6168926/jquery-validation-how-to-make-fields-red
         */
        errorClass: "my-error-class",
        validClass: "my-valid-class"
    });

    function crTable(nextTabNo) {
        // getting the four values
        // putting a "+" to treat the value as a number instead of string
        var pOne = +document.getElementById("pOne").value;
        var pTwo = +document.getElementById("pTwo").value;
        var pThree = +document.getElementById("pThree").value;
        var pFour = +document.getElementById("pFour").value;
        // get the reference for the preview
        var preview = document.getElementById(nextTabNo);
        // creates a <table> element and a <tbody> element
        var tbl = document.createElement("table");
        var tblBody = document.createElement("tbody");
        // creating all cells
        for (var i = pOne, ii = pTwo + 1; i <= ii; ++i) {
            // creates a table row
            var row = document.createElement("tr");
            for (var j = pThree, jj = pFour + 1; j <= jj; ++j) {
                // creates a cell
                var cell = document.createElement("td");
                var cellText;
                
                // give some style to the cell/table
				var cellStyle =
				"padding: 10px; color: white; border: 1px solid black; border-radius: 5px; ";
				if (i == pOne && j == pThree) {
					cellText = document.createTextNode("");
						cell.setAttribute("style", cellStyle +
					"background-color: #80A2BF");
					} else if (i == pOne) {
				cellText = document.createTextNode(j - 1);
cell.setAttribute("style", cellStyle +
"background-color: #BF9D80");
} else if (j == pThree) {
cellText = document.createTextNode(i - 1);
cell.setAttribute("style", cellStyle +
"background-color: #BF9D80");
} else {
cellText = document.createTextNode((i - 1) * (j - 1));
cell.setAttribute("style", cellStyle +
"background-color: #BFCDD9");
}
                // add the text to cell
                cell.appendChild(cellText);
                // add the cell to row
                row.appendChild(cell);
            }
            // add the row to the end of the table body
            tblBody.appendChild(row);
        }
        // put the <tbody> in the <table>
        tbl.appendChild(tblBody);
        // appends <table> into preview
        preview.appendChild(tbl);
    }
    var tabsdiv = $("#tabs");
    var tabslist = tabsdiv.find("ul");
    var nextTabNo = tabslist.find("li").length;
    // When create button click, a new tab will generate
    $('#create').click(function() {
        // check for first time
        if (!$('form').valid()) {
            $('form').find(":submit").attr("disabled", true);
            return;
        }
        /* create a new tab with close button next to it
         * http://stackoverflow.com/questions/14357614/add-close-button-to-jquery-ui-tabs
         */
        tabslist.append('<li id="li' + nextTabNo +
            '"><a href="#tab' + nextTabNo + '">' + 'Tab ' +
            nextTabNo +
            '<\/a><input name="check" type="checkbox" id="checkbox' +
            nextTabNo + '"><span id="tabspan' + nextTabNo +
            '" class="ui-icon ui-icon-circle-close"></span><\/li>'
        );
        // add content to the new tab
        tabsdiv.append('<div id="tab' + nextTabNo + '"><\/div>');
        // create content table to the new tab
        crTable("tab" + nextTabNo);
        ++nextTabNo;
        $('#tabs').tabs("refresh");
    });
    // When close span clicked, it will close the tab that are closest to which you clicked
    tabs.delegate("span.ui-icon-circle-close", "click", function() {
        var panelId = $(this).closest("li").remove().attr(
            "aria-controls");
        $("#" + panelId).remove();
        tabs.tabs("refresh");
    });
    $('#delete').click(function() {
        // push id in the selected
        var selected = [];
        $('input:checkbox:checked').each(function() {
            selected.push($(this).attr('id'));
        });
        // remove those unwanted tabs
        for (var m = 0; m < selected.length; m++) {
            var checkboxID = "" + selected[m];
            var num = checkboxID.substring(8, checkboxID.length);
            $('#tab' + num).remove();
            $('#li' + num).remove();
        }
        $('#tabs').tabs("refresh");
    });
});
