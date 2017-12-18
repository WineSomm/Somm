angular.module('app', [])
  .component('homepage', {
    template: '<h1>hello from template</h1>',
    controller() {
      this.wine = 'beaujoulais';
    },
  });
