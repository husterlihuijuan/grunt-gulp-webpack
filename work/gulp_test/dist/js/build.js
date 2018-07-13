(function(){
    function foo(n1,n2){
       return n1+n2;
    }
    //console.log(foo(2,3));
})();
(function(){
    var result = [1,2,3,4,5].map(function(item,index){
        return item+10;
    });
    console.log(result);
})();