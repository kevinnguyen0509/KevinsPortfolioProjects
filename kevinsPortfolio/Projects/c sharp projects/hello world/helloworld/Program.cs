using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace helloworld
{
    class Program
    {

        static void MultiplyLegs(PetStruct petStruct, PetClass petClass) {
            petStruct.Legs = petStruct.Legs * 2;
            petClass.Legs = petClass.Legs * 2;

            Console.WriteLine("Internal Method - A" + petStruct.Type + " has " + petStruct.Legs + " Legs ");
            Console.WriteLine("Internal Method - A" + petClass.Type + " has " + petClass.Legs + " Legs ");
        }

        static void Main(string[] args)
        {
            int guess;

            //Generate a random number
            Random random = new Random();
            int correctNumber = random.Next(10);

            Console.WriteLine("Welcome to the guessing game. Please guess a number!");
            guess = int.Parse(Console.ReadLine());
            while (guess != correctNumber) {
                Console.WriteLine("Not the right number, guess again!");
                guess = int.Parse(Console.ReadLine());
            }


            Console.WriteLine("You got the number!");
            Console.ReadLine();
        }

        class PetClass {
            public int Legs;
            public PetType Type;
            public string Name;
            public bool hasFur;
        }

        struct PetStruct {
            public int Legs;
            public PetType Type;
            public string Name;
            public bool hasFur;
        }

        enum PetType
        {
            Dog,
            Duck
        }
    }
}
