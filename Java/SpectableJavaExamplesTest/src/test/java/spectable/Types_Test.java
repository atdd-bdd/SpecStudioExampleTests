package spectable.tests;

import java.util.List;
import java.util.ArrayList;
import spectable.common.*;
import spectable.Types_glue;
import production.*;
import org.junit.jupiter.api.Test;

public class Types_Test {

    // -------------------------
    // DataType Tests
    // -------------------------
    @Test
    public void DataType_Dollar() {
        Types_glue glue = new Types_glue();
        List<ValidValuesString> objectList1 = new ArrayList<>();
        objectList1.add(new ValidValuesString("0", "true", ""));
        objectList1.add(new ValidValuesString("0.01", "true", ""));
        objectList1.add(new ValidValuesString("-1", "false", "Negative not allowed"));
        objectList1.add(new ValidValuesString("0.001", "false", "Only 2 decimal digits"));
        glue.Examples_DataType_Dollar(objectList1);
    }

    @Test
    public void DataType_SimpleText() {
        Types_glue glue = new Types_glue();
        List<ValidValuesString> objectList2 = new ArrayList<>();
        objectList2.add(new ValidValuesString("abc", "y", ""));
        objectList2.add(new ValidValuesString("ab.", "y", "period okay"));
        objectList2.add(new ValidValuesString("1234567890", "y", "digits"));
        objectList2.add(new ValidValuesString("@", "n", ""));
        objectList2.add(new ValidValuesString("-a-b", "y", "hyphens"));
        glue.Examples_DataType_SimpleText(objectList2);
    }

}
