angular.module('app')
  .controller('PairingsCtrl', function($http) {
    this.view = 'form';
    this.changeview = function(viewChoice) {
      this.view = viewChoice;
    };

    this.winerecommendations;
    this.mealrecommendations;
    this.wineselection = {};
    this.mealselection = {};

    this.mealchosen;
    this.winechosen;

    this.getmealrec = (wineChoice) => {
      this.winechosen = wineChoice;
      $http.post('/recipes', { mealPreference: wineChoice })
        .then((res) => {
          console.log(res.data);
          this.mealrecommendations = res.data;
        })
        .catch((err) => {
          console.error(err);
          alert('Sorry, there was a problem fetching your recommendations. Please try again later.');
        });
    };

    this.getwinerec = (mealChoice) => {
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
      this.mealchosen = mealChoice;
      $http.post('/search', { wine, hits: 10 })
        .then((res) => {
          this.winerecommendations = res.data;
        })
        .catch((err) => {
          console.error(err);
          alert('Sorry, there was a problem fetching your recommendations. Please try again later.');
        });
    };
})
  .component('pairingsform', {
    templateUrl: '../templates/pairingsForm.html',
    controller: 'PairingsCtrl'
  });
