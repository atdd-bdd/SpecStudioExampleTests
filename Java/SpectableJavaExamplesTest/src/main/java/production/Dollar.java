package production;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.Objects;

public class Dollar {
    public final String value;
    private final BigDecimal amount;

    public Dollar(String value) {
        this.value = value != null ? value : "";
        this.amount = this.value.isEmpty() ? BigDecimal.ZERO
            : new BigDecimal(this.value.replace("$", "").trim());
        if (amount.signum() < 0)
            throw new NumberFormatException("Dollar amount cannot be negative: " + value);
        if (amount.scale() > 2)
            throw new NumberFormatException("Dollar amount must not have more than two decimal digits: " + value);
    }

    private Dollar(BigDecimal amount) {
        this.amount = amount;
        this.value = amount.toPlainString();
    }

    public BigDecimal toDecimal() {
        return amount;
    }

    public Dollar plus(Dollar other) {
        return new Dollar(this.amount.add(other.amount));
    }

    public Dollar times(int factor) {
        return new Dollar(this.amount.multiply(BigDecimal.valueOf(factor)));
    }

    public Dollar times(Percentage percentage) {
        BigDecimal result = this.amount.multiply(percentage.toDecimal())
            .divide(new BigDecimal("100"), 2, RoundingMode.HALF_UP);
        return new Dollar(result);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Dollar)) return false;
        return Objects.equals(value, ((Dollar) o).value);
    }

    @Override
    public int hashCode() { return Objects.hash(value); }

    @Override
    public String toString() { return "Dollar{" + value + "}"; }
}
