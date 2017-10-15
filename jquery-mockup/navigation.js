$(function() {
    $("#header-placeholder").load("_header.html", function() {
        $("#nav-placeholder").load(navProperties.mainNav, function() {
            $(".nav-item").removeClass("active");
            $(`#${navProperties.currentSection}-link`).addClass("active");
        });
    });

    /* login.html *************************************************************** */
    $("#loginUsernameRetrieve").on("click", function() {
        $("#loginLoginRegisterPanel").hide();
        $("#loginRecoverDetailsPanel").show();
    });
    $("#loginPasswordRetrieve").on("click", function() {
        $("#loginLoginRegisterPanel").hide();
        $("#loginRecoverDetailsPanel").show();
    });
    $("#loginCloseRecover").on("click", function() {
        $("#loginRecoverDetailsPanel").hide();
        $("#loginLoginRegisterPanel").show();
    });
    $("#loginRegisterBtn").on("click", function() {
        $("#loginLoginRegisterPanel").hide();
        $("#loginRegisterNewPanel").css("display", "flex");
    });
    $("#loginCloseRegisterBtn").on("click", function() {
        $("#loginRegisterNewPanel").hide();
        $("#loginLoginRegisterPanel").show();
    });
    /* routes.html *************************************************************** */
    $("#addNewRouteBtn").on("click", function() {
        $("#newRouteCard").toggle();
    });
    $("input[name=routetypes]").on("change", function() {
        var type = $(this).val();
        $("div.desc").hide();
        $("#routesNewRouteGrade"+type).css({'display':"inline-block"});
    });
    $("input[value=YDS]").on("change", function() {
        $("#topRopeCheck").show();
        $("#routesNewRoutePitchesDiv").show();
        $("#routeSafety").show();
    });
    $("input[value=VS]").on("change", function() {
        $("#topRopeCheck").hide();
        $("#routesNewRoutePitchesDiv").hide();
        $("#routeSafety").hide();
    });
    $("#routedetails-flash, #routedetails-onsight").on("change", function() {
        $("#routesNewRouteAttempts").prop("readonly", true);
        $("#routesNewRouteAttempts").val("1");
    });
    $("#routedetails-send, #routedetails-project").on("change", function() {
        $("#routesNewRouteAttempts").prop("readonly", false);
        $("#routesNewRouteAttempts").val("");
    });
});