(function(){
 angular.module('plunker')
 .directive('ngStrikes',function(){
        return {          
            link:function($scope,element,attr){
                element.bind('click',function(){
                    var inputElement = angular.element(element[0].querySelector('.checkbox'));
                    if(inputElement[0].checked){
                        element.attr("class","strikeThrough");
                    }else{
                        element.removeAttr("class","strikeThrough")
                    }
                    
                    
                });
            }
        }
    });

})();

