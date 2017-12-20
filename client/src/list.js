angular.module('app')
  .component('list', {
    bindings: {
      wineList: '<',
      selected: '=',
      favoriteView: '=',
    },
    templateUrl: 'templates/list.html',
    controller($http) {
      this.onClick = function (index) {
        this.selected = this.wineList[index];
      };
    },
  });
