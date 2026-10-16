package spectable.common;

import java.util.Objects;
import production.*;
import records.*;
import calculator.*;

public class CatalogItemString {
    private static final String DNCString = "?DNC?";

    public SimpleTextString name;
    public DollarString price;

    public CatalogItemString(String name, String price) {
        this.name = new SimpleTextString(name);
        this.price = new DollarString(price);
    }

    /** Builds from the text form, e.g. Money as "25 USD". */
    public static CatalogItemString fromText(String text) {
        java.util.List<String> parts = Tokens.require(text, 2, "CatalogItem");
        return new CatalogItemString(parts.get(0), parts.get(1));
    }

    public CatalogItemString(String text) {
        CatalogItemString parsed = fromText(text);
        this.name = parsed.name;
        this.price = parsed.price;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof CatalogItemString)) return false;
        CatalogItemString that = (CatalogItemString) o;
        return (DNCString.equals(name.value) || DNCString.equals(that.name.value) || Objects.equals(name.value, that.name.value))
            && (DNCString.equals(price.value) || DNCString.equals(that.price.value) || Objects.equals(price.value, that.price.value));
    }

    @Override
    public int hashCode() {
        return Objects.hash(name, price);
    }

    @Override
    public String toString() {
        return Tokens.token(name.value) + " " + Tokens.token(price.value);
    }
}
