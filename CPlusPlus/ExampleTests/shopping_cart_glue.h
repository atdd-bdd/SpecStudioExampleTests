#pragma once
#include <gtest/gtest.h>
#include <iostream>
#include <string>
#include <vector>
#include "common/common.h"

class ShoppingCartGlue {
public:
    static constexpr const char* DNC_STRING = "?DNC?";

    void given_catalog_has(const std::vector<CatalogItemString>& values) {
        for (const auto& v : values) { std::cout << v.to_string() << "\n"; }
        ADD_FAILURE() << "Not implemented: given_catalog_has";
    }

    void given_item_collection_is(const std::vector<OrderItemString>& values) {
        for (const auto& v : values) { std::cout << v.to_string() << "\n"; }
        ADD_FAILURE() << "Not implemented: given_item_collection_is";
    }

    void when_item_added(const std::vector<OrderItemString>& values) {
        for (const auto& v : values) { std::cout << v.to_string() << "\n"; }
        ADD_FAILURE() << "Not implemented: when_item_added";
    }

    void then_item_collection_is(const std::vector<OrderItemString>& values) {
        for (const auto& v : values) { std::cout << v.to_string() << "\n"; }
        ADD_FAILURE() << "Not implemented: then_item_collection_is";
    }

    void given_shopping_cart(const std::vector<ShoppingCartString>& values) {
        for (const auto& v : values) { std::cout << v.to_string() << "\n"; }
        ADD_FAILURE() << "Not implemented: given_shopping_cart";
    }

    void then_shopping_cart_is(const std::vector<ShoppingCartString>& values) {
        for (const auto& v : values) { std::cout << v.to_string() << "\n"; }
        ADD_FAILURE() << "Not implemented: then_shopping_cart_is";
    }

    void given_item_collection(const std::vector<OrderItemString>& values) {
        for (const auto& v : values) { std::cout << v.to_string() << "\n"; }
        ADD_FAILURE() << "Not implemented: given_item_collection";
    }

    void when_total_computed() {
        ADD_FAILURE() << "Not implemented: when_total_computed";
    }

    void then_result_is(const std::vector<PricingString>& values) {
        for (const auto& v : values) { std::cout << v.to_string() << "\n"; }
        ADD_FAILURE() << "Not implemented: then_result_is";
    }

    void examples_businessrule_shipping_cost(const std::vector<ShippingString>& values) {
        for (const auto& v : values) { std::cout << v.to_string() << "\n"; }
        ADD_FAILURE() << "Not implemented: examples_businessrule_shipping_cost";
    }

    void examples_businessrule_discount(const std::vector<DiscountingString>& values) {
        for (const auto& v : values) { std::cout << v.to_string() << "\n"; }
        ADD_FAILURE() << "Not implemented: examples_businessrule_discount";
    }

    void examples_datatype_percentage(const std::vector<ValidValuesString>& values) {
        for (const auto& v : values) { std::cout << v.to_string() << "\n"; }
        ADD_FAILURE() << "Not implemented: examples_datatype_percentage";
    }

    void examples_calculation_add_two_numbers(const std::vector<AdderString>& values) {
        for (const auto& v : values) { std::cout << v.to_string() << "\n"; }
        ADD_FAILURE() << "Not implemented: examples_calculation_add_two_numbers";
    }

    void examples_calculation_convert_f_to_c(const std::vector<FandCString>& values) {
        for (const auto& v : values) { std::cout << v.to_string() << "\n"; }
        ADD_FAILURE() << "Not implemented: examples_calculation_convert_f_to_c";
    }

    void examples_datatype_idform(const std::vector<ValidValuesString>& values) {
        for (const auto& v : values) { std::cout << v.to_string() << "\n"; }
        ADD_FAILURE() << "Not implemented: examples_datatype_idform";
    }

    void examples_datatype_dollar(const std::vector<ValidValuesString>& values) {
        for (const auto& v : values) { std::cout << v.to_string() << "\n"; }
        ADD_FAILURE() << "Not implemented: examples_datatype_dollar";
    }

    void examples_datatype_simpletext(const std::vector<ValidValuesString>& values) {
        for (const auto& v : values) { std::cout << v.to_string() << "\n"; }
        ADD_FAILURE() << "Not implemented: examples_datatype_simpletext";
    }

};
