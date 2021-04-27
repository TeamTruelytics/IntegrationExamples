using System.Net.Http;
using System.Threading.Tasks;
using DotNetAngular.Models;

namespace DotNetAngular
{
    public interface ITruelyticsService
    {
        TruelyticsConfig TruelyticsConfig { get; }

        Task<string?> CallApiAsync(string endpoint, HttpMethod method, object? data = null);

        Task<string?> GenerateAuthKey(string redirect);
    }
}
