package spectable.tests;

import java.util.List;
import java.util.ArrayList;
import spectable.common.*;
import spectable.Calculator_glue;
import production.*;
import records.*;
import calculator.*;
import org.junit.jupiter.api.Test;

public class Calculator_Test {

    // -------------------------
    // Calculation Tests
    // -------------------------
    @Test
    public void Calculation_Add_two_numbers() {
        Calculator_glue glue = new Calculator_glue();
        List<AdderString> objectList1 = new ArrayList<>();
        objectList1.add(new AdderString("2", "3", "5"));
        objectList1.add(new AdderString("10", "20", "30"));
        objectList1.add(new AdderString("-1", "1", "0"));
        glue.Examples_Calculation_Add_two_numbers(objectList1);
    }

}
