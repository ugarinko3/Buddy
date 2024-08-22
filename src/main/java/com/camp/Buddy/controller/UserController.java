//package com.camp.Buddy.controller;
//
//import com.camp.Buddy.service.UserRoleService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.concurrent.ExecutionException;
//
//@RestController
//@RequestMapping("/api/user")
//public class UserController {
//
//    @Autowired
//    private UserRoleService userRoleService;
//
//    @GetMapping("/role")
//    public String getUserRole(@RequestParam String login) {
//        try {
//            return userRoleService.roleUser(login);
//        } catch (ExecutionException | InterruptedException e) {
//            e.printStackTrace();
//            return "Error retrieving user role";
//        }
//    }
//}
