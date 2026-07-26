namespace SpecStudioExamplesTestsCSharp.common
{
using production;

    public class IDValueString
    {
        public string iD;
        public string value;

        public IDValueString(string iD, string value)
        {
            this.iD = iD;
            this.value = value;
        }

        public IDValueTyped ToIDValueTyped()
        {
            return new IDValueTyped(
                new IDForm(this.iD),
                int.Parse(this.value)
            );
        }

        public override string ToString()
        {
            return $"ID={iD}, Value={value}";
        }
    }
}
