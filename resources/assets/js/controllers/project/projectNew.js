angular.module('app.controllers')
    .controller('ProjectNewController',
    ['$scope','$location', '$cookies', 'Project','Client', 'appConfig',
        function($scope, $location, $cookies, Project, Client, appConfig){

        $scope.projects = new Project();
        $scope.clients = Client.query();

        $scope.status = appConfig.project.status;

        $scope.save = function(){
            if($scope.form.$valid){
                $scope.projects.owner_id = $cookies.getObject('user').id;
                $scope.projects.$save().then(function(){
                    $location.path('/project')
                });
            }
        }

    }]);