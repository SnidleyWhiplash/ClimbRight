import * as $ from 'jquery';

export class Route {
    name: string;
    type: string;
    t_r: boolean;
    grade: string;
    pitches: number;
    details: string;
    f_a: boolean;
    rating: string;
    attempts: number;

    static fetchDetails(): Route {
        var route = new Route();
        
        route.name = $("#routesNewRouteName").val().toString();
        route.type = '';
            $("#routeTypes .active").each(function() {
                route.type = $(this).attr('id');
            });
        if ($("#topRopeLabel").hasClass("active")) {
            route.t_r = true;
        } else {
            route.t_r = false;
        }
        if (route.type === "Trad" || route.type === "Sport") {
            route.grade = $("#routesNewRouteGradeYDSSelect").val().toString();
            route.pitches = parseFloat($("#routesNewRoutePitches").val().toString());
            route.rating = '';
                $("#routeSafety .active").each(function() {
                    route.rating = $(this).attr('id');
                });
        } else if (route.type === "Boulder") {
            route.grade = $("#routesNewRouteGradeVSSelect").val().toString();
            route.pitches = 0;
            route.rating = '';
        }
        route.details = '';
            $("#routeDetails .active").each(function() {
                route.details = $(this).attr('id');
            });
        if ($("#firstAscentLabel").hasClass("active")) {
            route.f_a = true;
        } else {
            route.f_a = false;
        }
        route.attempts = parseFloat($("#routesNewRouteAttempts").val().toString());

        return route;
    }

    static logRoute(route: Route) {
        var markup = "<tr class='table-danger'><th scope='row'></th><td>" 
            + route.name + "</td><td>" + route.type + "</td><td>" + route.grade + "</td><td>"
            + route.details + "</td><td>" + route.t_r + "</td><td>" + route.rating + "</td><td>"
            + route.pitches + "</td><td>" + route.attempts + "</td></tr>";
        $("#myRoutesTable tbody").append(markup);
    }

}

// Controller

var route = new Route();

$("#routesNewRouteSubmit").click(function() {
    route = Route.fetchDetails();
    Route.logRoute(route);
}); 