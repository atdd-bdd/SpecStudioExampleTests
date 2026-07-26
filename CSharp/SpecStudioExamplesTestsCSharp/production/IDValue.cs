namespace production
{
    public class IDValue
    {
        public IDForm ID { get; }
        public int Value { get; }

        public IDValue(IDForm iD, int value)
        {
            ID = iD;
            Value = value;
        }

        public class Builder
        {
            private IDForm _iD;
            private int _value;

            public Builder ID(IDForm value) { _iD = value; return this; }
            public Builder Value(int value) { _value = value; return this; }

            public IDValue Build() =>
                new IDValue(_iD, _value);
        }
    }
}
