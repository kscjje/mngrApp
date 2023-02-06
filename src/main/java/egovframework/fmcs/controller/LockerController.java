package egovframework.fmcs.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@RequestMapping("/fmcs/locker")
@Controller
public class LockerController {

    @GetMapping("info")
    public String info() {

        return "tiles:fmcs/locker/info";
    }

    @GetMapping("rent")
    public String rent() {
        return "tiles:fmcs/locker/rent";
    }

    @GetMapping("rentStatus")
    public String rentStatus() {
        return "tiles:fmcs/locker/rentStatus";
    }

    @GetMapping("waitingList")
    public String waitingList() {
        return "tiles:fmcs/locker/waitingList";
    }

    @GetMapping("depositStatus")
    public String depositStatus() {
        return "tiles:fmcs/locker/depositStatus";
    }
}
