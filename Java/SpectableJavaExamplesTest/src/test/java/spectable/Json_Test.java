package spectable.tests;

import java.util.List;
import java.util.ArrayList;
import spectable.common.*;
import spectable.Json_glue;
import production.*;
import records.*;
import calculator.*;
import org.junit.jupiter.api.Test;

public class Json_Test {

    // -------------------------
    // Scenario Tests
    // -------------------------
    @Test
    public void Scenario_Convert_to_Json() {
        Json_glue glue = new Json_glue();

        List<SimpleClassString> objectList1 = new ArrayList<>();
        objectList1.add(new SimpleClassString("1", "B"));
        glue.Given_one_object_is(objectList1);

        glue.Then_Json_should_be("""
        {anInt:"1",aString:"B"}
        """);

    }

    @Test
    public void Scenario_Convert_from_Json() {
        Json_glue glue = new Json_glue();

        glue.Given_Json_is("""
        {anInt:  "1"   ,   aString:"B"  }
        """);

        List<SimpleClassString> objectList2 = new ArrayList<>();
        objectList2.add(new SimpleClassString("1", "B"));
        glue.Then_the_converted_object_is(objectList2);

    }

    @Test
    public void Scenario_Convert_to_Json_Array() {
        Json_glue glue = new Json_glue();

        List<SimpleClassString> objectList3 = new ArrayList<>();
        objectList3.add(new SimpleClassString("1", "B"));
        objectList3.add(new SimpleClassString("2", "C"));
        glue.Given_a_table_is(objectList3);

        glue.Then_Json_for_table_should_be("""
        [ {anInt:"1",aString:"B"} 
        , {anInt:"2",aString:"C"} 
        ]
        """);

    }

    @Test
    public void Scenario_Convert_from_Json_Array() {
        Json_glue glue = new Json_glue();

        glue.Given_Json_for_table_is("""
        [    {anInt:  "1"   ,   aString:"B"  },
        {anInt:  "2"   ,   aString:"C"  }
        ]

        """);

        List<SimpleClassString> objectList4 = new ArrayList<>();
        objectList4.add(new SimpleClassString("1", "B"));
        objectList4.add(new SimpleClassString("2", "C"));
        glue.Then_the_converted_table_should_be(objectList4);

    }

}
