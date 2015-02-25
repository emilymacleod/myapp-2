angular.module('starter.controllers', [])

    .controller('LoginCtrl', function($scope, LoginService, $ionicPopup, $state) {
        $scope.errorMessage = "";
      $scope.data = {};

      $scope.login = function() {


        LoginService.loginUser($scope.data.username, $scope.data.password).success(function(data) {
            console.log(data.status);
           if (data.status == "error"){
               console.log("error Message");
               $scope.errorMessage = "Could not login";
               $state.go("signIn");
           }
            else {
               console.log("success");
               $state.go('tab.dash');
           }
        }).error(function(data) {
          var alertPopup = $ionicPopup.alert({
            title: 'Login failed!',
            template: 'Please check your credentials!'
          });
        });
      }
    })

    .controller('SignInCtrl', function($scope, $state, $http) {
        $scope.errorMessage ="";
      $scope.signIn = function(user) {

        $http.post("http://api.maggiestcloud.com/login", {email: user.email, password: user.password} )
          .success(function(data){ console.log(data);
            if (data.status.length && data.status == "success") {
              console.log("success");
              $state.go('tab.dash');
            }
            else {
                $scope.errorMessage ="could not login";
              $state.go('signIn');
            }
          })
           .error(function(data){
            console.log("error");
             $state.go('signIn', {errorMessage: "Invalid Login"});
          });

       /* console.log('Sign-In', user);
        $state.go('tab.dash');*/
      };

    })

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  }
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('FriendsCtrl', function($scopeq, Friends) {
  $scope.friends = Friends.all();
})

.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
