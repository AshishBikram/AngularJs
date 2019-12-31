(function(){

    'use strict';
    
    angular
    .module('plunker', ['ui.bootstrap','ngCookies'])
    .controller('ModalCtrl',ModalCtrl); 
    
    ModalCtrl.$inject  = ['CrudService','$uibModal','$cookies','$window'];
    
    function ModalCtrl(CrudService,$uibModal,$cookies,$window)
    {
      var vm = this;  
      vm.idStorageList = []
      vm.open = open;
      vm.getData = getData;
      vm.deleteNews = deleteNews;
      vm.getEmptyNews = getEmptyNews;
      vm.openDetail = openDetail;
      vm.setStorageValues =setStorageValues
      vm.$onInit = function() {
           vm.getData();
           vm.setStorageValues();
      };


      function setStorageValues(){
        for(var key in $window.localStorage){
          if(key.indexOf("newsIds") !== -1){
            vm.idStorageList.push(parseInt($window.localStorage[key]))
          }
        }
      }

      function openDetail(news){
        var modalInstance =  $uibModal.open({
          templateUrl: "form.html",
          controller: "ModalContentCtrl",
          controllerAs: 'ctrl',
          windowClass: 'app-modal-window',
          resolve:{
            newsData: {
              id:news.id,
              title:news.title,
              description:news.description,
              checkbox: news.checkbox
            },
            action:{
              actionTaken:'details'
            }
            
          },
          
        });
           
      }

      function open(news){
        if(news ===''){
          vm.getEmptyNews;
        }
        
        var modalInstance =  $uibModal.open({
          templateUrl: "form.html",
          controller: "ModalContentCtrl",
          controllerAs: 'ctrl',
          windowClass: 'app-modal-window',
          resolve:{
            newsData: {
              id:news.id,
              title:news.title,
              description:news.description
            },
            action:{
              actionTaken:'saveUpdate'
            }
            
          },
          
        });
        modalInstance.result.then(function(newsData) {
          if(!newsData.id){
            vm.newsList.push(newsData);
          }else{
            
            vm.newsList[vm.newsList.findIndex(obj => obj.id == newsData.id)] = newsData
          }
    
        });    
      }

      function getData(){
        var apiRoute = "http://localhost:3000/app-data";
            var newsData = CrudService.getAll(apiRoute);
            newsData.then(function (response) {
                
                vm.newsList = response.data;
                console.log(vm.newsList)
            },
            function (error) {
                console.log("Error: " + error);
            });
      }

      function deleteNews(id){
        var apiRoute = "http://localhost:3000/app-data/"+id;
            var newsData = CrudService.deleteNews(apiRoute);
            newsData.then(function (response) {

                vm.newsList.splice(vm.newsList.findIndex(news => news.id == id),1)
            },
            function (error) {
                console.log("Error: " + error);
            });
      }

      function getEmptyNews(){
        news = {
          id:null,
          title:null,
          description:null,
          checkbox: false
        }
      }
      
  }
    
  
})();