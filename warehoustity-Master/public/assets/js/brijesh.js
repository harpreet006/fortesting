$(document).ready(function() {
    var getactivebtn = $(".india-map .btn-map.active")
    var getlink = getactivebtn.attr("data-link");
    var getwarehousesnumber = getactivebtn.attr("data-warehouses-number");
    var gettitle = getactivebtn.attr("data-title");
    var getimage = getactivebtn.attr("data-image");
    
    var getcardlink = $(".filter-card").find(".card-link");
    var getcardtext = $(".filter-card").find(".card-text");
    var getcardtitle = $(".filter-card").find(".card-title");
    var getcardimage =  $(".filter-card").find(".card-img"); 

    getcardlink.attr("href", getlink);
    getcardtext.html(getwarehousesnumber + " Warehouses");
    getcardtitle.text(gettitle);
    getcardimage.attr("src", getimage);
}) 