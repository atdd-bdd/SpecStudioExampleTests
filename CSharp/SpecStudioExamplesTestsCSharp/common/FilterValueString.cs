namespace SpecStudioExamplesTestsCSharp.common
{
using production;

    public class FilterValueString
    {
        public string value;

        public FilterValueString(string value)
        {
            this.value = value;
        }

        public FilterValueTyped ToFilterValueTyped()
        {
            return new FilterValueTyped(
                new IDForm(this.value)
            );
        }

        public override string ToString()
        {
            return $"Value={value}";
        }

        const string DNCString = "?DNC?";

        public override bool Equals(object? obj)
        {
            if (obj is not FilterValueString other) return false;
            return (DNCString == this.value || DNCString == other.value || object.Equals(this.value, other.value));
        }

        public override int GetHashCode()
        {
            var h = new System.HashCode();
            h.Add(this.value);
            return h.ToHashCode();
        }
    }
}
