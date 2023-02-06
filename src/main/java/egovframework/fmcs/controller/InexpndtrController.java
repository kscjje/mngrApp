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
@RequestMapping(value = "/fmcs/inexpndtr/*")
public class InexpndtrController extends UvBaseController {
    Logger logger = LoggerFactory.getLogger(InexpndtrController.class);

    /**
     * 기타수입 매출관리
     * @param model
     * @param request
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "/etcInexpndtrForm")
    public String etcInexpndtrForm(Model model, HttpServletRequest request) throws Exception {
    	UvMap param = getParameter(model, request);
    	return "tiles:fmcs/inexpndtr/etcInexpndtrForm";
    }
    
    /**
     * PG거래내역현황
     * @param model
     * @param request
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "/pgOrdList")
    public String pgOrdList(Model model, HttpServletRequest request) throws Exception {
    	UvMap param = getParameter(model, request);
    	return "tiles:fmcs/inexpndtr/pgOrdList";
    } 
    
    /**
     * 환불수입현황
     * @param model
     * @param request
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "/cancelInexpndtrList")
    public String cancelInexpndtrList(Model model, HttpServletRequest request) throws Exception {
    	UvMap param = getParameter(model, request);
    	return "tiles:fmcs/inexpndtr/cancelInexpndtrList";
    } 
    
    /**
     * 수납자별입금현황
     * @param model
     * @param request
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "/cashierInexpndtrList")
    public String cashierInexpndtrList(Model model, HttpServletRequest request) throws Exception {
    	UvMap param = getParameter(model, request);
    	return "tiles:fmcs/inexpndtr/cashierInexpndtrList";
    } 
    
    /**
     * 수입금전표현황
     * @param model
     * @param request
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "/inexpndtrSlipList")
    public String inexpndtrSlipList(Model model, HttpServletRequest request) throws Exception {
    	UvMap param = getParameter(model, request);
    	return "tiles:fmcs/inexpndtr/inexpndtrSlipList";
    } 
    
    /**
     * 수입금정산일지
     * @param model
     * @param request
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "/inexpndtrUsedList")
    public String inexpndtrUsedList(Model model, HttpServletRequest request) throws Exception {
    	UvMap param = getParameter(model, request);
    	return "tiles:fmcs/inexpndtr/inexpndtrUsedList";
    } 
    
    /**
     * 할인사유별수입금현황
     * @param model
     * @param request
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "/dcKindInexpndtrList")
    public String dcKindInexpndtrList(Model model, HttpServletRequest request) throws Exception {
    	UvMap param = getParameter(model, request);
    	return "tiles:fmcs/inexpndtr/dcKindInexpndtrList";
    } 
}
