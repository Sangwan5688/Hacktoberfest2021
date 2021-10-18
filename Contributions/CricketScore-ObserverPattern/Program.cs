 using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CricketScore
{
    class Program
    {
        static void Main(string[] args)
        {
            Score s = new Score();
            MobileDisplay md = new MobileDisplay();
            s.addDisplay(md);


            StandardDisplay sd = new StandardDisplay();
            s.addDisplay(sd);




            s.change(4, 1.1f);
        }
    }
}
