#include<iostream.h>
#include<conio.h>
#include<graphics.h>
#include<dos.h>
#include<process.h>
#include<stdlib.h>
void makecar(int x, int y)
{
rectangle(x+1,y,x+49,y+100);
rectangle(x+1,y+25,x+49,y+75);
setfillstyle(SOLID_FILL,8);
floodfill((x+x+50)/2,(y+y+100)/2,15);
}
void clear(int x,int y)
{
setcolor(8);
rectangle(x+1,y,x+49,y+100);
rectangle(x+1,y+25,x+49,y+75);
setfillstyle(SOLID_FILL,8);
floodfill((x+x+50)/2,(y+y+100)/2,8);
setcolor(15);
}
void main()
{
int driver,mode;
driver = DETECT;
initgraph(&driver,&mode,”\\tc\\bgi”);
int x=300,y=350,ch,life=3,score=0;
char choice;
cout<<“\n\n\n\n\n\t\t\t* THUNDER RACER : Start the Game*”;
cout<<“\n\t\t\t —————“;
cout<<“\n\n\tThis is a Car Race Game”;
cout<<“\n\n\tPlease read the complete code and for any query”;
cout<<“\n\n\tPlease discuss at http://discuss.eduguru.in”;
cout<<“\n\n\tSo Now let test this program”;
cout<<“\n\n\tNow enjoy'”;
cout<<“\n\n\tand.”;
cout<<“\n\n\tall the best…”;
delay(20000);
for(int m=1;m<25;m++)
for(int n=1;n<80;n++) {
gotoxy(n,m);
cout<<” “;
}
setcolor(RED);
rectangle(20,60,200,120);
rectangle(20,300,200,420);
gotoxy(5,21);
cout<<“Only Ameya & Prateek”;
gotoxy(5,22);
cout<<“have saved her till”;
gotoxy(5,23);
cout<<“now. So you can be”;
gotoxy(5,24);
cout<<“the 3-rd”;
rectangle(249,0,401,getmaxy());
setfillstyle(SOLID_FILL,8);
floodfill(325,getmaxy()/2,RED);
setcolor(RED);
rectangle(20,200,200,250);
gotoxy(5,15);
cout<<“Press <Esc> to Exit”;
for(int level=1;(level<=5)&&(life>0);level++){
if(level==1){
gotoxy(5,5);
cout<<“Your War Starts Now”;
gotoxy(5,7);
cout<<“All the best”;
delay(5000);
gotoxy(5,5);
cout<<” “;
gotoxy(5,7);
cout<<” “;
}
else {
gotoxy(5,5);
cout<<“Next level.”;
delay(5000);
gotoxy(5,5);
cout<<” “;
}
for(int i=0;(i<15)&&(life>0);i++) {
if((level==5)&&(i==14)){
gotoxy(5,5);
cout<<“You have won”;
gotoxy(5,6);
cout<<“Wanna continue <y/n>”;
cin>>choice;
if ((choice==’y’)||(choice==’Y’))
main();
else
exit(0);
}
setcolor(RED);
rectangle(420,125,600,175);
gotoxy(55,10);
cout<<“Level = “<<level;
rectangle(420,250,600,300);
gotoxy(55,18);
cout<<“Lives = “<<life;
rectangle(420,350,600,400);
gotoxy(55,24);
cout<<“Score = “<<score;
int accident=0;
int y1=1,x1=250+((rand()%3)*50);
int y2=1,x2=250+((rand()%3)*50);
score += 10;
while(y1<getmaxy()-1)
{
clear(x1,y1);
clear(x2,y2);
y1++;
y2++;
makecar(x1,y1);
makecar(x2,y2);
makecar(x,y);
delay(5-level);
if(kbhit())
{
makecar(x,y);
ch=getch();
switch(ch) {
case 27: exit(0);
break;
case 75:clear(x,y);
if(x>250)
x=x-50;
makecar(x,y);
break;
case 77:clear(x,y);
if(x<350)
x=x+50;
makecar(x,y);
break;
}
}
if((x==x1)||(x==x2))
if( ( ((y-y1)<100)&&((y-y1)>0) ) || ( ((y-y2)<100)&&((y-y2)>0) ) )
accident=1;
}
if(accident==1){
life =life-1;
score -= 10;
if(life==0) {
gotoxy(5,5);
cout<<“GAME OVER “;
gotoxy(5,6);
cout<<“You could not save”;
gotoxy(5,7);
cout<<“her”;
break;
}
gotoxy(5,5);
cout<<“You have lost 1 life”;
delay(3000);
gotoxy(5,5);
cout<<” “;
}
}
}
getch();
}
