angular.module('app')
    .controller('WineCtrl', function(){

    })
    .component('winerec', {
        bindings: {
            winerecomendations: '<',
        },
        templateUrl: '../templates/wine-rec.html',
        controller:'WineCtrl'
    });