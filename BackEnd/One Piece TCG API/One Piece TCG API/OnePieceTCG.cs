namespace One_Piece_TCG_API
{
    public class OnePieceTCG
    {
        public required string Id { get; set; }
        public required string Cardname { get; set; }
        public required string Rarity { get; set; }
        public required string Category { get; set; }
        public int? Power { get; set; }
        public string? Counter { get; set; }
        public int? Cost { get; set; }
        public string? Effect { get; set; }
        public required string Set_name { get; set; }
    }
}
