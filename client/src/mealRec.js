angular.module('app')
    .controller('MealCtrl', function(){
        this.showRecipe = false;
        this.toggle = () => {
            this.showRecipe = !this.showRecipe;
        };
    })
    .component('mealrec', {
        bindings: {
            mealrecommendations: '<',
            winechosen: '<',

        },
        templateUrl: '../templates/meal-rec.html',
        controller:'MealCtrl'
    });