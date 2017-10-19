import * as $ from 'jquery';

export class Exercise {
    name: string;
    reps: number;
    sets: number;

    static fetchDetails(): Exercise {
        var exercise = new Exercise();

        exercise.name = $("#trackerSelectExerciseDropdown").val().toString();
        exercise.reps = parseFloat($("#trackerRepCount").val().toString());
        exercise.sets = parseFloat($("#trackerSetCount").val().toString());
        
        return exercise;
    }

    static logExercise(exercise: Exercise) {
        var markup = "<tr class='table-dark'><th scope='row'></th><td>" + exercise.name + "</td><td>" 
            + exercise.reps + "</td><td>" + exercise.sets + "</td></tr>"
        $("#myExercisesTable tbody").append(markup);
    }
}

// Controller

var exercise = new Exercise();

$("#addExercise").click(function() {
    exercise = Exercise.fetchDetails();
    Exercise.logExercise(exercise);
});