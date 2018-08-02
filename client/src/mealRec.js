angular.module('app')
    .controller('MealCtrl', function(){})
    .component('mealrec', {
        bindings: {
            mealrecommendations: '<',
            winechosen: '<',

        },
        templateUrl: '../templates/meal-rec.html',
        controller:'MealCtrl'
    });