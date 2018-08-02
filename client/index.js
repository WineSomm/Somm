angular.module('app', [])
  .component('homepage', {
    templateUrl: 'templates/homepage.html',
    controller() {
      this.wineList = this.wineList || window.data;
      this.selected = null;
      this.favoriteView = false;
    },
  })
  .config(function($sceDelegateProvider) {
    $sceDelegateProvider.resourceUrlWhitelist([
      'self',
      'https://www.google.com/**'
    ]);
  });
