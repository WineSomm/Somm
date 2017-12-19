angular.module('app')
  .component('list', {
    bindings: {
      wineList: '<',
    },
    templateUrl: 'list.html',
    controller() {
      this.onClick = function (index) {
        console.log(this.wineList[index]);
      };
    },
  });
