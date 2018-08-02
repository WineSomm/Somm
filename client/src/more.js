angular.module('app')
  .component('more', {
    templateUrl: 'templates/local.html',
    controller($http, $window) {
      
      this.onClick = ($window) => {
        $window.location.href = '../more-local.html'
      }
  }})
  