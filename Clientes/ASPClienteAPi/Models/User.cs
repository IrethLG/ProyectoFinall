using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ASPClienteAPi.Models
{
    public class User
    {
        public Int16 idUser { get; set; }
        public string UserName { get; set; }
        public string passwd { get; set; }
        public string role { get; set; }

    }
}
