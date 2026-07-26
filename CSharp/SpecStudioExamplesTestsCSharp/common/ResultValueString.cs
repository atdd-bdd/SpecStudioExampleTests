namespace SpecStudioExamplesTestsCSharp.common
{
using production;

    public class ResultValueString
    {
        public string sum;

        public ResultValueString(string sum)
        {
            this.sum = sum;
        }

        public ResultValueTyped ToResultValueTyped()
        {
            return new ResultValueTyped(
                int.Parse(this.sum)
            );
        }

        public override string ToString()
        {
            return $"Sum={sum}";
        }
    }
}
