angular.module('app')
  .component('winePage', {
    bindings: {
      wine: '<',
    },
    templateUrl: 'winePage.html',
    controller: () => {
    },
  });
