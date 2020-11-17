using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace playground
{
    class Program
    {
        static void Main(string[] args)
        {
            var calc = new Calculator();
            var result = calc.PerformCalc(1, 2);
            Console.WriteLine(result);
        }
    }

    class MyObject {
        string MyStringProperty { get; set; }
        void MyMethod(string input, int value) {

        }
    }
}
