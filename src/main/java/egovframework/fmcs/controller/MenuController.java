package egovframework.fmcs.controller;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import egovframework.uv.base.UvBaseController;
import egovframework.uv.model.UvMap;

@Controller
@RequestMapping(value = "/fmcs/menu/*")
public class MenuController extends UvBaseController {
    Logger logger = LoggerFactory.getLogger(MenuController.class);

    @RequestMapping(value = "/menuList")
    public String mainlist(Model model, HttpServletRequest request) throws Exception {
    	UvMap param = getParameter(model, request);
    	return "tiles:fmcs/menu/menuList";
    }
    
}