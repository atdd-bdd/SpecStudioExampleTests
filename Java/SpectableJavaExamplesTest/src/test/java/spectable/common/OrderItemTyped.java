package spectable.common;

import java.util.ArrayList;
import java.util.List;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Objects;
import production.*;
import records.*;
import calculator.*;

public class OrderItemTyped {
    public SimpleText name;
    public int quantity;
    public Dollar price;
    public Dollar itemTotal;

    public OrderItemTyped(SimpleText name, int quantity, Dollar price, Dollar itemTotal) {
        this.name = name;
        this.quantity = quantity;
        this.price = price;
        this.itemTotal = itemTotal;
    }

    public OrderItemTyped(OrderItemString s) {
        this.name = new SimpleText(s.name);
        this.quantity = Integer.parseInt(s.quantity);
        this.price = new Dollar(s.price);
        this.itemTotal = new Dollar(s.itemTotal);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof OrderItemTyped)) return false;
        OrderItemTyped that = (OrderItemTyped) o;
        return Objects.equals(name, that.name)
            && Objects.equals(quantity, that.quantity)
            && Objects.equals(price, that.price)
            && Objects.equals(itemTotal, that.itemTotal);
    }

    @Override
    public int hashCode() {
        return Objects.hash(name, quantity, price, itemTotal);
    }

    public OrderItemString toOrderItemString() {
        return new OrderItemString(String.valueOf(name), String.valueOf(quantity), String.valueOf(price), String.valueOf(itemTotal));
    }

    public static List<OrderItemTyped> fromStringList(List<OrderItemString> list) {
        List<OrderItemTyped> result = new ArrayList<>();
        for (OrderItemString s : list) result.add(new OrderItemTyped(s));
        return result;
    }

    public static List<OrderItemString> toStringList(List<OrderItemTyped> list) {
        List<OrderItemString> result = new ArrayList<>();
        for (OrderItemTyped t : list) result.add(t.toOrderItemString());
        return result;
    }

    /** Internal plumbing for {@link Json}; use toJSON() for JSON text. */
    public Map<String, Object> toJsonValue() {
        Map<String, Object> m = new LinkedHashMap<String, Object>();
        m.put("name", name == null ? null : name.toString());
        m.put("quantity", quantity);
        m.put("price", price == null ? null : price.toString());
        m.put("itemTotal", itemTotal == null ? null : itemTotal.toString());
        return m;
    }

    public String toJSON() { return Json.write(toJsonValue()); }

    /** Internal plumbing for {@link Json}; use fromJSON(String) for JSON text. */
    public static OrderItemTyped fromJsonValue(Map<String, Object> m) {
        if (m == null) return null;
        return new OrderItemTyped(
            new SimpleText(Json.asString(Json.require(m, "name"), "name")),
            Json.asInt(Json.require(m, "quantity"), "quantity"),
            new Dollar(Json.asString(Json.require(m, "price"), "price")),
            new Dollar(Json.asString(Json.require(m, "itemTotal"), "itemTotal")));
    }

    public static OrderItemTyped fromJSON(String json) {
        return fromJsonValue(Json.parseObject(json));
    }

    public static String toJSONList(List<OrderItemTyped> list) {
        List<Object> arr = new ArrayList<Object>();
        if (list != null)
            for (OrderItemTyped item : list) arr.add(item == null ? null : item.toJsonValue());
        return Json.write(arr);
    }

    public static List<OrderItemTyped> fromJSONList(String json) {
        List<OrderItemTyped> result = new ArrayList<OrderItemTyped>();
        for (Object e : Json.parseArray(json))
            result.add(fromJsonValue(Json.asObject(e, "OrderItemTyped")));
        return result;
    }
}
