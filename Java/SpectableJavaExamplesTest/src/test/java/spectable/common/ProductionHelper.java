package spectable.common;

import production.*;
import java.util.ArrayList;
import java.util.List;

public class ProductionHelper {

    public static Address AddressTypedToProduction(AddressTyped t) {
        return new Address(t.street,
            t.city,
            t.state,
            t.zIP);
    }

    public static AddressTyped AddressProductionToTyped(Address p) {
        return new AddressTyped(p.street,
            p.city,
            p.state,
            p.zIP);
    }

    public static List<Address> AddressTypedListToProduction(List<AddressTyped> list) {
        List<Address> result = new ArrayList<>();
        for (AddressTyped t : list) result.add(AddressTypedToProduction(t));
        return result;
    }

    public static List<AddressTyped> AddressProductionToTypedList(List<Address> list) {
        List<AddressTyped> result = new ArrayList<>();
        for (Address p : list) result.add(AddressProductionToTyped(p));
        return result;
    }

    public static IDValue IDValueTypedToProduction(IDValueTyped t) {
        return new IDValue(t.iD, t.value);
    }

    public static IDValueTyped IDValueProductionToTyped(IDValue p) {
        return new IDValueTyped(p.iD, p.value);
    }

    public static List<IDValue> IDValueTypedListToProduction(List<IDValueTyped> list) {
        List<IDValue> result = new ArrayList<>();
        for (IDValueTyped t : list) result.add(IDValueTypedToProduction(t));
        return result;
    }

    public static List<IDValueTyped> IDValueProductionToTypedList(List<IDValue> list) {
        List<IDValueTyped> result = new ArrayList<>();
        for (IDValue p : list) result.add(IDValueProductionToTyped(p));
        return result;
    }

    public static OrderItem OrderItemTypedToProduction(OrderItemTyped t) {
        return new OrderItem(t.name, t.quantity, t.price, t.itemTotal);
    }

    public static OrderItemTyped OrderItemProductionToTyped(OrderItem p) {
        return new OrderItemTyped(p.name, p.quantity, p.price, p.itemTotal);
    }

    public static OrderItemCollection OrderItemTypedListToProduction(List<OrderItemTyped> list) {
        OrderItemCollection result = new OrderItemCollection();
        for (OrderItemTyped t : list) result.add(OrderItemTypedToProduction(t));
        return result;
    }

    public static List<OrderItemTyped> OrderItemProductionToTypedList(OrderItemCollection collection) {
        List<OrderItemTyped> result = new ArrayList<>();
        for (OrderItem p : collection.read()) result.add(OrderItemProductionToTyped(p));
        return result;
    }

    public static ShoppingCart ShoppingCartTypedToProduction(ShoppingCartTyped t) {
        return new ShoppingCart(OrderItemTypedListToProduction(t.items),
            t.shipping,
            t.discount,
            t.totalPrice,
            AddressTypedToProduction(t.shippingAddress),
            AddressTypedToProduction(t.billingAddress));
    }

    public static ShoppingCartTyped ShoppingCartProductionToTyped(ShoppingCart p) {
        return new ShoppingCartTyped(OrderItemProductionToTypedList(p.items),
            p.shipping,
            p.discount,
            p.totalPrice,
            AddressProductionToTyped(p.shippingAddress),
            AddressProductionToTyped(p.billingAddress));
    }

    public static List<ShoppingCart> ShoppingCartTypedListToProduction(List<ShoppingCartTyped> list) {
        List<ShoppingCart> result = new ArrayList<>();
        for (ShoppingCartTyped t : list) result.add(ShoppingCartTypedToProduction(t));
        return result;
    }

    public static List<ShoppingCartTyped> ShoppingCartProductionToTypedList(List<ShoppingCart> list) {
        List<ShoppingCartTyped> result = new ArrayList<>();
        for (ShoppingCart p : list) result.add(ShoppingCartProductionToTyped(p));
        return result;
    }

}
