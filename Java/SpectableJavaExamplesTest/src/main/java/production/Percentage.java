package production;

import java.math.BigDecimal;
import java.util.Objects;

public class Percentage {
    public final String value;
    private final BigDecimal amount;

    public Percentage(String value) {
        this.value = value != null ? value : "";
        this.amount = this.value.isEmpty() ? BigDecimal.ZERO : new BigDecimal(this.value.trim());
        if (amount.compareTo(BigDecimal.ZERO) < 0 || amount.compareTo(new BigDecimal("100")) > 0)
            throw new NumberFormatException("Percentage out of range (0-100): " + value);
    }

    public Percentage(long numericValue) {
        this(Long.toString(numericValue));
    }

    public BigDecimal toDecimal() {
        return amount;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Percentage)) return false;
        return Objects.equals(value, ((Percentage) o).value);
    }

    @Override
    public int hashCode() { return Objects.hash(value); }

    @Override
    public String toString() { return "Percentage{" + value + "}"; }
}
