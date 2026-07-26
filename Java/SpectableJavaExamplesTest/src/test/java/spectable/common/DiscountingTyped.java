package spectable.common;

import java.util.ArrayList;
import java.util.List;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Objects;
import production.*;

public class DiscountingTyped {
    public Dollar totalPrice;
    public Percentage discount;
    public String notes;

    public DiscountingTyped(Dollar totalPrice, Percentage discount, String notes) {
        this.totalPrice = totalPrice;
        this.discount = discount;
        this.notes = notes;
    }

    public DiscountingTyped(DiscountingString s) {
        this.totalPrice = new Dollar(s.totalPrice);
        this.discount = new Percentage(s.discount);
        this.notes = s.notes;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof DiscountingTyped)) return false;
        DiscountingTyped that = (DiscountingTyped) o;
        return Objects.equals(totalPrice, that.totalPrice)
            && Objects.equals(discount, that.discount)
            && Objects.equals(notes, that.notes);
    }

    @Override
    public int hashCode() {
        return Objects.hash(totalPrice, discount, notes);
    }

    public DiscountingString toDiscountingString() {
        return new DiscountingString(String.valueOf(totalPrice), String.valueOf(discount), String.valueOf(notes));
    }

    public static List<DiscountingTyped> fromStringList(List<DiscountingString> list) {
        List<DiscountingTyped> result = new ArrayList<>();
        for (DiscountingString s : list) result.add(new DiscountingTyped(s));
        return result;
    }

    public static List<DiscountingString> toStringList(List<DiscountingTyped> list) {
        List<DiscountingString> result = new ArrayList<>();
        for (DiscountingTyped t : list) result.add(t.toDiscountingString());
        return result;
    }

    /** Internal plumbing for {@link Json}; use toJSON() for JSON text. */
    public Map<String, Object> toJsonValue() {
        Map<String, Object> m = new LinkedHashMap<String, Object>();
        m.put("totalPrice", totalPrice == null ? null : totalPrice.value);
        m.put("discount", discount == null ? null : discount.value);
        m.put("notes", notes);
        return m;
    }

    public String toJSON() { return Json.write(toJsonValue()); }

    /** Internal plumbing for {@link Json}; use fromJSON(String) for JSON text. */
    public static DiscountingTyped fromJsonValue(Map<String, Object> m) {
        if (m == null) return null;
        return new DiscountingTyped(
            new Dollar(Json.asString(Json.require(m, "totalPrice"), "totalPrice")),
            new Percentage(Json.asString(Json.require(m, "discount"), "discount")),
            Json.asString(Json.require(m, "notes"), "notes"));
    }

    public static DiscountingTyped fromJSON(String json) {
        return fromJsonValue(Json.parseObject(json));
    }

    public static String toJSONList(List<DiscountingTyped> list) {
        List<Object> arr = new ArrayList<Object>();
        if (list != null)
            for (DiscountingTyped item : list) arr.add(item == null ? null : item.toJsonValue());
        return Json.write(arr);
    }

    public static List<DiscountingTyped> fromJSONList(String json) {
        List<DiscountingTyped> result = new ArrayList<DiscountingTyped>();
        for (Object e : Json.parseArray(json))
            result.add(fromJsonValue(Json.asObject(e, "DiscountingTyped")));
        return result;
    }
}
