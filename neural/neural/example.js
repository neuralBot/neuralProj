
var xmlhttp = new XMLHttpRequest();
var url = "../data_highlight/A.json";

xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4) {
        var example = JSON.parse(this.responseText);
    }
};
xmlhttp.open("GET", url, true);
xmlhttp.send();