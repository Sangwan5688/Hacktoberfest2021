/*write function to calculate area of square, a circle and a rectangle*/
#include<stdio.h>
float arearec(float l, float b){
    return l*b;
}
float areacircle(float r){
    return 3.14*r*r;
}
float areasquare(float s){
    return s*s;
}
// float arearec(float l, float b);
// float areacircle(float r);
// float areasquare(float s);

int main(){
    float len,bre,radius,side;
    printf("enter the length and breath of the rectangle : ");
    scanf("%f %f",&len,&bre);
    printf("enter the radius of the circle : ");
    scanf("%f",&radius);
    printf("enter the side of the sqaure : ");
    scanf("%f",&side);
    printf("area of the rectangle is : %f \n",arearec(len,bre));
    printf("area of the circle is : %f \n",areacircle(radius));
    printf("area of the  sqaure is : %f \n",areasquare(side)); 
    return 0;
}

