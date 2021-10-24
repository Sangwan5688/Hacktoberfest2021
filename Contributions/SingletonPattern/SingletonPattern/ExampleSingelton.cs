using System;
using System.Collections.Generic;
using System.Text;

namespace SingletonPattern
{
    public class ExampleSingleton
    {
        private static ExampleSingleton exampleSingleton;
        
        public string exampleText { get; set; }

        private ExampleSingleton()
        {
            exampleText = "This is a example Text within the Singelton Instance.";
        }

        public static ExampleSingleton GetExampleSingeltonInstance()
        {
            if (exampleSingleton == null)
            {
                exampleSingleton = new ExampleSingleton();
            }

            return exampleSingleton;
        }
    }
}
