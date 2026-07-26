package spectable;

import java.util.ArrayList;
import java.util.List;
import production.*;

import calculator.Calculator;
import spectable.common.*;

import records.RecordFilter;
import records.TemperatureConverter;
import static org.junit.Assert.assertEquals;

public class Record_Filter_Example_glue {
    private RecordFilter recordFilter = new RecordFilter();
    private int          computedSum  = 0;

    public void Given_list_of_numbers(List<IDValueString> values) {
        recordFilter = new RecordFilter();
        for (IDValueString value : values) {
            recordFilter.add(ProductionHelper.IDValueTypedToProduction(new IDValueTyped(value)));
        }
    }

    public void When_filtered_by_ID_with_value(List<List<String>> values) {
        if (!values.isEmpty() && !values.get(0).isEmpty()) {
            IDForm id = new IDForm(values.get(0).get(0));
            computedSum = recordFilter.sumByLabel(id);
        }
    }

    public void Then_sum_is(List<List<String>> values) {
        if (!values.isEmpty() && !values.get(0).isEmpty()) {
            int expected = Integer.parseInt(values.get(0).get(0));
            assertEquals("Sum", expected, computedSum);
        }
    }

    public void When_filtered_by(List<FilterValueString> values) {
        if (!values.isEmpty()) {
            IDForm id = new FilterValueTyped(values.get(0)).value;
            computedSum = recordFilter.sumByLabel(id);
        }
    }

    public void Then_result(List<ResultValueString> values) {
        for (ResultValueString value : values) {
            ResultValueTyped typed = new ResultValueTyped(value);
            assertEquals("Filtered sum", typed.sum, computedSum);
        }
    }

    public void Examples_Calculation_Convert_F_to_C(List<FandCString> values) {
        for (FandCString value : values) {
            FandCTyped typed = new FandCTyped(value);
            int actual = TemperatureConverter.fahrenheitToCelsius(typed.f);
            assertEquals("Convert " + typed.f + "F to C", typed.c, actual);
        }
    }

    public void Examples_DataType_ID(List<ValidValuesString> values) {
        for (ValidValuesString value : values) {
            boolean error = false;
            System.out.println(value);
            ValidValuesTyped vvt = new ValidValuesTyped((value));
            try {
                new IDForm(vvt.value);
            }
            catch(NumberFormatException e){
                error = true;
            }
            assertEquals(" Value " + vvt.value,
                vvt.isValid.toBoolean(), !error);
        }
    }


    public void Examples_Calculation_Add_two_numbers(List<AdderString> values) {
        for (AdderString value : values) {
            AdderTyped at = new AdderTyped(value);
            int result = new Calculator().add(at.number1, at.number2);
            assertEquals(at.result, result);
        }
     }


    public static List<List<IDForm>> toListListID(List<List<String>> values) {
        List<List<IDForm>> result = new ArrayList<>();
        for (List<String> row : values) {
            List<IDForm> typedRow = new ArrayList<>();
            for (String cell : row) { typedRow.add(new IDForm(cell)); }
            result.add(typedRow);
        }
        return result;
    }

    public static List<List<Integer>> toListListInteger(List<List<String>> values) {
        List<List<Integer>> result = new ArrayList<>();
        for (List<String> row : values) {
            List<Integer> typedRow = new ArrayList<>();
            for (String cell : row) { typedRow.add(Integer.parseInt(cell)); }
            result.add(typedRow);
        }
        return result;
    }



    public void When_element_added(List<IDValueString> values) {
        for (IDValueString value : values) {
            IDValueTyped typed = new IDValueTyped(value);
            recordFilter.add(ProductionHelper.IDValueTypedToProduction(typed));
            System.out.println(typed);
        }
    }


    public void Examples_DataType_IDForm(List<ValidValuesString> values) {
        for (ValidValuesString value : values) {
            boolean error = false;
            System.out.println(value);
            ValidValuesTyped vvt = new ValidValuesTyped(value);
            try {
                new IDForm(vvt.value);
            }
            catch(NumberFormatException e){
                error = true;
            }
            assertEquals(" Value " + vvt.value,
                vvt.isValid.toBoolean(), !error);
        }
    }

    public static List<List<IDForm>> toListListIDForm(List<List<String>> values) {
        List<List<IDForm>> result = new ArrayList<>();
        for (List<String> row : values) {
            List<IDForm> typedRow = new ArrayList<>();
            for (String cell : row) { typedRow.add(new IDForm(cell)); }
            result.add(typedRow);
        }
        return result;
    }

}
