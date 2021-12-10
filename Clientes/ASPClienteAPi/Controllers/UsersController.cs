using ASPClienteAPi.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace ASPClienteAPi.Controllers
{
    public class UsersController : Controller
    {
        HttpClientHandler _ClientHandler = new HttpClientHandler();

        User _oUser = new User();
        List<User> _oUsers = new List<User>();

        public UsersController()
        {
         _ClientHandler.ServerCertificateCustomValidationCallback = (sender, cert, chain, sslPolicyErrors) => { return true; };
        }

        public IActionResult Index()
        {
            return View();
        }
        [HttpGet]
        public async Task<List<User>> GetAllUsers()
        {
            _oUsers = new List<User>();

            using (var httpClient = new HttpClient(_ClientHandler))
            {
                using (var response = await httpClient.GetAsync("http://localhost:81/phpAPI/PROYECTO/TiendaAPI/Users.php/"))
                {
                    string apiResponse = await response.Content.ReadAsStringAsync();
                    _oUsers = JsonConvert.DeserializeObject<List<User>>(apiResponse);
                }
            }

            return _oUsers;
        }

        [HttpGet]
        public async Task<User> GetById(int userId)
        {
            _oUser = new User();

            using (var httpClient = new HttpClient(_ClientHandler))
            {
                using (var response = await httpClient.GetAsync("http://localhost:81/phpAPI/PROYECTO/TiendaAPI/Users.php/" + userId))
                {
                    string apiResponse = await response.Content.ReadAsStringAsync();
                    _oUser = JsonConvert.DeserializeObject<User>(apiResponse);
                }
            }

            return _oUser;
        }

        [HttpPost]
        public async Task<User> AddUpdateUser(User user)
        {
            _oUser = new User();

            using (var httpClient = new HttpClient(_ClientHandler))
            {
                StringContent content = new StringContent(JsonConvert.SerializeObject(user), Encoding.UTF8, "application/json");
                using (var response = await httpClient.PostAsync("http://localhost:81/phpAPI/PROYECTO/TiendaAPI/Users.php/" , content))
                {
                    string apiResponse = await response.Content.ReadAsStringAsync();
                    _oUser = JsonConvert.DeserializeObject<User>(apiResponse);
                }
            }

            return _oUser;
        }

        [HttpDelete]
        public async Task<string> Delete(int userId)
        {
            string message = "";

            using (var httpClient = new HttpClient(_ClientHandler))
            {
                using (var response = await httpClient.DeleteAsync("http://localhost:81/phpAPI/PROYECTO/TiendaAPI/Users.php/" + userId))
                {
                    message = await response.Content.ReadAsStringAsync();
                }
            }

            return message;
        }
    }
}
