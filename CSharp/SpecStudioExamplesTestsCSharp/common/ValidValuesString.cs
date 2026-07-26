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
    }
}
