package spectable.common;

import java.util.ArrayList;
import java.util.List;
import production.*;
import records.*;
import calculator.*;

public class TableHelper {

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
}
