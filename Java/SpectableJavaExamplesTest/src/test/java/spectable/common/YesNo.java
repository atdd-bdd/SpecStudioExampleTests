package spectable.common;

import java.util.Objects;
import production.*;
import records.*;
import calculator.*;

public class YesNo {
    public final String value;

    public YesNo(String value) {
        this.value = value != null ? value : "";
    }

    public boolean toBoolean() {
        return value.equalsIgnoreCase("true")
            || value.equalsIgnoreCase("t")
            || value.equalsIgnoreCase("yes")
            || value.equalsIgnoreCase("y")
            || value.equals("1");
    }

    @Override
    public String toString() { return value; }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof YesNo)) return false;
        return toBoolean() == ((YesNo) o).toBoolean();
    }

    @Override
    public int hashCode() { return Objects.hash(toBoolean()); }
}
