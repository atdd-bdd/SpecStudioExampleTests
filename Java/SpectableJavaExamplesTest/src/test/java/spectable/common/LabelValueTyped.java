package spectable.common;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import records.*;
import calculator.*;
import production.*;

public class LabelValueTyped {
    public IDForm iD;
    public int value;

    public LabelValueTyped(IDForm iD, int value) {
        this.iD = iD;
        this.value = value;
    }

    public LabelValueTyped(LabelValueString s) {
        this.iD = new IDForm(s.iD);
        this.value = Integer.parseInt(s.value);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof LabelValueTyped)) return false;
        LabelValueTyped that = (LabelValueTyped) o;
        return Objects.equals(iD, that.iD)
            && Objects.equals(value, that.value);
    }

    @Override
    public int hashCode() {
        return Objects.hash(iD, value);
    }

    public LabelValueString toLabelValueString() {
        return new LabelValueString(String.valueOf(iD), String.valueOf(value));
    }

    public static List<LabelValueTyped> fromStringList(List<LabelValueString> list) {
        List<LabelValueTyped> result = new ArrayList<>();
        for (LabelValueString s : list) result.add(new LabelValueTyped(s));
        return result;
    }

    public static List<LabelValueString> toStringList(List<LabelValueTyped> list) {
        List<LabelValueString> result = new ArrayList<>();
        for (LabelValueTyped t : list) result.add(t.toLabelValueString());
        return result;
    }
}
