(function(){
 angular.module('plunker')
 .directive('ngStrikes',['$window',function($window){
        return {  
                 
            link:function(scope,element,attr){ 
                element.bind('click',function(){
                   
                    var news_id = element.attr("news_id")
                    var inputElement = angular.element(element[0].querySelector('.checkbox'));
                    
                    if(inputElement[0].checked){
                        $window.localStorage['newsIds'+'_'+news_id] = news_id
                        element.attr("class","strikeThrough");
                        
                    }else{
                        $window.localStorage.removeItem('newsIds'+'_'+news_id)
                        element.removeAttr("class","strikeThrough")
                        
                    }
                    
                    
                });
            }
        }
    }]);

})();

