/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


(function () {
    'use strict';
    angular
            .module('main', ['index', 'ngMaterial', 'ngAnimate'])
            //.controller('postProductCtrl', postProductCtrl)
            .controller('postProductCtrl', ['$scope', '$http', function ($scope, $http) {
                    $scope.isLoading = false;
                    $scope.types = ["Animal", "Plants"];
                    $scope.imagePath = 'images/1.jpg';
                    $scope.productData = {};
                    $scope.productData.negotiable=true;
                    $scope.negotiableStr = function () {
                        if ($scope.productData.negotiable)
                            return "Yes, we can negotiate";
                        else
                            return "This my last price";
                    }

                    $scope.sellit = function () {

                        $scope.isLoading = true;
                        $http({
                            method: 'POST',
                            url: 'api/post',
                            data: $scope.productData, //forms user object
                            headers: {'Content-Type': 'application/json'}
                        }).then(function success(data) {
                            $scope.isLoading = false;
                            var r = data.data;
                            if (r.status === 1) {
                                $scope.message = r.post_id;
                                $scope.isRedirecting = true;

                            } else {
                                $scope.message = "Something we don't expect happened. We are working on it."
                            }

                        }, function error(data) {
                            //$scope.isLoading = false;
                            $scope.message = data.statusText;
                            alert($scope.message);
                        });
                    }

//                    $scope.register = function () {
//                        $scope.isLoading = true;
//                        $http({
//                            method: 'POST',
//                            url: 'api/post',
//                            data: $scope.userData, //forms user object
//                            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
//                        }).then(function success(data) {
//                            $scope.isLoading = false;
//                            var r = data.data;
//                            if (r.status === 1) {
//                                $scope.message = "You are now part of us, I'm redirecting you..."
//                                $scope.isRedirecting = true;
//                                // redirect the browser here
//                                $window.location.href = '/main';
////                                $location.path( "main" );
//
//                            } else {
//                                $scope.message = "Something we don't expect happened. We are working on it."
//                            }
//
//                        }, function error(data) {
//                            //$scope.isLoading = false;
//                            $scope.message = data.statusTextßß;
//                            alert($scope.message);
//                        });
//
//                    };

                }]);

//    function postProductCtrl($scope) {
//        $scope.types = ["Animal", "Plants"];
//        $scope.negotiable = true;
//        $scope.productData = {};
//        $scope.negotiableStr = function () {
//            if ($scope.negotiable)
//                return "Yes, we can negotiate";
//            else
//                return "This my last price";
//        }
//
//        $scope.sellit = function () {
//            alert("I'm selling it");
//        }
//    }

})();

