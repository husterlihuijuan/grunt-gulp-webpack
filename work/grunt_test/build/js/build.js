(function(){
    function foo(m1,m2){
        return m1+m2;
    }
    console.log(foo(2,4));
})();;(function(){
    var result = [1,2,3,4,5].map(function(item,index){
        return item+10;
    });
    console.log(result);
})();