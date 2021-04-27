namespace DotNetAngular.Models
{
    public class TruelyticsConfig
    {
        public string ApiKey { get; set; }
        public string Environment { get; set; } = "Production";
        public string Url { get; set; } = "https://embed.truelytics.com";
        public string ApiUrl { get; set; } = "https://app.truelytics.com/api";
        public int EnterpriseId { get; set; }
        public string CallbackUrl { get; set; }
    }
}
