package spectable.common;

import java.util.ArrayList;
import java.util.List;
import production.*;
import records.*;
import calculator.*;

public class TableHelper {

    public static Boolean toBoolean(String cell) {
        return Boolean.parseBoolean(cell);
    }

    public static IDForm toIDForm(String cell) {
        return new IDForm(cell);
    }

    public static Integer toInteger(String cell) {
        return Integer.parseInt(cell);
    }

    public static List<Boolean> toListBoolean(List<String> values) {
        List<Boolean> result = new ArrayList<>();
        for (String cell : values) { result.add(Boolean.parseBoolean(cell)); }
        return result;
    }

    public static List<IDForm> toListIDForm(List<String> values) {
        List<IDForm> result = new ArrayList<>();
        for (String cell : values) { result.add(new IDForm(cell)); }
        return result;
    }

    public static List<Integer> toListInteger(List<String> values) {
        List<Integer> result = new ArrayList<>();
        for (String cell : values) { result.add(Integer.parseInt(cell)); }
        return result;
    }

    public static List<List<Boolean>> toListListBoolean(List<List<String>> values) {
        List<List<Boolean>> result = new ArrayList<>();
        for (List<String> row : values) {
            List<Boolean> typedRow = new ArrayList<>();
            for (String cell : row) { typedRow.add(Boolean.parseBoolean(cell)); }
            result.add(typedRow);
        }
        return result;
    }

    public static List<List<IDForm>> toListListIDForm(List<List<String>> values) {
        List<List<IDForm>> result = new ArrayList<>();
        for (List<String> row : values) {
            List<IDForm> typedRow = new ArrayList<>();
            for (String cell : row) { typedRow.add(new IDForm(cell)); }
            result.add(typedRow);
        }
        return result;
    }

    public static List<List<Integer>> toListListInteger(List<List<String>> values) {
        List<List<Integer>> result = new ArrayList<>();
        for (List<String> row : values) {
            List<Integer> typedRow = new ArrayList<>();
            for (String cell : row) { typedRow.add(Integer.parseInt(cell)); }
            result.add(typedRow);
        }
        return result;
    }

    public static List<List<Pins>> toListListPins(List<List<String>> values) {
        List<List<Pins>> result = new ArrayList<>();
        for (List<String> row : values) {
            List<Pins> typedRow = new ArrayList<>();
            for (String cell : row) { typedRow.add(new Pins(cell)); }
            result.add(typedRow);
        }
        return result;
    }

    public static List<List<String>> toListListString(List<List<String>> values) {
        List<List<String>> result = new ArrayList<>();
        for (List<String> row : values) {
            List<String> typedRow = new ArrayList<>();
            for (String cell : row) { typedRow.add(cell); }
            result.add(typedRow);
        }
        return result;
    }

    public static List<Pins> toListPins(List<String> values) {
        List<Pins> result = new ArrayList<>();
        for (String cell : values) { result.add(new Pins(cell)); }
        return result;
    }

    public static List<String> toListString(List<String> values) {
        List<String> result = new ArrayList<>();
        for (String cell : values) { result.add(cell); }
        return result;
    }

    public static Pins toPins(String cell) {
        return new Pins(cell);
    }

    public static String toString(String cell) {
        return cell;
    }
}
