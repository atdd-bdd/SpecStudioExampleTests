package spectable.tests;

import java.util.List;
import java.util.ArrayList;
import spectable.common.*;
import spectable.API_glue;
import production.*;
import records.*;
import calculator.*;
import org.junit.jupiter.api.Test;

public class API_Test {

    // -------------------------
    // Scenario Tests
    // -------------------------
    @Test
    public void Scenario_Retrieve_a_single_post() {
        API_glue glue = new API_glue();

        glue.Given_base_Page_is(TableHelper.toListString(List.of("https://jsonplaceholder.typicode.com")));

        List<ApiRequestString> objectList2 = new ArrayList<>();
        objectList2.add(new ApiRequestString("GET", "posts", "1", ""));
        glue.When_sending_request(objectList2);

        List<ApiStatusString> objectList3 = new ArrayList<>();
        objectList3.add(new ApiStatusString("200"));
        glue.Then_response_status_is(objectList3);

        List<PostString> objectList4 = new ArrayList<>();
        objectList4.add(new PostString("1", "1", "sunt aut facere repellat provident occaecati excepturi optio reprehenderit", "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"));
        glue.Then_response_body_is(objectList4);

    }

    @Test
    public void Scenario_Retrieve_all_posts() {
        API_glue glue = new API_glue();

        glue.Given_base_Page_is(TableHelper.toListString(List.of("https://jsonplaceholder.typicode.com")));

        List<ApiRequestString> objectList6 = new ArrayList<>();
        objectList6.add(new ApiRequestString("GET", "posts", "", ""));
        glue.When_sending_request(objectList6);

        List<ApiStatusString> objectList7 = new ArrayList<>();
        objectList7.add(new ApiStatusString("200"));
        glue.Then_response_status_is(objectList7);

        glue.Then_response_array_contains_this_many_items(TableHelper.toListInteger(List.of("100")));

    }

    @Test
    public void Scenario_Create_a_new_post() {
        API_glue glue = new API_glue();

        glue.Given_base_Page_is(TableHelper.toListString(List.of("https://jsonplaceholder.typicode.com")));

        List<NewPostString> objectList10 = new ArrayList<>();
        objectList10.add(new NewPostString("AlignThree Demo", "Testing POST", "7"));
        glue.Given_new_post_data(objectList10);

        List<ApiRequestString> objectList11 = new ArrayList<>();
        objectList11.add(new ApiRequestString("POST", "posts", "", "NewPost"));
        glue.When_sending_request(objectList11);

        List<ApiStatusString> objectList12 = new ArrayList<>();
        objectList12.add(new ApiStatusString("201"));
        glue.Then_response_status_is(objectList12);

        List<PostString> objectList13 = new ArrayList<>();
        objectList13.add(new PostString("7", "101", "AlignThree Demo", "Testing POST"));
        glue.Then_response_body_is(objectList13);

    }

    @Test
    public void Scenario_Replace_an_existing_post() {
        API_glue glue = new API_glue();

        glue.Given_base_Page_is(TableHelper.toListString(List.of("https://jsonplaceholder.typicode.com")));

        List<ReplacePostString> objectList15 = new ArrayList<>();
        objectList15.add(new ReplacePostString("1", "1", "Replaced Title", "Replaced Body"));
        glue.Given_replacement_data(objectList15);

        List<ApiRequestString> objectList16 = new ArrayList<>();
        objectList16.add(new ApiRequestString("PUT", "posts", "1", "ReplacePost"));
        glue.When_sending_request(objectList16);

        List<ApiStatusString> objectList17 = new ArrayList<>();
        objectList17.add(new ApiStatusString("200"));
        glue.Then_response_status_is(objectList17);

        List<PostString> objectList18 = new ArrayList<>();
        objectList18.add(new PostString("1", "1", "Replaced Title", "Replaced Body"));
        glue.Then_response_body_is(objectList18);

    }

    @Test
    public void Scenario_Update_a_post_title() {
        API_glue glue = new API_glue();

        glue.Given_base_Page_is(TableHelper.toListString(List.of("https://jsonplaceholder.typicode.com")));

        List<PatchTitleString> objectList20 = new ArrayList<>();
        objectList20.add(new PatchTitleString("Patched Title"));
        glue.Given_patch_data(objectList20);

        List<ApiRequestString> objectList21 = new ArrayList<>();
        objectList21.add(new ApiRequestString("PATCH", "posts", "1", "PatchTitle"));
        glue.When_sending_request(objectList21);

        List<ApiStatusString> objectList22 = new ArrayList<>();
        objectList22.add(new ApiStatusString("200"));
        glue.Then_response_status_is(objectList22);

        List<PostString> objectList23 = new ArrayList<>();
        objectList23.add(new PostString("1", "1", "Patched Title", "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"));
        glue.Then_response_body_is(objectList23);

    }

    @Test
    public void Scenario_Delete_a_post() {
        API_glue glue = new API_glue();

        glue.Given_base_Page_is(TableHelper.toListString(List.of("https://jsonplaceholder.typicode.com")));

        List<ApiRequestString> objectList25 = new ArrayList<>();
        objectList25.add(new ApiRequestString("DELETE", "posts", "1", ""));
        glue.When_sending_request(objectList25);

        List<ApiStatusString> objectList26 = new ArrayList<>();
        objectList26.add(new ApiStatusString("200"));
        glue.Then_response_status_is(objectList26);

    }

}
