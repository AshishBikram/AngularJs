(function(){
'use strict';

angular.module('plunker').controller('ModalContentCtrl',ModalContentCtrl); 

ModalContentCtrl.$inject = ['CrudService','$uibModalInstance','newsData','action'];

function ModalContentCtrl(CrudService,$uibModalInstance,newsData,action) {
  var ctrl = this;
  ctrl.maxLengthStatus = false
  ctrl.save = save;
  ctrl.cancel = cancel;
  ctrl.loadData = loadData;
  ctrl.lengthValidation = lengthValidation;
  ctrl.$onInit = function() {
    ctrl.loadData()
  };
  
  function save(){
    if(ctrl.news.id)
    {
      var apiRoute = "http://localhost:3000/app-data";
      var student = CrudService.updateNews(apiRoute+'/'+ctrl.news.id,ctrl.news);
      student.then(function (response) {
        console.log(response)
      },
        function (error) {
          console.log("Error: " + error);
      });
    }else
    {
      ctrl.news.id = ''
      ctrl.news.checkbox = false
      var apiRoute = "http://localhost:3000/app-data";
      var student = CrudService.saveNews(apiRoute,ctrl.news);
      student.then(function (response) {
        console.log(response)
        },
        function (error) {
          console.log("Error: " + error);
        });
    }
    $uibModalInstance.close(ctrl.news);
  }
   
  
  
  function cancel(){ 
    $uibModalInstance.dismiss();
  } 

  function lengthValidation(){
    var wordArray = ctrl.news.title == undefined ? '' : ctrl.news.title.split(' ');
    var element = angular.element(document.querySelector('.d-title'))
    if(wordArray.length >= 25){  
      ctrl.maxLengthStatus = true
    }else{  
      ctrl.maxLengthStatus = false
    }  
  }

  function loadData(){
    ctrl.news = {
      id:newsData.id,
      title:newsData.title,
      description:newsData.description,
      checkbox: newsData.checkbox
    }
    ctrl.action = action.actionTaken
  }
};
})();
