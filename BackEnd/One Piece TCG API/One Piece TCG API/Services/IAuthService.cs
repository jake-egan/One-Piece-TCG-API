using One_Piece_TCG_API.Entities;
using One_Piece_TCG_API.Models;

namespace One_Piece_TCG_API.Services
{
    public interface IAuthService
    {
        Task<User?> RegisterAsync(UserDto request);
        Task<TokenResponseDto?> LoginAsync(UserDto request);
        Task<TokenResponseDto?> RefreshTokensAsync(RefreshTokenRequestDto request);
    }
}
