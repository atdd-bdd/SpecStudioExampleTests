package production;

import java.util.Objects;

public class IDValue {
    public final IDForm iD;
    public final int value;

    public IDValue(IDForm iD, int value) {
        this.iD = iD;
        this.value = value;
    }

    public static class Builder {
        private IDForm iD;
        private int value;

        public Builder iD(IDForm iD) { this.iD = iD; return this; }
        public Builder value(int value) { this.value = value; return this; }

        public IDValue build() {
            return new IDValue(iD, value);
        }
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof IDValue)) return false;
        IDValue that = (IDValue) o;
        return Objects.equals(iD, that.iD)
            && Objects.equals(value, that.value);
    }

    @Override
    public int hashCode() {
        return Objects.hash(iD, value);
    }

    @Override
    public String toString() {
        return "IDValue{" + "ID=" + iD + ", " + "Value=" + value + "}";
    }
}
