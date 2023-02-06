package egovframework.fmcs.controller;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import egovframework.uv.base.UvBaseController;
import egovframework.uv.model.UvMap;
//강사관리
@Controller
@RequestMapping(value = "/fmcs/rent/*")
public class RentController extends UvBaseController {
    Logger logger = LoggerFactory.getLogger(RentController.class);

    @RequestMapping(value = "/fcltyPlace")
    public String fcltyPlace(Model model, HttpServletRequest request) throws Exception {
    	UvMap param = getParameter(model, request);
    	
    	return "tiles:fmcs/rent/fcltyPlaceList";
    }
    
    @RequestMapping(value = "/rentRsvn")
    public String rentRsvn(Model model, HttpServletRequest request) throws Exception {
    	UvMap param = getParameter(model, request);
    	
    	return "tiles:fmcs/rent/rentRsvnList";
    }
   
    @RequestMapping(value = "/rentTeam")
    public String rentTeam(Model model, HttpServletRequest request) throws Exception {
    	UvMap param = getParameter(model, request);
    	
    	return "tiles:fmcs/rent/rentTeamList";
    }
    
    @RequestMapping(value = "/fcltyCtg")
    public String fcltyCtg(Model model, HttpServletRequest request) throws Exception {
    	UvMap param = getParameter(model, request);
    	
    	return "tiles:fmcs/rent/fcltyCtgList";
    }
    
    @RequestMapping(value = "/rentRefund")
    public String rentRefund(Model model, HttpServletRequest request) throws Exception {
    	UvMap param = getParameter(model, request);
    	
    	return "tiles:fmcs/rent/rentRefundList";
    }    
    
}