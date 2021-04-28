using System;
using System.Net.Http;
using System.Threading.Tasks;
using DotNetAngular.Models;

namespace DotNetAngular
{
    public interface ITruelyticsService
    {
        TruelyticsConfig TruelyticsConfig { get; }

        Task<string?> CallAdminApiAsync(string endpoint, HttpMethod method, object? data = null);
        Task<string?> CallApiAsync(string apiKey, string endpoint, HttpMethod method, object? data = null);

        Task<IntegrationAuthKey> GenerateAuthKeyAsync(string? redirect, string? callback = null);
        Task<Guid?> GenerateSsoTokenAsync(string apiKey);

        string GetLoginUrl(Guid id);
        string GetRegisterUrl(Guid id);
    }
}
