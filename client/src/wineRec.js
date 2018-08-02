angular.module('app')
    .controller('WineCtrl', function(){

    })
    .component('winerec', {
        bindings: {
            winerecommendations: '<',
            mealchosen: '<'
        },
        templateUrl: '../templates/wine-rec.html',
        controller:'WineCtrl'
    });