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
    }
}
