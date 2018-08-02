angular.module('app')
    .controller('homeCtrl', function() {
        const ctrl = this;
        ctrl.view = 'form';
        ctrl.changeview = function(viewChoice) {
            ctrl.view = viewChoice;
        };
        ctrl.winerecomendations;
        ctrl.mealrecomendations;
    })
    .component('pairingshome', {
        templateUrl: '../templates/pairings-home.html',
        controller: 'homeCtrl'
    });