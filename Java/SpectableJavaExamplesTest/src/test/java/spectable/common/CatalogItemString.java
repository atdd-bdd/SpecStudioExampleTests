package spectable.common;

import java.util.Objects;
import production.*;
import records.*;
import calculator.*;

public class CatalogItemString {
    private static final String DNCString = "?DNC?";

    public String name;
    public String price;

    public CatalogItemString(String name, String price) {
        this.name = name;
        this.price = price;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof CatalogItemString)) return false;
        CatalogItemString that = (CatalogItemString) o;
        return (DNCString.equals(name) || DNCString.equals(that.name) || Objects.equals(name, that.name))
            && (DNCString.equals(price) || DNCString.equals(that.price) || Objects.equals(price, that.price));
    }

    @Override
    public int hashCode() {
        return Objects.hash(name, price);
    }

    @Override
    public String toString() {
        return "Name=" + name + ", " + "Price=" + price;
    }
}
