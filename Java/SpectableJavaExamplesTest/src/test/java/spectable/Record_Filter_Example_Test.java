package spectable.tests;

import java.util.List;
import java.util.ArrayList;
import spectable.common.*;
import spectable.Record_Filter_Example_glue;
import production.*;
import records.*;
import calculator.*;
import org.junit.jupiter.api.Test;

public class Record_Filter_Example_Test {

    // -------------------------
    // Scenario Tests
    // -------------------------
    @Test
    public void Scenario_Filter_Data_by_ID() {
        Record_Filter_Example_glue glue = new Record_Filter_Example_glue();

        List<IDValueString> objectList1 = new ArrayList<>();
        objectList1.add(new IDValueString("Q1234", "1"));
        objectList1.add(new IDValueString("Q9999", "2"));
        objectList1.add(new IDValueString("Q1234", "3"));
        glue.Given_list_of_numbers(objectList1);

        List<List<String>> objectList2 = new ArrayList<>();
        objectList2.add(List.of("Q1234"));
        glue.When_filtered_by_ID_with_value(objectList2);

        List<List<String>> objectList3 = new ArrayList<>();
        objectList3.add(List.of("4"));
        glue.Then_sum_is(objectList3);

    }

    @Test
    public void Scenario_Filter_Data_Another_Way() {
        Record_Filter_Example_glue glue = new Record_Filter_Example_glue();

        List<IDValueString> objectList4 = new ArrayList<>();
        objectList4.add(new IDValueString("Q1234", "1"));
        objectList4.add(new IDValueString("Q9999", "2"));
        objectList4.add(new IDValueString("Q1234", "3"));
        glue.Given_list_of_numbers(objectList4);

        List<FilterValueString> objectList5 = new ArrayList<>();
        objectList5.add(new FilterValueString("Q1234"));
        glue.When_filtered_by(objectList5);

        List<ResultValueString> objectList6 = new ArrayList<>();
        objectList6.add(new ResultValueString("4"));
        glue.Then_result(objectList6);

    }

    @Test
    public void Scenario_Add_another_value() {
        Record_Filter_Example_glue glue = new Record_Filter_Example_glue();

        List<IDValueString> objectList7 = new ArrayList<>();
        objectList7.add(new IDValueString("Q1234", "1"));
        objectList7.add(new IDValueString("Q9999", "2"));
        objectList7.add(new IDValueString("Q1234", "3"));
        glue.Given_list_of_numbers(objectList7);

        List<IDValueString> objectList8 = new ArrayList<>();
        objectList8.add(new IDValueString("Q1234", "4"));
        glue.When_element_added(objectList8);

        List<FilterValueString> objectList9 = new ArrayList<>();
        objectList9.add(new FilterValueString("Q1234"));
        glue.When_filtered_by(objectList9);

        List<ResultValueString> objectList10 = new ArrayList<>();
        objectList10.add(new ResultValueString("8"));
        glue.Then_result(objectList10);

    }

    // -------------------------
    // Calculation Tests
    // -------------------------
    @Test
    public void Calculation_Convert_F_to_C() {
        Record_Filter_Example_glue glue = new Record_Filter_Example_glue();
        List<FandCString> objectList11 = new ArrayList<>();
        objectList11.add(new FandCString("32", "0", "Freezing"));
        objectList11.add(new FandCString("212", "100", "Boiling"));
        objectList11.add(new FandCString("-40", "-40", "Below zero"));
        objectList11.add(new FandCString("68", "20", "Photo chem"));
        glue.Examples_Calculation_Convert_F_to_C(objectList11);
    }

    // -------------------------
    // DataType Tests
    // -------------------------
    @Test
    public void DataType_IDForm() {
        Record_Filter_Example_glue glue = new Record_Filter_Example_glue();
        List<ValidValuesString> objectList12 = new ArrayList<>();
        objectList12.add(new ValidValuesString("Q1234", "true", ""));
        objectList12.add(new ValidValuesString("Q123", "false", "Too short"));
        objectList12.add(new ValidValuesString("Q12345", "false", "Too long"));
        objectList12.add(new ValidValuesString("A1234", "false", "Must begin with Q"));
        glue.Examples_DataType_IDForm(objectList12);
    }

}
