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
@RequestMapping(value = "/fmcs/oper/*")
public class OperSetupController extends UvBaseController {
    Logger logger = LoggerFactory.getLogger(OperSetupController.class);
    
    @RequestMapping(value = "/managerNotice")
    public String mainlist(Model model, HttpServletRequest request) throws Exception {
    	UvMap param = getParameter(model, request);
    	//업무공지알림관리
    	return "tiles:fmcs/operSetup/managerNotice";
    }
    
    @RequestMapping(value = "/intrconList")
    public String intrconlist(Model model, HttpServletRequest request) throws Exception {
    	UvMap param = getParameter(model, request);
    	//연계시스템 설정
    	return "tiles:fmcs/operSetup/interconnectedSystem";
    }
    
}