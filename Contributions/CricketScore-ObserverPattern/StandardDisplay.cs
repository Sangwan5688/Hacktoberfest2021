using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CricketScore
{
    class StandardDisplay : Display
    {
        int curScore;
        float numOvers;
        public void DisplayScore()
        {
            Console.WriteLine("Standard Display");
            Console.WriteLine("Current Score is " + curScore + " Overs " + numOvers);
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
