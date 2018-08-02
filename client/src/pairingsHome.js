angular.module('app')
    .component('pairingshome', {
        templateUrl: '../templates/pairings-home.html',
        controller: () => {
            const ctrl = this;
        //FIXME: Angular is working, but the ng-if for the view stopped rendering everything
            ctrl.view = 'form';
            ctrl.changeView = function(viewChoice) {
                ctrl.view = viewChoice;
            };
        }
    });