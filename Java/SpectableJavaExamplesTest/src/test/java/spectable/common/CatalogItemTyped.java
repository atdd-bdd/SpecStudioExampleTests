package spectable.common;

import java.util.ArrayList;
import java.util.List;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Objects;
import production.*;
import records.*;
import calculator.*;

public class CatalogItemTyped {
    public SimpleText name;
    public Dollar price;

    public CatalogItemTyped(SimpleText name, Dollar price) {
        this.name = name;
        this.price = price;
    }

    public CatalogItemTyped(CatalogItemString s) {
        this.name = new SimpleText(s.name);
        this.price = new Dollar(s.price);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof CatalogItemTyped)) return false;
        CatalogItemTyped that = (CatalogItemTyped) o;
        return Objects.equals(name, that.name)
            && Objects.equals(price, that.price);
    }

    @Override
    public int hashCode() {
        return Objects.hash(name, price);
    }

    public CatalogItemString toCatalogItemString() {
        return new CatalogItemString(String.valueOf(name), String.valueOf(price));
    }

    public static List<CatalogItemTyped> fromStringList(List<CatalogItemString> list) {
        List<CatalogItemTyped> result = new ArrayList<>();
        for (CatalogItemString s : list) result.add(new CatalogItemTyped(s));
        return result;
    }

    public static List<CatalogItemString> toStringList(List<CatalogItemTyped> list) {
        List<CatalogItemString> result = new ArrayList<>();
        for (CatalogItemTyped t : list) result.add(t.toCatalogItemString());
        return result;
    }

    /** Internal plumbing for {@link Json}; use toJSON() for JSON text. */
    public Map<String, Object> toJsonValue() {
        Map<String, Object> m = new LinkedHashMap<String, Object>();
        m.put("name", name == null ? null : name.value);
        m.put("price", price == null ? null : price.value);
        return m;
    }

    public String toJSON() { return Json.write(toJsonValue()); }

    /** Internal plumbing for {@link Json}; use fromJSON(String) for JSON text. */
    public static CatalogItemTyped fromJsonValue(Map<String, Object> m) {
        if (m == null) return null;
        return new CatalogItemTyped(
            new SimpleText(Json.asString(Json.require(m, "name"), "name")),
            new Dollar(Json.asString(Json.require(m, "price"), "price")));
    }

    public static CatalogItemTyped fromJSON(String json) {
        return fromJsonValue(Json.parseObject(json));
    }

    public static String toJSONList(List<CatalogItemTyped> list) {
        List<Object> arr = new ArrayList<Object>();
        if (list != null)
            for (CatalogItemTyped item : list) arr.add(item == null ? null : item.toJsonValue());
        return Json.write(arr);
    }

    public static List<CatalogItemTyped> fromJSONList(String json) {
        List<CatalogItemTyped> result = new ArrayList<CatalogItemTyped>();
        for (Object e : Json.parseArray(json))
            result.add(fromJsonValue(Json.asObject(e, "CatalogItemTyped")));
        return result;
    }
}
