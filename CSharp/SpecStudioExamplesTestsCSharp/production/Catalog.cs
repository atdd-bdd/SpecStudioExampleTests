namespace production
{
    using System.Collections.Generic;

    public class Catalog
    {
        public const int Minimum = 0;
        public const int Maximum = 10000000;

        private readonly List<CatalogItem> _items = new();

        public void Add(CatalogItem item) => _items.Add(item);

        public bool Delete(CatalogItem item) => _items.Remove(item);

        public IReadOnlyList<CatalogItem> Read() => _items.AsReadOnly();

        public bool Update(CatalogItem oldItem, CatalogItem newItem)
        {
            int idx = _items.IndexOf(oldItem);
            if (idx < 0) return false;
            _items[idx] = newItem;
            return true;
        }

        public int Count => _items.Count;
    }
}
