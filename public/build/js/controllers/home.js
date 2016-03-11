angular.module('app.controllers')
    .controller('HomeController',['$scope','$cookies','$location',function($scope, $cookies, $location){

        $scope.search = {
          attribute: ''
        };

        $scope.searchGet = function(){
            $location.path('/neo4j/' + $scope.search.attribute);
        }

    }]);