angular.module('app.services')
    .service('ProjectNote',['$resource','appConfig', function($resource, appConfig){
        return $resource(appConfig.baseUrl + '/project/:id/note/:noteId',{project_id: '@id', noteId: '@noteId'},{
            update: {
                method: 'PUT'
            }
        });
    }]);