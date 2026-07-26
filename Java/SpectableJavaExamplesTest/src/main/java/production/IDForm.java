package production;

import java.util.Objects;

public class IDForm {
    public final String value;

    public IDForm(String value) {
        this.value = value != null ? value : "";
        if (!isValid())
            throw new NumberFormatException(
                    "Must be 5 characters starting with Q");
    }

    public boolean isValid() {
        return value.length() == 5 && value.startsWith("Q");
    }
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof IDForm)) return false;
        return Objects.equals(value, ((IDForm) o).value);
    }

    @Override
    public int hashCode() { return Objects.hash(value); }

    @Override
    public String toString() { return "IDForm{" + value + "}"; }
}
