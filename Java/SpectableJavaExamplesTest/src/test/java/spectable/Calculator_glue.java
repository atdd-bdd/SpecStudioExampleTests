package spectable;

import java.util.List;

import production.IDForm;
import records.TemperatureConverter;
import spectable.common.*;
import records.*;
import calculator.Calculator;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.fail;

public class Calculator_glue {
    private static final String DNCString = "?DNC?";

    public void Examples_Calculation_Add_two_numbers(List<AdderString> values) {
        Calculator calc = new Calculator();
        for (AdderString value : values) {
            AdderTyped typed = new AdderTyped(value);
            int actual = calc.add(typed.number1, typed.number2);
            assertEquals("Add " + typed.number1 + " + " + typed.number2, typed.result, actual);
        }
    }





    public void Examples_Calculation_AddTwoNumbers(List<AdderString> values) {
        for (AdderString value : values) {
            AdderTyped typed = new AdderTyped(value);
            System.out.println(typed);
        }
        fail("Not implemented: Examples_Calculation_AddTwoNumbers");
    }

}
