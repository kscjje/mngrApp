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
@RequestMapping(value = "/fmcs/bsis/*")
public class BsisController extends UvBaseController {
    Logger logger = LoggerFactory.getLogger(BsisController.class);
    
	/**
	 * 기초관리 > 운영상품분류
	 * @param model
	 * @param request
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/comItemCtg")
	public String comItemCtgList(Model model, HttpServletRequest request) throws Exception {
		UvMap param = getParameter(model, request);
		return "tiles:fmcs/bsis/comItemCtg";
	}

	/**
	 * 기초관리 > 이용상품요금관리
	 * @param model
	 * @param request
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/programItem")
	public String programItemList(Model model, HttpServletRequest request) throws Exception {
		UvMap param = getParameter(model, request);
		return "tiles:fmcs/bsis/programItem";
	}

	/**
	 * 기초관리 > 월력관리
	 * @param model
	 * @param request
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/calendar")
	public String calendarList(Model model, HttpServletRequest request) throws Exception {
		UvMap param = getParameter(model, request);
		return "tiles:fmcs/bsis/calendar";
	}
	
	/**
	 * 결제수단관리
	 * @param model
	 * @param request
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/payMethod")
	public String payMethod(Model model, HttpServletRequest request) throws Exception {
		UvMap param = getParameter(model, request);
		return "tiles:fmcs/bsis/payMethod";
	}	
   

}