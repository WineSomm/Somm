angular.module('app', [])
  .component('homepage', {
    templateUrl: 'homepage.html',
    controller() {
      this.wineList = window.data;
    },
  });
