package spectable.common;

import java.util.ArrayList;
import java.util.List;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Objects;
import production.*;
import records.*;
import calculator.*;

public class ShippingInputTyped {
    public Dollar totalPrice;
    public Dollar shippingCost;
    public String notes;

    public ShippingInputTyped(Dollar totalPrice, Dollar shippingCost, String notes) {
        this.totalPrice = totalPrice;
        this.shippingCost = shippingCost;
        this.notes = notes;
    }

    public ShippingInputTyped(ShippingInputString s) {
        this.totalPrice = new Dollar(s.totalPrice);
        this.shippingCost = new Dollar(s.shippingCost);
        this.notes = s.notes;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof ShippingInputTyped)) return false;
        ShippingInputTyped that = (ShippingInputTyped) o;
        return Objects.equals(totalPrice, that.totalPrice)
            && Objects.equals(shippingCost, that.shippingCost)
            && Objects.equals(notes, that.notes);
    }

    @Override
    public int hashCode() {
        return Objects.hash(totalPrice, shippingCost, notes);
    }

    public ShippingInputString toShippingInputString() {
        return new ShippingInputString(String.valueOf(totalPrice), String.valueOf(shippingCost), String.valueOf(notes));
    }

    public static List<ShippingInputTyped> fromStringList(List<ShippingInputString> list) {
        List<ShippingInputTyped> result = new ArrayList<>();
        for (ShippingInputString s : list) result.add(new ShippingInputTyped(s));
        return result;
    }

    public static List<ShippingInputString> toStringList(List<ShippingInputTyped> list) {
        List<ShippingInputString> result = new ArrayList<>();
        for (ShippingInputTyped t : list) result.add(t.toShippingInputString());
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
    public static ShippingInputTyped fromJsonValue(Map<String, Object> m) {
        if (m == null) return null;
        return new ShippingInputTyped(
            new Dollar(Json.asString(Json.require(m, "totalPrice"), "totalPrice")),
            new Dollar(Json.asString(Json.require(m, "shippingCost"), "shippingCost")),
            Json.asString(Json.require(m, "notes"), "notes"));
    }

    public static ShippingInputTyped fromJSON(String json) {
        return fromJsonValue(Json.parseObject(json));
    }

    public static String toJSONList(List<ShippingInputTyped> list) {
        List<Object> arr = new ArrayList<Object>();
        if (list != null)
            for (ShippingInputTyped item : list) arr.add(item == null ? null : item.toJsonValue());
        return Json.write(arr);
    }

    public static List<ShippingInputTyped> fromJSONList(String json) {
        List<ShippingInputTyped> result = new ArrayList<ShippingInputTyped>();
        for (Object e : Json.parseArray(json))
            result.add(fromJsonValue(Json.asObject(e, "ShippingInputTyped")));
        return result;
    }
}
