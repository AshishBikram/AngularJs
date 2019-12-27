(function(){
    'use strict';

    angular.module('plunker')
    .service('CrudService',CrudService);

    CrudService.$inject = ['$http'];

    function CrudService($http){

        var service = this;
        
        service.saveNews = saveNews;
        service.getAll = getAll;
        service.updateNews=updateNews;
        service.deleteNews = deleteNews;
      
        
        function saveNews(apiRoute,news) {

            return $http.post(apiRoute,news);
        }

        function updateNews(apiRoute,news) {

            return $http.put(apiRoute,news);
        }

        function getAll(apiRoute) {

            return $http.get(apiRoute);
        }

        function deleteNews(apiRoute){
            return $http.delete(apiRoute);
        }

    }


})();

