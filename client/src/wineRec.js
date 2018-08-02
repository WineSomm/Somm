angular.module('app')
    .controller('WineCtrl', function(){

    })
    .component('winerec', {
        bindings: {
            winerecomendations: '<',
            mealchosen: '<'
        },
        templateUrl: '../templates/wine-rec.html',
        controller:'WineCtrl'
    });