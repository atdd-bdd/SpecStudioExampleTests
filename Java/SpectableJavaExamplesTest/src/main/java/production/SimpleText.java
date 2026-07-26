package production;

import java.util.Objects;

public class SimpleText {
    public final String value;

    public SimpleText(String value) {
        this.value = value != null ? value : "";
        if (!this.value.matches("[A-Za-z0-9 ,.\\-]*"))
            throw new NumberFormatException("SimpleText contains disallowed characters: " + value);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof SimpleText)) return false;
        return Objects.equals(value, ((SimpleText) o).value);
    }

    @Override
    public int hashCode() { return Objects.hash(value); }

    @Override
    public String toString() { return "SimpleText{" + value + "}"; }
}
