angular.module('app.controllers')
    .controller('Neo4jListController',
    ['$scope','$location', '$routeParams',
        function($scope, $location, $routeParams){
            $scope.search = $routeParams.id;
        }]);