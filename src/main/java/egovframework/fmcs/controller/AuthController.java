package egovframework.fmcs.controller;

import egovframework.fmcs.service.AuthService;
import egovframework.uv.base.UvBaseController;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

@Controller
@RequestMapping(value = "/fmcs/auth/*")
public class AuthController extends UvBaseController {
    Logger logger = LoggerFactory.getLogger(AuthController.class);

    @Autowired
    AuthService authService;

    @RequestMapping(value = "/login")
    public String login(Model model, HttpSession session, HttpServletRequest request, HttpServletResponse response) {
        //session.invalidate();
        String errorMessage = null;
        if (session != null) {
        }
        //model.addAttribute("errorMessage", "로그인 에러");

        /*Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null) {
            new SecurityContextLogoutHandler().logout(request, response, auth);
        }*/

        return "jsp:fmcs/auth/login";
    }

    @RequestMapping(value = "/denied")
    public String denied(Model model, HttpSession session) throws Exception {
        session.invalidate();

        return "redirect:/fmcs/auth/login";
    }
}