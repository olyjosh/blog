/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


(function () {
    'use strict';
    angular
            .module('main', ['index', 'ngMaterial', 'ngAnimate'])
            .controller('postBlogCtrl', ['$scope', '$http', function ($scope, $http) {
                    $scope.isLoading = false;
                    $scope.productData = {};
                    $scope.elements = [];
                    $scope.editable = false;

                    //Fetch post
                    $http({
                        method: 'POST',
                        url: 'api/readBlogPost',
                        data: $scope.productData, //forms user object
                        headers: {'Content-Type': 'application/json'}
                    }).then(function success(data) {
                        var r = data.data;
                        if (r.status === 1) {
                            $scope.elements = r.posts;
                            $scope.isRedirecting = true;
                            $scope.updatePost();
                            $scope.productData = {};
                        } else {
                            $scope.message = "Something we don't expect happened. We are working on it."
                        }
                    }, function error(data) {
                        //$scope.isLoading = false;
                        $scope.message = data.statusText;
                        alert($scope.message);
                    });

                    $scope.updatePost = function () {
                        $scope.elements.push($scope.productData);
                    }

                    //Do the posting of a thing
                    $scope.postIt = function () {

                        $scope.isLoading = true;
                        $http({
                            method: 'POST',
                            url: 'api/createBlogPost',
                            data: $scope.productData, //forms user object
                            headers: {'Content-Type': 'application/json'}
                        }).then(function success(data) {
                            $scope.isLoading = false;
                            var r = data.data;
                            if (r.status === 1) {
                                $scope.message = "Just got it posted!";
                                $scope.isRedirecting = true;
                                //$scope.updatePost();
                                $scope.productData = {};
                                $scope.elements.push(r.post);
                            } else {
                                $scope.message = "Something we don't expect happened. We are working on it."
                            }
                        }, function error(data) {
                            //$scope.isLoading = false;
                            $scope.message = data.statusText;
                            alert($scope.message);
                        });
                    }

                    $scope.deleteIt = function (idd, index) {
                        $scope.elements.splice(index, 1);
                        $scope.isLoading = true;
                        $http({
                            method: 'POST',
                            url: 'api/deleteBlogPost',
                            data: {id: idd}, //forms user object
                            headers: {'Content-Type': 'application/json'}
                        }).then(function success(data) {
                            $scope.isLoading = false;
                            var r = data.data;
                            if (r.status === 1) {
                                $scope.message = "Just got it deleted!";
                            } else {
                                $scope.message = "Something we don't expect happened. We are working on it."
                            }
                        }, function error(data) {
                            //$scope.isLoading = false;
                            $scope.message = data.statusText;
                            alert($scope.message);
                        });
                    }
                    
                    $scope.editable = false
                    $scope.editIt = function (idd, title, post) {
                        $scope.isLoading = true;
                        
                        $http({
                            method: 'POST',
                            url: 'api/editBlogPost',
                            data: {id: idd, title: title, post:post}, //forms user object
                            headers: {'Content-Type': 'application/json'}
                        }).then(function success(data) {
                            $scope.isLoading = false;
                            var r = data.data;
                            if (r.status === 1) {
                                $scope.message = "Just got it edited!";
                            } else {
                                $scope.message = "Something we don't expect happened. We are working on it."
                            }
                        }, function error(data) {
                            //$scope.isLoading = false;
                            $scope.message = data.statusText;
                            alert($scope.message);
                        });

                    }
                    
                   

                }]);




})();

