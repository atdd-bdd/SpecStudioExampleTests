package spectable.common;

import java.util.ArrayList;
import java.util.List;
import production.*;
import records.*;
import calculator.*;

public class TableHelper {

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
}
