package egovframework.fmcs.controller;


import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
@RequestMapping("/fmcs/ticket")
@Controller
public class TicketController {

    @GetMapping("program")
    public String program() {
        return "tiles:fmcs/ticket/program";
    }

    @GetMapping("sale")
    public String sale(){
        return "tiles:fmcs/ticket/sale";
    }

    @GetMapping("paymentCancel")
    public String paymentCancel() {
        return "tiles:fmcs/ticket/paymentCancel";
    }

    @GetMapping("booking")
    public String booking() {
        return "tiles:fmcs/ticket/booking";
    }

    @GetMapping("booking/{id}")
    public String bookingDetail(@PathVariable("id") Integer bookingId, Model model){
        model.addAttribute("id", bookingId);
        return "tiles:fmcs/ticket/bookingDetail";
    }
}
