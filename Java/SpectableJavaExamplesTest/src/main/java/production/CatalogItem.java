package production;

import java.util.Objects;

public class CatalogItem {
    public final SimpleText name;
    public final Dollar price;

    public CatalogItem(SimpleText name, Dollar price) {
        this.name = name;
        this.price = price;
    }

    public static class Builder {
        private SimpleText name;
        private Dollar price;

        public Builder name(SimpleText name) { this.name = name; return this; }
        public Builder price(Dollar price) { this.price = price; return this; }

        public CatalogItem build() {
            return new CatalogItem(name, price);
        }
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof CatalogItem)) return false;
        CatalogItem that = (CatalogItem) o;
        return Objects.equals(name, that.name)
            && Objects.equals(price, that.price);
    }

    @Override
    public int hashCode() {
        return Objects.hash(name, price);
    }

    @Override
    public String toString() {
        return "CatalogItem{" + "Name=" + name + ", " + "Price=" + price + "}";
    }
}
