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
    public AddressComponentsTyped addressComponents;

    public MatchTyped(String matchedAddress, AddressComponentsTyped addressComponents) {
        this.matchedAddress = matchedAddress;
        this.addressComponents = addressComponents;
    }

    public MatchTyped(MatchString s) {
        this.matchedAddress = s.matchedAddress;
        this.addressComponents = new AddressComponentsTyped(s.addressComponents);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof MatchTyped)) return false;
        MatchTyped that = (MatchTyped) o;
        return Objects.equals(matchedAddress, that.matchedAddress)
            && Objects.equals(addressComponents, that.addressComponents);
    }

    @Override
    public int hashCode() {
        return Objects.hash(matchedAddress, addressComponents);
    }

    public MatchString toMatchString() {
        return new MatchString(String.valueOf(matchedAddress), addressComponents.toAddressComponentsString());
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
        m.put("addressComponents", addressComponents == null ? null : addressComponents.toJsonValue());
        return m;
    }

    public String toJSON() { return Json.write(toJsonValue()); }

    /** Internal plumbing for {@link Json}; use fromJSON(String) for JSON text. */
    public static MatchTyped fromJsonValue(Map<String, Object> m) {
        if (m == null) return null;
        return new MatchTyped(
            Json.asString(Json.require(m, "matchedAddress"), "matchedAddress"),
            AddressComponentsTyped.fromJsonValue(Json.asObject(Json.require(m, "addressComponents"), "addressComponents")));
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
