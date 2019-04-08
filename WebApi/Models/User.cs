using System.ComponentModel.DataAnnotations;

namespace WebApi.Models
{
    public class User
    {
        [Required(ErrorMessage = "Username is required!")]
        [StringLength(40, ErrorMessage = "Maximum allowed Username length is 40 symbols!")]
        [RegularExpression(@"^[a-zA-Z\d]+$", ErrorMessage = "Username must only contain latin letters and numbers!")]
        public string Username { get; set; }

        public string Token { get; set; }
    }
}