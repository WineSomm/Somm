angular.module('app')
    .component('winerec', {
        templateUrl: '../templates/wine-rec.html',
        controller: ($http) => {
            this.wineRec;
        }
    });