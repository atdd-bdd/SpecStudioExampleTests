package spectable.common;

import production.*;
import java.util.ArrayList;
import java.util.List;

public class ProductionHelper {

    public static AddressComponentsTyped AddressComponentsProductionToTyped(AddressComponents p) {
        return new AddressComponentsTyped(p.zip,
            p.streetName,
            p.city,
            p.preDirection,
            p.suffixDirection,
            p.state,
            p.suffixType);
    }

    public static List<AddressComponentsTyped> AddressComponentsProductionToTypedList(List<AddressComponents> list) {
        List<AddressComponentsTyped> result = new ArrayList<>();
        for (AddressComponents p : list) result.add(AddressComponentsProductionToTyped(p));
        return result;
    }

    public static List<AddressComponents> AddressComponentsTypedListToProduction(List<AddressComponentsTyped> list) {
        List<AddressComponents> result = new ArrayList<>();
        for (AddressComponentsTyped t : list) result.add(AddressComponentsTypedToProduction(t));
        return result;
    }

    public static AddressComponents AddressComponentsTypedToProduction(AddressComponentsTyped t) {
        return new AddressComponents(t.zip,
            t.streetName,
            t.city,
            t.preDirection,
            t.suffixDirection,
            t.state,
            t.suffixType);
    }

    public static AddressTyped AddressProductionToTyped(Address p) {
        return new AddressTyped(p.street,
            p.city,
            p.state,
            p.zIP);
    }

    public static List<AddressTyped> AddressProductionToTypedList(List<Address> list) {
        List<AddressTyped> result = new ArrayList<>();
        for (Address p : list) result.add(AddressProductionToTyped(p));
        return result;
    }

    public static List<Address> AddressTypedListToProduction(List<AddressTyped> list) {
        List<Address> result = new ArrayList<>();
        for (AddressTyped t : list) result.add(AddressTypedToProduction(t));
        return result;
    }

    public static Address AddressTypedToProduction(AddressTyped t) {
        return new Address(t.street,
            t.city,
            t.state,
            t.zIP);
    }

    public static CatalogItemTyped CatalogItemProductionToTyped(CatalogItem p) {
        return new CatalogItemTyped(p.name,
            p.price);
    }

    public static List<CatalogItemTyped> CatalogItemProductionToTypedList(List<CatalogItem> list) {
        List<CatalogItemTyped> result = new ArrayList<>();
        for (CatalogItem p : list) result.add(CatalogItemProductionToTyped(p));
        return result;
    }

    public static List<CatalogItem> CatalogItemTypedListToProduction(List<CatalogItemTyped> list) {
        List<CatalogItem> result = new ArrayList<>();
        for (CatalogItemTyped t : list) result.add(CatalogItemTypedToProduction(t));
        return result;
    }

    public static CatalogItem CatalogItemTypedToProduction(CatalogItemTyped t) {
        return new CatalogItem(t.name,
            t.price);
    }

    public static IDValueTyped IDValueProductionToTyped(IDValue p) {
        return new IDValueTyped(p.iD,
            p.value);
    }

    public static List<IDValueTyped> IDValueProductionToTypedList(List<IDValue> list) {
        List<IDValueTyped> result = new ArrayList<>();
        for (IDValue p : list) result.add(IDValueProductionToTyped(p));
        return result;
    }

    public static List<IDValue> IDValueTypedListToProduction(List<IDValueTyped> list) {
        List<IDValue> result = new ArrayList<>();
        for (IDValueTyped t : list) result.add(IDValueTypedToProduction(t));
        return result;
    }

    public static IDValue IDValueTypedToProduction(IDValueTyped t) {
        return new IDValue(t.iD,
            t.value);
    }

    public static MatchTyped MatchProductionToTyped(Match p) {
        return new MatchTyped(p.matchedAddress,
            AddressComponentsProductionToTyped(p.addressComponents));
    }

    public static List<MatchTyped> MatchProductionToTypedList(List<Match> list) {
        List<MatchTyped> result = new ArrayList<>();
        for (Match p : list) result.add(MatchProductionToTyped(p));
        return result;
    }

    public static List<Match> MatchTypedListToProduction(List<MatchTyped> list) {
        List<Match> result = new ArrayList<>();
        for (MatchTyped t : list) result.add(MatchTypedToProduction(t));
        return result;
    }

    public static Match MatchTypedToProduction(MatchTyped t) {
        return new Match(t.matchedAddress,
            AddressComponentsTypedToProduction(t.addressComponents));
    }

    public static OrderItemTyped OrderItemProductionToTyped(OrderItem p) {
        return new OrderItemTyped(p.name,
            p.quantity,
            p.price,
            p.itemTotal);
    }

    public static List<OrderItemTyped> OrderItemProductionToTypedList(List<OrderItem> list) {
        List<OrderItemTyped> result = new ArrayList<>();
        for (OrderItem p : list) result.add(OrderItemProductionToTyped(p));
        return result;
    }

    public static List<OrderItem> OrderItemTypedListToProduction(List<OrderItemTyped> list) {
        List<OrderItem> result = new ArrayList<>();
        for (OrderItemTyped t : list) result.add(OrderItemTypedToProduction(t));
        return result;
    }

    public static OrderItem OrderItemTypedToProduction(OrderItemTyped t) {
        return new OrderItem(t.name,
            t.quantity,
            t.price,
            t.itemTotal);
    }

    public static ShoppingCartTyped ShoppingCartProductionToTyped(ShoppingCart p) {
        return new ShoppingCartTyped(OrderItemProductionToTypedList(p.items.read()),
            p.shipping,
            p.discount,
            p.totalPrice,
            AddressProductionToTyped(p.shippingAddress),
            AddressProductionToTyped(p.billingAddress));
    }

    public static List<ShoppingCartTyped> ShoppingCartProductionToTypedList(List<ShoppingCart> list) {
        List<ShoppingCartTyped> result = new ArrayList<>();
        for (ShoppingCart p : list) result.add(ShoppingCartProductionToTyped(p));
        return result;
    }

    public static List<ShoppingCart> ShoppingCartTypedListToProduction(List<ShoppingCartTyped> list) {
        List<ShoppingCart> result = new ArrayList<>();
        for (ShoppingCartTyped t : list) result.add(ShoppingCartTypedToProduction(t));
        return result;
    }

    public static ShoppingCart ShoppingCartTypedToProduction(ShoppingCartTyped t) {
        OrderItemCollection items = new OrderItemCollection();
        for (OrderItem _item : OrderItemTypedListToProduction(t.items)) items.add(_item);
        return new ShoppingCart(items,
            t.shipping,
            t.discount,
            t.totalPrice,
            AddressTypedToProduction(t.shippingAddress),
            AddressTypedToProduction(t.billingAddress));
    }
}
