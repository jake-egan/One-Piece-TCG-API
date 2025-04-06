using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding.Metadata;
using Microsoft.EntityFrameworkCore;
using One_Piece_TCG_API.Data;
using System.Security.Claims;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace One_Piece_TCG_API.Controllers
{
    
    [Route("api/[controller]")]
    [ApiController]
    public class OnePieceTCGController : Controller
    {
        private readonly UserDbContext _context;
        public OnePieceTCGController(UserDbContext context)
        {
           _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<OnePieceTCG>>> GetAllCards() {

            var cards = await _context.Card.ToListAsync();

            return Ok(cards);
        }


        //get all cards that I have discovered/unpacked
        [Authorize]
        [HttpGet("discovered/{set_name}")]
        public async Task<ActionResult<List<CollectedCards>>> Discovered(string set_name) 
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            if (userIdClaim == null)
            {
                return Unauthorized("No ID found in token");
            }

            Guid userId = Guid.Parse(userIdClaim.Value);
            var discovered_cards = await _context.CollectedCards
                .Where(c => c.User_Id == userId && c.Card.Set_name == set_name)
                .Include(c => c.Card)
                .ToListAsync();


            if (discovered_cards == null) {
                return BadRequest(discovered_cards);
            }

            return Ok(discovered_cards);
            

        }


        //Open a pack of cards.
        // This generates you a pack based on change then adds them cards to your discovered list.
        [Authorize]
        [HttpGet("openpack/{set_name}")]
        public async Task<ActionResult<List<OnePieceTCG>>> OpenPack(string set_name)
        {

            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            if (userIdClaim == null)
            {
                return Unauthorized("No ID found in token");
            }

            Guid userId = Guid.Parse(userIdClaim.Value);

            //randoms needed to randomly get a card
            Random rnd = new Random();
            var cards = await _context.Card.Where(x => x.Set_name == set_name).ToListAsync();
            if (cards == null) 
            {
                //if cant find pack from name then it will default to Romance-Dawn
                cards =  await _context.Card.Where(x => x.Set_name == "Romance-Dawn").ToListAsync();
            }

            //Each Pack has 12 cards
            // 7 commons,2 uncommons, 1 leader, 2 rares - but different odds for superrare and secret rare
            var Pack = new List<OnePieceTCG>();

            //Common Card section
            var Common_list = cards.Where(p => p.Rarity == "Common");
            var Common_count = Common_list.Count();
            for (int i = 0; i < 7; i++)
            {
                int Common_number = rnd.Next(Common_count);
                var Common = Common_list.ElementAt(Common_number);
                Pack.Add(Common);
            }


            //Uncommon Card Section
            var Uncommon_list = cards.Where(p => p.Rarity == "Uncommon");
            var Uncommon_count = Uncommon_list.Count();
            for (int i = 0; i < 2; i++)
            {
                int Uncommon_number = rnd.Next(Uncommon_count);
                var Uncommon = Uncommon_list.ElementAt(Uncommon_number);
                Pack.Add(Uncommon);
            }

            //Leader
            var Leader_list = cards.Where(p => p.Rarity == "Leader");
            var Leader_count = Leader_list.Count(p => p.Rarity == "Leader");
            var Leader_number = rnd.Next(Leader_count);
            var Leader = Leader_list.ElementAt(Leader_number);
            Pack.Add(Leader);
            

            //Rare Section
            // Rare cards also include Super Rare and Secret Rare cards with much lower odds
            //Super rare is 1/3 chance, Secret Rare is 1/24 roughly 4%

            var SecretRare_list = cards.Where(p => p.Rarity == "SecretRare");
            var SuperRare_list = cards.Where(p => p.Rarity == "SuperRare");
            var Rare_list = cards.Where(p => p.Rarity == "Rare");

            //counting 
            int SecretRare_count = SecretRare_list.Count(p => p.Rarity == "SecretRare");
            int SuperRare_count = SuperRare_list.Count(p => p.Rarity == "SuperRare");
            int Rare_count = Rare_list.Count();
            


            for (int i = 0; i < 2; i++)
            {
                int type = rnd.Next(101);
                if (type < 5)
                {
                    // If type is less than 5 (4%) means the type is secret rare
                    int SecretRare_number = rnd.Next(SecretRare_count);
                    var SecretRare = SecretRare_list.ElementAt(SecretRare_number);
                    Console.WriteLine("OMG SOMEONE GOT A SECRETRARE");
                    Pack.Add(SecretRare);
                }
                else if (type > 4 && type < 37)
                {
                    // If type is between 5 and 36 (33%) means the type is super rare
                    int SuperRare_number = rnd.Next(SuperRare_count);
                    var SuperRare = SuperRare_list.ElementAt(SuperRare_number);
                    Pack.Add(SuperRare);
                }
                else
                {
                    // If type is between 37 and 100 (33%) means the type is rare
                    int Rare_number = rnd.Next(Rare_count);
                    var Rare = Rare_list.ElementAt(Rare_number);
                    Pack.Add(Rare);
                }
            }

            //adding cards to collected cards
            foreach (var card in Pack) 
            {
                var discovered = await _context.CollectedCards
                .Where(c => c.CardId == card.Id && c.User_Id == userId)
                .FirstOrDefaultAsync();

                if (discovered == null)
                {
                    _context.CollectedCards.Add(new CollectedCards
                    {
                        CardId = card.Id,
                        User_Id = userId
                    });
                    await _context.SaveChangesAsync();
                }
                
            }
            

            return Ok(Pack);
        }

    }
}
