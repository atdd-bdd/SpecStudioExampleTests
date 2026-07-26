package records;

import java.util.ArrayList;
import java.util.List;
import production.IDValue;
import production.IDForm;

public class RecordFilter {
    private List<IDValue> entries = new ArrayList<>();

    public void add(IDValue entry) {
        entries.add(entry);
    }

    public int sumByLabel(IDForm filterLabel) {
        int sum = 0;
        for (IDValue entry : entries) {
            if (entry.iD.equals(filterLabel)) {
                sum += entry.value;
            }
        }
        return sum;
    }
}
