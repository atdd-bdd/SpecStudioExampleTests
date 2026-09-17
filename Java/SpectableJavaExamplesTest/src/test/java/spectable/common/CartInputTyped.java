package spectable.common;

import java.util.ArrayList;
import java.util.List;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Objects;
import production.*;
import records.*;
import calculator.*;

public class CartInputTyped {
    public Dollar totalItems;
    public Dollar shipping;
    public Dollar discount;
    public Dollar totalPrice;
    public String notes;

    public CartInputTyped(Dollar totalItems, Dollar shipping, Dollar discount, Dollar totalPrice, String notes) {
        this.totalItems = totalItems;
        this.shipping = shipping;
        this.discount = discount;
        this.totalPrice = totalPrice;
        this.notes = notes;
    }

    public CartInputTyped(CartInputString s) {
        this.totalItems = new Dollar(s.totalItems);
        this.shipping = new Dollar(s.shipping);
        this.discount = new Dollar(s.discount);
        this.totalPrice = new Dollar(s.totalPrice);
        this.notes = s.notes;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof CartInputTyped)) return false;
        CartInputTyped that = (CartInputTyped) o;
        return Objects.equals(totalItems, that.totalItems)
            && Objects.equals(shipping, that.shipping)
            && Objects.equals(discount, that.discount)
            && Objects.equals(totalPrice, that.totalPrice)
            && Objects.equals(notes, that.notes);
    }

    @Override
    public int hashCode() {
        return Objects.hash(totalItems, shipping, discount, totalPrice, notes);
    }

    public CartInputString toCartInputString() {
        return new CartInputString(String.valueOf(totalItems), String.valueOf(shipping), String.valueOf(discount), String.valueOf(totalPrice), String.valueOf(notes));
    }

    public static List<CartInputTyped> fromStringList(List<CartInputString> list) {
        List<CartInputTyped> result = new ArrayList<>();
        for (CartInputString s : list) result.add(new CartInputTyped(s));
        return result;
    }

    public static List<CartInputString> toStringList(List<CartInputTyped> list) {
        List<CartInputString> result = new ArrayList<>();
        for (CartInputTyped t : list) result.add(t.toCartInputString());
        return result;
    }

    /** Internal plumbing for {@link Json}; use toJSON() for JSON text. */
    public Map<String, Object> toJsonValue() {
        Map<String, Object> m = new LinkedHashMap<String, Object>();
        m.put("totalItems", totalItems == null ? null : totalItems.toString());
        m.put("shipping", shipping == null ? null : shipping.toString());
        m.put("discount", discount == null ? null : discount.toString());
        m.put("totalPrice", totalPrice == null ? null : totalPrice.toString());
        m.put("notes", notes);
        return m;
    }

    public String toJSON() { return Json.write(toJsonValue()); }

    /** Internal plumbing for {@link Json}; use fromJSON(String) for JSON text. */
    public static CartInputTyped fromJsonValue(Map<String, Object> m) {
        if (m == null) return null;
        return new CartInputTyped(
            new Dollar(Json.asString(Json.require(m, "totalItems"), "totalItems")),
            new Dollar(Json.asString(Json.require(m, "shipping"), "shipping")),
            new Dollar(Json.asString(Json.require(m, "discount"), "discount")),
            new Dollar(Json.asString(Json.require(m, "totalPrice"), "totalPrice")),
            Json.asString(Json.require(m, "notes"), "notes"));
    }

    public static CartInputTyped fromJSON(String json) {
        return fromJsonValue(Json.parseObject(json));
    }

    public static String toJSONList(List<CartInputTyped> list) {
        List<Object> arr = new ArrayList<Object>();
        if (list != null)
            for (CartInputTyped item : list) arr.add(item == null ? null : item.toJsonValue());
        return Json.write(arr);
    }

    public static List<CartInputTyped> fromJSONList(String json) {
        List<CartInputTyped> result = new ArrayList<CartInputTyped>();
        for (Object e : Json.parseArray(json))
            result.add(fromJsonValue(Json.asObject(e, "CartInputTyped")));
        return result;
    }
}
