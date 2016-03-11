angular.module('app.controllers')
    .controller('ProjectEditController',
    ['$scope','$location','$routeParams', '$cookies', 'Project','Client', 'appConfig',
        function($scope, $location, $routeParams, $cookies, Project, Client, appConfig){

            $scope.projects = Project.get({project_id: $routeParams.id});
            $scope.clients = Client.query();

            $scope.status = appConfig.project.status;

            $scope.save = function(){
                if($scope.form.$valid){
                    $scope.projects.owner_id = $cookies.getObject('user').id;
                    Project.update({id: $scope.projects.id}, $scope.projects, function(){
                        $location.path('/project');
                    });
                }
            }

        }]);