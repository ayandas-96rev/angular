(function(){

    'use strict';

    angular.module("NarrowItDownApp",[])
    .controller("NarrowItDownController",narrowItDownController)
    .service("MenuSearchService",MenuSearchService)
    .directive("foundItems",foundItemsFactory);

    function foundItemsFactory(){
        var ddo={
            scope:{
                items:"<",
                remove:"&",
                load:"<"
            },
            link:foundItemLink,
            transclude:true,
            controller:directiveController,
            controllerAs:"dir",
            bindToController:true,
            templateUrl:"./template.html"
        };
        return ddo;
    }

    function foundItemLink(scope,elements){
        scope.$watch("dir.checkLength()",function(n,o){
            if(n==0){
                var elem = elements.find("div.nothing");
                elem.css("display","block");
            }
            else{
                var elem = elements.find("div.nothing");
                elem.css("display","none");
            }
        });
    }

    function directiveController(){
        var dir = this;
        dir.checkLength=function(){
            return dir.items.length;
        };

    }

    narrowItDownController.$inject=["MenuSearchService","$timeout"];
    function narrowItDownController(MenuSearchService,$timeout){
        var main = this;
        main.found=[];
        main.loadStatus=false;
        main.searchTerm="";
        main.narrowIt = function(){
            main.found=[];
            main.loadStatus=true;
            if(main.searchTerm.trim()==""){
                $timeout(function(){
                    main.loadStatus=false;
                },300);
            }
            else{
                var promise=MenuSearchService.getMatchedMenuItems(main.searchTerm);
                promise.then(function(response){
                    $timeout(function(){
                        main.found=response;
                        main.loadStatus=false;
                    },2000);
                });
            }
        };
        main.removeIt = function(index){
            main.found.splice(index,1);
        };
    }

    MenuSearchService.$inject=["$http"];
    function MenuSearchService($http){
        var service=this;
        service.getMatchedMenuItems = function(searchTerm){
            return $http({
                method:"GET",
                url:"https://davids-restaurant.herokuapp.com/menu_items.json",
            }).then(function(response){
                let found=[];
                for(let i of response.data.menu_items){
                    if(i.description.toLowerCase().indexOf(searchTerm.toLowerCase())!==-1){
                        found.push(i);
                    }
                }
                return found;
            });
        };
    }

})();