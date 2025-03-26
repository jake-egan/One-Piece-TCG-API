namespace One_Piece_TCG_API
{
    public enum Rarity 
    {
        Common,
        Uncommon,
        Rare,
        SuperRare,
        SecretRare,
        Leader,
        Promo,
        BoxTopper,
        SpecialRare,
        MangaRare,
        ParallelRare
    }

    public enum CardType {
        Leader,
        Don,
        Character,
        Event,
        Stage
    }

    public enum setCode 
    {
        OP01, // Romance Dawn
        OP02, // Paramount War
        OP03, // Pillars of Strength
        OP04, // Kingdoms of Intrigue
        OP05, // New Era
        OP06, // Twin Champions
        OP07, // 500 years into future
        OP08, // Two Legend
        OP09,// Side Monkey.D.Luffy
        OP10, // Side Yamato
        OP11 // A Fist of Divine Speed

    }
    public class OnePieceTCG
    {
        public int Id { get; set; }
        public required String Cardname { get; set; }
        public CardType Type { get; set; }
        public Rarity Rarity { get; set; }
        //public string Color { get; set; }
        public setCode setCode { get; set; }
         
    }
}
