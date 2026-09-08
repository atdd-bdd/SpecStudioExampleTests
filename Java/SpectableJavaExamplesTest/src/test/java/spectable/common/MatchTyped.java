package spectable.common;

import java.util.ArrayList;
import java.util.List;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Objects;
import production.*;
import records.*;
import calculator.*;

public class MatchTyped {
    public String matchedAddress;
    public String preDirection;
    public String streetName;
    public String suffixType;
    public String suffixDirection;
    public String city;
    public String state;
    public String zip;

    public MatchTyped(String matchedAddress, String preDirection, String streetName, String suffixType, String suffixDirection, String city, String state, String zip) {
        this.matchedAddress = matchedAddress;
        this.preDirection = preDirection;
        this.streetName = streetName;
        this.suffixType = suffixType;
        this.suffixDirection = suffixDirection;
        this.city = city;
        this.state = state;
        this.zip = zip;
    }

    public MatchTyped(MatchString s) {
        this.matchedAddress = s.matchedAddress;
        this.preDirection = s.preDirection;
        this.streetName = s.streetName;
        this.suffixType = s.suffixType;
        this.suffixDirection = s.suffixDirection;
        this.city = s.city;
        this.state = s.state;
        this.zip = s.zip;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof MatchTyped)) return false;
        MatchTyped that = (MatchTyped) o;
        return Objects.equals(matchedAddress, that.matchedAddress)
            && Objects.equals(preDirection, that.preDirection)
            && Objects.equals(streetName, that.streetName)
            && Objects.equals(suffixType, that.suffixType)
            && Objects.equals(suffixDirection, that.suffixDirection)
            && Objects.equals(city, that.city)
            && Objects.equals(state, that.state)
            && Objects.equals(zip, that.zip);
    }

    @Override
    public int hashCode() {
        return Objects.hash(matchedAddress, preDirection, streetName, suffixType, suffixDirection, city, state, zip);
    }

    public MatchString toMatchString() {
        return new MatchString(String.valueOf(matchedAddress), String.valueOf(preDirection), String.valueOf(streetName), String.valueOf(suffixType), String.valueOf(suffixDirection), String.valueOf(city), String.valueOf(state), String.valueOf(zip));
    }

    public static List<MatchTyped> fromStringList(List<MatchString> list) {
        List<MatchTyped> result = new ArrayList<>();
        for (MatchString s : list) result.add(new MatchTyped(s));
        return result;
    }

    public static List<MatchString> toStringList(List<MatchTyped> list) {
        List<MatchString> result = new ArrayList<>();
        for (MatchTyped t : list) result.add(t.toMatchString());
        return result;
    }

    /** Internal plumbing for {@link Json}; use toJSON() for JSON text. */
    public Map<String, Object> toJsonValue() {
        Map<String, Object> m = new LinkedHashMap<String, Object>();
        m.put("matchedAddress", matchedAddress);
        m.put("preDirection", preDirection);
        m.put("streetName", streetName);
        m.put("suffixType", suffixType);
        m.put("suffixDirection", suffixDirection);
        m.put("city", city);
        m.put("state", state);
        m.put("zip", zip);
        return m;
    }

    public String toJSON() { return Json.write(toJsonValue()); }

    /** Internal plumbing for {@link Json}; use fromJSON(String) for JSON text. */
    public static MatchTyped fromJsonValue(Map<String, Object> m) {
        if (m == null) return null;
        return new MatchTyped(
            Json.asString(Json.require(m, "matchedAddress"), "matchedAddress"),
            Json.asString(Json.require(m, "preDirection"), "preDirection"),
            Json.asString(Json.require(m, "streetName"), "streetName"),
            Json.asString(Json.require(m, "suffixType"), "suffixType"),
            Json.asString(Json.require(m, "suffixDirection"), "suffixDirection"),
            Json.asString(Json.require(m, "city"), "city"),
            Json.asString(Json.require(m, "state"), "state"),
            Json.asString(Json.require(m, "zip"), "zip"));
    }

    public static MatchTyped fromJSON(String json) {
        return fromJsonValue(Json.parseObject(json));
    }

    public static String toJSONList(List<MatchTyped> list) {
        List<Object> arr = new ArrayList<Object>();
        if (list != null)
            for (MatchTyped item : list) arr.add(item == null ? null : item.toJsonValue());
        return Json.write(arr);
    }

    public static List<MatchTyped> fromJSONList(String json) {
        List<MatchTyped> result = new ArrayList<MatchTyped>();
        for (Object e : Json.parseArray(json))
            result.add(fromJsonValue(Json.asObject(e, "MatchTyped")));
        return result;
    }
}
