namespace SpecStudioExamplesTestsCSharp.common
{
using production;

    public class AdderString
    {
        public string number1;
        public string number2;
        public string result;

        public AdderString(string number1, string number2, string result)
        {
            this.number1 = number1;
            this.number2 = number2;
            this.result = result;
        }

        public AdderTyped ToAdderTyped()
        {
            return new AdderTyped(
                int.Parse(this.number1),
                int.Parse(this.number2),
                int.Parse(this.result)
            );
        }

        public override string ToString()
        {
            return $"number1={number1}, number2={number2}, result={result}";
        }
    }
}
