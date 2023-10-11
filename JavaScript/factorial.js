const factorial = (n)=>{
    let res = n;
    n-=1;
    while(n>0){
        res*=n;
    }
    return res;
}
