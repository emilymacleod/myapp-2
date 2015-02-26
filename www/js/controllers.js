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




    .controller('LocationCtrl', function($scope, $state) {
    $scope.locationString = "Please click the button above to get your location.";
    $scope.getCurrentLocation = function() {
       if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
 var lat = position.coords.latitude;
        var lng = position.coords.longitude;
        $scope.locationString = 'Your current location is... Latitude: '+lat+' and Longitude: '+lng;
        $state.go('tab.location');
      });
    } else {
      $scope.locationString = "Sorry, but the computer Gremlins struck again!  Yell at Rob!";
      $state.go('tab.location');
    }
    
  }
})

    .controller('CameraCtrl', function($scope, $state) {
  $scope.imageURI = 'http://www.dvinfo.net/forum/attachments/view-video-display-hardware-software/4853d1193613730-smpte-color-bars-bars_pal.jpg';
  $scope.takePhoto = function() {
var cameraOptions = {
      targetWidth: 300,
      targetHeight: 300
    };
    navigator.camera.getPicture(function(imageURI) {
      
      $scope.imageURI = imageURI;
      $state.go('tab.camera');

    }, function(err) {

      alert("Oops!  Can't take your photo!  Either you backed out before saving a photo, or you are not on a device.  Camera will not work from the emulator...");
    }, cameraOptions);
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
