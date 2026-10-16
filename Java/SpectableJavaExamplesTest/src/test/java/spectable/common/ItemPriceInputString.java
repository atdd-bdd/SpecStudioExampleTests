package spectable.common;

import java.util.Objects;
import production.*;
import records.*;
import calculator.*;

public class ItemPriceInputString {
    private static final String DNCString = "?DNC?";

    public DollarString totalItems;

    public ItemPriceInputString(String totalItems) {
        this.totalItems = new DollarString(totalItems);
    }

    /** Builds from the text form, e.g. Money as "25 USD". */
    public static ItemPriceInputString fromText(String text) {
        java.util.List<String> parts = Tokens.require(text, 1, "ItemPriceInput");
        return new ItemPriceInputString(parts.get(0));
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof ItemPriceInputString)) return false;
        ItemPriceInputString that = (ItemPriceInputString) o;
        return (DNCString.equals(totalItems.value) || DNCString.equals(that.totalItems.value) || Objects.equals(totalItems.value, that.totalItems.value));
    }

    @Override
    public int hashCode() {
        return Objects.hash(totalItems);
    }

    @Override
    public String toString() {
        return Tokens.token(totalItems.value);
    }
}
