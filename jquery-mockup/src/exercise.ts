import * as $ from 'jquery';

var table_row_count = 0;

export class Exercise {
    name: string;
    reps: number;
    sets: number;
    time: string;

    static fetchDetails(): Exercise {
        var exercise = new Exercise();

        exercise.name = $("#trackerSelectExerciseDropdown").val().toString();
        exercise.reps = parseFloat($("#trackerRepCount").val().toString());
        exercise.sets = parseFloat($("#trackerSetCount").val().toString());
        exercise.time = $("#trackerTime").val().toString();        

        return exercise;
    }

    static logExercise(exercise: Exercise) {
        table_row_count++;
        var markup = "<tr class='table-dark'><th scope='row'>" + table_row_count + "</th><td>" 
        + exercise.name + "</td><td>" + exercise.reps + "</td><td>" + exercise.sets + "</td><td>" 
        + exercise.time + "</td><td><input type='checkbox' name='remove'></td></tr>"
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