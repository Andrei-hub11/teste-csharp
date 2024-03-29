﻿using AutoMapper;
using Backend.DTOs;
using Backend.Models;

namespace Backend.AutoMapperProfile;

public class MappingProfile: Profile
{
    public MappingProfile() {
        CreateMap<ApplicationUser, UserDTO>();
        CreateMap<UserUpdateModel, UserDTO>();
      
    }
}
