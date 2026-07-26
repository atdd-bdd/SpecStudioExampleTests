namespace production
{
    using System.Collections.Generic;

    public class OrderItemCollection
    {
        public const int Minimum = 0;
        public const int Maximum = 100;

        private readonly List<OrderItem> _items = new();

        public void Add(OrderItem item) => _items.Add(item);

        public bool Delete(OrderItem item) => _items.Remove(item);

        public IReadOnlyList<OrderItem> Read() => _items.AsReadOnly();

        public bool Update(OrderItem oldItem, OrderItem newItem)
        {
            int idx = _items.IndexOf(oldItem);
            if (idx < 0) return false;
            _items[idx] = newItem;
            return true;
        }

        public int Count => _items.Count;
    }
}
