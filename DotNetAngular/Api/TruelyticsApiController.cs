using System.Net.Http;
using System.Threading.Tasks;
using DotNetAngular.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace DotNetAngular.Api
{
    [Route("api/truelytics")]
    [ApiController]
    public class TruelyticsApiController : ControllerBase
    {
        private readonly ITruelyticsService _truelyticsService;

        public TruelyticsApiController(ITruelyticsService truelyticsService)
        {
            _truelyticsService = truelyticsService;
        }

        [Route("user-info")]
        public ActionResult<TruelyticsUserDetails> GetUserInfo()
        {
            var user = JsonConvert.DeserializeObject<TruelyticsUserDetails>(HttpContext.Session.GetString("TruelyticsUserDetails") ?? "{}");

            return user;
        }

        [Route("auth/init")]
        public ActionResult<TruelyticsUserDetails> InitializeUserAuth()
        {
            var user = JsonConvert.DeserializeObject<TruelyticsUserDetails>(HttpContext.Session.GetString("TruelyticsUserDetails") ?? "{}");

            return user;
        }

        [Route("auth/callback")]
        public async Task<IActionResult> AuthCallback(TruelyticsAuthCallbackPayload model)
        {
            if(!string.IsNullOrWhiteSpace(model.Id))
            {
                var json = await _truelyticsService.CallApiAsync($"/integrations/authkeys/{model.Id}", HttpMethod.Get);
                
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

            return string.IsNullOrWhiteSpace(model.Redirect)
                ? (IActionResult)new LocalRedirectResult("/")
                : (IActionResult)Redirect(model.Redirect);
        }
    }
}
