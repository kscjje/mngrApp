package egovframework.uv.base;

import java.util.Enumeration;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.ui.Model;

import egovframework.com.cmm.util.EgovDateUtil;
import egovframework.uv.model.UvMap;
import egovframework.uv.util.UvUtil;

public class UvBaseController {
    static Logger logger = LoggerFactory.getLogger(UvBaseController.class);
    
    public static UvMap getParameter(HttpServletRequest request) {
        UvMap uvMap = new UvMap();

        Enumeration enumeration = request.getParameterNames();
        String param = null, value = null;

        while (enumeration.hasMoreElements()) {
            param = (String) enumeration.nextElement();
            value = UvUtil.toNotNull(request.getParameter(param));

            String[] values = request.getParameterValues(param);
            int temp = values.length;

            try {
                if (param.indexOf("CTNT") > -1) {
                    String imgUploadUrl = "{IMG_UPLOAD_URL}" + EgovDateUtil.getCurrentDate("yyyyMMdd") + "/img_";
                    //value = UvUtil.replaceStr(value, UvConfig.IMG_UPLOAD_URL_TMP, "{IMG_UPLOAD_URL_TMP}");
                    value = UvUtil.replaceStr(value, "{IMG_UPLOAD_URL_TMP}", imgUploadUrl);
                }
            } catch (Exception ex) {
            }
            uvMap.setString(param, value);

            if (temp > 1) {
                uvMap.setValue(param, values);

                //logger.debug(param + "= Arrays " + Arrays.toString(values));
            } else {
                //logger.debug(param + "=" + value);
            }
        }

        // 페이징처리 값 세팅
        int pageNo = UvUtil.sTOi(UvUtil.toNotNull(uvMap.getString("PAGE_NO"), "1"));
        int pageSize = UvUtil.sTOi(UvUtil.toNotNull(uvMap.getString("PAGE_SIZE"), "10"));
        int blockSize = UvUtil.sTOi(UvUtil.toNotNull(uvMap.getString("BLOCK_SIZE"), "10"));

        uvMap.setInt("PAGE_NO", pageNo);
        uvMap.setInt("PAGE_SIZE", pageSize);
        uvMap.setInt("BLOCK_SIZE", blockSize);

        //int startNo = BasePageUtil.getStartNo(pageNo, pageSize);
        //int endNo = BasePageUtil.getEndNo(pageNo, pageSize);

        //Datatables
        if (!UvUtil.toNotNull(uvMap.getString("draw")).equals("")) {
            int start = uvMap.getInt("start") == 0 ? 1 : uvMap.getInt("start");
            int length = UvUtil.sTOi(UvUtil.toNotNull(uvMap.getString("length"), "10"));

            pageNo = (start) / length + 1;

            //length = -1 = 전체
            if (length > -1) {
                uvMap.setInt("PAGE_NO", pageNo);
                uvMap.setInt("PAGE_SIZE", length);
            } else {
                uvMap.remove("PAGE_NO");
                uvMap.remove("PAGE_SIZE");
            }

            String ORDER_COLUMN = UvUtil.toNotNull(uvMap.getString("order[0][column]"));
            ORDER_COLUMN = UvUtil.toNotNull(uvMap.getString("columns[" + ORDER_COLUMN + "][data]"));
            String ORDER_METHOD = UvUtil.toNotNull(uvMap.getString("order[0][dir]"));

            uvMap.setString("ORDER_COLUMN", ORDER_COLUMN);
            uvMap.setString("ORDER_METHOD", ORDER_METHOD);
        }

        /*int exceptRows = startNo - 1;
        uvMap.setInt("START_NO", startNo);
        uvMap.setInt("END_NO", endNo);
        uvMap.setInt("EXCEPT_ROWS", exceptRows);*/

        // 첨부파일
        String[] F_DIVISIONs = request.getParameterValues("PB_F_DIVISION");
        String[] F_REAL_NAMEs = request.getParameterValues("PB_F_REAL_NAME");
        String[] F_NAMEs = request.getParameterValues("PB_F_NAME");
        String[] F_EXTs = request.getParameterValues("PB_F_EXT");
        String[] F_SIZEs = request.getParameterValues("PB_F_SIZE");
        String[] F_TYPEs = request.getParameterValues("PB_F_TYPE");
        String[] DELETE_F_SEQs = request.getParameterValues("PB_DELETE_F_SEQ");

        if (F_REAL_NAMEs != null) {
            uvMap.setValue("F_DIVISIONs", F_DIVISIONs);
            uvMap.setValue("F_REAL_NAMEs", F_REAL_NAMEs);
            uvMap.setValue("F_NAMEs", F_NAMEs);
            uvMap.setValue("F_EXTs", F_EXTs);
            uvMap.setValue("F_SIZEs", F_SIZEs);
            uvMap.setValue("F_TYPEs", F_TYPEs);
        }

        if (DELETE_F_SEQs != null) {
            uvMap.setValue("DELETE_F_SEQs", DELETE_F_SEQs);
        }

        String REQ_URI = request.getRequestURI();
        if (request.getQueryString() != null && !"".equals(request.getQueryString())) // GET 파라값 받기
            REQ_URI += "?" + request.getQueryString();

        uvMap.setString("REQUEST_URI", REQ_URI);
        logger.debug("========== PARAM start ==========");
        logger.debug(uvMap.toJson());
        logger.debug("========== PARAM end ==========");

        return uvMap;
    }
    
    public static UvMap getParameter(Model model, HttpServletRequest request) {
        UvMap Param = getParameter(request);
        model.addAttribute("PARAM", Param);
        return Param;
    }
}