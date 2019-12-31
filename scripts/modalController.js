(function(){

    'use strict';
    
    angular
    .module('plunker', ['ui.bootstrap'])
    .controller('ModalCtrl',ModalCtrl); 
    
    ModalCtrl.$inject  = ['CrudService','$uibModal'];
    
    function ModalCtrl(CrudService,$uibModal)
    {
      var vm = this;  
      vm.open = open;
      vm.getData = getData;
      vm.deleteNews = deleteNews;
      vm.getEmptyNews = getEmptyNews;
      vm.openDetail = openDetail;
      vm.updateCheckbox = updateCheckbox

      vm.$onInit = function() {
           vm.getData();
      };
    
      function updateCheckbox(news){
        var apiRoute = "http://localhost:3000/app-data";
        var newsData = CrudService.updateNews(apiRoute+'/'+news.id,news);
        newsData.then(function (response) {
          console.log(response)
        },
          function (error) {
            console.log("Error: " + error);
        });
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
              description:news.description
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
          description:null
        }
      }
      
  }
    
  
})();