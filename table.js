//Kirtan Patel
//kirtan_patel@student.uml.edu
//Umass Lowell Computer Science 91.461 GUI Programming I
//Created: October 26, 2014
//This website is mainly for creating a multiplcation table by using javascript and css files. I was having some difficulties with javascript so i got helped for it. 

function crTable() {
        // using remove to refresh
        var rTable = document.getElementById("Table");
        if (rTable != null) rTable.remove();
        // getting the four values
        // putting a "+" to make treat it as a number instead of string
        var pOne = +document.getElementById("pOne").value;
        var pTwo = +document.getElementById("pTwo").value;
        var pThree = +document.getElementById("pThree").value;
        var pFour = +document.getElementById("pFour").value;
        // get the reference for the body
        var body = document.getElementsByTagName("body")[0];
        // check if numbers are validate
        if (pOne > pTwo) {
            document.getElementById("pOne").setAttribute("style",
                "outline-color: red");
            document.getElementById("pOne").setAttribute("style",
                "border-color: red");
            return;
        }
        if (pThree > pFour) {
            document.getElementById("pThree").setAttribute("style",
                "outline-color: red");
            document.getElementById("pThree").setAttribute("style",
                "border-color: red");
            return;
        }
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
        // appends <table> into <body>
        body.appendChild(tbl);
        // setting an id for tbl
        tbl.setAttribute("id", "Table");
    }
    /*
     * onKeyPress I used this website:
     * http://www.htmlcodetutorial.com/forms/index_famsupp_158.html One bug is that
     * this will ONLY applied when key pressed
     */

function numbersonly(myfield, e, dec) {
    var key;
    var keychar;
    if (window.event) key = window.event.keyCode;
    else if (e) key = e.which;
    else {
        myfield.setAttribute("style", "outline-color: default");
        myfield.setAttribute("style", "border-color: default");
        return true;
    }
    keychar = String.fromCharCode(key);
    // control keys
    if ((key == null) || (key == 0) || (key == 8) || (key == 9) || (key ==
        13) || (key == 27)) {
        myfield.setAttribute("style", "outline-color: default");
        myfield.setAttribute("style", "border-color: default");
        return true;
    }
    // numbers
    else if ((("0123456789").indexOf(keychar) > -1)) {
        myfield.setAttribute("style", "outline-color: blue");
        myfield.setAttribute("style", "border-color: blue");
        return true;
    }
    // decimal point jump
    else if (dec && (keychar == ".")) {
        myfield.form.elements[dec].focus();
        myfield.setAttribute("style", "outline-color: red");
        myfield.setAttribute("style", "border-color: red");
        return true;
    } else {
        myfield.setAttribute("style", "outline-color: red");
        myfield.setAttribute("style", "border-color: red");
        return true;
    }
}