(function () {
  'use strict';
  angular
      .module('index', ['ngMaterial','ngAnimate'])
      .controller('AutoCtrl', AutoCtrl)
      .controller('signUp', dialogCtrl)
      .controller('RegCtrl', ['$scope','$http','$window', function ($scope,$http,$window) {
                    $scope.selection = false;
                    $scope.title = "Login";
                    $scope.butText = "Create an Account"
                    $scope.isLoading = false;
                    $scope.isLoginLoading = false;
                    $scope.message = "";
                    $scope.isRedirecting = false;
                    $scope.userData = {};
                    $scope.loginData = {};
                    
                    $scope.toggle = function(){
                        $scope.selection=!$scope.selection;
                        if ($scope.selection) {
                            $scope.title = "We have been waiting for you!";
                            $scope.butText = "Login"
                        } else {
                            $scope.title = "Login";
                            $scope.butText = "Create an Account";
                        }
                    }
                    
                    $scope.register = function () {
                        $scope.isLoading = true;
                        alert($scope.userData);
                        $http({
                            method: 'POST',
                            url: 'api/reg',
                            data: $scope.userData, //forms user object
                            headers: {'Content-Type': 'application/json'}
                        }).then(function success(data) {
                            $scope.isLoading = false;
                            var r = data.data;
                            if(r.status===1){
                                $scope.message = "You are now part of us, I'm redirecting you..."
                                $scope.isRedirecting = true;
                                // redirect the browser here
                                $window.location.href = '/main';
//                                $location.path( "main" );
                                
                            }else{
                                $scope.message = "Something we don't expect happened. We are working on it."
                            }
                            
                        },function error(data){
                            //$scope.isLoading = false;
                            $scope.message = data.statusTextßß;
                            alert($scope.message);
                        });
                                
//                                success(function (data) {
//                            $scope.isLoading = false;
//                            
//                            if (data.errors) {
//                                // Showing errors.
//                                $scope.errorUserName = data.errors.username;
//                                $scope.errorPassword = data.errors.email;
//                            } else {
//                                $scope.message = data.message;
//                                //$scope.message = "You are now part of us, I'm redirecting you"
//                                $scope.isRedirecting = true;
//                            }
//                        });
                    };

                    $scope.login = function () {
                        $scope.isLoginLoading = true;
                        $scope.message=$scope.loginData;
                        $http({
                            method: 'POST',
                            url: 'api/login',
                            data: $scope.loginData, //forms user object
                            headers: {'Content-Type': 'application/json'}
                        }).success(function (data) {
                            $scope.isLoading = false;
                            
                            if (data.errors) {
                                // Showing errors.
                                $scope.errorName = data.errors.name;
                                $scope.errorUserName = data.errors.username;
                                $scope.errorEmail = data.errors.email;
                            } else {
                                //data.message;
                                
                                $scope.isRedirecting = true;
                            }
                        });
                    };

                }])
    
  function AutoCtrl ($timeout, $q, $log) {
    var self = this;
    self.simulateQuery = false;
    self.isDisabled    = false;
    // list of `state` value/display objects
    self.states        = loadAll();
    self.querySearch   = querySearch;
    self.selectedItemChange = selectedItemChange;
    self.searchTextChange   = searchTextChange;
    self.newState = newState;
    function newState(state) {
      alert("Sorry! You'll need to create a Constituion for " + state + " first!");
    }
    // ******************************
    // Internal methods
    // ******************************
    /**
     * Search for states... use $timeout to simulate
     * remote dataservice call.
     */
    function querySearch (query) {
      var results = query ? self.states.filter( createFilterFor(query) ) : self.states,
          deferred;
      if (self.simulateQuery) {
        deferred = $q.defer();
        $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
        return deferred.promise;
      } else {
        return results;
      }
    }
    function searchTextChange(text) {
      $log.info('Text changed to ' + text);
    }
    function selectedItemChange(item) {
      $log.info('Item changed to ' + JSON.stringify(item));
    }
    /**
     * Build `states` list of key/value pairs
     */
    function loadAll() {
      var allStates = 'Yam, Rice, Potatoe, Beans, Pepper, Onion, Cashew, Maize, Wheat, Oat, Cassava, Pork, Beef, Soya, Garri';
      return allStates.split(/, +/g).map( function (state) {
        return {
          value: state.toLowerCase(),
          display: state
        };
      });
    }
    /**
     * Create filter function for a query string
     */
    function createFilterFor(query) {
      var lowercaseQuery = angular.lowercase(query);
      return function filterFn(state) {
        return (state.value.indexOf(lowercaseQuery) === 0);
      };
    }
  }
      
 function dialogCtrl($scope, $mdDialog, $mdMedia) {
  $scope.status = '  ';
  $scope.customFullscreen = $mdMedia('xs') || $mdMedia('sm');
  $scope.showAlert = function(ev) {
    // Appending dialog to document.body to cover sidenav in docs app
    // Modal dialogs should fully cover application
    // to prevent interaction outside of dialog
    $mdDialog.show(
      $mdDialog.alert()
        .parent(angular.element(document.querySelector('#popupContainer')))
        .clickOutsideToClose(true)
        .title('This is an alert title')
        .textContent('You can specify some description text in here.')
        .ariaLabel('Alert Dialog Demo')
        .ok('Got it!')
        .targetEvent(ev)
    );
  };
  $scope.showConfirm = function(ev) {
    // Appending dialog to document.body to cover sidenav in docs app
    var confirm = $mdDialog.confirm()
          .title('Would you like to delete your debt?')
          .textContent('All of the banks have agreed to forgive you your debts.')
          .ariaLabel('Lucky day')
          .targetEvent(ev)
          .ok('Please do it!')
          .cancel('Sounds like a scam');
    $mdDialog.show(confirm).then(function() {
      $scope.status = 'You decided to get rid of your debt.';
    }, function() {
      $scope.status = 'You decided to keep your debt.';
    });
  };
  $scope.showAdvanced = function(ev) {
    var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
    $mdDialog.show({
      controller: DialogController,
      templateUrl: 'dialog1.tmpl.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
      fullscreen: useFullScreen
    })
    .then(function(answer) {
      $scope.status = 'You said the information was "' + answer + '".';
    }, function() {
      $scope.status = 'You cancelled the dialog.';
    });
    $scope.$watch(function() {
      return $mdMedia('xs') || $mdMedia('sm');
    }, function(wantsFullScreen) {
      $scope.customFullscreen = (wantsFullScreen === true);
    });
  };
  $scope.showTabDialog = function(ev) {
    $mdDialog.show({
      controller: DialogController,
      templateUrl: 'tabDialog.tmpl.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true
    })
        .then(function(answer) {
          $scope.status = 'You said the information was "' + answer + '".';
        }, function() {
          $scope.status = 'You cancelled the dialog.';
        });
  };
};
function DialogController($scope, $mdDialog) {
  $scope.hide = function() {
    $mdDialog.hide();
  };
  $scope.cancel = function() {
    $mdDialog.cancel();
  };
  $scope.answer = function(answer) {
    $mdDialog.hide(answer);
  };
}
  
})();

		