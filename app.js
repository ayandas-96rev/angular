        (function(){

            angular.module("MyTestApp",[])
            .controller("TestController",function($scope){
                $scope.name="";
                $scope.totalValue=0;
                let somFunc = function(){

                    var totalNameValue=11;

                    totalNameValue=calcVal($scope.name);
                    
                    $scope.totalValue=totalNameValue;
                };

                function calcVal(string){
                    var total=11;
                    var c=0;
                    for(let i of string){
                        total+=string.charCodeAt(c);
                        c++;
                    }
                    return total;
                }
            });

        })();
  