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
    }
}
