using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CricketScore
{
    class Score
    {
        int CurrentScore;
        float NumOvers;
        Display[] displays = new Display[10];
        int lastIndex = 0;


        public void addDisplay(Display display)
        {
            displays[lastIndex] = display;
            lastIndex++;
        }

        public void Notify()
        {
            foreach(Display d in displays)
            {
                if (d != null)
                {
                    d.Update(CurrentScore, NumOvers);
                }
            }
        }

        public void change(int CurrentScore, float NumOvers)
        {
            this.CurrentScore = CurrentScore;
            this.NumOvers = NumOvers;
            Notify();
        }
    }  
}
