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

public class ResultTyped {
    public List<MatchTyped> addressMatches;

    public ResultTyped(List<MatchTyped> addressMatches) {
        this.addressMatches = addressMatches;
    }

    public ResultTyped(ResultString s) {
        this.addressMatches = new ArrayList<>(); // Collection — populate from s.addressMatches
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof ResultTyped)) return false;
        ResultTyped that = (ResultTyped) o;
        return Objects.equals(addressMatches, that.addressMatches);
    }

    @Override
    public int hashCode() {
        return Objects.hash(addressMatches);
    }

    public ResultString toResultString() {
        return new ResultString(String.valueOf(addressMatches));
    }

    public static List<ResultTyped> fromStringList(List<ResultString> list) {
        List<ResultTyped> result = new ArrayList<>();
        for (ResultString s : list) result.add(new ResultTyped(s));
        return result;
    }

    public static List<ResultString> toStringList(List<ResultTyped> list) {
        List<ResultString> result = new ArrayList<>();
        for (ResultTyped t : list) result.add(t.toResultString());
        return result;
    }

    /** Internal plumbing for {@link Json}; use toJSON() for JSON text. */
    public Map<String, Object> toJsonValue() {
        Map<String, Object> m = new LinkedHashMap<String, Object>();
        List<Object> json_addressMatches = new ArrayList<Object>();
        if (addressMatches != null)
            for (MatchTyped e : addressMatches) json_addressMatches.add(e == null ? null : e.toJsonValue());
        m.put("addressMatches", addressMatches == null ? null : json_addressMatches);
        return m;
    }

    public String toJSON() { return Json.write(toJsonValue()); }

    /** Internal plumbing for {@link Json}; use fromJSON(String) for JSON text. */
    public static ResultTyped fromJsonValue(Map<String, Object> m) {
        if (m == null) return null;
        List<MatchTyped> addressMatches = new ArrayList<MatchTyped>();
        List<Object> json_addressMatches = Json.getArray(m, "addressMatches");
        if (json_addressMatches != null)
            for (Object e : json_addressMatches) addressMatches.add(MatchTyped.fromJsonValue(Json.asObject(e, "addressMatches")));
        return new ResultTyped(
            addressMatches);
    }

    public static ResultTyped fromJSON(String json) {
        return fromJsonValue(Json.parseObject(json));
    }

    public static String toJSONList(List<ResultTyped> list) {
        List<Object> arr = new ArrayList<Object>();
        if (list != null)
            for (ResultTyped item : list) arr.add(item == null ? null : item.toJsonValue());
        return Json.write(arr);
    }

    public static List<ResultTyped> fromJSONList(String json) {
        List<ResultTyped> result = new ArrayList<ResultTyped>();
        for (Object e : Json.parseArray(json))
            result.add(fromJsonValue(Json.asObject(e, "ResultTyped")));
        return result;
    }
}
