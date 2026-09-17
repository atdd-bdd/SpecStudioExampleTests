package spectable.common;

import java.util.ArrayList;
import java.util.List;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Objects;
import production.*;
import records.*;
import calculator.*;

public class DiscountInputTyped {
    public Dollar totalPrice;
    public Percentage discount;
    public String notes;

    public DiscountInputTyped(Dollar totalPrice, Percentage discount, String notes) {
        this.totalPrice = totalPrice;
        this.discount = discount;
        this.notes = notes;
    }

    public DiscountInputTyped(DiscountInputString s) {
        this.totalPrice = new Dollar(s.totalPrice);
        this.discount = new Percentage(s.discount);
        this.notes = s.notes;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof DiscountInputTyped)) return false;
        DiscountInputTyped that = (DiscountInputTyped) o;
        return Objects.equals(totalPrice, that.totalPrice)
            && Objects.equals(discount, that.discount)
            && Objects.equals(notes, that.notes);
    }

    @Override
    public int hashCode() {
        return Objects.hash(totalPrice, discount, notes);
    }

    public DiscountInputString toDiscountInputString() {
        return new DiscountInputString(String.valueOf(totalPrice), String.valueOf(discount), String.valueOf(notes));
    }

    public static List<DiscountInputTyped> fromStringList(List<DiscountInputString> list) {
        List<DiscountInputTyped> result = new ArrayList<>();
        for (DiscountInputString s : list) result.add(new DiscountInputTyped(s));
        return result;
    }

    public static List<DiscountInputString> toStringList(List<DiscountInputTyped> list) {
        List<DiscountInputString> result = new ArrayList<>();
        for (DiscountInputTyped t : list) result.add(t.toDiscountInputString());
        return result;
    }

    /** Internal plumbing for {@link Json}; use toJSON() for JSON text. */
    public Map<String, Object> toJsonValue() {
        Map<String, Object> m = new LinkedHashMap<String, Object>();
        m.put("totalPrice", totalPrice == null ? null : totalPrice.toString());
        m.put("discount", discount == null ? null : discount.toString());
        m.put("notes", notes);
        return m;
    }

    public String toJSON() { return Json.write(toJsonValue()); }

    /** Internal plumbing for {@link Json}; use fromJSON(String) for JSON text. */
    public static DiscountInputTyped fromJsonValue(Map<String, Object> m) {
        if (m == null) return null;
        return new DiscountInputTyped(
            new Dollar(Json.asString(Json.require(m, "totalPrice"), "totalPrice")),
            new Percentage(Json.asString(Json.require(m, "discount"), "discount")),
            Json.asString(Json.require(m, "notes"), "notes"));
    }

    public static DiscountInputTyped fromJSON(String json) {
        return fromJsonValue(Json.parseObject(json));
    }

    public static String toJSONList(List<DiscountInputTyped> list) {
        List<Object> arr = new ArrayList<Object>();
        if (list != null)
            for (DiscountInputTyped item : list) arr.add(item == null ? null : item.toJsonValue());
        return Json.write(arr);
    }

    public static List<DiscountInputTyped> fromJSONList(String json) {
        List<DiscountInputTyped> result = new ArrayList<DiscountInputTyped>();
        for (Object e : Json.parseArray(json))
            result.add(fromJsonValue(Json.asObject(e, "DiscountInputTyped")));
        return result;
    }
}
