namespace SpecStudioExamplesTestsCSharp.common
{
using production;

    public class SimpleClassString
    {
        public string anInt;
        public string aString;

        public SimpleClassString(string anInt, string aString)
        {
            this.anInt = anInt;
            this.aString = aString;
        }

        public SimpleClassTyped ToSimpleClassTyped()
        {
            return new SimpleClassTyped(
                int.Parse(this.anInt),
                this.aString
            );
        }

        public override string ToString()
        {
            return $"anInt={anInt}, aString={aString}";
        }

        const string DNCString = "?DNC?";

        public override bool Equals(object? obj)
        {
            if (obj is not SimpleClassString other) return false;
            return (DNCString == this.anInt || DNCString == other.anInt || object.Equals(this.anInt, other.anInt))
                && (DNCString == this.aString || DNCString == other.aString || object.Equals(this.aString, other.aString));
        }

        public override int GetHashCode()
        {
            var h = new System.HashCode();
            h.Add(this.anInt);
            h.Add(this.aString);
            return h.ToHashCode();
        }
    }
}
