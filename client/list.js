angular.module('app')
  .component('list', {
    bindings: {
      wineList: '<',
      selected: '=',
    },
    templateUrl: 'list.html',
    controller() {
      this.onClick = function (index) {
        this.selected = this.wineList[index];
      };
    },
  });
