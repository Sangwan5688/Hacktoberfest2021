using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CricketScore
{
    class MobileDisplay : Display
    {
        int curScore;
        float numOvers;
        public void DisplayScore()
        {
            Console.WriteLine("This is Mobile Display");
            Console.WriteLine("Current Score is " + curScore); 
            Console.WriteLine(" Overs " + numOvers);
            Console.ReadLine();
        }

        public void Update(int CurrentScore, float NumOvers)
        {
            this.curScore = CurrentScore;
            this.numOvers = NumOvers;
            DisplayScore();
        }
    }
}
