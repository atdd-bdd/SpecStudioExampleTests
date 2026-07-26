namespace SpecStudioExamplesTestsCSharp.common
{
using production;

    public class ValidValuesString
    {
        public string value;
        public string isValid;
        public string notes;

        public ValidValuesString(string value, string isValid, string notes)
        {
            this.value = value;
            this.isValid = isValid;
            this.notes = notes;
        }

        public ValidValuesTyped ToValidValuesTyped()
        {
            return new ValidValuesTyped(
                this.value,
                (this.isValid.Equals("true", System.StringComparison.OrdinalIgnoreCase) || this.isValid.Equals("t", System.StringComparison.OrdinalIgnoreCase) || this.isValid.Equals("yes", System.StringComparison.OrdinalIgnoreCase) || this.isValid.Equals("y", System.StringComparison.OrdinalIgnoreCase) || this.isValid == "1"),
                this.notes
            );
        }

        public override string ToString()
        {
            return $"Value={value}, IsValid={isValid}, Notes={notes}";
        }

        const string DNCString = "?DNC?";

        public override bool Equals(object? obj)
        {
            if (obj is not ValidValuesString other) return false;
            return (DNCString == this.value || DNCString == other.value || object.Equals(this.value, other.value))
                && (DNCString == this.isValid || DNCString == other.isValid || object.Equals(this.isValid, other.isValid))
                && (DNCString == this.notes || DNCString == other.notes || object.Equals(this.notes, other.notes));
        }

        public override int GetHashCode()
        {
            var h = new System.HashCode();
            h.Add(this.value);
            h.Add(this.isValid);
            h.Add(this.notes);
            return h.ToHashCode();
        }
    }
}
