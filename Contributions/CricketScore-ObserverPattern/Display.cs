using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CricketScore
{
    public interface Display
    {
        void DisplayScore();
        void Update(int CurScore, float numOvers);
    }
}
