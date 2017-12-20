angular.module('app')
  .component('winePage', {
    bindings: {
      wine: '<',
    },
    templateUrl: 'templates/winePage.html',
    controller() {
      this.varietalData = window.varietalData;
    },
  });
