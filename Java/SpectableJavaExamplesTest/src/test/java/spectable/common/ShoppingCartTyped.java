package spectable.common;

import java.util.ArrayList;
import java.util.List;
import java.util.Collections;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Objects;
import production.*;
import records.*;
import calculator.*;

public class ShoppingCartTyped {
    public List<OrderItemTyped> items;
    public Dollar shipping;
    public Dollar discount;
    public Dollar totalPrice;
    public AddressTyped shippingAddress;
    public AddressTyped billingAddress;

    public ShoppingCartTyped(List<OrderItemTyped> items, Dollar shipping, Dollar discount, Dollar totalPrice, AddressTyped shippingAddress, AddressTyped billingAddress) {
        this.items = items;
        this.shipping = shipping;
        this.discount = discount;
        this.totalPrice = totalPrice;
        this.shippingAddress = shippingAddress;
        this.billingAddress = billingAddress;
    }

    public ShoppingCartTyped(ShoppingCartString s) {
        this.items = new ArrayList<>(); // Collection — populate from s.items
        this.shipping = new Dollar(s.shipping);
        this.discount = new Dollar(s.discount);
        this.totalPrice = new Dollar(s.totalPrice);
        this.shippingAddress = new AddressTyped(s.shippingAddress);
        this.billingAddress = new AddressTyped(s.billingAddress);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof ShoppingCartTyped)) return false;
        ShoppingCartTyped that = (ShoppingCartTyped) o;
        return Objects.equals(items, that.items)
            && Objects.equals(shipping, that.shipping)
            && Objects.equals(discount, that.discount)
            && Objects.equals(totalPrice, that.totalPrice)
            && Objects.equals(shippingAddress, that.shippingAddress)
            && Objects.equals(billingAddress, that.billingAddress);
    }

    @Override
    public int hashCode() {
        return Objects.hash(items, shipping, discount, totalPrice, shippingAddress, billingAddress);
    }

    public ShoppingCartString toShoppingCartString() {
        return new ShoppingCartString(String.valueOf(items), String.valueOf(shipping), String.valueOf(discount), String.valueOf(totalPrice), shippingAddress.toAddressString(), billingAddress.toAddressString());
    }

    public static List<ShoppingCartTyped> fromStringList(List<ShoppingCartString> list) {
        List<ShoppingCartTyped> result = new ArrayList<>();
        for (ShoppingCartString s : list) result.add(new ShoppingCartTyped(s));
        return result;
    }

    public static List<ShoppingCartString> toStringList(List<ShoppingCartTyped> list) {
        List<ShoppingCartString> result = new ArrayList<>();
        for (ShoppingCartTyped t : list) result.add(t.toShoppingCartString());
        return result;
    }

    /** Internal plumbing for {@link Json}; use toJSON() for JSON text. */
    public Map<String, Object> toJsonValue() {
        Map<String, Object> m = new LinkedHashMap<String, Object>();
        List<Object> json_items = new ArrayList<Object>();
        if (items != null)
            for (OrderItemTyped e : items) json_items.add(e == null ? null : e.toJsonValue());
        m.put("items", items == null ? null : json_items);
        m.put("shipping", shipping == null ? null : shipping.value);
        m.put("discount", discount == null ? null : discount.value);
        m.put("totalPrice", totalPrice == null ? null : totalPrice.value);
        m.put("shippingAddress", shippingAddress == null ? null : shippingAddress.toJsonValue());
        m.put("billingAddress", billingAddress == null ? null : billingAddress.toJsonValue());
        return m;
    }

    public String toJSON() { return Json.write(toJsonValue()); }

    /** Internal plumbing for {@link Json}; use fromJSON(String) for JSON text. */
    public static ShoppingCartTyped fromJsonValue(Map<String, Object> m) {
        if (m == null) return null;
        List<OrderItemTyped> items = new ArrayList<OrderItemTyped>();
        List<Object> json_items = Json.getArray(m, "items");
        if (json_items != null)
            for (Object e : json_items) items.add(OrderItemTyped.fromJsonValue(Json.asObject(e, "items")));
        return new ShoppingCartTyped(
            items,
            new Dollar(Json.asString(Json.require(m, "shipping"), "shipping")),
            new Dollar(Json.asString(Json.require(m, "discount"), "discount")),
            new Dollar(Json.asString(Json.require(m, "totalPrice"), "totalPrice")),
            AddressTyped.fromJsonValue(Json.asObject(Json.require(m, "shippingAddress"), "shippingAddress")),
            AddressTyped.fromJsonValue(Json.asObject(Json.require(m, "billingAddress"), "billingAddress")));
    }

    public static ShoppingCartTyped fromJSON(String json) {
        return fromJsonValue(Json.parseObject(json));
    }

    public static String toJSONList(List<ShoppingCartTyped> list) {
        List<Object> arr = new ArrayList<Object>();
        if (list != null)
            for (ShoppingCartTyped item : list) arr.add(item == null ? null : item.toJsonValue());
        return Json.write(arr);
    }

    public static List<ShoppingCartTyped> fromJSONList(String json) {
        List<ShoppingCartTyped> result = new ArrayList<ShoppingCartTyped>();
        for (Object e : Json.parseArray(json))
            result.add(fromJsonValue(Json.asObject(e, "ShoppingCartTyped")));
        return result;
    }
}
