#include<iostream>

#include<graphics.h>

using namespace std;

void drawline(int x0, int y0, int x1, int y1){
    int dx, dy, p, x, y,exchange;

    dx=x1-x0;
    dy=y1-y0;

    x=x0;
    y=y0;

    //p=(2*dy)-dx;
    
    
    if(dy>dx){
    	p=2*dx-dy;
    }
    else
    	p=2*dy-dx;
    	

    while(x<x1){
        if(p>=0){
            putpixel(x,y,7);
            y=y+1;
            p=p+(2*dy)-(2*dx);
        }
        else{
            putpixel(x,y,7);
            p=p+(2*dy);
        }
        x=x+1;
    }
    
    
}

int main(){
    
    int x0, y0, x1, y1;
    
	int gd=DETECT, gm;
	initgraph(&gd, &gm,NULL);
    cout<<"Enter co-ordinaes of first point : "<<endl;
    cin>>x0>>y0;

    cout<<"Enter co-ordinates of second point : "<<endl;
    cin>>x1>>y1;
    drawline(x0,y0,x1,y1);
	int i,j;
	for(i=0;i<=500;i=i+100){
		for(j=0;j<=500;j=j+100){
			putpixel(i,j,5);
		}
	}
	getch();
    closegraph();
    return 0;

}
