package egovframework.fmcs.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import egovframework.uv.base.UvBaseController;

//import cloud.archive.model.PageVo;
//import cloud.archive.service.PageService;

@Controller
@RequestMapping(value = "/fmcs/main/*")
public class MainController extends UvBaseController {

    @RequestMapping(value = "/main")
    public String main(Model model) throws Exception {

        return "fmcs/main/main";
    }

    @RequestMapping(value = "/dashBoard")
    public String dashBoard(Model model) throws Exception {

        return "fmcs/main/dashBoard";
    }
}