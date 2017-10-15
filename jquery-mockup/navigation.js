$(function() {
    $("#header-placeholder").load("_header.html", function() {
        $("#nav-placeholder").load(navProperties.mainNav, function() {
            $(".nav-item").removeClass("active");
            $(`#${navProperties.currentSection}-link`).addClass("active");
        });
    });
});