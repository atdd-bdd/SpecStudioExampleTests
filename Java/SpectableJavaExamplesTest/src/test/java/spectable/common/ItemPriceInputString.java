package spectable.common;

import java.util.Objects;
import production.*;
import records.*;
import calculator.*;

public class ItemPriceInputString {
    private static final String DNCString = "?DNC?";

    public String totalItems;

    public ItemPriceInputString(String totalItems) {
        this.totalItems = totalItems;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof ItemPriceInputString)) return false;
        ItemPriceInputString that = (ItemPriceInputString) o;
        return (DNCString.equals(totalItems) || DNCString.equals(that.totalItems) || Objects.equals(totalItems, that.totalItems));
    }

    @Override
    public int hashCode() {
        return Objects.hash(totalItems);
    }

    @Override
    public String toString() {
        return "TotalItems=" + totalItems;
    }
}
