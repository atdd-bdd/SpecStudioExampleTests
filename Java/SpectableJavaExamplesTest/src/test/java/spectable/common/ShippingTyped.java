package spectable.common;

import java.util.ArrayList;
import java.util.List;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Objects;
import production.*;
import records.*;
import calculator.*;

public class ShippingTyped {
    public Dollar totalPrice;
    public Dollar shippingCost;
    public String notes;

    public ShippingTyped(Dollar totalPrice, Dollar shippingCost, String notes) {
        this.totalPrice = totalPrice;
        this.shippingCost = shippingCost;
        this.notes = notes;
    }

    public ShippingTyped(ShippingString s) {
        this.totalPrice = new Dollar(s.totalPrice);
        this.shippingCost = new Dollar(s.shippingCost);
        this.notes = s.notes;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof ShippingTyped)) return false;
        ShippingTyped that = (ShippingTyped) o;
        return Objects.equals(totalPrice, that.totalPrice)
            && Objects.equals(shippingCost, that.shippingCost)
            && Objects.equals(notes, that.notes);
    }

    @Override
    public int hashCode() {
        return Objects.hash(totalPrice, shippingCost, notes);
    }

    public ShippingString toShippingString() {
        return new ShippingString(String.valueOf(totalPrice), String.valueOf(shippingCost), String.valueOf(notes));
    }

    public static List<ShippingTyped> fromStringList(List<ShippingString> list) {
        List<ShippingTyped> result = new ArrayList<>();
        for (ShippingString s : list) result.add(new ShippingTyped(s));
        return result;
    }

    public static List<ShippingString> toStringList(List<ShippingTyped> list) {
        List<ShippingString> result = new ArrayList<>();
        for (ShippingTyped t : list) result.add(t.toShippingString());
        return result;
    }

    /** Internal plumbing for {@link Json}; use toJSON() for JSON text. */
    public Map<String, Object> toJsonValue() {
        Map<String, Object> m = new LinkedHashMap<String, Object>();
        m.put("totalPrice", totalPrice == null ? null : totalPrice.value);
        m.put("shippingCost", shippingCost == null ? null : shippingCost.value);
        m.put("notes", notes);
        return m;
    }

    public String toJSON() { return Json.write(toJsonValue()); }

    /** Internal plumbing for {@link Json}; use fromJSON(String) for JSON text. */
    public static ShippingTyped fromJsonValue(Map<String, Object> m) {
        if (m == null) return null;
        return new ShippingTyped(
            new Dollar(Json.asString(Json.require(m, "totalPrice"), "totalPrice")),
            new Dollar(Json.asString(Json.require(m, "shippingCost"), "shippingCost")),
            Json.asString(Json.require(m, "notes"), "notes"));
    }

    public static ShippingTyped fromJSON(String json) {
        return fromJsonValue(Json.parseObject(json));
    }

    public static String toJSONList(List<ShippingTyped> list) {
        List<Object> arr = new ArrayList<Object>();
        if (list != null)
            for (ShippingTyped item : list) arr.add(item == null ? null : item.toJsonValue());
        return Json.write(arr);
    }

    public static List<ShippingTyped> fromJSONList(String json) {
        List<ShippingTyped> result = new ArrayList<ShippingTyped>();
        for (Object e : Json.parseArray(json))
            result.add(fromJsonValue(Json.asObject(e, "ShippingTyped")));
        return result;
    }
}
