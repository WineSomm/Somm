angular.module('app')
  .controller('PairingsCtrl', function($http) {
    this.wineSelection = {};
    this.mealSelection = {};
    this.getmealrec = (wineChoice) => {};

    this.getwinerec = (mealChoice) => {
      console.log('click');
      let wine;
      if (mealChoice === 'barbeque') {
        wine = 'Shiraz';
      }
      if (mealChoice === 'dessert') {
        wine = "Moscato d'Asti";
      }
      if (mealChoice === 'red-meat') {
        wine = 'Cabernet Sauvignon';
      }
      if (mealChoice === 'salty') {
        wine = 'brut Champagne';
      }
      if (mealChoice === 'seafood') {
        wine = 'Shiraz';
      }
      if (mealChoice === 'spicy') {
        wine = 'Off-Dry Riesling';
      }
      //TODO: need to test and decide how to pass on results
      $http.post('/search', { wine, hits: 10 })
        .then((res) => {
          this.winerecomendations = res.data;
          console.log(this.winerecomendations, 'wine recomendations');
        })
        .catch((err) => {
          console.error(err);
          alert('Sorry, there was a problem fetching your recommendation. Please try again later.');
        });
    };
})
  .component('pairingsform', {
    bindings: {
      view: '<',
      changeview: '<',
      winerecomendations: '<',
      mealrecomendations: '<'
    },
    templateUrl: '../templates/pairingsForm.html',
    controller: 'PairingsCtrl'
  });
