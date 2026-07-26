namespace SpecStudioExamplesTestsCSharp.common
{
using production;

    public class FandCString
    {
        public string f;
        public string c;
        public string notes;

        public FandCString(string f, string c, string notes)
        {
            this.f = f;
            this.c = c;
            this.notes = notes;
        }

        public FandCTyped ToFandCTyped()
        {
            return new FandCTyped(
                int.Parse(this.f),
                int.Parse(this.c),
                this.notes
            );
        }

        public override string ToString()
        {
            return $"F={f}, C={c}, Notes={notes}";
        }

        const string DNCString = "?DNC?";

        public override bool Equals(object? obj)
        {
            if (obj is not FandCString other) return false;
            return (DNCString == this.f || DNCString == other.f || object.Equals(this.f, other.f))
                && (DNCString == this.c || DNCString == other.c || object.Equals(this.c, other.c))
                && (DNCString == this.notes || DNCString == other.notes || object.Equals(this.notes, other.notes));
        }

        public override int GetHashCode()
        {
            var h = new System.HashCode();
            h.Add(this.f);
            h.Add(this.c);
            h.Add(this.notes);
            return h.ToHashCode();
        }
    }
}
