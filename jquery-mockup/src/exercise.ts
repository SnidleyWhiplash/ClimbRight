import * as $ from 'jquery';

var table_row_count = 0;

export class Exercise {
    name: string;
    reps: number;
    sets: number;
    weight: number;
    weight_unit: string;
    time: number;
    time_unit: string;

    static fetchDetails(): Exercise {
        var exercise = new Exercise();

        exercise.name = $("#trackerSelectExerciseDropdown").val().toString();
        exercise.reps = parseFloat($("#trackerRepCount").val().toString());
        exercise.sets = parseFloat($("#trackerSetCount").val().toString());
        exercise.weight = parseFloat($("#trackerWeight").val().toString());
        exercise.weight_unit = $("#trackerWeightSelect").val().toString();
        exercise.time = parseFloat($("#trackerTime").val().toString());   
        exercise.time_unit = $("#trackerTimeSelect").val().toString();     

        if (Number.isNaN(exercise.reps)) { exercise.reps = 0; }
        if (Number.isNaN(exercise.sets)) { exercise.sets = 0; }
        if (Number.isNaN(exercise.weight)) { exercise.weight = 0; }
        if (Number.isNaN(exercise.time)) { exercise.time = 0; } 

        return exercise;
    }

    static logExercise(exercise: Exercise) {
        table_row_count++;
        var markup = "<tr class='table-dark'><th scope='row'>" + table_row_count + "</th><td>" 
        + exercise.name + "</td><td>" + exercise.reps + "</td><td>" + exercise.sets + "</td><td>"
        + exercise.weight + " " + exercise.weight_unit + "</td><td>" + exercise.time + " "
        + exercise.time_unit + "</td><td><input type='checkbox' name='remove'></td></tr>"
        $("#myExercisesTable tbody").append(markup);
    }
}

// Controller

var exercise = new Exercise();

$("#addExercise").click(function() {
    exercise = Exercise.fetchDetails();
    Exercise.logExercise(exercise);
});

$("#trackerDeleteChecked").click(function() {
    $("#myExercisesTable tbody").find("input[name='remove']").each(function() {
        if($(this).is(":checked")) {
            table_row_count--;
            $(this).parents("tr").remove();
        }
    });
});