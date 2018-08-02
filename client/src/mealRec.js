angular.module('app')
    .component('mealrec', {
        templateUrl: '../templates/meal-rec.html',
        controller: ($http) => {
            this.mealRec;
        }
    });