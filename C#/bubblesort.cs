using System;
using System.Collections.Generic;

namespace BubbleSort
{
	class Program
    {
		public static void Main(string[] args)
        {
			List<int> inputs = new List<int>();
			String userInput = "";

			while(true)
			{
				Console.WriteLine("Enter a number to add to the list, or enter y to begin sort");
				userInput = Console.ReadLine().ToLower();
				
				if (userInput == "y")
					break;
				
				int input;
				if(int.TryParse(userInput, out input))
				{
					inputs.Add(input);
				}
				else
				{
					Console.WriteLine("Input needs to be an integer, or 'y' to stop adding to list");
				}
			}
			
			if (inputs.Count > 0)
				ProcessBubbleSort(inputs);
			
			Console.WriteLine("Bubble sort complete");
		}
		
		private static void ProcessBubbleSort(List<int> inputs)
		{
			bool swapped = false;
			
			for(int i=1; i<inputs.Count; i++)
			{
				if(inputs[i] < inputs[i-1])
				{
					int smaller = inputs[i];
					
					inputs[i] = inputs[i-1];
					inputs[i-1] = smaller;
					
					swapped = true;
				}
			}
			
			Console.Write("Pass completed with result:");
			
			foreach (int value in inputs)
			{
				Console.Write(" " + value);
			}
			Console.Write("\n");
			
			if (swapped)
			{
				ProcessBubbleSort(inputs);
			}
		}
	}
}
