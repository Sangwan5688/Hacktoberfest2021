//DDA (Digital Differencial analyzer) Algorithm is one of the basic way to draw a line on computer using set of code

#include <iostream>
#include<graphics.h>
#include<math.h>

using namespace std;

int main()
{

    int x1,y1,x2,y2,xn,yn,dx,dy,step;
   /*(x1,y1) and (x2,y2) as initial and final points.
    (xn,yn) are points (or pixels) between initial and final point
    dx and dy are the difference b/w initial and final points.
    step is the variable which will divide xn,yn to calculate the incremented factor (xn,yn).
    */
    // 1.Taking initial and final points as input.

    cout<<"Enter initial coordinates ";
    cin>>x1>>y1;
    cout<<"Enter final coordinates ";
    cin>>x2>>y2;

    //2. Calculate dx and dy in order to calculate the slope.
    dx=x2-x1;
    dy=y2-y1;

    //3. Calculate the step
    if(abs(dx)>abs(dy)) {
        step=abs(dx);
    }
    else {
        step=abs(dy);
    }
   // 4. Cacculate the incremented factors.
    xn=dx/step;
    yn=dy/step;
    //5. Initialize window width and height into which the line is drawn
     initwindow(1000,1000);
     //6. Calculate upcoming pixel of the line and plot into the window.
    for(int i=1;i<=step;i++) {
        putpixel(x1,y1,LIGHTBLUE);
        delay(10);
        x1+=xn;
        y1+=yn;
    }
    getch();
}
