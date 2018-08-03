angular.module('app')
  .component('buy', {
    bindings: {
    },
    controller($scope, $http) {
      this.results = '';
      this.onint = (input) => {
        input = 'Dom Perignon champagne';
        const keyword = input.split(' ').join('%20');
        $scope.search = '';
        $http.post('/buy', {
          wine: keyword,
        })
          .then((res) => {
            // this.results = res.data;
            this.results = res.data.findItemsByKeywordsResponse[0].searchResult[0].item;
            // this.url = this.results.galleryURL[0];
          })
          .catch((error) => {
            console.error(error);
          });
      };
      this.onint();
      this.buyonline = (input) => {
        // console.log(input, 'input');
        const keyword = input.split(' ').join('%20');
        $scope.search = '';
        $http.post('/buy', {
          wine: keyword,
        })
          .then((res) => {
            // this.results = res.data;
            this.results = res.data.findItemsByKeywordsResponse[0].searchResult[0].item;
            // this.url = this.results.galleryURL[0];
          })
          .catch((error) => {
            console.error(error);
          });
      };
    },
    templateUrl: '../templates/buy.html',
  });
