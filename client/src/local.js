const { MAPS_TOKEN } = require('../../maps-config');
angular.module('app')
  .component('local', {
    templateUrl: 'templates/local.html',
    controller($http, $window) {
      this.location;
      this.$onInit = () => {
        $http.get('/local', {})
        .then((res) => {
          this.location = res.data.candidates[0].geometry.location;
          this.lat = String(this.location.lat);
          this.lng = String(this.location.lng);
          this.name = res.data.candidates[0].name;
          this.rating = res.data.candidates[0].rating;
          this.formatted_address = res.data.candidates[0].formatted_address.split(',');
          this.street = this.formatted_address[0];
          this.state = this.formatted_address[1];
          this.city = this.formatted_address[2];
          this.photos = res.data.candidates[0].photos;
          this.open = res.data.candidates[0].opening_hours.open_now;
          this.price = res.data.candidates[0].price_level;
          this.url = `https://www.google.com/maps/embed/v1/place?key=${MAPS_TOKEN}&q=${this.lat},${this.lng}`;
          this.url2 = `https://www.google.com/maps/embed/v1/view
          ?key=AIzaSyBd_Xqb8heicTe-g_UALlO1131GqyoZNLw&q
          &center=${this.lat},${this.lng}
          &zoom=18
          &maptype=roadmap`
        })
      }
      this.onClick = () => {
        $http.post('/local', {})
          .then((res) => {
            alert('Your wine stores will be coming soon.');
          })
          .catch((err) => {
            console.error(err);
            alert('Sorry, there was a problem getting your local wine stores. Please try again.');
          });
      };
    },
  });