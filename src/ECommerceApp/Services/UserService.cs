﻿using ECommerceApp.Data.Models;
using ECommerceApp.Data.Repository;
using ECommerceApp.Exceptions;

namespace ECommerceApp.Services
{
    public class UserService
    {
        private readonly IUserRepository _userRepository;

        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }
        public async Task<(bool, Exception)> CreateUser(User user)
        {
            if (user == null)
            {
                return (false, new ArgumentException());
            }
            if (await UserByEmailExistsInDatabase(user.Email))
            {
                return (false, new UserWithEmailExistsException());
            }

            try
            {
                await _userRepository.CreateUser(user);
                return (true, null);
            }
            catch (Exception exception)
            {
                return (false, exception);
            }
        }

        private async Task<bool> UserByEmailExistsInDatabase(string email)
        {
            try
            {
                return await _userRepository.GetUserByEmail(email) != null;
            }
            catch (UserNotFoundException)
            {
                return false;
            }
        }


    }
}