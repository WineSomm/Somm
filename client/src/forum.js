angular.module('app')
  .component('forum', {
    controller($scope, $http) {
      this.show = false;
      this.editPost = (postId) => {
        this.show = true;
        $http
          .get('/forum/'+postId)
          .then((res) => {
            $scope.post = res.data;
            console.log(res.data, 'in editPost');
          })
      }
      this.getpost = () => {
        $http
          .get('/forum')
          .then((posts) => {
            $scope.posts = posts.data;
          })
          .catch((error) => {
          });
      };
      this.getpost();
      this.createpost = (post) => {
        console.log(post);
        $http
          .post('/forum', post)
          .then((success) => {
            console.log('success on posting blog');
            this.getpost();
          })
          .catch((error) => {
            console.error(error);
          });
      };
      this.deletePost = (postId) => {
        console.log(postId, 'postId');
        $http
          .delete('/forum/'+postId)
          .then(() => {
            this.getpost();
          })
          .catch((error) => {
            console.error(error);
          })
      };
      this.updatepost = (post) => {
        console.log(post, 'post');
        $http
          .put('/forum/'+post._id, post)
          .then((res) => {  
            console.log(res.data, 'update response');
            this.getpost();
          })
          .catch((error) => {
            console.error(error);
          });
      } 

    },
    templateUrl: '../templates/forum.html',
  });
