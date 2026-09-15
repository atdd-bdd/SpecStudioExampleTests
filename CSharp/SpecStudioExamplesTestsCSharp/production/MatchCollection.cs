namespace production
{
    using System.Collections.Generic;

    public class MatchCollection
    {
        public const int Minimum = 0;
        public const int Maximum = 10000;

        private readonly List<Match> _items = new();

        public void Add(Match item) => _items.Add(item);

        public bool Delete(Match item) => _items.Remove(item);

        public IReadOnlyList<Match> Read() => _items.AsReadOnly();

        public bool Update(Match oldItem, Match newItem)
        {
            int idx = _items.IndexOf(oldItem);
            if (idx < 0) return false;
            _items[idx] = newItem;
            return true;
        }

        public int Count => _items.Count;
    }
}
