package spectable.common;

import java.util.ArrayList;
import java.util.List;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Objects;
import production.*;

public class PricingTyped {
    public Dollar totalPrice;

    public PricingTyped(Dollar totalPrice) {
        this.totalPrice = totalPrice;
    }

    public PricingTyped(PricingString s) {
        this.totalPrice = new Dollar(s.totalPrice);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof PricingTyped)) return false;
        PricingTyped that = (PricingTyped) o;
        return Objects.equals(totalPrice, that.totalPrice);
    }

    @Override
    public int hashCode() {
        return Objects.hash(totalPrice);
    }

    public PricingString toPricingString() {
        return new PricingString(String.valueOf(totalPrice));
    }

    public static List<PricingTyped> fromStringList(List<PricingString> list) {
        List<PricingTyped> result = new ArrayList<>();
        for (PricingString s : list) result.add(new PricingTyped(s));
        return result;
    }

    public static List<PricingString> toStringList(List<PricingTyped> list) {
        List<PricingString> result = new ArrayList<>();
        for (PricingTyped t : list) result.add(t.toPricingString());
        return result;
    }

    /** Internal plumbing for {@link Json}; use toJSON() for JSON text. */
    public Map<String, Object> toJsonValue() {
        Map<String, Object> m = new LinkedHashMap<String, Object>();
        m.put("totalPrice", totalPrice == null ? null : totalPrice.value);
        return m;
    }

    public String toJSON() { return Json.write(toJsonValue()); }

    /** Internal plumbing for {@link Json}; use fromJSON(String) for JSON text. */
    public static PricingTyped fromJsonValue(Map<String, Object> m) {
        if (m == null) return null;
        return new PricingTyped(
            new Dollar(Json.asString(Json.require(m, "totalPrice"), "totalPrice")));
    }

    public static PricingTyped fromJSON(String json) {
        return fromJsonValue(Json.parseObject(json));
    }

    public static String toJSONList(List<PricingTyped> list) {
        List<Object> arr = new ArrayList<Object>();
        if (list != null)
            for (PricingTyped item : list) arr.add(item == null ? null : item.toJsonValue());
        return Json.write(arr);
    }

    public static List<PricingTyped> fromJSONList(String json) {
        List<PricingTyped> result = new ArrayList<PricingTyped>();
        for (Object e : Json.parseArray(json))
            result.add(fromJsonValue(Json.asObject(e, "PricingTyped")));
        return result;
    }
}
