package spectable.common;

import java.util.ArrayList;
import java.util.List;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Objects;
import production.*;
import records.*;
import calculator.*;

public class AddressTyped {
    public SimpleTextTyped street;
    public SimpleTextTyped city;
    public SimpleTextTyped state;
    public SimpleTextTyped zIP;

    public AddressTyped(SimpleTextTyped street, SimpleTextTyped city, SimpleTextTyped state, SimpleTextTyped zIP) {
        this.street = street;
        this.city = city;
        this.state = state;
        this.zIP = zIP;
    }

    public AddressTyped(AddressString s) {
        this.street = new SimpleTextTyped(s.street);
        this.city = new SimpleTextTyped(s.city);
        this.state = new SimpleTextTyped(s.state);
        this.zIP = new SimpleTextTyped(s.zIP);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof AddressTyped)) return false;
        AddressTyped that = (AddressTyped) o;
        return Objects.equals(street, that.street)
            && Objects.equals(city, that.city)
            && Objects.equals(state, that.state)
            && Objects.equals(zIP, that.zIP);
    }

    @Override
    public int hashCode() {
        return Objects.hash(street, city, state, zIP);
    }

    public AddressString toAddressString() {
        return new AddressString(String.valueOf(street), String.valueOf(city), String.valueOf(state), String.valueOf(zIP));
    }

    public static List<AddressTyped> fromStringList(List<AddressString> list) {
        List<AddressTyped> result = new ArrayList<>();
        for (AddressString s : list) result.add(new AddressTyped(s));
        return result;
    }

    public static List<AddressString> toStringList(List<AddressTyped> list) {
        List<AddressString> result = new ArrayList<>();
        for (AddressTyped t : list) result.add(t.toAddressString());
        return result;
    }

    /** Internal plumbing for {@link Json}; use toJSON() for JSON text. */
    public Map<String, Object> toJsonValue() {
        Map<String, Object> m = new LinkedHashMap<String, Object>();
        m.put("street", street == null ? null : street.toString());
        m.put("city", city == null ? null : city.toString());
        m.put("state", state == null ? null : state.toString());
        m.put("zIP", zIP == null ? null : zIP.toString());
        return m;
    }

    public String toJSON() { return Json.write(toJsonValue()); }

    /** Internal plumbing for {@link Json}; use fromJSON(String) for JSON text. */
    public static AddressTyped fromJsonValue(Map<String, Object> m) {
        if (m == null) return null;
        return new AddressTyped(
            new SimpleTextTyped(new SimpleTextString(Json.asString(Json.require(m, "street"), "street"))),
            new SimpleTextTyped(new SimpleTextString(Json.asString(Json.require(m, "city"), "city"))),
            new SimpleTextTyped(new SimpleTextString(Json.asString(Json.require(m, "state"), "state"))),
            new SimpleTextTyped(new SimpleTextString(Json.asString(Json.require(m, "zIP"), "zIP"))));
    }

    public static AddressTyped fromJSON(String json) {
        return fromJsonValue(Json.parseObject(json));
    }

    public static String toJSONList(List<AddressTyped> list) {
        List<Object> arr = new ArrayList<Object>();
        if (list != null)
            for (AddressTyped item : list) arr.add(item == null ? null : item.toJsonValue());
        return Json.write(arr);
    }

    public static List<AddressTyped> fromJSONList(String json) {
        List<AddressTyped> result = new ArrayList<AddressTyped>();
        for (Object e : Json.parseArray(json))
            result.add(fromJsonValue(Json.asObject(e, "AddressTyped")));
        return result;
    }
}
