package spectable.common;

import java.util.ArrayList;
import java.util.List;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Objects;
import production.*;
import records.*;
import calculator.*;

public class ItemPriceInputTyped {
    public Dollar totalItems;

    public ItemPriceInputTyped(Dollar totalItems) {
        this.totalItems = totalItems;
    }

    public ItemPriceInputTyped(ItemPriceInputString s) {
        this.totalItems = new Dollar(s.totalItems);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof ItemPriceInputTyped)) return false;
        ItemPriceInputTyped that = (ItemPriceInputTyped) o;
        return Objects.equals(totalItems, that.totalItems);
    }

    @Override
    public int hashCode() {
        return Objects.hash(totalItems);
    }

    public ItemPriceInputString toItemPriceInputString() {
        return new ItemPriceInputString(String.valueOf(totalItems));
    }

    public static List<ItemPriceInputTyped> fromStringList(List<ItemPriceInputString> list) {
        List<ItemPriceInputTyped> result = new ArrayList<>();
        for (ItemPriceInputString s : list) result.add(new ItemPriceInputTyped(s));
        return result;
    }

    public static List<ItemPriceInputString> toStringList(List<ItemPriceInputTyped> list) {
        List<ItemPriceInputString> result = new ArrayList<>();
        for (ItemPriceInputTyped t : list) result.add(t.toItemPriceInputString());
        return result;
    }

    /** Internal plumbing for {@link Json}; use toJSON() for JSON text. */
    public Map<String, Object> toJsonValue() {
        Map<String, Object> m = new LinkedHashMap<String, Object>();
        m.put("totalItems", totalItems == null ? null : totalItems.toString());
        return m;
    }

    public String toJSON() { return Json.write(toJsonValue()); }

    /** Internal plumbing for {@link Json}; use fromJSON(String) for JSON text. */
    public static ItemPriceInputTyped fromJsonValue(Map<String, Object> m) {
        if (m == null) return null;
        return new ItemPriceInputTyped(
            new Dollar(Json.asString(Json.require(m, "totalItems"), "totalItems")));
    }

    public static ItemPriceInputTyped fromJSON(String json) {
        return fromJsonValue(Json.parseObject(json));
    }

    public static String toJSONList(List<ItemPriceInputTyped> list) {
        List<Object> arr = new ArrayList<Object>();
        if (list != null)
            for (ItemPriceInputTyped item : list) arr.add(item == null ? null : item.toJsonValue());
        return Json.write(arr);
    }

    public static List<ItemPriceInputTyped> fromJSONList(String json) {
        List<ItemPriceInputTyped> result = new ArrayList<ItemPriceInputTyped>();
        for (Object e : Json.parseArray(json))
            result.add(fromJsonValue(Json.asObject(e, "ItemPriceInputTyped")));
        return result;
    }
}
