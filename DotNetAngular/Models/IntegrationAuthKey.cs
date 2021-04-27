using System;

namespace DotNetAngular.Models
{
    public class IntegrationAuthKey
    {
        public Guid Id { get; set; }
        public int EnterpriseId { get; set; }
        public string Enterprise { get; set; }
        public string CallbackUrl { get; set; }
        public string RedirectUrl { get; set; }
        public bool Consumed { get; set; }

        public bool Success { get; set; }
        public int? UserId { get; set; }
        public string ApiKey { get; set; }
        public string Environment { get; set; }

        public DateTime Expires { get; set; }
    }
}
