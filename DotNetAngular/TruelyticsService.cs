using System;
using System.Net.Http;
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

            if(TruelyticsConfig.Url.EndsWith("/")) TruelyticsConfig.Url.Substring(TruelyticsConfig.Url.Length - 1);
            if(TruelyticsConfig.ApiUrl.EndsWith("/")) TruelyticsConfig.ApiUrl.Substring(TruelyticsConfig.ApiUrl.Length - 1);
        }

        public TruelyticsConfig TruelyticsConfig { get; }

        public async Task<string?> CallApiAsync(string endpoint, HttpMethod method, object? data = null)
        {
            using var client = new HttpClient();

            var req = new HttpRequestMessage()
            {
                Method = method,
                RequestUri = new Uri(GenerateApiUrl(endpoint)),
                Content = new StringContent(JsonConvert.SerializeObject(data), Encoding.UTF8, "application/json"),
                Headers =
                {
                    { "Authorization", $"Bearer {TruelyticsConfig.ApiKey}" },
                    { "Content-Type", $"application/json" },
                }
            };

            using var res = await client.SendAsync(req);

            return await res.Content.ReadAsStringAsync();
        }

        public async Task<string?> GenerateAuthKey(string redirect)
        {
            var callbackUrl = TruelyticsConfig.CallbackUrl;

            callbackUrl += $"{(callbackUrl.Contains("?") ? "&" : "?")}redirect={HttpUtility.UrlEncode(redirect)}";

            var data = new
            {
                CallbackUrl = TruelyticsConfig.CallbackUrl,
                RedirectUrl = redirect
            };

            var results = await CallApiAsync($"/enterprises/{TruelyticsConfig.EnterpriseId}/integrations/authkeys", HttpMethod.Post, data);

            if(string.IsNullOrWhiteSpace(results)) throw new InvalidOperationException("Unable to generate auth key.");

            var obj = JsonConvert.DeserializeObject<SingleResponse<string>>(results);

            return obj?.Item;
        }

        private string GenerateApiUrl(string endpoint)
        {
            if(!endpoint.StartsWith("/")) endpoint = $"/{endpoint}";

            return TruelyticsConfig.ApiUrl + endpoint;
        }
    }
}