using System.Net.Http;
using System.Threading.Tasks;
using DotNetAngular.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace DotNetAngular.Api
{
    [Route("/api/truelytics")]
    [ApiController]
    public class TruelyticsApiController : ControllerBase
    {
        private readonly ITruelyticsService _truelyticsService;

        public TruelyticsApiController(ITruelyticsService truelyticsService)
        {
            _truelyticsService = truelyticsService;
        }

        [Route("user-info")]
        [Route("user-details")]
        public ActionResult<TruelyticsUserDetails> GetUserInfo()
        {
            var user = JsonConvert.DeserializeObject<TruelyticsUserDetails>(HttpContext.Session.GetString("TruelyticsUserDetails") ?? "{}");

            return user!;
        }

        [Route("auth/token")]
        public async Task<ActionResult<string?>> GenerateAuthToken()
        {
            var user = JsonConvert.DeserializeObject<TruelyticsUserDetails>(HttpContext.Session.GetString("TruelyticsUserDetails") ?? "{}");

            return (await _truelyticsService.GenerateSsoTokenAsync(user.TruelyticsApiKey))?.ToString();
        }

        [Route("auth/init")]
        public async Task<ActionResult<AuthInitResult>> InitializeUserAuth(string? redirect, string? callback)
        {
            var authKey = await _truelyticsService.GenerateAuthKeyAsync(redirect, callback);

            return new AuthInitResult()
            {
                Id = authKey.Id,
                LoginUrl = _truelyticsService.GetLoginUrl(authKey.Id),
                RegisterUrl = _truelyticsService.GetRegisterUrl(authKey.Id)
            };
        }

        [Route("auth/callback")]
        public async Task<IActionResult> AuthCallback(string? id, string? redirect)
        {
            if(!string.IsNullOrWhiteSpace(id))
            {
                var json = await _truelyticsService.CallAdminApiAsync($"/integrations/authkeys/{id}", HttpMethod.Get);
                
                if(!string.IsNullOrWhiteSpace(json))
                {
                    var resp = JsonConvert.DeserializeObject<SingleResponse<IntegrationAuthKey>>(json);

                    if(resp!.Item.Consumed && resp.Item.Success)
                    {
                        var user = new TruelyticsUserDetails()
                        {
                            TruelyticsApiKey = resp.Item.ApiKey,
                            TruelyticsUserId = resp.Item.UserId!.Value
                        };

                        HttpContext.Session.SetString("TruelyticsUserDetails", JsonConvert.SerializeObject(user));
                    }

                    if(!string.IsNullOrWhiteSpace(resp.Item.RedirectUrl)) return Redirect(resp.Item.RedirectUrl);
                }
            }

            return string.IsNullOrWhiteSpace(redirect)
                ? (IActionResult)new LocalRedirectResult("/")
                : (IActionResult)Redirect(redirect);
        }
    }
}
