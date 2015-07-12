$(document).on("click", "#submitbtn", function (e) {
    //define fields to validate and their rules and message to show on error
    var validation = {
        "name": {
            "required"  : ["Name is required"],
            "alphabetic": ["Name only alphabetic"]
        },
        "email": {
            "required"  : ["Email/Contact No. is required", ["contactno", "==", ""]],
            "email"     : ["Valid Email only"]
        },
        "contactno": {
            "required"  : ["Email/Contact No. is required", ["email", "==", ""]],
            "numeric"   : ["Contact No. should be numeric"], // or also can use "float":["Only float", 10,2 ], //message, numeric part length, decimal part length
            "maxlength" : ["Contact No. should not be more than 15 characters", [15]],
            "minlength" : ["Contact No. should be at least 6 characters long", [6]]
        },
        "message": {
            "required"  : ["Message is required"],
            "maxlength" : ["Message should not be more than 500 characters", [500]],
            "minlength" : ["Message should be at least 50 characters long", [50]]
        }
    };

    var createMessageBox = function (fld, msg) {
        var el = document.createElement("div");
        el.className = "err";
        el.setAttribute("class", " pyro_err_container ");
        el.appendChild(document.createTextNode(msg));
        if (fld.parentNode.querySelector(".pyro_err_container")) {//works in IE8
            fld.parentNode.querySelector(".pyro_err_container").innerHTML = "";
            fld.parentNode.insertBefore(el, fld.nextSibling);
        } else {
            fld.parentNode.insertBefore(el, fld.nextSibling);
        }
    }

    //validation logic
    var frm = document.forms.frmsubmit;
    //to remove previous error message
    var allel = document.querySelectorAll(".pyro_err_container");
    var allok = Array.prototype.slice.call(allel);
    for (i = 0; i < allok.length; i++)
        allok[i].innerHTML = "";
    //end of removal of previous err msg

    var foundErr = 0;// to track validation on all fields succeed

    for (var key in validation) {
        //console.log(key + " = " + validation[key]);
        for (var keyd in validation[key]) {
            //console.log("--"+keyd + " = " + validation[key][keyd]);
            if (frm[key].value == "" && keyd == 'required') {
                //check if its validation is dependent on other fields
                if (validation[key][keyd][1] && (validation[key][keyd][1][0] && validation[key][keyd][1][1])) {//yes dependency found, now need to check ==, <, >, >=, <=, !=, <>, checked or which dependency exists
                    switch (validation[key][keyd][1][1]) {
                        case "==" :
                            if (frm[validation[key][keyd][1][0]].value == validation[key][keyd][1][2]) {
                                createMessageBox(frm[validation[key][keyd][1][0]], validation[key][keyd][0]);
                                foundErr = 1;
                            }
                            break;
                        case ">=" :
                            if (frm[validation[key][keyd][1][0]].value >= validation[key][keyd][1][2]) {
                                foundErr = 1;
                                createMessageBox(frm[validation[key][keyd][1][0]], validation[key][keyd][0]);
                            }
                            break;
                        case "<=" :
                            if (frm[validation[key][keyd][1][0]].value <= validation[key][keyd][1][2]) {
                                foundErr = 1;
                                createMessageBox(frm[validation[key][keyd][1][0]], validation[key][keyd][0]);
                            }
                            break;
                        case "!=" :
                            if (frm[validation[key][keyd][1][0]].value != validation[key][keyd][1][2]) {
                                foundErr = 1;
                                createMessageBox(frm[validation[key][keyd][1][0]], validation[key][keyd][0]);
                            }
                            break;
                        case "<"  :
                            if (frm[validation[key][keyd][1][0]].value < validation[key][keyd][1][2]) {
                                foundErr = 1;
                                createMessageBox(frm[validation[key][keyd][1][0]], validation[key][keyd][0]);
                            }
                            break;
                        case ">"  :
                            if (frm[validation[key][keyd][1][0]].value > validation[key][keyd][1][2]) {
                                foundErr = 1;
                                createMessageBox(frm[validation[key][keyd][1][0]], validation[key][keyd][0]);
                            }
                            break;
                        case "<>" :
                            break;
                        default   :
                            break;
                    }
                } else {//independent fields
                    createMessageBox(frm[key], validation[key][keyd]);
                    foundErr = 1;
                }

            } else if (frm[key].value != "" && keyd == 'email') {
                var regexEmail = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[a-z]{2}|com|org|net|edu|gov|mil|biz|info|mobi|name|aero|asia|jobs|museum)\b$/;
                if (!regexEmail.test(frm[key].value)) {
                    foundErr = 1;
                    createMessageBox(frm[key], validation[key][keyd]);
                }
            } else if (frm[key].value != "" && keyd == 'alphabetic') {
                var regexAlphaSpaces = /[ ]{2,}/;
                var regexAlpha = /^([a-zA-Z]{1})+[a-zA-Z ]*$/;
                if (regexAlphaSpaces.test(frm[key].value)) {
                    foundErr = 1;
                    createMessageBox(frm[key], validation[key][keyd]);
                } else if (!regexAlpha.test(frm[key].value)) {
                    foundErr = 1;
                    createMessageBox(frm[key], validation[key][keyd]);
                }//string = string.replace(/\s\s+/g, ' ');
            } else if (frm[key].value != "" && keyd == 'numeric') {
                var regexNumeric = /^\d*$/;
                if (!regexNumeric.test(frm[key].value)) {
                    foundErr = 1;
                    createMessageBox(frm[key], validation[key][keyd]);
                }
            } else if (frm[key].value != "" && keyd == 'float') {
                if (!frm[key].value.match(/^-{0,1}\d{0,20}(?:\.\d{0,2}){0,1}$/)) {
                    foundErr = 1;
                    createMessageBox(frm[key], validation[key][keyd]);
                }
            } else if (frm[key].value != "" && keyd == 'maxlength') {
                if (frm[key].value.length > validation[key][keyd][1]) {
                    foundErr = 1;
                    createMessageBox(frm[key], validation[key][keyd][0]);
                }
            } else if (frm[key].value != "" && keyd == 'minlength') {
                if (frm[key].value.length < validation[key][keyd][1]) {
                    foundErr = 1;
                    createMessageBox(frm[key], validation[key][keyd][0]);
                }
            }
        }
    }

    if (foundErr) {
        return false;
    } else {
        alert("Success!");
    }
})
