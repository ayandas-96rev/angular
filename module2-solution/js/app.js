(function(){

    var ShoppingList=[
        {
            item:"Cookies",
            quantity:"10"
        },
        {
            item:"Pastries",
            quantity:"10"
        },
        {
            item:"Cakes",
            quantity:"2"
        },
        {
            item:"Candies",
            quantity:"20"
        },
        {
            item:"Cadbury bars",
            quantity:"5"
        }
    ];

    angular.module('CheckOffApp',[])
    .controller("toBuy",toBuy)
    .controller("bought",bought)
    .service("ListService",ListService);

    toBuy.$inject=['ListService'];
    bought.$inject=['ListService'];

    function toBuy(ListService){
        var one=this;
        one.list=ListService.getBuyList();
        one.addBought=function(index){
            ListService.addBought(index);
        };
    }

    function bought(ListService){
        var two=this;
        two.list=ListService.getBought();
    }

    function ListService(){
        var service=this;
        service.toBuyList=ShoppingList;
        service.boughtList=[];
        service.addBought=function(index){
            service.boughtList.push(service.toBuyList[index]);
            service.toBuyList.splice(index,1);
        };
        service.getBuyList=function(){
            return service.toBuyList;
        };
        service.getBought=function(){
            return service.boughtList;
        };
    }

})();