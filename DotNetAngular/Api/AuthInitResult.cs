using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DotNetAngular.Api
{
    public class AuthInitResult
    {
        public Guid Id { get; set; }
        public string LoginUrl { get; set; }
        public string RegisterUrl { get; set; }
    }
}
