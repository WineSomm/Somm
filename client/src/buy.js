angular.module('app')
  .component('buy', {
    bindings: {
      wine: '<',
    },
    controller ($scope, $http) {
      this.serach = '';
      this.buyonline = (input) => {
        console.log(input, 'input');
        $scope.search = '';
        // $http.post('/online');
      }
    },
    templateUrl: '../templates/buy.html'
  })