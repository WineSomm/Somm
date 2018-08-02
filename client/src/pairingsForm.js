angular.module('app')
  .component('pairingsform', {
      templateUrl: '../templates/pairingsForm.html',
      controller: ($http) => {
        this.wineSelection = {};
        this.mealSelection = {};
        this.dietaryRestriction = {};
        this.getMealRec = (wineChoice) => {
          //TODO: need to test and decide how to pass on results
          return $http.post('/search', { wine: wineChoice, hits: 5 });
        };
        this.getWineRec = (mealChoice) => {};
      }
    });
