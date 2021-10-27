#include<bits/stdc++.h>
using namespace std;
class Shapes
{
	public:
		virtual float area()=0;
		virtual float volume()=0;
};
class Cone:public Shapes
{
	float rad,slanthight,height;
	public:
		Cone(float rad,float slanthight,float height)
		{
			this->rad=rad;
			this->slanthight=slanthight;
	        this->height=height;
		}
		float area()
		{
			return 3.14*rad*slanthight;
		}
		float volume()
		{
			return 0.3*3.14*rad*rad*height;
		}
		
};

class Sphere:public Shapes
{
	float rad;
	public:
		Sphere (float rad)
		{
			this->rad=rad;
			
			
		}
		float area()
		{
			return 4*3.14*rad*rad;
		}
		float volume()
		{
			return 1.3*3.14*rad*rad;
		}
		
};
class Cylinder:public Shapes
{
	float rad,height;
	public:
		Cylinder(float rad,float height)
		{
			this->rad=rad;
			//this->slanthight=slanthight;
	        this->height=height;
		}
		float area()
		{
			return 2*3.14*rad*height;
		}
		float volume()
		{
			return 3.14*rad*rad*height;
		}
		
};
int main()
{
	Cone c(3.1,3.2,1.1);
	Sphere s(1.1);
	Cylinder cy(2.2,1.1);
	Shapes *p[3]={&c,&s,&cy};
	for(int i=0;i<3;i++)
	{
		cout<<"Area "<<p[i]->area()<<endl;
		cout<<"Volume "<<p[i]->volume()<<endl;
	}
	return 0;
}