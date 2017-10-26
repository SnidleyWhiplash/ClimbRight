import * as $ from 'jquery';

import { Exercise } from "./exercise.ts";
import { User } from "./user";

var table_row_count = 0;

export class TrackerEntry {
    user: User;
    exercises: Exercise[] = [];
    myEntry: Exercise[] = [];

    drawExercises() {
        $("#trackerExerciseSelect").html(
            this.exercises.map(x => `<option>${x.name}</option>`).join("")
        );
    }

    init() {
        return $.when(
            $.getJSON("/trackerEntry/exercises").done( data => {
                this.exercises = data;
            }),
            $.getJSON("/trackerEntry/myEntry").done( data => {
                this.myEntry = data;
            })
        )
    }

    static fetchDetails(): Exercise {
        var exercise = new Exercise("");
        
        exercise.name = $("#trackerExerciseSelect").val().toString();
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
        var markup = "<tr class='table-dark'><th scope='row' class='row-num'>" + table_row_count + "</th><td>" 
        + exercise.name + "</td><td>" + exercise.reps + "</td><td>" + exercise.sets + "</td><td>"
        + exercise.weight + " " + exercise.weight_unit + "</td><td>" + exercise.time + " "
        + exercise.time_unit + "</td><td><input type='checkbox' name='remove'></td></tr>"
        $("#myExercisesTable tbody").append(markup);
    }
}

// Controller
const trackerEntry = new TrackerEntry();
var exercise = new Exercise("");

trackerEntry.init().done(()=>{
    trackerEntry.drawExercises();
});

$("#addExercise").click(function() {
    exercise = TrackerEntry.fetchDetails();
    TrackerEntry.logExercise(exercise);
})

$("#trackerSaveAdded").click(function(e) {
    e.preventDefault();
    if(confirm('Do you want to submit? Doing so will lose your added exercises.')) {
        $("#trackerAddExerciseForm").submit();
    } else {
        return false;
    }
})

$("#removeAllCheck").click(function() {
    $("input[type='checkbox']").prop("checked", true);
});

$("#trackerDeleteChecked").click(function() {
    $("#myExercisesTable tbody").find("input[name='remove']").each(function() {
        if($(this).is(":checked")) {
            table_row_count--;
            $(this).parents("tr").remove();
        }
    });
    renumber();
});

function renumber() {
    table_row_count = 0;
    $("#myExercisesTable tbody").find(".row-num").each(function() {
        $(this).html("" + ++table_row_count);
    });
};