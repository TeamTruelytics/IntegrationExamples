using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DotNetAngular.Models
{
    public class SingleResponse<T>
    {
        public T Item { get; set; }
    }
}
