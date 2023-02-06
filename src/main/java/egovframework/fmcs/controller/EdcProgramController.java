package egovframework.fmcs.controller;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import egovframework.uv.base.UvBaseController;
import egovframework.uv.model.UvMap;
//강좌관리
@Controller
@RequestMapping(value = "/fmcs/edcProgram/*")
public class EdcProgramController extends UvBaseController {
    Logger logger = LoggerFactory.getLogger(EdcProgramController.class);
    
    @RequestMapping(value = "/instructor")
    public String instructor_mainForm(Model model, HttpServletRequest request) throws Exception {
    	//UvMap param = getParameter(model, request);
    	//강사관리
    	return "tiles:fmcs/edcProgram/instructor";
    }
    
    @RequestMapping(value = "/comCtgr")
    public String classCategory_mainForm(Model model, HttpServletRequest request) throws Exception {
    	//UvMap param = getParameter(model, request);
    	//강좌검색분류관리
        return "tiles:fmcs/edcProgram/comCtgr";
    }

    @RequestMapping(value = "/edcManager")
    public String edcManager_mainForm(Model model, HttpServletRequest request) throws Exception {
    	//UvMap param = getParameter(model, request);
    	//강좌관리
    	return "tiles:fmcs/edcProgram/edcPrg";
    }
    
    @RequestMapping(value = "/freeTimeManager")
    public String freeTimeManager_mainForm(Model model, HttpServletRequest request) throws Exception {
    	//UvMap param = getParameter(model, request);
    	//자유수영시간표 관리
    	return "tiles:fmcs/edcProgram/freeTime";
    }
    @RequestMapping(value = "/edcAge")
    public String edcAgeManager_mainForm(Model model, HttpServletRequest request) throws Exception {
    	//UvMap param = getParameter(model, request);
    	//강좌대상연령설정
    	return "tiles:fmcs/edcProgram/edcAge";
    }
    @RequestMapping(value = "/regMemberCapacity")
    public String edcRegMember_mainForm(Model model, HttpServletRequest request) throws Exception {
    	//UvMap param = getParameter(model, request);
    	//강좌접수인원현황
    	return "tiles:fmcs/edcProgram/regMemberCapacity";
    }
    @RequestMapping(value = "/waitMember")
    public String waitMember_mainForm(Model model, HttpServletRequest request) throws Exception {
    	//UvMap param = getParameter(model, request);
    	//강좌접수대기자관리
    	return "tiles:fmcs/edcProgram/waitMember";
    }
    @RequestMapping(value = "/drawMember")
    public String drawMember_mainForm(Model model, HttpServletRequest request) throws Exception {
    	//UvMap param = getParameter(model, request);
    	//강좌추첨관리
    	return "tiles:fmcs/edcProgram/drawMember";
    }
    @RequestMapping(value = "/attendance")
    public String attendance_mainForm(Model model, HttpServletRequest request) throws Exception {
    	//UvMap param = getParameter(model, request);
    	//강좌출석현황
    	return "tiles:fmcs/edcProgram/attendance";
    }
    @RequestMapping(value = "/holiday")
    public String holiday_mainForm(Model model, HttpServletRequest request) throws Exception {
    	//UvMap param = getParameter(model, request);
    	//강좌출석현황
    	return "tiles:fmcs/edcProgram/holiday";
    }
    
    @RequestMapping(value = "/edcbatch")
    public String edcbatch_mainForm(Model model, HttpServletRequest request) throws Exception {
    	//UvMap param = getParameter(model, request);
    	//강좌일괄설정
    	return "tiles:fmcs/edcProgram/edcBatch";
    }
    @RequestMapping(value = "/memberState")
    public String edcMemberState_mainForm(Model model, HttpServletRequest request) throws Exception {
    	//UvMap param = getParameter(model, request);
    	//수강회원현황
    	return "tiles:fmcs/edcProgram/memberState";
    }
    @RequestMapping(value = "/instructorPay")
    public String instructorPay_mainForm(Model model, HttpServletRequest request) throws Exception {
    	//UvMap param = getParameter(model, request);
    	//강사료집계현황
    	return "tiles:fmcs/edcProgram/instructorPay";
    }
    @RequestMapping(value = "/testForm")
    public String testForm(Model model, HttpServletRequest request) throws Exception {
    	//UvMap param = getParameter(model, request);
    	
    	return "tiles:fmcs/test/testForm";
    }
    @RequestMapping(value = "/bbs/{bbs_id}")
    public String testbbs(@PathVariable("bbs_id") String bbid,Model model, HttpServletRequest request) throws Exception {
    	//UvMap param = getParameter(model, request);
    	
    	return "tiles:fmcs/test/testForm";
    }
}