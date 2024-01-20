using Backend.Models;

namespace Backend.DTOs;

public record UserDTO(string Id, string UserName, string LastName, string Email
  );