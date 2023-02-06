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
@RequestMapping(value = "/fmcs/member/*")
public class MemberController extends UvBaseController {
    Logger logger = LoggerFactory.getLogger(MemberController.class);

    @RequestMapping(value = "/memberMain")
    public String memberMain(Model model, HttpServletRequest request) throws Exception {
        UvMap param = getParameter(model, request);

        return "tiles:fmcs/member/memberMainForm";
    }
    
    @RequestMapping(value = "/memberSearch")
    public String memberSearch(Model model, HttpServletRequest request) throws Exception {
    	UvMap param = getParameter(model, request);
    	
    	return "tiles:fmcs/member/memberSearchList";
    }
    
    @RequestMapping(value = "/edcChange")
    public String edcChange(Model model, HttpServletRequest request) throws Exception {
    	UvMap param = getParameter(model, request);
    	
    	return "tiles:fmcs/member/edcChangeList";
    }
    
    @RequestMapping(value = "/edcRecess")
    public String edcRecess(Model model, HttpServletRequest request) throws Exception {
    	UvMap param = getParameter(model, request);
    	
    	return "tiles:fmcs/member/edcRecessList";
    }
    
    @RequestMapping(value = "/edcRefund")
    public String edcRefund(Model model, HttpServletRequest request) throws Exception {
    	UvMap param = getParameter(model, request);
    	
    	return "tiles:fmcs/member/edcRefundList";
    }
    
    @RequestMapping(value = "/cardMake")
    public String cardMake(Model model, HttpServletRequest request) throws Exception {
    	UvMap param = getParameter(model, request);
    	
    	return "tiles:fmcs/member/cardMakeList";
    } 
    
    @RequestMapping(value = "/memberDiscount")
    public String memberReduce(Model model, HttpServletRequest request) throws Exception {
    	UvMap param = getParameter(model, request);
    	
    	return "tiles:fmcs/member/memberDiscountList";
    } 
    
    @RequestMapping(value = "/memberMerge")
    public String memberMerge(Model model, HttpServletRequest request) throws Exception {
    	UvMap param = getParameter(model, request);
    	
    	return "tiles:fmcs/member/memberMergeList";
    } 
}