// Kashish Ahuja | @codeitmin
// Todo application

#include<iostream>
#include<string>
#include <ctime>
#include <fstream>
using namespace std;

class todo
{
    private:
        int pending, completed;
    public:
        string opt;
        todo()
        {
            pending =  0;
            completed = 0;
        }
        int compare(string, string);
        int breakStr(string);
        void help();
        string add(string);
        int num(string);
        void pinc();
        void del();
        void done();
        void report();
};

int todo :: compare(string a, string b)
{
    return a.compare(b);
}

void todo :: pinc()
{
    pending++;
}

int todo :: breakStr(string str)
{
    string word = "";
    string a,b;
    int k=0;
    for (auto x : str) 
    {
        if (x == ' ')
        {
            if(k==0)
            {
                a = word;
            }
            if(k==1)
            {
                b=word;
                k++;
            }
            word = "";
            k++;
        }
        else
        {
            word = word + x;
        }
    }
    if(k==1)
    {
        b=word;
    }
    
    if(compare(a,"./todo")==0)
    {
        if(compare(b,"add")==0)
        {
            return 1;       // add()
        }
        else if(compare(b,"del")==0)
        {
            return 2;       // del()
        }
        else if(compare(b,"done")==0)
        {
            return 3;       // done()
        }
        else
        {
            cout<<"Not a valid command"<<endl;
            cout<<"\n";
            return -1;
        }
    }
    else
    {
        cout<<"Not a valid command"<<endl;
        cout<<"\n";
        return -1;
    }
}

void todo :: help()
{
    cout<<"Usage :- \n";
    cout<<"$ ./todo add \"todo item\"  # Add a new todo \n";
    cout<<"$ ./todo ls               # Show remaining todos \n";
    cout<<"$ ./todo del NUMBER       # Delete a todo \n";
    cout<<"$ ./todo done NUMBER      # Complete a todo \n";
    cout<<"$ ./todo report           # Statistics \n";
    cout<<"$ ./todo help             # Show usage \n";
    cout<<"\n[You don't have to add $, start command with ./todo]\n";
    cout<<"\n";
}

string todo :: add(string str)
{
    string word = "";
    int k=0;
    for (auto x : str) 
    {
        if (x == ' ')
        {
            if(k<2)
            {
                word = "";
                k++;
            }
            else
            {
                word = word + x;
            }
        }
        else
        {
            word = word + x;
        }
    }
    return word;
}

int todo :: num(string str)
{
    string word = "";
    for (auto x : str) 
    {
        if (x == ' ')
        {
            word = "";
        }
        else
        {
            word = word + x;
        }
    }
    int num = stoi(word);
    return num;
}

void todo :: del()
{
    pending--;
}

void todo :: done()
{
    pending--;
    completed++;
}

void todo :: report()
{
    char s[15];
    time_t t = time(0);
    strftime(s, 15, "%Y/%m/%d", localtime(&t));
    cout << s<<"\nPending : "<<pending<<"\nCompleted : "<<completed<<endl;
}



int main(int argc, char* argv[])
{
    todo t;
    string todo[50];
    string done[50];
    int z=0, fun, num, d=1;

    string opt_0 = "./todo";
    string opt_1 = "./todo add";
    string opt_2 = "./todo ls";
    string opt_3 = "./todo del";
    string opt_4 = "./todo done";
    string opt_5 = "./todo help";
    string opt_6 = "./todo report";

    t.help();

    do{
        getline(cin, t.opt);

        if(t.compare(t.opt, opt_0)==0 || t.compare(t.opt, opt_5)==0)
        {
            t.help();
        }
        else if(t.compare(t.opt, opt_2)==0)
        {
            int e=0;
            for(int i=z; i>0; i--)
            {
                cout<<"["<<i<<"] "<<todo[i]<<endl;
                e=1;
            }
            if(e==0)
            {
                cout<<"No remaining todos."<<endl;
            }
            cout<<"\n";
        }
        else if(t.compare(t.opt, opt_6)==0)
        {
            t.report();
            cout<<"\n";
        }
        else
        {
            fun = t.breakStr(t.opt);

            if(fun==1)        //add()
            {     
                string add = t.add(t.opt);
                if(add=="add" || add=="")
                {
                    cout<<"Error: add should be followed by a todo."<<endl;
                    cout<<"\n";
                }
                else
                {
                    z++;
                    todo[z] = add; 
                    t.pinc();
                    cout<<"Added todo: "<<todo[z]<<endl;
                    cout<<"\n";
                }
            }
            else if(fun==2)       //del()
            {        
                string add = t.add(t.opt);
                if(add=="del" || add=="")
                {
                    cout<<"Error: delete doen not have enough arguments."<<endl;
                    cout<<"\n";
                }
                else
                {
                    num = t.num(t.opt);
                    if(num<=z)
                    {
                        cout<<"Deleted todo #"<<num<<endl;
                        cout<<"\n";
                        for(int h=num; h<z; h++)
                        {
                            todo[h]=todo[h+1];
                        }
                        t.del();
                        z--;
                    }
                    else
                    {
                        cout<<"Error: todo #"<<num<<" does not exist. Nothing deleted."<<endl;
                        cout<<"\n";
                    }
                }
            }
            else if(fun==3)        //done()
            {        
                string add = t.add(t.opt);
                if(add=="done" || add=="")
                {
                    cout<<"Error: todo number not provided."<<endl;
                    cout<<"\n";
                }
                else
                {
                    num = t.num(t.opt);
                    if(num<=z)
                    {
                        cout<<"Marked todo #"<<num<<" as done."<<endl;
                        cout<<"\n";
                        for(int h=num; h<z; h++)
                        {
                            todo[h]=todo[h+1];
                        }   
                        t.done();
                        z--;
                        done[d] = todo[num]; 
                        d++;
                    }
                    else
                    {
                        cout<<"Error: todo #"<<num<<" does not exist."<<endl;
                        cout<<"\n";
                    }
                }
            }
        }
    }while(-1);

    return 0;
}