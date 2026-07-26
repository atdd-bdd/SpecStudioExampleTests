package production;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class OrderItemCollection {
    public static final int MINIMUM = 0;
    public static final int MAXIMUM = 100;

    private final List<OrderItem> items = new ArrayList<>();

    public void add(OrderItem item) {
        items.add(item);
    }

    public boolean delete(OrderItem item) {
        return items.remove(item);
    }

    public List<OrderItem> read() {
        return Collections.unmodifiableList(items);
    }

    public boolean update(OrderItem oldItem, OrderItem newItem) {
        int index = items.indexOf(oldItem);
        if (index < 0) return false;
        items.set(index, newItem);
        return true;
    }

    public int size() {
        return items.size();
    }

    public Dollar computeTotal() {
        Dollar total = new Dollar("0");
        for (OrderItem item : items) {
            total = total.plus(item.itemTotal);
        }
        return total;
    }
}
