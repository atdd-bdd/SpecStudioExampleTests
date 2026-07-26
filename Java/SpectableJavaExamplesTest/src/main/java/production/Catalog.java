package production;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class Catalog {
    public static final int MINIMUM = 0;
    public static final int MAXIMUM = 10000000;

    private final List<CatalogItem> items = new ArrayList<>();

    public void add(CatalogItem item) {
        items.add(item);
    }

    public boolean delete(CatalogItem item) {
        return items.remove(item);
    }

    public List<CatalogItem> read() {
        return Collections.unmodifiableList(items);
    }

    public boolean update(CatalogItem oldItem, CatalogItem newItem) {
        int index = items.indexOf(oldItem);
        if (index < 0) return false;
        items.set(index, newItem);
        return true;
    }

    public int size() {
        return items.size();
    }

    // The price listed for name, or $0 if the catalog has no such item.
    public Dollar priceFor(SimpleText name) {
        for (CatalogItem item : items) {
            if (item.name.equals(name)) return item.price;
        }
        return new Dollar("0");
    }
}
