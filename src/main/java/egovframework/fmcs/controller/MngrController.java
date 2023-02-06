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
@RequestMapping(value = "/fmcs/mngr/*")
public class MngrController extends UvBaseController {
    Logger logger = LoggerFactory.getLogger(MngrController.class);

    @RequestMapping(value = "/mngrList")
    public String mainform(Model model, HttpServletRequest request) throws Exception {
        UvMap param = getParameter(model, request);

        return "tiles:fmcs/mngr/mngrList";
    }
    

    @RequestMapping(value = "/mngGroupList")
    public String mngGroupList(Model model, HttpServletRequest request) throws Exception {
        UvMap param = getParameter(model, request);

        return "tiles:fmcs/mngr/mngGroupList";
    }
    
    @RequestMapping(value = "/mngGroupMenu")
    public String mngGroupMenu(Model model, HttpServletRequest request) throws Exception {
        UvMap param = getParameter(model, request);

        return "tiles:fmcs/mngr/mngGroupMenu";
    }
    
    
}