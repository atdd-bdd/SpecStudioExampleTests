package spectable.common;

import java.util.ArrayList;
import java.util.List;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Objects;
import production.*;
import records.*;
import calculator.*;

public class AddressComponentsTyped {
    public String zip;
    public String streetName;
    public String city;
    public String preDirection;
    public String suffixDirection;
    public String state;
    public String suffixType;

    public AddressComponentsTyped(String zip, String streetName, String city, String preDirection, String suffixDirection, String state, String suffixType) {
        this.zip = zip;
        this.streetName = streetName;
        this.city = city;
        this.preDirection = preDirection;
        this.suffixDirection = suffixDirection;
        this.state = state;
        this.suffixType = suffixType;
    }

    public AddressComponentsTyped(AddressComponentsString s) {
        this.zip = s.zip;
        this.streetName = s.streetName;
        this.city = s.city;
        this.preDirection = s.preDirection;
        this.suffixDirection = s.suffixDirection;
        this.state = s.state;
        this.suffixType = s.suffixType;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof AddressComponentsTyped)) return false;
        AddressComponentsTyped that = (AddressComponentsTyped) o;
        return Objects.equals(zip, that.zip)
            && Objects.equals(streetName, that.streetName)
            && Objects.equals(city, that.city)
            && Objects.equals(preDirection, that.preDirection)
            && Objects.equals(suffixDirection, that.suffixDirection)
            && Objects.equals(state, that.state)
            && Objects.equals(suffixType, that.suffixType);
    }

    @Override
    public int hashCode() {
        return Objects.hash(zip, streetName, city, preDirection, suffixDirection, state, suffixType);
    }

    public AddressComponentsString toAddressComponentsString() {
        return new AddressComponentsString(String.valueOf(zip), String.valueOf(streetName), String.valueOf(city), String.valueOf(preDirection), String.valueOf(suffixDirection), String.valueOf(state), String.valueOf(suffixType));
    }

    public static List<AddressComponentsTyped> fromStringList(List<AddressComponentsString> list) {
        List<AddressComponentsTyped> result = new ArrayList<>();
        for (AddressComponentsString s : list) result.add(new AddressComponentsTyped(s));
        return result;
    }

    public static List<AddressComponentsString> toStringList(List<AddressComponentsTyped> list) {
        List<AddressComponentsString> result = new ArrayList<>();
        for (AddressComponentsTyped t : list) result.add(t.toAddressComponentsString());
        return result;
    }

    /** Internal plumbing for {@link Json}; use toJSON() for JSON text. */
    public Map<String, Object> toJsonValue() {
        Map<String, Object> m = new LinkedHashMap<String, Object>();
        m.put("zip", zip);
        m.put("streetName", streetName);
        m.put("city", city);
        m.put("preDirection", preDirection);
        m.put("suffixDirection", suffixDirection);
        m.put("state", state);
        m.put("suffixType", suffixType);
        return m;
    }

    public String toJSON() { return Json.write(toJsonValue()); }

    /** Internal plumbing for {@link Json}; use fromJSON(String) for JSON text. */
    public static AddressComponentsTyped fromJsonValue(Map<String, Object> m) {
        if (m == null) return null;
        return new AddressComponentsTyped(
            Json.asString(Json.require(m, "zip"), "zip"),
            Json.asString(Json.require(m, "streetName"), "streetName"),
            Json.asString(Json.require(m, "city"), "city"),
            Json.asString(Json.require(m, "preDirection"), "preDirection"),
            Json.asString(Json.require(m, "suffixDirection"), "suffixDirection"),
            Json.asString(Json.require(m, "state"), "state"),
            Json.asString(Json.require(m, "suffixType"), "suffixType"));
    }

    public static AddressComponentsTyped fromJSON(String json) {
        return fromJsonValue(Json.parseObject(json));
    }

    public static String toJSONList(List<AddressComponentsTyped> list) {
        List<Object> arr = new ArrayList<Object>();
        if (list != null)
            for (AddressComponentsTyped item : list) arr.add(item == null ? null : item.toJsonValue());
        return Json.write(arr);
    }

    public static List<AddressComponentsTyped> fromJSONList(String json) {
        List<AddressComponentsTyped> result = new ArrayList<AddressComponentsTyped>();
        for (Object e : Json.parseArray(json))
            result.add(fromJsonValue(Json.asObject(e, "AddressComponentsTyped")));
        return result;
    }
}
