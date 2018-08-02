angular.module('app')
    .controller('homeCtrl', function() {
        const ctrl = this;
        ctrl.view = 'form';
        ctrl.changeView = function(viewChoice) {
            ctrl.view = viewChoice;
        };
    })
    .component('pairingshome', {
        templateUrl: '../templates/pairings-home.html',
        controller: 'homeCtrl'
    });