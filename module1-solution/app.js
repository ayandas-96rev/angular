(function(){

    angular.module("LunchCheck",[])
    .controller("LunchCheckController",checkLunch);

    checkLunch.$inject=['$scope'];
    function checkLunch($scope){
        $scope.result='';
        $scope.name="";
        $scope.returnResult = function(){
            let c=calcNum($scope.name); //number of lunch items
            var messege=checkResult(c); //decides what msg to show
            $scope.color=colorChange(c); //sets text color of the messege display
            $scope.result=messege; // display msg
            $scope.borCol=colorChange(c); //change color of input text border
            
            $scope.resetFunc="reset()"; //interpolates to enable resetting on change in input
        }
        //returns the number of lunch items
        function calcNum(string){
            var count=0;
            var lunchList=string.split(",");
            for(let i of lunchList){
                if(i.trim()!=='')
                    count++;
            }
            return count;
        }

        //returns the messege to be displayed and calls colorChange function
        function checkResult(num){
            if(num==0){
                return "Please enter data first";
            }
            else if(num<=3){
                return "Enjoy!";
            }
            else{
                return "Too Much!";
            }
        }

        //returns element color accordingly
        function colorChange(num){
            if(num==0){
                return "red";
            }
            else{
                return "green";
            }
        }

        //resets page elements to initial
        $scope.reset = function(){
            if($scope.result!=''){
                $scope.result='';
                $scope.borCol='rgb(65, 63, 95)';
            }
            $scope.resetFunc=''; //removes event until again enabled at button click
        }

    }

})();