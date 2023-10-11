import java.util.*;
class avg_marks
{
public static void main(String arg[])
{
int a;
Scanner x=new Scanner(System.in);
System.out.println("enter the percentage of the student = ");
a=x.nextInt();
char r;
if (a>95)
{
System.out.println("the grade of the student is = A");
}
else if (a<=95 && a>=86)
{
System.out.println("the grade of the student is = B");
}
else if (a<=85 && a>=76)
{
System.out.println("the grade of the student is = C");
}
else if (a<=75 && a>=61)
{
System.out.println("the grade of the student is = D");
}
else if (a<=60 && a>=40)
{
System.out.println("the grade of the student is = E");
}
else if (a<40)
{
System.out.println("the grade of the student is = F");
}


}
}
