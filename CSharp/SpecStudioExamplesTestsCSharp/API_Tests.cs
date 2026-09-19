namespace SpecStudioExamplesTestsCSharp.API{
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Collections.Generic;
using SpecStudioExamplesTestsCSharp.common;
using production;

[TestClass]
public class API{

[TestMethod]
public void Test_Scenario_Retrieve_a_single_post(){
     API_glue aPI_glue_object = new API_glue();

         List<List<string>> stringListList1 = new List<List<string>>{
            new List<string>{ "https://jsonplaceholder.typicode.com" },
         };
         aPI_glue_object.Given_base_Page_is(stringListList1);

         List<ApiRequestString> objectList2 = new List<ApiRequestString>{
             new ApiRequestString("GET","posts","1",""),
         };
         aPI_glue_object.When_sending_request(objectList2);

         List<ApiStatusString> objectList3 = new List<ApiStatusString>{
             new ApiStatusString("200"),
         };
         aPI_glue_object.Then_response_status_is(objectList3);

         List<PostString> objectList4 = new List<PostString>{
             new PostString("1","1","sunt aut facere repellat provident occaecati excepturi optio reprehenderit","quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"),
         };
         aPI_glue_object.Then_response_body_is(objectList4);

}

[TestMethod]
public void Test_Scenario_Retrieve_all_posts(){
     API_glue aPI_glue_object = new API_glue();

         List<List<string>> stringListList5 = new List<List<string>>{
            new List<string>{ "https://jsonplaceholder.typicode.com" },
         };
         aPI_glue_object.Given_base_Page_is(stringListList5);

         List<ApiRequestString> objectList6 = new List<ApiRequestString>{
             new ApiRequestString("GET","posts","",""),
         };
         aPI_glue_object.When_sending_request(objectList6);

         List<ApiStatusString> objectList7 = new List<ApiStatusString>{
             new ApiStatusString("200"),
         };
         aPI_glue_object.Then_response_status_is(objectList7);

         List<List<string>> stringListList8 = new List<List<string>>{
            new List<string>{ "100" },
         };
         aPI_glue_object.Then_response_array_contains_this_many_items(stringListList8);

}

[TestMethod]
public void Test_Scenario_Create_a_new_post(){
     API_glue aPI_glue_object = new API_glue();

         List<List<string>> stringListList9 = new List<List<string>>{
            new List<string>{ "https://jsonplaceholder.typicode.com" },
         };
         aPI_glue_object.Given_base_Page_is(stringListList9);

         List<NewPostString> objectList10 = new List<NewPostString>{
             new NewPostString("AlignThree Demo","Testing POST","7"),
         };
         aPI_glue_object.Given_new_post_data(objectList10);

         List<ApiRequestString> objectList11 = new List<ApiRequestString>{
             new ApiRequestString("POST","posts","","NewPost"),
         };
         aPI_glue_object.When_sending_request(objectList11);

         List<ApiStatusString> objectList12 = new List<ApiStatusString>{
             new ApiStatusString("201"),
         };
         aPI_glue_object.Then_response_status_is(objectList12);

         List<PostString> objectList13 = new List<PostString>{
             new PostString("7","101","AlignThree Demo","Testing POST"),
         };
         aPI_glue_object.Then_response_body_is(objectList13);

}

[TestMethod]
public void Test_Scenario_Replace_an_existing_post(){
     API_glue aPI_glue_object = new API_glue();

         List<List<string>> stringListList14 = new List<List<string>>{
            new List<string>{ "https://jsonplaceholder.typicode.com" },
         };
         aPI_glue_object.Given_base_Page_is(stringListList14);

         List<ReplacePostString> objectList15 = new List<ReplacePostString>{
             new ReplacePostString("1","1","Replaced Title","Replaced Body"),
         };
         aPI_glue_object.Given_replacement_data(objectList15);

         List<ApiRequestString> objectList16 = new List<ApiRequestString>{
             new ApiRequestString("PUT","posts","1","ReplacePost"),
         };
         aPI_glue_object.When_sending_request(objectList16);

         List<ApiStatusString> objectList17 = new List<ApiStatusString>{
             new ApiStatusString("200"),
         };
         aPI_glue_object.Then_response_status_is(objectList17);

         List<PostString> objectList18 = new List<PostString>{
             new PostString("1","1","Replaced Title","Replaced Body"),
         };
         aPI_glue_object.Then_response_body_is(objectList18);

}

[TestMethod]
public void Test_Scenario_Update_a_post_title(){
     API_glue aPI_glue_object = new API_glue();

         List<List<string>> stringListList19 = new List<List<string>>{
            new List<string>{ "https://jsonplaceholder.typicode.com" },
         };
         aPI_glue_object.Given_base_Page_is(stringListList19);

         List<PatchTitleString> objectList20 = new List<PatchTitleString>{
             new PatchTitleString("Patched Title"),
         };
         aPI_glue_object.Given_patch_data(objectList20);

         List<ApiRequestString> objectList21 = new List<ApiRequestString>{
             new ApiRequestString("PATCH","posts","1","PatchTitle"),
         };
         aPI_glue_object.When_sending_request(objectList21);

         List<ApiStatusString> objectList22 = new List<ApiStatusString>{
             new ApiStatusString("200"),
         };
         aPI_glue_object.Then_response_status_is(objectList22);

         List<PostString> objectList23 = new List<PostString>{
             new PostString("1","1","Patched Title","quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"),
         };
         aPI_glue_object.Then_response_body_is(objectList23);

}

[TestMethod]
public void Test_Scenario_Delete_a_post(){
     API_glue aPI_glue_object = new API_glue();

         List<List<string>> stringListList24 = new List<List<string>>{
            new List<string>{ "https://jsonplaceholder.typicode.com" },
         };
         aPI_glue_object.Given_base_Page_is(stringListList24);

         List<ApiRequestString> objectList25 = new List<ApiRequestString>{
             new ApiRequestString("DELETE","posts","1",""),
         };
         aPI_glue_object.When_sending_request(objectList25);

         List<ApiStatusString> objectList26 = new List<ApiStatusString>{
             new ApiStatusString("200"),
         };
         aPI_glue_object.Then_response_status_is(objectList26);

}

}
}
