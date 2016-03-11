angular.module('app.controllers')
    .controller('ProjectRemoveController',
    ['$scope','$location', '$routeParams','Project',
        function($scope, $location, $routeParams, Project){

            $scope.projects = Project.get({
                project_id: $routeParams.id
            });

            $scope.remove = function(){

                $scope.projects.$delete({
                    id: $scope.projects.project_id
                }).then(function(){
                    $location.path('/project/');
                });

            }

        }]);