package production;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class MatchCollection {
    public static final int MINIMUM = 0;
    public static final int MAXIMUM = 10000;

    private final List<Match> items = new ArrayList<>();

    public void add(Match item) {
        items.add(item);
    }

    public boolean delete(Match item) {
        return items.remove(item);
    }

    public List<Match> read() {
        return Collections.unmodifiableList(items);
    }

    public boolean update(Match oldItem, Match newItem) {
        int index = items.indexOf(oldItem);
        if (index < 0) return false;
        items.set(index, newItem);
        return true;
    }

    public int size() {
        return items.size();
    }
}
