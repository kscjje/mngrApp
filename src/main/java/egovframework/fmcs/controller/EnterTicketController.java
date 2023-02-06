package egovframework.fmcs.controller;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import egovframework.uv.base.UvBaseController;
import egovframework.uv.model.UvMap;
//입장발권관리
@Controller
@RequestMapping(value = "/fmcs/enterTicket/*")
public class EnterTicketController extends UvBaseController {
    Logger logger = LoggerFactory.getLogger(EnterTicketController.class);
    
    @RequestMapping(value = "/enterTicketList")
    public String enterTicketList(Model model, HttpServletRequest request) throws Exception {
    	UvMap param = getParameter(model, request);
    	//강사관리
    	return "tiles:fmcs/enterTicket/enterTicketList";
    }
    
  
}