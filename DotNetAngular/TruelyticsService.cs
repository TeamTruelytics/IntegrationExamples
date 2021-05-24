using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using DotNetAngular.Models;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace DotNetAngular
{
    public class TruelyticsService : ITruelyticsService
    {
        public TruelyticsService(TruelyticsConfig cfg)
        {
            TruelyticsConfig = cfg ?? throw new ArgumentNullException(nameof(cfg));

            if (TruelyticsConfig.Url.EndsWith("/")) TruelyticsConfig.Url.Substring(TruelyticsConfig.Url.Length - 1);
            if (TruelyticsConfig.ApiUrl.EndsWith("/")) TruelyticsConfig.ApiUrl.Substring(TruelyticsConfig.ApiUrl.Length - 1);
        }

        public TruelyticsConfig TruelyticsConfig { get; }

        public Task<string?> CallAdminApiAsync(string endpoint, HttpMethod method, object? data = null)
        {
            return CallApiAsync(TruelyticsConfig.ApiKey, endpoint, method, data);
        }

        public async Task<string?> CallApiAsync(string apiKey, string endpoint, HttpMethod method, object? data = null)
        {
#if DEBUG
            //var httpClientHandler = new HttpClientHandler
            //{
            //    ServerCertificateCustomValidationCallback = (message, cert, chain, sslPolicyErrors) => true
            //};

            //using var client = new HttpClient(httpClientHandler);

            using var client = new HttpClient();
#else
            using var client = new HttpClient();
#endif

            client.DefaultRequestHeaders
                .Accept
                .Add(new MediaTypeWithQualityHeaderValue("application/json"));

            var req = new HttpRequestMessage(method, new Uri(GenerateApiUrl(endpoint)))
            {
                Headers =
                {
                    { "Authorization", $"Bearer {apiKey}" },
                }
            };

            try
            {
                if (data != null) req.Content = new StringContent(JsonConvert.SerializeObject(data), Encoding.UTF8, "application/json");

                using var res = await client.SendAsync(req);

                return await res.Content.ReadAsStringAsync();
            }
            catch (Exception e)
            {
                // TODO: handle
                throw;
            }
        }

        public async Task<IntegrationAuthKey> GenerateAuthKeyAsync(string? redirect, string? callback = null)
        {
            var callbackUrl = TruelyticsConfig.CallbackUrl;

            callbackUrl += $"{(callbackUrl.Contains("?") ? "&" : "?")}redirect={HttpUtility.UrlEncode(redirect)}";

            var data = new
            {
                CallbackUrl = callback ?? callbackUrl,
                RedirectUrl = redirect
            };

            var results = await CallAdminApiAsync($"/enterprises/{TruelyticsConfig.EnterpriseId}/integrations/authkeys", HttpMethod.Post, data);

            if (string.IsNullOrWhiteSpace(results)) throw new InvalidOperationException("Unable to generate auth key.");

            var obj = JsonConvert.DeserializeObject<SingleResponse<IntegrationAuthKey>>(results);

            return obj?.Item;
        }

        public async Task<Guid?> GenerateSsoTokenAsync(string apiKey)
        {
            var json = await CallApiAsync(apiKey, "/users/sso/tokens", HttpMethod.Post);

            if(!string.IsNullOrWhiteSpace(json))
            {
                var results = JsonConvert.DeserializeObject<SingleResponse<Guid>>(json);

                return results?.Item;
            }

            return null;
        }

        public string GetLoginUrl(Guid id) => $"{TruelyticsConfig.Url}/User/IntegrationLogin?id={HttpUtility.UrlEncode(id.ToString())}";

        public string GetRegisterUrl(Guid id) => $"{TruelyticsConfig.Url}/User/IntegrationRegister?id={HttpUtility.UrlEncode(id.ToString())}";

        private string GenerateApiUrl(string endpoint)
        {
            if (!endpoint.StartsWith("/")) endpoint = $"/{endpoint}";

            return TruelyticsConfig.ApiUrl + endpoint;
        }
    }
}
