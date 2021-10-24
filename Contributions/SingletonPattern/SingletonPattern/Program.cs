using System;

namespace SingletonPattern
{
    class Program
    {
        static void Main(string[] args)
        {
            //You get the global Instance of the exampleClass by Calling the Static GetExampleSingletonInstance Method declared in the Singleton class
            var exampleSingleton = ExampleSingleton.GetExampleSingeltonInstance();
            Console.WriteLine(exampleSingleton.exampleText);
        }
    }
}
