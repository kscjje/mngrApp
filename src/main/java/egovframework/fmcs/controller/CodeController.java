package egovframework.fmcs.controller;
import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import egovframework.fmcs.service.UserService;
import egovframework.uv.base.UvBaseController;
import egovframework.uv.model.UvMap;
import egovframework.uv.model.UvMapList;

@Controller
@RequestMapping(value = "/fmcs/code/*")
public class CodeController extends UvBaseController {
    Logger logger = LoggerFactory.getLogger(CodeController.class);

    /**
     * 공통코드 그룹관리
     * @param model
     * @param request
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "/codeGroup")
    public String codeGroupList(Model model, HttpServletRequest request) throws Exception {
    	UvMap param = getParameter(model, request);
    	return "tiles:fmcs/code/codeGroup";
    }
    
    /**
     * 공통코드 그룹관리
     * @param model
     * @param request
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "/codeChild")
    public String codeChildList(Model model, HttpServletRequest request) throws Exception {
    	UvMap param = getParameter(model, request);
    	return "tiles:fmcs/code/codeChild";
    }
}
