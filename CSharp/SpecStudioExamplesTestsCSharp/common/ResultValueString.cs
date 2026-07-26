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

        const string DNCString = "?DNC?";

        public override bool Equals(object? obj)
        {
            if (obj is not ResultValueString other) return false;
            return (DNCString == this.sum || DNCString == other.sum || object.Equals(this.sum, other.sum));
        }

        public override int GetHashCode()
        {
            var h = new System.HashCode();
            h.Add(this.sum);
            return h.ToHashCode();
        }
    }
}
