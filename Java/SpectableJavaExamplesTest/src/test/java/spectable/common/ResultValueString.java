package spectable.common;

import java.util.Objects;
import production.*;
import records.*;
import calculator.*;

public class ResultValueString {
    private static final String DNCString = "?DNC?";

    public String sum;

    public ResultValueString(String sum) {
        this.sum = sum;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof ResultValueString)) return false;
        ResultValueString that = (ResultValueString) o;
        return (DNCString.equals(sum) || DNCString.equals(that.sum) || Objects.equals(sum, that.sum));
    }

    @Override
    public int hashCode() {
        return Objects.hash(sum);
    }

    @Override
    public String toString() {
        return "Sum=" + sum;
    }
}
