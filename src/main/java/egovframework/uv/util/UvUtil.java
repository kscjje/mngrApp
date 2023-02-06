package egovframework.uv.util;

import java.io.UnsupportedEncodingException;
import java.math.BigDecimal;
import java.text.DecimalFormat;
import java.text.NumberFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.Enumeration;
import java.util.List;
import java.util.Locale;
import java.util.Random;
import java.util.StringTokenizer;
import java.util.Vector;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.collections4.iterators.IteratorEnumeration;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import egovframework.uv.model.UvMap;

public class UvUtil {
    final static Locale currentLocale = Locale.KOREA;
    final static NumberFormat numberFormatter = NumberFormat.getNumberInstance(currentLocale);

    private static final Logger logger = LoggerFactory.getLogger(UvUtil.class);

    /**
     * KSC5601으로 변환한다.
     *
     * @param str
     * @return
     */
    public static String ascToksc(String str) {

        try {
            if (str == null)
                return "";
            return new String(str.getBytes("8859_1"), "KSC5601");
        } catch (UnsupportedEncodingException ue) {
            ue.printStackTrace();
            return "";
        }

    }

    /**
     * 8859_1로 변환한다.
     *
     * @param str
     * @return String
     */
    public static String kscToasc(String str) {

        try {
            if (str == null)
                return "";
            return new String(str.getBytes("KSC5601"), "8859_1");
        } catch (UnsupportedEncodingException ue) {
            ue.printStackTrace();
            return "";
        }
    }

    /**
     * String의 길이를 ascii로 바꿔서 구한다.
     *
     * @param str
     * @return int ascii -> String Length
     */
    public static int getLen(String str) {

        int len = 0;
        String retstr = kscToasc(str);
        len = retstr.length();
        return len;
    }

    /**
     * setFormat("123456789". "##/## : ##" ) -->12/34:56
     *
     * @param str
     * @param form
     * @return String
     */
    public static String setFormat(String str, String form) {

        if (str == null || str.length() == 0)
            return str;
        char[] returnStr = new char[form.length()];

        for (int i = 0, j = 0; i < form.length(); i++, j++) {
            if (form.charAt(i) == '#') {
                try {
                    returnStr[i] = str.charAt(j);
                } catch (StringIndexOutOfBoundsException e) {
                    returnStr[i] = '\u0000';
                }
            } else {
                returnStr[i] = form.charAt(i);
                --j;
            }
        }
        return new String(returnStr);
    }

    /**
     * DOUBLE형의 수치값을 가진 문자열을 DECIMAL형의 문자열로 변환합니다.
     *
     * @param src  더블형 수치값를 가진 문자열
     * @param frmt 데시멀형 수치값을 가진 문자열
     * @return String
     */
    public static String toDecimalFormat(String src, String frmt) {

        if (src == null)
            return "";
        Double num;
        try {
            num = new Double(src);
        } catch (NumberFormatException nfe) {
            return "invalid argument";
        } catch (NullPointerException npe) {
            return "err-commaFormat(null)";
        }

        DecimalFormat df = new DecimalFormat(frmt);

        return df.format(num);
    }

    /**
     * String형을 Integer형으로 바꾼다.
     *
     * @param str1 int로 바꿀 문자열
     * @return int 바뀌어진 int값
     */
    public static int sTOi(String str1) {
        try {
            str1 = replaceStr(str1, ",", "");
        } catch (Exception ex) {
        }
        int retInt = Integer.parseInt(str1);
        return retInt;
    }

    /**
     * String형을 Integer형으로 바꾼다.
     *
     * @param str      int로 바꿀 문자열
     * @param defValue Null이나 Null String이 입력되었을때 Return할 기본값
     * @return int 바뀌어진 int값
     */
    public static int sTOi(String str, int defValue) {
        int retInt = 0;
        if ((str == null) || (str.equals(""))) {
            retInt = defValue;
        } else {
            retInt = Integer.parseInt(str);
        }
        return retInt;
    }

    /**
     * String형을 long형으로 바꾼다.
     *
     * @param str long로 바꿀 문자열
     * @return long 바뀌어진 long값
     */
    public static long sTOl(String str) {
        long retLong = Long.parseLong(str);
        return retLong;
    }

    /**
     * String형을 long형으로 바꾼다.
     *
     * @param str      long로 바꿀 문자열
     * @param defValue Null이나 Null String이 입력되었을때 Return할 기본값
     * @return long 바뀌어진 long값
     */
    public static long sTOl(String str, long defValue) {
        long retLong = 0;
        if ((str == null) || (str.equals(""))) {
            retLong = defValue;
        } else {
            retLong = Long.parseLong(str);
        }
        return retLong;
    }

    /**
     * HexString형을 Decimal String형으로 바꾼다.
     *
     * @param str int로 바꿀 문자열
     * @return Decimal형의 String값
     */
    public static String hTOs(String str) {
        int retInt = 0;
        try {
            retInt = Integer.parseInt(str, 16);
        } catch (Exception ex) {
            retInt = 0;
        }
        String retstr = Integer.toString(retInt);
        return retstr;
    }

    /**
     * int형을 String형으로 바꾼다.
     *
     * @param intValue String로 바꿀 int값
     * @return String로 바뀌어진 int값
     */
    public static String iTOs(int intValue) {
        String retstr = Integer.toString(intValue);
        return retstr;
    }

    /**
     * long형을 String형으로 바꾼다.
     *
     * @param longValue String로 바꿀 long값
     * @return String로 바뀌어진 long값
     */
    public static String lTOs(long longValue) {
        String retstr = Long.toString(longValue);
        return retstr;
    }

    /**
     * Integer형을 String형으로 바꾼다.
     *
     * @param intvalue String로 바꿀 int값
     * @return String로 바뀌어진 int값
     */

    /**
     * Integer형을 HexString형으로 바꾼다.
     *
     * @param intvalue String로 바꿀 int값
     * @return HexString HexString로 바뀌어진 int값
     */
    public static String iTOh(int intvalue) {
        String ret = Integer.toHexString(intvalue);
        return ret;
    }

    /**
     * [1,234,567]형태의 String값을 double값으로 변환한다.
     *
     * @param strValue 변환시킬 String값
     * @return double 변환된 double값.
     */
    public static double sTOd(String strValue) {
        String retvalue = replaceStr(strValue, ",", "");
        double Value = Double.parseDouble(retvalue);
        return Value;
    }

    /**
     * double형의 데이터를 String형으로 Converting 시켜서 Return해주는 Method <BR>
     * [사용예]<BR>
     * double dbl = 1234567890.123; <BR>
     * 화면출력시 1.23456789123E9 <BR>
     * (type1) String str = 1,234,567,890.123 <BR>
     * (type2) String str = 1,234,567,890 <BR>
     * (type3) String str = 1234567890 <BR>
     *
     * @param dblval 더블형의 입력값
     * @param type   포맷의 type
     * @return String returnString
     */
    public static String dTOs(double dblval, int type) {
        DecimalFormat df = null;
        String dblstr = "";
        String retstr = "";

        df = new java.text.DecimalFormat("#,###,##0.#####");
        dblstr = df.format(dblval);

        if (type == 1) {
            retstr = dblstr;
        } else if (type == 2) {
            if (dblstr.indexOf(".") != -1) {
                retstr = dblstr.substring(0, dblstr.indexOf("."));
            } else {
                retstr = dblstr;
            }
        } else if (type == 3) {
            String strTemp = replaceStr(dblstr, ",", "");
            if (strTemp.indexOf(".") != -1) {
                retstr = strTemp.substring(0, strTemp.indexOf("."));
            } else {
                retstr = strTemp;
            }
        } else {
            retstr = dblstr;
        }

        if (retstr.equals("-0"))
            retstr = "0";

        return retstr;
    }

    /**
     * Double형의 데이터를 String형으로 Converting 시켜서 Return해주는 Method<BR>
     * [사용예] <BR>
     * double dbl = 1234567890.123;<BR>
     * Double DBL = new Double(dbl);<BR>
     * 화면출력시 1.23456789123E9<BR>
     * (type1) String str = 1,234,567,890.123<BR>
     * (type2) String str = 1,234,567,890<BR>
     * (type3) String str = 1234567890<BR>
     *
     * @param Dblvalue DBL(더블형의 입력값)
     * @param type     (포맷의 type)
     * @return String returnString
     */
    public static String dTOs(Double Dblvalue, int type) {
        double dblvalue = 0.0;

        if (Dblvalue != null) {
            dblvalue = Dblvalue.doubleValue();
        }
        return dTOs(dblvalue, type);
    }

    /**
     * String 문자열의 oldString을 newString으로 바꾼다.
     *
     * @param str    바꿀 문자열.
     * @param oldStr 과거의 문자열.
     * @param newStr 새로운 문자열.
     * @return 바뀐 문자열.
     */
    public static String replaceStr(String str, String oldStr, String newStr) {
        if (str == null) {
            return "";
        }

        try {
            int len = str.length() + (newStr.length() - oldStr.length()) * (str.length() / oldStr.length());
            StringBuffer retBuf = new StringBuffer(len);

            int pos = 0;
            int index = 0;

            while ((pos = str.indexOf(oldStr, index)) != -1) {
                retBuf.append(str.substring(index, pos));
                retBuf.append(newStr);
                index = pos + oldStr.length();
            }
            retBuf.append(str.substring(index));

            return retBuf.toString();
        } catch (Exception ex) {
            return str;
        }
    }

    /**
     * 문자형 객체가 Null(null, "null")일 경우 "" 값으로 세팅
     *
     * @param value String 객체
     * @return String
     */
    public static String toNotNull(String value) {
        return toNotNull(value, "");
    }

    /**
     * 문자형 객체가 Null(null, "null", "")일 경우 디폴트 값으로 세팅
     *
     * @param value        String 객체
     * @param defaultValue default 값
     * @return String
     */
    public static String toNotNull(String value, String defaultValue) {
        String returnValue;
        if (value == null || value.trim().equals("") || value.trim().equals("null")) {
            returnValue = defaultValue;
        } else {
            returnValue = value;
        }
        return returnValue;
    }

    /**
     * 숫자형 객체가 null일 경우 0으로 세팅
     *
     * @param value Short 객체
     * @return short
     */
    public static short toNotNull(Short value) {
        return toNotNull(value, (short) 0);
    }

    /**
     * 숫자형 객체가 null일 경우 디폴트 값으로 세팅
     *
     * @param value        Short 객체
     * @param defaultValue default 값
     * @return short
     */
    public static short toNotNull(Short value, short defaultValue) {
        short returnValue = 0;
        if (value != null) {
            returnValue = value.shortValue();
        } else {
            returnValue = defaultValue;
        }
        return returnValue;
    }

    /**
     * 숫자형 객체가 null일 경우 0으로 세팅
     *
     * @param value Integer 객체
     * @return int
     */
    public static int toNotNull(Integer value) {
        return toNotNull(value, 0);
    }

    /**
     * 숫자형 객체가 null일 경우 디폴트 값으로 세팅
     *
     * @param value        Integer 객체
     * @param defaultValue default 값
     * @return int
     */
    public static int toNotNull(Integer value, int defaultValue) {
        int returnValue = 0;
        if (value != null) {
            returnValue = value.intValue();
            if (returnValue == 0) {
                returnValue = defaultValue;
            }
        } else {
            returnValue = defaultValue;
        }
        return returnValue;
    }

    /**
     * 숫자형 객체가 null일 경우 0으로 세팅
     *
     * @param value Integer 객체
     * @return long
     */
    public static long toNotNull(Long value) {
        return toNotNull(value, 0);
    }

    /**
     * 숫자형 객체가 null일 경우 디폴트 값으로 세팅
     *
     * @param value        Integer 객체
     * @param defaultValue default 값
     * @return long
     */
    public static long toNotNull(Long value, long defaultValue) {
        long returnValue = 0;
        if (value != null) {
            returnValue = value.longValue();
            if (returnValue == 0) {
                returnValue = defaultValue;
            }
        } else {
            returnValue = defaultValue;
        }
        return returnValue;
    }

    /**
     * 숫자형 객체가 null일 경우 0으로 세팅
     *
     * @param value Integer 객체
     * @return long
     */
    public static long toNotNull(BigDecimal value) {
        return toNotNull(value, 0);
    }

    /**
     * 숫자형 객체가 null일 경우 디폴트 값으로 세팅
     *
     * @param value        Integer 객체
     * @param defaultValue default 값
     * @return long
     */
    public static long toNotNull(BigDecimal value, long defaultValue) {
        long returnValue = 0;
        if (value != null) {
            returnValue = value.longValue();
        } else {
            returnValue = defaultValue;
        }
        return returnValue;
    }

    /**
     * 숫자형 객체가 null일 경우 0으로 세팅
     *
     * @param value Float 객체
     * @return float
     */
    public static float toNotNull(Float value) {
        return toNotNull(value, 0);
    }

    /**
     * 숫자형 객체가 null일 경우 디폴트 값으로 세팅
     *
     * @param value        Float 객체
     * @param defaultValue default 값
     * @return float
     */
    public static float toNotNull(Float value, float defaultValue) {
        float returnValue = 0;
        if (value != null) {
            returnValue = value.intValue();
        } else {
            returnValue = defaultValue;
        }
        return returnValue;
    }

    /**
     * 숫자형 객체가 null일 경우 0으로 세팅
     *
     * @param value Double 객체
     * @return double
     */
    public static double toNotNull(Double value) {
        return toNotNull(value, 0);
    }

    /**
     * 숫자형 객체가 null일 경우 디폴트 값으로 세팅
     *
     * @param value        Double 객체
     * @param defaultValue default 값
     * @return double
     */
    public static double toNotNull(Double value, double defaultValue) {
        double returnValue = 0;
        if (value != null) {
            returnValue = value.intValue();
        } else {
            returnValue = defaultValue;
        }
        return returnValue;
    }

    /**
     * 입력된 input Param의 값이 Null(null, "null")이면 "&nbsp;"로 셋팅한다.
     *
     * @param str input parameter
     * @return String
     */
    public static String toNbsp(String str) {
        String retStr;
        if (str == null || str.trim().equals("null") || str.trim().equals("")) {
            retStr = "&nbsp;";
        } else {
            retStr = str;
        }
        return retStr;
    }

    /**
     * 랜덤한 정수를 발생
     */
    public static int getRandomNo() {
        Random rdn = new Random(System.currentTimeMillis());
        return Math.abs(rdn.nextInt());
    }

    /**
     * 음수값을 체크하는 Hex to Int 모듈
     *
     * @param strHexNum
     * @return int (Hex에서 변환된 int : 음수 포함)
     */
    public static int getHexStringToInteger(String strHexNum) {
        int unregisteredMsgCodeNum = -1;
        int value = 0;
        if (strHexNum.length() != 8)
            return unregisteredMsgCodeNum;

        int num[] = new int[4];
        try {
            num[0] = Integer.parseInt(strHexNum.substring(6, 8), 16);
            num[1] = Integer.parseInt(strHexNum.substring(4, 6), 16);
            num[2] = Integer.parseInt(strHexNum.substring(2, 4), 16);
            num[3] = Integer.parseInt(strHexNum.substring(0, 2), 16);
            value = num[3] << 8 * 3 | num[2] << 8 * 2 | num[1] << 8 | num[0];
        } catch (NumberFormatException nfe) {
            value = unregisteredMsgCodeNum;
        }
        return value;
    }

    /**
     * 문자열을 길이만큼 잘라서 반환 (뒤에 ... 을 붙임)
     *
     * @param input 문자열
     * @param limit 길이
     * @return 잘라진 문자열
     */
    public static String getSubstrDot(String input, int limit) {
        input = toNotNull(input);

        byte[] bytes = input.getBytes();
        int len = bytes.length;

        String str = input;
        if (len > limit) {
            str = getSubstrB(input, limit);

            if (!str.equals(input)) {
                str += " ...";
            }
        }
        return str;
    }

    /**
     * 문자열을 길이만큼 잘라서 반환
     *
     * @param input  문자열
     * @param length 길이
     * @return 잘라진 문자열
     */
    public static String getSubstrB(String input, int length) {
        byte[] bytes = input.getBytes();
        int len = bytes.length;
        int counter = 0;

        if (length >= len) {
            StringBuffer sb = new StringBuffer();
            sb.append(input);
            for (int i = 0; i < length - len; i++) {
                sb.append(' ');
            }
            return sb.toString();
        }

        for (int i = length - 1; i >= 0; i--) {
            if (((int) bytes[i] & 0x80) != 0)
                counter++;
        }

        String f_str = new String(bytes, 0, length + (counter % 2));

        return f_str;
    }

    /**
     * 문자열을 길이만큼 앞에서부터 잘라서 반환
     *
     * @param str 문자열
     * @param len 길이
     * @return 잘라진 문자열
     */
    public static String cutLeft(String str, int len) {
        String ret = null;
        str = toNotNull(str);
        if (str.length() <= len) {
            ret = str;
        } else {
            ret = str.substring(0, len);
        }
        return ret;
    }

    /**
     * 문자열을 길이만큼 뒤에서부터 잘라서 반환
     *
     * @param str 문자열
     * @param len 길이
     * @return 잘라진 문자열
     */
    public static String cutRight(String str, int len) {
        String ret = null;
        str = toNotNull(str);
        if (str.length() <= len) {
            ret = str;
        } else {
            ret = str.substring(str.length() - len);
        }
        return ret;
    }

    /**
     * 한글 여부
     *
     * @param c char
     * @return 한글여부
     */
    public static boolean isHangul(char c) {
        return isHangulSyllables(c) || isHangulJamo(c) || isHangulCompatibilityJamo(c);
    }

    /**
     * 완성된 한글 여부
     * http://www.unicode.org/charts/PDF/UAC00.pdf
     *
     * @param c char
     * @return
     */
    public static boolean isHangulSyllables(char c) {
        // return (c >= (char) 0xAC00 && c <= (char) 0xD7AF);
        return (c >= (char) 0xAC00 && c <= (char) 0xD7A3);
    }

    /**
     * (현대 및 고어) 한글 자모 여부
     * http://www.unicode.org/charts/PDF/U1100.pdf
     *
     * @param c char
     * @return
     */
    public static boolean isHangulJamo(char c) {
        // return (c >= (char) 0x1100 && c <= (char) 0x11FF);
        return (c >= (char) 0x1100 && c <= (char) 0x1159) || (c >= (char) 0x1161 && c <= (char) 0x11A2) || (c >= (char) 0x11A8 && c <= (char) 0x11F9);
    }

    /**
     * (현대 및 고어) 한글 자모 여부
     * http://www.unicode.org/charts/PDF/U3130.pdf
     *
     * @param c char
     * @return
     */
    public static boolean isHangulCompatibilityJamo(char c) {
        // return (c >= (char) 0x3130 && c <= (char) 0x318F);
        return (c >= (char) 0x3131 && c <= (char) 0x318E);
    }

    /**
     * 영문인지 체크 (대문자)
     * http://www.unicode.org/charts/PDF/U1100.pdf
     *
     * @param str String
     * @return
     */
    public static boolean isEnglishUpper(String str) {
        boolean isNum = false;
        Pattern p = Pattern.compile("[A-Z]+");
        Matcher m = p.matcher(str);
        if (m.matches()) {
            isNum = true;
        }
        return isNum;
    }

    /**
     * 영문인지 체크 (소문자)
     * http://www.unicode.org/charts/PDF/U1100.pdf
     *
     * @param str String
     * @return
     */
    public static boolean isEnglishLower(String str) {
        boolean isNum = false;
        Pattern p = Pattern.compile("[a-z]+");
        Matcher m = p.matcher(str);
        if (m.matches()) {
            isNum = true;
        }
        return isNum;
    }

    /**
     * 숫자인지 체크
     *
     * @param str 문자열
     * @return boolean
     */
    public static boolean isNumber(String str) {
        boolean isNum = false;
        Pattern p = Pattern.compile("[0-9]+");
        Matcher m = p.matcher(str);
        if (m.matches()) {
            isNum = true;
        }
        return isNum;
    }

    /**
     * 전화번호인지 체크
     *
     * @param str 문자열
     * @return boolean
     */
    public static boolean isPhoneNumber(String str) {
        boolean isPhone = false;
        Pattern p = Pattern.compile("(^0[1-9]{1,2})-?([1-9][0-9]{1,3})-?([0-9]{4})");
        Matcher m = p.matcher(str);
        if (m.matches()) {
            isPhone = true;
        }
        return isPhone;
    }

    /**
     * 이메일인지 체크
     *
     * @param str 문자열
     * @return boolean
     */
    public static boolean isEmail(String str) {
        boolean isMail = false;
        Pattern p = Pattern.compile("(^[_0-9a-zA-Z-]+(.[_0-9a-zA-Z-]+)*@[0-9a-zA-Z-]+(.[0-9a-zA-Z-]+)*$)");
        Matcher m = p.matcher(str);
        if (m.matches()) {
            isMail = true;
        }
        return isMail;
    }

    /**
     * stack trace 내용을 문자열로 반환
     *
     * @param objException Exception 객체
     * @return String
     */
    public static String stackTraceToStr(Exception objException) {

        if (objException == null) {
            return "";
        }

        StringBuffer str = new StringBuffer();
        str.append(objException);
        StackTraceElement[] trace = objException.getStackTrace();
        for (int i = 0; trace != null && i < trace.length; i++) {
            str.append("\tat ");
            str.append(trace[i]);
            str.append("\n");
        }
        str.append("\n");

        return str.toString();
    }

    /**
     * UvDataSet 의 내용을 파일에 기록하기 위한 문자열을 만들어 냄
     *
     * @param uvMap
     */
    public static String getContent(UvMap uvMap) {

        if (uvMap == null)
            return "null";
        StringBuffer HASH_TABLE = new StringBuffer();
        Enumeration objEnumeration = new IteratorEnumeration(uvMap.keySet().iterator());

        Object objObject = null;

        int i = 0;
        while (objEnumeration.hasMoreElements()) {
            HASH_TABLE.append("\nuvMap(" + i + ") : ");
            String KEY = (String) objEnumeration.nextElement();
            String CLASS_NAME = uvMap.get(KEY).getClass().getName();

            if (CLASS_NAME.indexOf(".") > -1)
                CLASS_NAME = CLASS_NAME.substring((CLASS_NAME.lastIndexOf(".") + 1), CLASS_NAME.length());

            objObject = uvMap.get(KEY);
            HASH_TABLE.append("(" + CLASS_NAME + ") ").append(KEY).append(" = ").append(objObject);
            i++;
        }

        return HASH_TABLE.toString();
    }

    /**
     * 오류발생번호를 생성한다.
     *
     * @param rdnidx random log no
     * @return String
     */
    public static String getRandomStrLogNo(int rdnidx) {
        String randomStr = Integer.toHexString(rdnidx);
        int len = 8 - randomStr.length();
        String strLogNo = "";
        if (len != 0) {
            for (int i = 0; i < len; i++) {
                strLogNo = "0" + strLogNo;
            }
        }
        randomStr = strLogNo + randomStr;
        return randomStr.substring(0, 4) + "-" + randomStr.substring(4);
    }

    /**
     * 파일크기를 단위와 함께 문자열로 리턴
     *
     * @param fileSize 파일크기
     * @return String
     */
    public static String getFileSize(long fileSize) {
        String fileUnit = "Byte";
        if (fileSize >= 1024 * 1024) {
            fileSize = Math.round(fileSize / (1024.0 * 1024));
            fileUnit = "MB";
        } else if (fileSize >= 1024) {
            fileSize = Math.round(fileSize / 1024.0);
            fileUnit = "KB";
        }
        return fileSize + fileUnit;
    }

    /**
     * 문자열 좌우양쪽의 공백을 제거
     *
     * @param str input parameter
     * @return String
     */
    public static String trim(String str) {
        String retStr;
        if (str == null || str.trim().equals("")) {
            retStr = "";
        } else {
            str = str.trim();
            while (str.startsWith(" ")) {
                str = str.substring(1);
            }
            retStr = str;
        }
        return retStr;
    }

    /**
     * 문자열에서 숫자만을 뽑음
     *
     * @param str input parameter
     * @return String
     */
    public static String getNumber(String str) {
        String retStr;
        if (str == null || str.trim().equals("")) {
            retStr = "";
        } else {
            str = str.trim();
            int num = 0;
            retStr = "";
            while (str.length() > 0) {
                try {
                    num = Integer.parseInt(str.substring(0, 1));
                    retStr += str.substring(0, 1);
                } catch (Exception e) {
                }
                str = str.substring(1);
            }
        }
        return retStr;
    }

    /**
     * 150.1.1.164 --> 150.001.001.164로 채우는 method
     *
     * @param strIP IP 정보
     * @return 포맷대로 맞추어진 IP
     * @throws Exception
     */
    public static String makeIP(String strIP) {
        String result = "";

        StringTokenizer st = new StringTokenizer(strIP, ".");
        String unit = null;
        boolean isFirst = true;
        while (st.hasMoreTokens()) {
            unit = st.nextToken();
            if (unit.length() == 1) {
                unit = "00" + unit;
            } else if (unit.length() == 2) {
                unit = "0" + unit;
            }
            result += (isFirst ? "" : ".") + unit;
            isFirst = false;
        }

        return result;
    }

    /**
     * 150.001.001.164 --> 150.1.1.164로 바꾸는 method
     *
     * @param strIP
     * @return 포맷대로 맞추어진 IP
     */
    public static String returnOrgIP(String strIP) {
        String result = "";

        StringTokenizer st = new StringTokenizer(strIP, ".");
        String unit = null;
        boolean isFirst = true;
        while (st.hasMoreTokens()) {
            unit = st.nextToken();
            if (unit.startsWith("0")) {
                unit = unit.substring(1, unit.length());
            }
            if (unit.startsWith("0")) {
                unit = unit.substring(1, unit.length());
            }
            result += (isFirst ? "" : ".") + unit;
        }

        return result;
    }

    /**
     * 숫자에 3자리마다 comma를 붙인다.
     *
     * @param number
     * @return String
     */
    public static String comma(int number) {
        return numberFormatter.format(number);
    }

    /**
     * 숫자에 3자리마다 comma를 붙인다.
     *
     * @param number
     * @return String
     */
    public static String comma(long number) {
        return numberFormatter.format(number);
    }

    public static String comma(String number) {
        return comma(sTOl(number));
    }

    /**
     * String 값이 널 또는 빈문자인지 체크
     *
     * @param str
     * @return boolean
     */
    public static boolean isNotNull(String str) {
        return str == null || str.equals("") ? false : true;
    }

    public static String amtToHan(String amt) {
        String tmpamt = "";
        amt = "000000000000" + amt;
        int j = 0;
        for (int i = amt.length(); i > 0; i--) {
            j++;
            if (!amt.substring(i - 1, i).equals("0")) {
                if (j % 4 == 2)
                    tmpamt = "십" + tmpamt;
                if (j % 4 == 3)
                    tmpamt = "백" + tmpamt;
                if (j > 1 && (j % 4) == 0)
                    tmpamt = "천" + tmpamt;
            }
            if (j == 5 && Integer.parseInt(amt.substring(amt.length() - 8, amt.length() - 4)) > 0)
                tmpamt = "만" + tmpamt;
            if (j == 9 && Integer.parseInt(amt.substring(amt.length() - 12, amt.length() - 8)) > 0)
                tmpamt = "억" + tmpamt;
            if (j == 13 && Integer.parseInt(amt.substring(amt.length() - 16, amt.length() - 12)) > 0)
                tmpamt = "조" + tmpamt;
            if (amt.substring(i - 1, i).equals("1"))
                tmpamt = "일" + tmpamt;
            if (amt.substring(i - 1, i).equals("2"))
                tmpamt = "이" + tmpamt;
            if (amt.substring(i - 1, i).equals("3"))
                tmpamt = "삼" + tmpamt;
            if (amt.substring(i - 1, i).equals("4"))
                tmpamt = "사" + tmpamt;
            if (amt.substring(i - 1, i).equals("5"))
                tmpamt = "오" + tmpamt;
            if (amt.substring(i - 1, i).equals("6"))
                tmpamt = "육" + tmpamt;
            if (amt.substring(i - 1, i).equals("7"))
                tmpamt = "칠" + tmpamt;
            if (amt.substring(i - 1, i).equals("8"))
                tmpamt = "팔" + tmpamt;
            if (amt.substring(i - 1, i).equals("9"))
                tmpamt = "구" + tmpamt;
        }

        // tmpamt = "금" + tmpamt + "원정";

        return tmpamt;
    }

    /**
     * 시스템에서의 프로젝트 절대 경로 표시
     *
     * @return
     */
    public static String absPath() {

        String path = UvUtil.class.getResource("BaseUtil.class").getPath();

        int pathLength = path.length() - 55;
        if (pathLength < 0)
            pathLength = 0;

        String setPath = path.substring(0, pathLength);

        return setPath;
    }

    /**
     * 정수형 1자리 일 경우 앞에 0을 붙여 2자리로 만들어 준다.
     *
     * @return
     */
    public static String n2c(int num) {
        if (num < 10)
            return "0" + num;
        else
            return "" + num;
    }

    /**
     * 문자열을 구분자로 분할하여 정해진 배열 크기 만큼 리턴
     */
    public static String[] splitC(String str, String delim, int count) {
        String[] ori = split(str, delim);
        String[] ret = new String[count];
        java.util.Arrays.fill(ret, "");
        int copyLength = (ori.length > count) ? count : ori.length;
        System.arraycopy(ori, 0, ret, 0, copyLength);
        return ret;
    }

    /**
     * Splits a String into pieces according to a delimiter.
     *
     * @param str   the string to split
     * @param delim the delimiter
     * @return an array of strings containing the pieces
     */
    public static String[] split(String str, String delim) {
        // Use a Vector to hold the splittee strings
        //Vector<String> v = new Vector<String>();

        // Use a StringTokenizer to do the splitting
		/*StringTokenizer tokenizer = new StringTokenizer(str, delim);
		while (tokenizer.hasMoreTokens()) {
			v.addElement(tokenizer.nextToken());
		}

		String[] ret = new String[v.size()];
		for (int i = 0; i < ret.length; i++) {
			ret[i] = (String) v.elementAt(i);
		}

		return ret;*/

        return str.split(Pattern.quote(delim));
    }

    public static String[] splitToken(String str, String delim) {
        // Use a Vector to hold the splittee strings
        Vector<String> v = new Vector<String>();

        // Use a StringTokenizer to do the splitting
        StringTokenizer tokenizer = new StringTokenizer(str, delim);
        while (tokenizer.hasMoreTokens()) {
            v.addElement(tokenizer.nextToken());
        }

        String[] ret = new String[v.size()];
        for (int i = 0; i < ret.length; i++) {
            ret[i] = (String) v.elementAt(i);
        }

        return ret;

    }

    public static String splitValue(String str, String delim, int i) {
        String[] temp = split(str, delim);

        String rtn = "";

        try {
            rtn = temp[i];
        } catch (Exception e) {
        }

        return rtn;
    }

    public static String splitValueToken(String str, String delim, int i) {
        String[] temp = splitToken(str, delim);

        String rtn = "";

        try {
            rtn = temp[i];
        } catch (Exception e) {
        }

        return rtn;
    }

    /**
     * 주어진 바이트 만큼 문자열을 잘라 배열로 리턴
     *
     * @param str 문자열
     * @param b   바이트
     * @return
     */
    public static String[] split(String str, int b) {
        List<String> list = new ArrayList<String>();

        byte[] by = str.getBytes();

        int idx = 0;
        while (true) {
            int count = 0;
            int cutLength = b;
            try {
                for (int i = idx; i < (idx + cutLength); i++) {
                    if ((by[i] & 0x80) == 0x80)
                        count++;
                }
                if ((by[cutLength - 1] & 0x80) == 0x80 && (count % 2) == 1)
                    cutLength--;

                String unitStr = new String(by, idx, cutLength);
                // System.out.println("+++++++++++++++++++++1:" + unitStr);
                list.add(unitStr);

                idx += cutLength;
            } catch (java.lang.ArrayIndexOutOfBoundsException e) {
                String unitStr = new String(by, idx, by.length - idx);
                // System.out.println("+++++++++++++++++++++2:" + unitStr);
                if (unitStr != null && unitStr.trim().length() > 0)
                    list.add(unitStr);
                break;
            } catch (StringIndexOutOfBoundsException e) {
                String unitStr = new String(by, idx, by.length - idx);
                // System.out.println("+++++++++++++++++++++3:" + unitStr);
                if (unitStr != null && unitStr.trim().length() > 0)
                    list.add(unitStr);
                break;
            } catch (Exception e) {
                break;
            }
        }

        String[] ret = new String[list.size()];
        list.toArray(ret);
        return ret;
    }

    /**
     * 정상적인 URL을 만들어 줌
     *
     * @param url URL
     * @return String
     */
    public static String makeURL(String url) {
        return makeURL(url, null);
    }

    /**
     * 정상적인 URL을 만들어 줌
     *
     * @param url   URL
     * @param param 추가 파라메터
     * @return String
     */
    public static String makeURL(String url, String param) {
        if (url == null || url.trim().length() == 0) {
            return "";
        }

        url = url.trim();
        if (!url.startsWith("http")) {
            url = "http://" + url;
        }

        if (!(param == null || param.trim().length() == 0)) {
            url += (url.indexOf("?") != -1 ? "&" : "?") + param;
        }

        return url;
    }

    /**
     * 현재 페이지의 URL 정보를 가져온다.
     *
     * @param request HttpServletRequest
     * @return 현재 페이지의 URL
     */
    public static String getMyUrl(HttpServletRequest request) {
        String url = toNotNull(request.getQueryString());
        url = request.getRequestURL() + (url.length() > 0 ? "?" + url : "");

        return url;
    }

    /**
     * java unescape (ajax 사용 시)
     *
     * @param inp 데이터
     * @rturn 변환된 데이터
     */
    public static String unescape(String inp) {
        String rtnStr = new String();
        char[] arrInp = inp.toCharArray();
        int i;
        for (i = 0; i < arrInp.length; i++) {
            if (arrInp[i] == '%') {
                String hex;
                if (arrInp[i + 1] == 'u') { // 유니코드.
                    hex = inp.substring(i + 2, i + 6);
                    i += 5;
                } else { // ascii
                    hex = inp.substring(i + 1, i + 3);
                    i += 2;
                }
                try {
                    rtnStr += new String(Character.toChars(Integer.parseInt(hex, 16)));
                } catch (NumberFormatException e) {
                    rtnStr += "%";
                    i -= (hex.length() > 2 ? 5 : 2);
                }
            } else {
                rtnStr += arrInp[i];
            }
        }

        return rtnStr;
    }

    /**
     * 자리수에 맞추어 왼쪽에 주어진 문자를 삽입
     *
     * @param str 원문자열
     * @param ch  문자(길이가 1이어야 함)
     * @param len 자리수
     * @return 변환된 문자열
     */
    public static String lpad(String str, String ch, int len) {
        String ret = "";

        str = str == null ? "" : str;
        if (str.length() >= len) {
            return str;
        }

        for (int i = 0, n = len - str.length(); i < n; i++) {
            ret += ch;
        }

        ret = ret + str;

        return ret;
    }

    public static String rpad(String str, char ch, int len) {
        if (str.length() > len)
            return str;

        char[] chars = new char[len];

        Arrays.fill(chars, ch);
        System.arraycopy(str.toCharArray(), 0, chars, 0, str.length());

        return new String(chars);
    }

    /**
     * 문자열을 equals 비교. 값이 NULL인 경우 ""로 대체해 비교
     *
     * @param str1 문자열
     * @param str2 비교 문자열
     * @return boolean
     */
    public static boolean isEqual(String str1, String str2) {
        str1 = toNotNull(str1);
        str2 = toNotNull(str2);
        return str1.equals(str2);
    }

    /**
     * 입력된 CTNT를 웹화면에 맞게 처리하여 리턴한다
     *
     * @param CTNT
     * @return 처리된 CTNT
     * @author 윤재오
     */
    public static String getCTNT(String CTNT) {
        CTNT = toNotNull(CTNT);
        //CTNT = UvUtil.replaceStr(CTNT, "{IMG_UPLOAD_URL}", UvConfig.IMG_UPLOAD_URL);
        // CTNT = UvUtil.replaceStr(CTNT, "\r\n", "<br/>");
        CTNT = UvUtil.replaceStr(CTNT, "<img ", "<img class='resizeme' ");
        CTNT = UvUtil.replaceStr(CTNT, "<IMG ", "<IMG class='resizeme' ");

        return CTNT;
    }

    public static String getYoutubeVideoID(String link) {
        link = toNotNull(link);

        String rtn = "";

        String pattern = "(?<=watch\\?v=|/videos/|embed\\/)[^#\\&\\?]*";
        Pattern compiledPattern = Pattern.compile(pattern);
        Matcher matcher = compiledPattern.matcher(link);

        if (matcher.find()) {
            rtn = matcher.group();
        }

        return rtn;
    }

    public static String getRNDPasswd(int size) {
        List seed = new ArrayList<>();

        for (int i = 48; i <= 57; i++) {
            seed.add((char) i);
        }
        for (int i = 65; i <= 90; i++) {
            seed.add((char) i);
        }
        for (int i = 97; i <= 122; i++) {
            seed.add((char) i);
        }
        Collections.shuffle(seed);
        StringBuffer pwdStr = new StringBuffer();
        for (int i = 1; i <= size; i++) {
            pwdStr.append(seed.get(i));
        }
        return pwdStr.toString();
    }

    /**
     * 전화번호 포맷 설정
     *
     * @param phoneNo
     * @return
     */
    public static String getPhoneFormat(String phoneNo) {
        phoneNo = UvUtil.toNotNull(phoneNo);
        phoneNo = UvUtil.replaceStr(phoneNo, "-", "");

        if (phoneNo.length() == 0) {
            return phoneNo;
        }

        String strTel = phoneNo;
        String[] strDDD = {"02", "031", "032", "033", "041", "042", "043", "051", "052", "053", "054", "055", "061", "062", "063", "064", "010", "011", "012", "013", "015", "016", "017", "018", "019", "070"};

        if (strTel.length() < 9) {
            return strTel;
        } else if (strTel.substring(0, 2).equals(strDDD[0])) {
            strTel = strTel.substring(0, 2) + '-' + strTel.substring(2, strTel.length() - 4) + '-' + strTel.substring(strTel.length() - 4, strTel.length());
        } else {
            for (int i = 1; i < strDDD.length; i++) {
                if (strTel.substring(0, 3).equals(strDDD[i])) {
                    strTel = strTel.substring(0, 3) + '-' + strTel.substring(3, strTel.length() - 4) + '-' + strTel.substring(strTel.length() - 4, strTel.length());
                }
            }
        }
        return strTel;
    }

    public static String getClientIP(HttpServletRequest request) {
        String ip = request.getHeader("X-Forwarded-For");

        if (ip == null || ip.length() == 0) {
            ip = request.getHeader("Proxy-Client-IP");
        }

        if (ip == null || ip.length() == 0) {
            ip = request.getHeader("WL-Proxy-Client-IP"); // 웹로직
        }

        if (ip == null || ip.length() == 0) {
            ip = request.getRemoteAddr();
        }

        return ip;
    }

    public static String toUnicode(String input) {
        StringBuilder b = new StringBuilder();

        for (char c : input.toCharArray()) {
            if (c >= 128)
                b.append("\\u").append(String.format("%04X", (int) c));
            else
                b.append(c);
        }

        return b.toString();
    }
	/*
	 * public static String HanjaToHangul(String hanja) { char unicode = 0x0000;
	 * byte[] hanjaByte = hanja.getBytes("UTF-8"); for( int i = 0; i <
	 * hanjaByte.length; ){ if( (hanjaByte[i]&0xFF) < 0x80 )// 1Byte
	 * Character         { i++; continue; }else if( (hanjaByte[i]&0xFF) < 0xE0 )//
	 * 2Byte Character { i += 2; continue; }else if( (hanjaByte[i]&0xFF) < 0xF0 )//
	 * 3Byte Character         { unicode = (char)(hanjaByte[i] & 0x0f); i++; unicode
	 * = (char)(unicode << 6); unicode = (char)(unicode | (hanjaByte[i] & 0x3f));
	 * i++; unicode = (char)(unicode << 6); unicode = (char)(unicode | (hanjaByte[i]
	 * & 0x3f)); i++; } if( HANJA_TO_HANGLE_MAP[unicode] != unicode ){ unicode =
	 * HANJA_TO_HANGLE_MAP[unicode]; hanjaByte[i-1] = (byte)((unicode & 0x3f) |
	 * 0x80); hanjaByte[i-2] = (byte)(((unicode << 2) & 0x3f00 | 0x8000) >> 8);
	 * hanjaByte[i-3] = (byte)(((unicode << 4) & 0x3f0000 | 0xe00000) >> 16);
	 * continue; } } return (new String(hanjaByte, "UTF-8")); }
	 */
    
   
    /// <summary>
    /// 설명 : 한자 스트링을 한글로 변환하는 함수
    /// 최초 작성일 : 2007/11/22
    /// 최초 작성자 : 유 관종
    /// 최종 수정일 : 2007/11/22
    /// 최종 수정자 : 유 관종
    /// </summary>
    /// <param name="strHanjaUniCode"></param>
    /// <returns></returns>
    public static String HanjaToHangul(String strHanjaUniCode)
    {
        String strResult = "";
        try {
	        for(char chCode : strHanjaUniCode.toCharArray())
	        {
	            strResult += ConvertHanjaToHangul(Character.toString(chCode));
	        }
        } catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
        return strResult;
    }
    /// <summary>
    /// 설명 : 한자 스트링을 한글로 변환하는 함수
    /// 최초 작성일 : 2007/11/09
    /// 최초 작성자 : 이 성호
    /// 최종 수정일 : 2007/11/09
    /// 최종 수정자 : 이 성호
    /// </summary>
    /// <param name="strHanjaUniCode">한자 스트링</param>
    /// <returns>한자에 대한 한글(변환대상이 아닌경우 준 값 그래로 리턴)</returns>
    public static String ConvertHanjaToHangul(String strHanjaUniCode)
    {
        if (strHanjaUniCode == "")
            return null;

        //byte[] btUni =  strHanjaUniCode.getBytes("UTF-8");
      //byte[] euckrStringBuffer  = strHanjaUniCode.getBytes(Charset.forName("euc-kr"));
        byte[] btKr;
		try {
			btKr = strHanjaUniCode.getBytes("euc-kr");
			char Kr1= (char)(btKr[0]&0xff);
   		    char Kr2= (char)(btKr[1]&0xff);
			
			//if ((btKr[0]>= 0xCA && btKr[0] <= 0xFD) && (btKr[1] >= 0xA1 && btKr[1] <= 0xFE))
   		    if ((Kr1>= 0xCA && Kr1 <= 0xFD) && (Kr2 >= 0xA1 && Kr2 <= 0xFE))
			{
			   // return (KSHanjaToHangul((char)((btKr[0] << 8) + btKr[1])));
   		     return (KSHanjaToHangul((int)((btKr[0]&0xff) << 8) + (btKr[1]&0xff)));

			}
		} catch (UnsupportedEncodingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	
        
        return (strHanjaUniCode);
    }

    /// <summary>
    /// 설명 : KS 한자를 한글로 변환(4,888자 대응)
    /// 최초 작성일 : 2007/11/13
    /// 최초 작성자 : 이 성호
    /// 최종 수정일 : 2007/11/13
    /// 최종 수정자 : 이 성호
    /// </summary>
    /// <param name="chHanja">한자 char</param>
    /// <returns>해당 한글(없을 경우 null)</returns>
    private static String KSHanjaToHangul(int chHanja)
    {
        // 가
        if ((chHanja >= 0xCAA1 && chHanja <= 0xCABD))
        {
            return ("가");
        }
        // 각
        else if ((chHanja >= 0xCABE && chHanja <= 0xCAC8))
        {
            return ("각");
        }
        // 간
        else if ((chHanja >= 0xCAC9 && chHanja <= 0xCAE0))
        {
            return ("간");
        }
        // 갈
        else if ((chHanja >= 0xCAE1 && chHanja <= 0xCAEA))
        {
            return ("갈");
        }
        // 감
        else if ((chHanja >= 0xCAEB && chHanja <= 0xCAFE))
        {
            return ("감");
        }
        // 갑
        else if ((chHanja >= 0xCBA1 && chHanja <= 0xCBA6))
        {
            return ("갑");
        }
        // 강
        else if ((chHanja >= 0xCBA7 && chHanja <= 0xCBBE))
        {
            return ("강");
        }
        // 개
        else if ((chHanja >= 0xCBBF && chHanja <= 0xCBD2))
        {
            return ("개");
        }
        // 객
        else if ((chHanja >= 0xCBD3 && chHanja <= 0xCBD4))
        {
            return ("객");
        }
        // 갱
        else if ((chHanja >= 0xCBD5 && chHanja <= 0xCBD8))
        {
            return ("갱");
        }
        // 갹
        else if ((chHanja >= 0xCBD9 && chHanja <= 0xCBD9))
        {
            return ("갹");
        }
        // 거
        else if ((chHanja >= 0xCBDA && chHanja <= 0xCBEA))
        {
            return ("거");
        }
        // 건
        else if ((chHanja >= 0xCBDB && chHanja <= 0xCBF6))
        {
            return ("건");
        }
        // 걸
        else if ((chHanja >= 0xCBF7 && chHanja <= 0xCBFA))
        {
            return ("걸");
        }
        // 검
        else if ((chHanja >= 0xCBFB && chHanja <= 0xCCA3))
        {
            return ("검");
        }
        // 겁 
        else if ((chHanja >= 0xCCA4 && chHanja <= 0xCCA6))
        {
            return ("겁");
        }
        // 게
        else if ((chHanja >= 0xCCA7 && chHanja <= 0xCCA9))
        {
            return ("게");
        }
        // 격
        else if ((chHanja >= 0xCCAA && chHanja <= 0xCCB0))
        {
            return ("격");
        }
        // 견
        else if ((chHanja >= 0xCCB1 && chHanja <= 0xCCBB))
        {
            return ("견");
        }
        // 결
        else if ((chHanja >= 0xCCBC && chHanja <= 0xCCC1))
        {
            return ("결");
        }
        // 겸
        else if ((chHanja >= 0xCCC2 && chHanja <= 0xCCC7))
        {
            return ("겸");
        }
        // 경
        else if ((chHanja >= 0xCCC8 && chHanja <= 0xCCF4))
        {
            return ("경");
        }
        // 계
        else if ((chHanja >= 0xCCF5 && chHanja <= 0xCDAE))
        {
            return ("계");
        }
        // 고
        else if ((chHanja >= 0xCDAF && chHanja <= 0xCDD5))
        {
            return ("고");
        }
        // 곡
        else if ((chHanja >= 0xCDD6 && chHanja <= 0xCDDC))
        {
            return ("곡");
        }
        // 곤
        else if ((chHanja >= 0xCDDD && chHanja <= 0xCDE6))
        {
            return ("곤");
        }
        // 골
        else if ((chHanja >= 0xCDE7 && chHanja <= 0xCDE9))
        {
            return ("골");
        }
        // 공
        else if ((chHanja >= 0xCDEA && chHanja <= 0xCDF9))
        {
            return ("공");
        }
        // 곶
        else if ((chHanja >= 0xCDFA && chHanja <= 0xCDFA))
        {
            return ("곶");
        }
        // 과
        else if ((chHanja >= 0xCDFB && chHanja <= 0xCEA8))
        {
            return ("과");
        }
        // 곽
        else if ((chHanja >= 0xCEA9 && chHanja <= 0xCEAC))
        {
            return ("곽");
        }
        // 관
        else if ((chHanja >= 0xCEAD && chHanja <= 0xCEBD))
        {
            return ("관");
        }
        // 괄
        else if ((chHanja >= 0xCEBE && chHanja <= 0xCEC1))
        {
            return ("괄");
        }
        // 광
        else if ((chHanja >= 0xCEC2 && chHanja <= 0xCECE))
        {
            return ("광");
        }
        // 괘
        else if ((chHanja >= 0xCECF && chHanja <= 0xCED1))
        {
            return ("괘");
        }
        // 괴
        else if ((chHanja >= 0xCED2 && chHanja <= 0xCEDA))
        {
            return ("괴");
        }
        // 굉
        else if ((chHanja >= 0xCEDB && chHanja <= 0xCEDE))
        {
            return ("굉");
        }
        // 교
        else if ((chHanja >= 0xCEDF && chHanja <= 0xCEF7))
        {
            return ("교");
        }
        // 구
        else if ((chHanja >= 0xCEF8 && chHanja <= 0xCFCF))
        {
            return ("구");
        }
        // 국
        else if ((chHanja >= 0xCFD0 && chHanja <= 0xCFD5))
        {
            return ("국");
        }
        // 군
        else if ((chHanja >= 0xCFD6 && chHanja <= 0xCFDB))
        {
            return ("군");
        }
        // 굴
        else if ((chHanja >= 0xCFDC && chHanja <= 0xCFDF))
        {
            return ("굴");
        }
        // 궁
        else if ((chHanja >= 0xCFE0 && chHanja <= 0xCFE5))
        {
            return ("궁");
        }
        // 권
        else if ((chHanja >= 0xCFE6 && chHanja <= 0xCFEF))
        {
            return ("권");
        }
        // 궐
        else if ((chHanja >= 0xCFF0 && chHanja <= 0xCFF4))
        {
            return ("궐");
        }
        // 궤
        else if ((chHanja >= 0xCFF5 && chHanja <= 0xCFFA))
        {
            return ("궤");
        }
        // 귀
        else if ((chHanja >= 0xCFFB && chHanja <= 0xD0A2))
        {
            return ("귀");
        }
        // 규
        else if ((chHanja >= 0xD0A3 && chHanja <= 0xD0B1))
        {
            return ("규");
        }
        // 균
        else if ((chHanja >= 0xD0B2 && chHanja <= 0xD0B8))
        {
            return ("균");
        }
        // 귤
        else if ((chHanja >= 0xD0B9 && chHanja <= 0xD0B9))
        {
            return ("귤");
        }
        // 극
        else if ((chHanja >= 0xD0BA && chHanja <= 0xD0C0))
        {
            return ("극");
        }
        // 근
        else if ((chHanja >= 0xD0C1 && chHanja <= 0xD0CF))
        {
            return ("근");
        }
        // 글
        else if ((chHanja >= 0xD0D0 && chHanja <= 0xD0D0))
        {
            return ("글");
        }
        // 금
        else if ((chHanja >= 0xD0D1 && chHanja <= 0xD0DE))
        {
            return ("금");
        }
        // 급
        else if ((chHanja >= 0xD0DF && chHanja <= 0xD0E5))
        {
            return ("급");
        }
        // 긍
        else if ((chHanja >= 0xD0E6 && chHanja <= 0xD0E9))
        {
            return ("긍");
        }
        // 기
        else if ((chHanja >= 0xD0EA && chHanja <= 0xD1CB))
        {
            return ("기");
        }
        // 긴
        else if ((chHanja >= 0xD1CC && chHanja <= 0xD1CC))
        {
            return ("긴");
        }
        // 길
        else if ((chHanja >= 0xD1CD && chHanja <= 0xD1D0))
        {
            return ("길");
        }
        // 김
        else if ((chHanja >= 0xD1D1 && chHanja <= 0xD1D1))
        {
            return ("김");
        }
        // 끽
        else if ((chHanja >= 0xD1D2 && chHanja <= 0xD1D2))
        {
            return ("끽");
        }
        // 나
        else if ((chHanja >= 0xD1D3 && chHanja <= 0xD1E1))
        {
            return ("나");
        }
        // 낙
        else if ((chHanja >= 0xD1E2 && chHanja <= 0xD1E9))
        {
            return ("낙");
        }
        // 난
        else if ((chHanja >= 0xD1EA && chHanja <= 0xD1F2))
        {
            return ("난");
        }
        // 날
        else if ((chHanja >= 0xD1F3 && chHanja <= 0xD1F4))
        {
            return ("날");
        }
        // 남
        else if ((chHanja >= 0xD1F5 && chHanja <= 0xD1FD))
        {
            return ("남");
        }
        // 납
        else if ((chHanja >= 0xD1FE && chHanja <= 0xD2A4))
        {
            return ("납");
        }
        // 낭
        else if ((chHanja >= 0xD2A5 && chHanja <= 0xD2AB))
        {
            return ("낭");
        }
        // 내
        else if ((chHanja >= 0xD2AC && chHanja <= 0xD2B1))
        {
            return ("내");
        }
        // 냉
        else if ((chHanja >= 0xD2B2 && chHanja <= 0xD2B2))
        {
            return ("냉");
        }
        // 녀
        else if ((chHanja >= 0xD2B3 && chHanja <= 0xD2B3))
        {
            return ("녀");
        }
        // 년
        else if ((chHanja >= 0xD2B4 && chHanja <= 0xD2B6))
        {
            return ("년");
        }
        // 념
        else if ((chHanja >= 0xD2B7 && chHanja <= 0xD2BA))
        {
            return ("념");
        }
        // 녕
        else if ((chHanja >= 0xD2BB && chHanja <= 0xD2BC))
        {
            return ("녕");
        }
        // 노
        else if ((chHanja >= 0xD2BD && chHanja <= 0xD2CE))
        {
            return ("노");
        }
        // 녹
        else if ((chHanja >= 0xD2CF && chHanja <= 0xD2D4))
        {
            return ("녹");
        }
        // 논
        else if ((chHanja >= 0xD2D5 && chHanja <= 0xD2D5))
        {
            return ("논");
        }
        // 농
        else if ((chHanja >= 0xD2D6 && chHanja <= 0xD2DC))
        {
            return ("농");
        }
        // 뇌
        else if ((chHanja >= 0xD2DD && chHanja <= 0xD2E2))
        {
            return ("뇌");
        }
        // 뇨
        else if ((chHanja >= 0xD2E3 && chHanja <= 0xD2E3))
        {
            return ("뇨");
        }
        // 누
        else if ((chHanja >= 0xD2E4 && chHanja <= 0xD2EB))
        {
            return ("누");
        }
        // 눈
        else if ((chHanja >= 0xD2EC && chHanja <= 0xD2EC))
        {
            return ("눈");
        }
        // 눌
        else if ((chHanja >= 0xD2ED && chHanja <= 0xD2ED))
        {
            return ("눌");
        }
        // 뉴
        else if ((chHanja >= 0xD2EE && chHanja <= 0xD2EF))
        {
            return ("뉴");
        }
        // 늑
        else if ((chHanja >= 0xD2F0 && chHanja <= 0xD2F1))
        {
            return ("늑");
        }
        // 늠
        else if ((chHanja >= 0xD2F2 && chHanja <= 0xD2F2))
        {
            return ("늠");
        }
        // 능
        else if ((chHanja >= 0xD2F3 && chHanja <= 0xD2F8))
        {
            return ("능");
        }
        // 니
        else if ((chHanja >= 0xD2F9 && chHanja <= 0xD2FA))
        {
            return ("니");
        }
        // 닉
        else if ((chHanja >= 0xD2FB && chHanja <= 0xD2FC))
        {
            return ("닉");
        }
        // 다
        else if ((chHanja >= 0xD2FD && chHanja <= 0xD2FE))
        {
            return ("다");
        }
        // 단
        else if ((chHanja >= 0xD3A1 && chHanja <= 0xD3B4))
        {
            return ("단");
        }
        // 달
        else if ((chHanja >= 0xD3B5 && chHanja <= 0xD3B9))
        {
            return ("달");
        }
        // 담
        else if ((chHanja >= 0xD3BA && chHanja <= 0xD3CA))
        {
            return ("담");
        }
        // 답
        else if ((chHanja >= 0xD3CB && chHanja <= 0xD3CF))
        {
            return ("답");
        }
        // 당
        else if ((chHanja >= 0xD3D0 && chHanja <= 0xD3DA))
        {
            return ("당");
        }
        // 대
        else if ((chHanja >= 0xD3DB && chHanja <= 0xD3EA))
        {
            return ("대");
        }
        // 댁
        else if ((chHanja >= 0xD3EB && chHanja <= 0xD3EB))
        {
            return ("댁");
        }
        // 덕
        else if ((chHanja >= 0xD3EC && chHanja <= 0xD3ED))
        {
            return ("덕");
        }
        // 도
        else if ((chHanja >= 0xD3EE && chHanja <= 0xD4B7))
        {
            return ("도");
        }
        // 독
        else if ((chHanja >= 0xD4B8 && chHanja <= 0xD4C1))
        {
            return ("독");
        }
        // 돈
        else if ((chHanja >= 0xD4C2 && chHanja <= 0xD4CB))
        {
            return ("돈");
        }
        // 돌
        else if ((chHanja >= 0xD4CC && chHanja <= 0xD4CD))
        {
            return ("돌");
        }
        // 동
        else if ((chHanja >= 0xD4CE && chHanja <= 0xD4DE))
        {
            return ("동");
        }
        // 두
        else if ((chHanja >= 0xD4DF && chHanja <= 0xD4E9))
        {
            return ("두");
        }
        // 둔
        else if ((chHanja >= 0xD4EA && chHanja <= 0xD4EF))
        {
            return ("둔");
        }
        // 득
        else if ((chHanja >= 0xD4F0 && chHanja <= 0xD4F0))
        {
            return ("득");
        }
        // 등
        else if ((chHanja >= 0xD4F1 && chHanja <= 0xD4F9))
        {
            return ("등");
        }
        // 라
        else if ((chHanja >= 0xD4FA && chHanja <= 0xD5A4))
        {
            return ("라");
        }
        // 락
        else if ((chHanja >= 0xD5A5 && chHanja <= 0xD5AD))
        {
            return ("락");
        }
        // 란
        else if ((chHanja >= 0xD5AE && chHanja <= 0xD5B6))
        {
            return ("란");
        }
        // 랄
        else if ((chHanja >= 0xD5B7 && chHanja <= 0xD5B8))
        {
            return ("랄");
        }
        // 람
        else if ((chHanja >= 0xD5B9 && chHanja <= 0xD5C2))
        {
            return ("람");
        }
        // 랍
        else if ((chHanja >= 0xD5C3 && chHanja <= 0xD5C5))
        {
            return ("랍");
        }
        // 랑
        else if ((chHanja >= 0xD5C6 && chHanja <= 0xD5CD))
        {
            return ("랑");
        }
        // 래
        else if ((chHanja >= 0xD5CE && chHanja <= 0xD5D1))
        {
            return ("래");
        }
        // 랭
        else if ((chHanja >= 0xD5D2 && chHanja <= 0xD5D2))
        {
            return ("랭");
        }
        // 략
        else if ((chHanja >= 0xD5D3 && chHanja <= 0xD5D4))
        {
            return ("략");
        }
        // 량
        else if ((chHanja >= 0xD5D5 && chHanja <= 0xD5E1))
        {
            return ("량");
        }
        // 려
        else if ((chHanja >= 0xD5E2 && chHanja <= 0xD5F3))
        {
            return ("려");
        }
        // 력
        else if ((chHanja >= 0xD5F4 && chHanja <= 0xD5FA))
        {
            return ("력");
        }
        // 련
        else if ((chHanja >= 0xD5FB && chHanja <= 0xD6A8))
        {
            return ("련");
        }
        // 렬
        else if ((chHanja >= 0xD6A9 && chHanja <= 0xD6AE))
        {
            return ("렬");
        }
        // 렴
        else if ((chHanja >= 0xD6AF && chHanja <= 0xD6B3))
        {
            return ("렴");
        }
        // 렵
        else if ((chHanja >= 0xD6B4 && chHanja <= 0xD6B4))
        {
            return ("렵");
        }
        // 령
        else if ((chHanja >= 0xD6B5 && chHanja <= 0xD6C6))
        {
            return ("령");
        }
        // 례
        else if ((chHanja >= 0xD6C7 && chHanja <= 0xD6CB))
        {
            return ("례");
        }
        // 로
        else if ((chHanja >= 0xD6CC && chHanja <= 0xD6DD))
        {
            return ("로");
        }
        // 록
        else if ((chHanja >= 0xD6DE && chHanja <= 0xD6E4))
        {
            return ("록");
        }
        // 론
        else if ((chHanja >= 0xD6E5 && chHanja <= 0xD6E5))
        {
            return ("론");
        }
        // 롱
        else if ((chHanja >= 0xD6E6 && chHanja <= 0xD6EC))
        {
            return ("롱");
        }
        // 뢰
        else if ((chHanja >= 0xD6ED && chHanja <= 0xD6F4))
        {
            return ("뢰");
        }
        // 료
        else if ((chHanja >= 0xD6F5 && chHanja <= 0xD7A2))
        {
            return ("료");
        }
        // 룡
        else if ((chHanja >= 0xD7A3 && chHanja <= 0xD7A3))
        {
            return ("룡");
        }
        // 루
        else if ((chHanja >= 0xD7A4 && chHanja <= 0xD7B0))
        {
            return ("루");
        }
        // 류
        else if ((chHanja >= 0xD7B1 && chHanja <= 0xD7BE))
        {
            return ("류");
        }
        // 륙
        else if ((chHanja >= 0xD7BF && chHanja <= 0xD7C1))
        {
            return ("륙");
        }
        // 륜
        else if ((chHanja >= 0xD7C2 && chHanja <= 0xD7C7))
        {
            return ("륜");
        }
        // 률
        else if ((chHanja >= 0xD7C8 && chHanja <= 0xD7CB))
        {
            return ("률");
        }
        // 륭
        else if ((chHanja >= 0xD7CC && chHanja <= 0xD7CC))
        {
            return ("륭");
        }
        // 륵
        else if ((chHanja >= 0xD7CD && chHanja <= 0xD7CE))
        {
            return ("륵");
        }
        // 름
        else if ((chHanja >= 0xD7CF && chHanja <= 0xD7CF))
        {
            return ("름");
        }
        // 릉
        else if ((chHanja >= 0xD7D0 && chHanja <= 0xD7D5))
        {
            return ("릉");
        }
        // 리
        else if ((chHanja >= 0xD7D6 && chHanja <= 0xD7EF))
        {
            return ("리");
        }
        // 린
        else if ((chHanja >= 0xD7F0 && chHanja <= 0xD7F8))
        {
            return ("린");
        }
        // 림
        else if ((chHanja >= 0xD7F9 && chHanja <= 0xD7FD))
        {
            return ("림");
        }
        // 립
        else if ((chHanja >= 0xD7FE && chHanja <= 0xD8A3))
        {
            return ("립");
        }
        // 마
        else if ((chHanja >= 0xD8A4 && chHanja <= 0xD8AB))
        {
            return ("마");
        }
        // 막
        else if ((chHanja >= 0xD8AC && chHanja <= 0xD8B1))
        {
            return ("막");
        }
        // 만
        else if ((chHanja >= 0xD8B2 && chHanja <= 0xD8C4))
        {
            return ("만");
        }
        // 말
        else if ((chHanja >= 0xD8C5 && chHanja <= 0xD8CB))
        {
            return ("말");
        }
        // 망
        else if ((chHanja >= 0xD8CC && chHanja <= 0xD8D7))
        {
            return ("망");
        }
        // 매
        else if ((chHanja >= 0xD8D8 && chHanja <= 0xD8E5))
        {
            return ("매");
        }
        // 맥
        else if ((chHanja >= 0xD8E6 && chHanja <= 0xD8EA))
        {
            return ("맥");
        }
        // 맹
        else if ((chHanja >= 0xD8EB && chHanja <= 0xD8F0))
        {
            return ("맹");
        }
        // 멱
        else if ((chHanja >= 0xD8F1 && chHanja <= 0xD8F2))
        {
            return ("멱");
        }
        // 면
        else if ((chHanja >= 0xD8F3 && chHanja <= 0xD8FD))
        {
            return ("면");
        }
        // 멸
        else if ((chHanja >= 0xD8FE && chHanja <= 0xD9A1))
        {
            return ("멸");
        }
        // 명
        else if ((chHanja >= 0xD9A2 && chHanja <= 0xD9B0))
        {
            return ("명");
        }
        // 몌
        else if ((chHanja >= 0xD9B1 && chHanja <= 0xD9B1))
        {
            return ("몌");
        }
        // 모
        else if ((chHanja >= 0xD9B2 && chHanja <= 0xD9C9))
        {
            return ("모");
        }
        // 목
        else if ((chHanja >= 0xD9CA && chHanja <= 0xD9D0))
        {
            return ("목");
        }
        // 몰
        else if ((chHanja >= 0xD9D1 && chHanja <= 0xD9D2))
        {
            return ("몰");
        }
        // 몽
        else if ((chHanja >= 0xD9D3 && chHanja <= 0xD9D5))
        {
            return ("몽");
        }
        // 묘
        else if ((chHanja >= 0xD9D6 && chHanja <= 0xD9E1))
        {
            return ("묘");
        }
        // 무
        else if ((chHanja >= 0xD9E2 && chHanja <= 0xD9F7))
        {
            return ("무");
        }
        // 묵
        else if ((chHanja >= 0xD9F8 && chHanja <= 0xD9F9))
        {
            return ("묵");
        }
        // 문
        else if ((chHanja >= 0xD9FA && chHanja <= 0xDAA7))
        {
            return ("문");
        }
        // 물
        else if ((chHanja >= 0xDAA8 && chHanja <= 0xDAAA))
        {
            return ("물");
        }
        // 미
        else if ((chHanja >= 0xDAAB && chHanja <= 0xDABD))
        {
            return ("미");
        }
        // 민
        else if ((chHanja >= 0xDABE && chHanja <= 0xDACA))
        {
            return ("민");
        }
        // 밀
        else if ((chHanja >= 0xDACB && chHanja <= 0xDACD))
        {
            return ("밀");
        }
        // 박
        else if ((chHanja >= 0xDACE && chHanja <= 0xDAE0))
        {
            return ("박");
        }
        // 반
        else if ((chHanja >= 0xDAE1 && chHanja <= 0xDAF9))
        {
            return ("반");
        }
        // 발
        else if ((chHanja >= 0xDAFA && chHanja <= 0xDBA6))
        {
            return ("발");
        }
        // 방
        else if ((chHanja >= 0xDBA7 && chHanja <= 0xDBC2))
        {
            return ("방");
        }
        // 배
        else if ((chHanja >= 0xDBC3 && chHanja <= 0xDBD6))
        {
            return ("배");
        }
        // 백
        else if ((chHanja >= 0xDBD7 && chHanja <= 0xDBDE))
        {
            return ("백");
        }
        // 번
        else if ((chHanja >= 0xDBDF && chHanja <= 0xDBE8))
        {
            return ("번");
        }
        // 벌
        else if ((chHanja >= 0xDBE9 && chHanja <= 0xDBEC))
        {
            return ("벌");
        }
        // 범
        else if ((chHanja >= 0xDBED && chHanja <= 0xDBF5))
        {
            return ("범");
        }
        // 법
        else if ((chHanja >= 0xDBF6 && chHanja <= 0xDBF7))
        {
            return ("법");
        }
        // 벽
        else if ((chHanja >= 0xDBF8 && chHanja <= 0xDCA4))
        {
            return ("벽");
        }
        // 변
        else if ((chHanja >= 0xDCA5 && chHanja <= 0xDCAB))
        {
            return ("변");
        }
        // 별
        else if ((chHanja >= 0xDCAC && chHanja <= 0xDCAF))
        {
            return ("별");
        }
        // 병
        else if ((chHanja >= 0xDCB0 && chHanja <= 0xDCC0))
        {
            return ("병");
        }
        // 보
        else if ((chHanja >= 0xDCC1 && chHanja <= 0xDCD0))
        {
            return ("보");
        }
        // 복
        else if ((chHanja >= 0xDCD1 && chHanja <= 0xDCE1))
        {
            return ("복");
        }
        // 본
        else if ((chHanja >= 0xDCE2 && chHanja <= 0xDCE2))
        {
            return ("본");
        }
        // 볼
        else if ((chHanja >= 0xDCE3 && chHanja <= 0xDCE3))
        {
            return ("볼");
        }
        // 봉
        else if ((chHanja >= 0xDCE4 && chHanja <= 0xDCF3))
        {
            return ("봉");
        }
        // 부
        else if ((chHanja >= 0xDCF4 && chHanja <= 0xDDC0))
        {
            return ("부");
        }
        // 북
        else if ((chHanja >= 0xDDC1 && chHanja <= 0xDDC1))
        {
            return ("북");
        }
        // 분
        else if ((chHanja >= 0xDDC2 && chHanja <= 0xDDD4))
        {
            return ("분");
        }
        // 불
        else if ((chHanja >= 0xDDD5 && chHanja <= 0xDDD9))
        {
            return ("불");
        }
        // 붕
        else if ((chHanja >= 0xDDDA && chHanja <= 0xDDDF))
        {
            return ("붕");
        }
        // 비
        else if ((chHanja >= 0xDDE0 && chHanja <= 0xDEAC))
        {
            return ("비");
        }
        // 빈
        else if ((chHanja >= 0xDEAD && chHanja <= 0xDEBA))
        {
            return ("빈");
        }
        // 빙
        else if ((chHanja >= 0xDEBB && chHanja <= 0xDEBE))
        {
            return ("빙");
        }
        // 사
        else if ((chHanja >= 0xDEBF && chHanja <= 0xDEFA))
        {
            return ("사");
        }
        // 삭
        else if ((chHanja >= 0xDEFB && chHanja <= 0xDEFE))
        {
            return ("삭");
        }
        // 산
        else if ((chHanja >= 0xDFA0 && chHanja <= 0xDFAC))
        {
            return ("산");
        }
        // 살
        else if ((chHanja >= 0xDFAD && chHanja <= 0xDFB1))
        {
            return ("살");
        }
        // 삼
        else if ((chHanja >= 0xDFB2 && chHanja <= 0xDFB9))
        {
            return ("삼");
        }
        // 삽
        else if ((chHanja >= 0xDFBA && chHanja <= 0xDFBD))
        {
            return ("삽");
        }
        // 상
        else if ((chHanja >= 0xDFBE && chHanja <= 0xDFDC))
        {
            return ("상");
        }
        // 새
        else if ((chHanja >= 0xDFDD && chHanja <= 0xDFDF))
        {
            return ("새");
        }
        // 색
        else if ((chHanja >= 0xDFE0 && chHanja <= 0xDFE4))
        {
            return ("색");
        }
        // 생
        else if ((chHanja >= 0xDFE5 && chHanja <= 0xDFE9))
        {
            return ("생");
        }
        // 서
        else if ((chHanja >= 0xDFEA && chHanja <= 0xE0A9))
        {
            return ("서");
        }
        // 석
        else if ((chHanja >= 0xE0AA && chHanja <= 0xE0B8))
        {
            return ("석");
        }
        // 선
        else if ((chHanja >= 0xE0B9 && chHanja <= 0xE0D8))
        {
            return ("선");
        }
        // 설
        else if ((chHanja >= 0xE0D9 && chHanja <= 0xE0E5))
        {
            return ("설");
        }
        // 섬
        else if ((chHanja >= 0xE0E6 && chHanja <= 0xE0ED))
        {
            return ("섬");
        }
        // 섭
        else if ((chHanja >= 0xE0EE && chHanja <= 0xE0F1))
        {
            return ("섭");
        }
        // 성
        else if ((chHanja >= 0xE0F2 && chHanja <= 0xE1A5))
        {
            return ("성");
        }
        // 세
        else if ((chHanja >= 0xE1A6 && chHanja <= 0xE1AE))
        {
            return ("세");
        }
        // 소
        else if ((chHanja >= 0xE1AF && chHanja <= 0xE1D3))
        {
            return ("소");
        }
        // 속
        else if ((chHanja >= 0xE1D4 && chHanja <= 0xE1DC))
        {
            return ("속");
        }
        // 손
        else if ((chHanja >= 0xE1DD && chHanja <= 0xE1E2))
        {
            return ("손");
        }
        // 솔
        else if ((chHanja >= 0xE1E3 && chHanja <= 0xE1E3))
        {
            return ("솔");
        }
        // 송
        else if ((chHanja >= 0xE1E4 && chHanja <= 0xE1EB))
        {
            return ("송");
        }
        // 쇄
        else if ((chHanja >= 0xE1EC && chHanja <= 0xE1F0))
        {
            return ("쇄");
        }
        // 쇠
        else if ((chHanja >= 0xE1F1 && chHanja <= 0xE1F2))
        {
            return ("쇠");
        }
        // 수
        else if ((chHanja >= 0xE1F3 && chHanja <= 0xE2D1))
        {
            return ("수");
        }
        // 숙
        else if ((chHanja >= 0xE2D2 && chHanja <= 0xE2DD))
        {
            return ("숙");
        }
        // 순
        else if ((chHanja >= 0xE2DE && chHanja <= 0xE2F8))
        {
            return ("순");
        }
        // 술
        else if ((chHanja >= 0xE2F9 && chHanja <= 0xE2FC))
        {
            return ("술");
        }
        // 숭
        else if ((chHanja >= 0xE2FD && chHanja <= 0xE3A1))
        {
            return ("숭");
        }
        // 슬
        else if ((chHanja >= 0xE3A2 && chHanja <= 0xE3A4))
        {
            return ("슬");
        }
        // 습
        else if ((chHanja >= 0xE3A5 && chHanja <= 0xE3A9))
        {
            return ("습");
        }
        // 승
        else if ((chHanja >= 0xE3AA && chHanja <= 0xE3B3))
        {
            return ("승");
        }
        // 시
        else if ((chHanja >= 0xE3B4 && chHanja <= 0xE3CF))
        {
            return ("시");
        }
        // 식
        else if ((chHanja >= 0xE3D0 && chHanja <= 0xE3DE))
        {
            return ("식");
        }
        // 신
        else if ((chHanja >= 0xE3DF && chHanja <= 0xE3F6))
        {
            return ("신");
        }
        // 실
        else if ((chHanja >= 0xE3F7 && chHanja <= 0xE3FA))
        {
            return ("실");
        }
        // 심
        else if ((chHanja >= 0xE3FB && chHanja <= 0xE4A6))
        {
            return ("심");
        }
        // 십
        else if ((chHanja >= 0xE4A7 && chHanja <= 0xE4A9))
        {
            return ("십");
        }
        // 쌍
        else if ((chHanja >= 0xE4AA && chHanja <= 0xE4AA))
        {
            return ("쌍");
        }
        // 씨
        else if ((chHanja >= 0xE4AB && chHanja <= 0xE4AB))
        {
            return ("씨");
        }
        // 아
        else if ((chHanja >= 0xE4AC && chHanja <= 0xE4BD))
        {
            return ("아");
        }
        // 악
        else if ((chHanja >= 0xE4BE && chHanja <= 0xE4CB))
        {
            return ("악");
        }
        // 안
        else if ((chHanja >= 0xE4CC && chHanja <= 0xE4D5))
        {
            return ("안");
        }
        // 알
        else if ((chHanja >= 0xE4D6 && chHanja <= 0xE4D9))
        {
            return ("알");
        }
        // 암
        else if ((chHanja >= 0xE4DA && chHanja <= 0xE4E1))
        {
            return ("암");
        }
        // 압
        else if ((chHanja >= 0xE4E2 && chHanja <= 0xE4E5))
        {
            return ("압");
        }
        // 앙
        else if ((chHanja >= 0xE4E6 && chHanja <= 0xE4EC))
        {
            return ("앙");
        }
        // 애
        else if ((chHanja >= 0xE4ED && chHanja <= 0xE4F7))
        {
            return ("애");
        }
        // 액
        else if ((chHanja >= 0xE4F8 && chHanja <= 0xE4FE))
        {
            return ("액");
        }
        // 앵
        else if ((chHanja >= 0xE5A1 && chHanja <= 0xE5A4))
        {
            return ("앵");
        }
        // 야
        else if ((chHanja >= 0xE5A5 && chHanja <= 0xE5AF))
        {
            return ("야");
        }
        // 약
        else if ((chHanja >= 0xE5B0 && chHanja <= 0xE5B8))
        {
            return ("약");
        }
        // 양
        else if ((chHanja >= 0xE5B9 && chHanja <= 0xE5D7))
        {
            return ("양");
        }
        // 어
        else if ((chHanja >= 0xE5D8 && chHanja <= 0xE5E1))
        {
            return ("어");
        }
        // 억
        else if ((chHanja >= 0xE5E2 && chHanja <= 0xE5E6))
        {
            return ("억");
        }
        // 언
        else if ((chHanja >= 0xE5E7 && chHanja <= 0xE5EC))
        {
            return ("언");
        }
        // 얼
        else if ((chHanja >= 0xE5ED && chHanja <= 0xE5EE))
        {
            return ("얼");
        }
        // 엄
        else if ((chHanja >= 0xE5EF && chHanja <= 0xE5F4))
        {
            return ("엄");
        }
        // 업
        else if ((chHanja >= 0xE5F5 && chHanja <= 0xE5F6))
        {
            return ("업");
        }
        // 엔
        else if ((chHanja >= 0xE5F7 && chHanja <= 0xE5F7))
        {
            return ("엔");
        }
        // 여
        else if ((chHanja >= 0xE5F8 && chHanja <= 0xE6B1))
        {
            return ("여");
        }
        // 역
        else if ((chHanja >= 0xE6B2 && chHanja <= 0xE6BE))
        {
            return ("역");
        }
        // 연
        else if ((chHanja >= 0xE6BF && chHanja <= 0xE6E9))
        {
            return ("연");
        }
        // 열
        else if ((chHanja >= 0xE6EA && chHanja <= 0xE6F3))
        {
            return ("열");
        }
        // 염
        else if ((chHanja >= 0xE6F4 && chHanja <= 0xE7A4))
        {
            return ("염");
        }
        // 엽
        else if ((chHanja >= 0xE7A5 && chHanja <= 0xE7A8))
        {
            return ("엽");
        }
        // 영
        else if ((chHanja >= 0xE7A9 && chHanja <= 0xE7D0))
        {
            return ("영");
        }
        // 예
        else if ((chHanja >= 0xE7D1 && chHanja <= 0xE7E8))
        {
            return ("예");
        }
        // 오
        else if ((chHanja >= 0xE7E9 && chHanja <= 0xE8A8))
        {
            return ("오");
        }
        // 옥
        else if ((chHanja >= 0xE8A9 && chHanja <= 0xE8AD))
        {
            return ("옥");
        }
        // 온
        else if ((chHanja >= 0xE8AE && chHanja <= 0xE8B3))
        {
            return ("온");
        }
        // 올
        else if ((chHanja >= 0xE8B4 && chHanja <= 0xE8B4))
        {
            return ("올");
        }
        // 옹
        else if ((chHanja >= 0xE8B5 && chHanja <= 0xE8BD))
        {
            return ("옹");
        }
        // 와
        else if ((chHanja >= 0xE8BE && chHanja <= 0xE8C5))
        {
            return ("와");
        }
        // 완
        else if ((chHanja >= 0xE8C6 && chHanja <= 0xE8D7))
        {
            return ("완");
        }
        // 왈
        else if ((chHanja >= 0xE8D8 && chHanja <= 0xE8D8))
        {
            return ("왈");
        }
        // 왕
        else if ((chHanja >= 0xE8D9 && chHanja <= 0xE8DD))
        {
            return ("왕");
        }
        // 왜
        else if ((chHanja >= 0xE8DE && chHanja <= 0xE8E1))
        {
            return ("왜");
        }
        // 외
        else if ((chHanja >= 0xE8E2 && chHanja <= 0xE8E6))
        {
            return ("외");
        }
        // 요
        else if ((chHanja >= 0xE8E7 && chHanja <= 0xE9AE))
        {
            return ("요");
        }
        // 욕
        else if ((chHanja >= 0xE9AF && chHanja <= 0xE9B4))
        {
            return ("욕");
        }
        // 용
        else if ((chHanja >= 0xE9B5 && chHanja <= 0xE9CC))
        {
            return ("용");
        }
        // 우
        else if ((chHanja >= 0xE9CD && chHanja <= 0xE9EC))
        {
            return ("우");
        }
        // 욱
        else if ((chHanja >= 0xE9ED && chHanja <= 0xE9F5))
        {
            return ("욱");
        }
        // 운
        else if ((chHanja >= 0xE9F6 && chHanja <= 0xEAA4))
        {
            return ("운");
        }
        // 울
        else if ((chHanja >= 0xEAA5 && chHanja <= 0xEAA7))
        {
            return ("울");
        }
        // 웅
        else if ((chHanja >= 0xEAA8 && chHanja <= 0xEAA9))
        {
            return ("웅");
        }
        // 원
        else if ((chHanja >= 0xEAAA && chHanja <= 0xEAC4))
        {
            return ("원");
        }
        // 월
        else if ((chHanja >= 0xEAC5 && chHanja <= 0xEAC7))
        {
            return ("월");
        }
        // 위
        else if ((chHanja >= 0xEAC8 && chHanja <= 0xEAE0))
        {
            return ("위");
        }
        // 유
        else if ((chHanja >= 0xEAE1 && chHanja <= 0xEBBA))
        {
            return ("유");
        }
        // 육
        else if ((chHanja >= 0xEBBB && chHanja <= 0xEBC1))
        {
            return ("육");
        }
        // 윤
        else if ((chHanja >= 0xEBC2 && chHanja <= 0xEBCE))
        {
            return ("윤");
        }
        // 율
        else if ((chHanja >= 0xEBCF && chHanja <= 0xEBD3))
        {
            return ("율");
        }
        // 융
        else if ((chHanja >= 0xEBD4 && chHanja <= 0xEBD8))
        {
            return ("융");
        }
        // 은
        else if ((chHanja >= 0xEBD9 && chHanja <= 0xEBDF))
        {
            return ("은");
        }
        // 을
        else if ((chHanja >= 0xEBE0 && chHanja <= 0xEBE0))
        {
            return ("을");
        }
        // 음
        else if ((chHanja >= 0xEBE1 && chHanja <= 0xEBE6))
        {
            return ("음");
        }
        // 읍
        else if ((chHanja >= 0xEBE7 && chHanja <= 0xEBE9))
        {
            return ("읍");
        }
        // 응
        else if ((chHanja >= 0xEBEA && chHanja <= 0xEBED))
        {
            return ("응");
        }
        // 의
        else if ((chHanja >= 0xEBEE && chHanja <= 0xECA2))
        {
            return ("의");
        }
        // 이
        else if ((chHanja >= 0xECA3 && chHanja <= 0xECC8))
        {
            return ("이");
        }
        // 익
        else if ((chHanja >= 0xECC9 && chHanja <= 0xECD0))
        {
            return ("익");
        }
        // 인
        else if ((chHanja >= 0xECD1 && chHanja <= 0xECE8))
        {
            return ("인");
        }
        // 일
        else if ((chHanja >= 0xECE9 && chHanja <= 0xECF1))
        {
            return ("일");
        }
        // 임
        else if ((chHanja >= 0xECF2 && chHanja <= 0xECFC))
        {
            return ("임");
        }
        // 입
        else if ((chHanja >= 0xECFD && chHanja <= 0xEDA3))
        {
            return ("입");
        }
        // 잉
        else if ((chHanja >= 0xEDA4 && chHanja <= 0xEDA7))
        {
            return ("잉");
        }
        // 자
        else if ((chHanja >= 0xEDA8 && chHanja <= 0xEDC1))
        {
            return ("자");
        }
        // 작
        else if ((chHanja >= 0xEDC2 && chHanja <= 0xEDCE))
        {
            return ("작");
        }
        // 잔
        else if ((chHanja >= 0xEDCF && chHanja <= 0xEDD3))
        {
            return ("잔");
        }
        // 잠
        else if ((chHanja >= 0xEDD4 && chHanja <= 0xEDD9))
        {
            return ("잠");
        }
        // 잡
        else if ((chHanja >= 0xEDDA && chHanja <= 0xEDDA))
        {
            return ("잡");
        }
        // 장
        else if ((chHanja >= 0xEDDB && chHanja <= 0xEEA1))
        {
            return ("장");
        }
        // 재
        else if ((chHanja >= 0xEEA2 && chHanja <= 0xEEB2))
        {
            return ("재");
        }
        // 쟁
        else if ((chHanja >= 0xEEB3 && chHanja <= 0xEEB6))
        {
            return ("쟁");
        }
        // 저
        else if ((chHanja >= 0xEEB7 && chHanja <= 0xEED2))
        {
            return ("저");
        }
        // 적
        else if ((chHanja >= 0xEED3 && chHanja <= 0xEEEB))
        {
            return ("적");
        }
        // 전
        else if ((chHanja >= 0xEEEC && chHanja <= 0xEFB6))
        {
            return ("전");
        }
        // 절
        else if ((chHanja >= 0xEFB7 && chHanja <= 0xEFBE))
        {
            return ("절");
        }
        // 점
        else if ((chHanja >= 0xEFBF && chHanja <= 0xEFC7))
        {
            return ("점");
        }
        // 접
        else if ((chHanja >= 0xEFC8 && chHanja <= 0xEFCA))
        {
            return ("접");
        }
        // 정
        else if ((chHanja >= 0xEFCB && chHanja <= 0xF0A3))
        {
            return ("정");
        }
        // 제
        else if ((chHanja >= 0xF0A4 && chHanja <= 0xF0BA))
        {
            return ("제");
        }
        // 조
        else if ((chHanja >= 0xF0BB && chHanja <= 0xF0E8))
        {
            return ("조");
        }
        // 족
        else if ((chHanja >= 0xF0E9 && chHanja <= 0xF0EC))
        {
            return ("족");
        }
        // 존
        else if ((chHanja >= 0xF0ED && chHanja <= 0xF0EE))
        {
            return ("존");
        }
        // 졸
        else if ((chHanja >= 0xF0EF && chHanja <= 0xF0F1))
        {
            return ("졸");
        }
        // 종
        else if ((chHanja >= 0xF0F2 && chHanja <= 0xF1A4))
        {
            return ("종");
        }
        // 좌
        else if ((chHanja >= 0xF1A5 && chHanja <= 0xF1A9))
        {
            return ("좌");
        }
        // 죄
        else if ((chHanja >= 0xF1AA && chHanja <= 0xF1AA))
        {
            return ("죄");
        }
        // 주
        else if ((chHanja >= 0xF1AB && chHanja <= 0xF1D2))
        {
            return ("주");
        }
        // 죽
        else if ((chHanja >= 0xF1D3 && chHanja <= 0xF1D4))
        {
            return ("죽");
        }
        // 준
        else if ((chHanja >= 0xF1D5 && chHanja <= 0xF1E7))
        {
            return ("준");
        }
        // 줄
        else if ((chHanja >= 0xF1E8 && chHanja <= 0xF1E8))
        {
            return ("줄");
        }
        // 중
        else if ((chHanja >= 0xF1E9 && chHanja <= 0xF1EC))
        {
            return ("중");
        }
        // 즉
        else if ((chHanja >= 0xF1ED && chHanja <= 0xF1ED))
        {
            return ("즉");
        }
        // 즐
        else if ((chHanja >= 0xF1EE && chHanja <= 0xF1EE))
        {
            return ("즐");
        }
        // 즙
        else if ((chHanja >= 0xF1EF && chHanja <= 0xF1F1))
        {
            return ("즙");
        }
        // 증
        else if ((chHanja >= 0xF1F2 && chHanja <= 0xF1FC))
        {
            return ("증");
        }
        // 지
        else if ((chHanja >= 0xF1FD && chHanja <= 0xF2C0))
        {
            return ("지");
        }
        // 직
        else if ((chHanja >= 0xF2C1 && chHanja <= 0xF2C5))
        {
            return ("직");
        }
        // 진
        else if ((chHanja >= 0xF2C6 && chHanja <= 0xF2E8))
        {
            return ("진");
        }
        // 질
        else if ((chHanja >= 0xF2E9 && chHanja <= 0xF2F7))
        {
            return ("질");
        }
        // 짐
        else if ((chHanja >= 0xF2F8 && chHanja <= 0xF2F9))
        {
            return ("짐");
        }
        // 집
        else if ((chHanja >= 0xF2FA && chHanja <= 0xF3A2))
        {
            return ("집");
        }
        // 징
        else if ((chHanja >= 0xF3A3 && chHanja <= 0xF3A5))
        {
            return ("징");
        }
        // 차
        else if ((chHanja >= 0xF3A6 && chHanja <= 0xF3B4))
        {
            return ("차");
        }
        // 착
        else if ((chHanja >= 0xF3B5 && chHanja <= 0xF3BB))
        {
            return ("착");
        }
        // 찬
        else if ((chHanja >= 0xF3BC && chHanja <= 0xF3CA))
        {
            return ("찬");
        }
        // 찰
        else if ((chHanja >= 0xF3CB && chHanja <= 0xF3CF))
        {
            return ("찰");
        }
        // 참
        else if ((chHanja >= 0xF3D0 && chHanja <= 0xF3D9))
        {
            return ("참");
        }
        // 창
        else if ((chHanja >= 0xF3DA && chHanja <= 0xF3EF))
        {
            return ("창");
        }
        // 채
        else if ((chHanja >= 0xF3F0 && chHanja <= 0xF3FB))
        {
            return ("채");
        }
        // 책
        else if ((chHanja >= 0xF3FC && chHanja <= 0xF4A1))
        {
            return ("책");
        }
        // 처
        else if ((chHanja >= 0xF4A2 && chHanja <= 0xF4A5))
        {
            return ("처");
        }
        // 척
        else if ((chHanja >= 0xF4A6 && chHanja <= 0xF4B4))
        {
            return ("척");
        }
        // 천
        else if ((chHanja >= 0xF4B5 && chHanja <= 0xF4C7))
        {
            return ("천");
        }
        // 철
        else if ((chHanja >= 0xF4C8 && chHanja <= 0xF4D1))
        {
            return ("철");
        }
        // 첨
        else if ((chHanja >= 0xF4D2 && chHanja <= 0xF4DB))
        {
            return ("첨");
        }
        // 첩
        else if ((chHanja >= 0xF4DC && chHanja <= 0xF4E5))
        {
            return ("첩");
        }
        // 청
        else if ((chHanja >= 0xF4E6 && chHanja <= 0xF4ED))
        {
            return ("청");
        }
        // 체
        else if ((chHanja >= 0xF4EE && chHanja <= 0xF4F7))
        {
            return ("체");
        }
        // 초
        else if ((chHanja >= 0xF4F8 && chHanja <= 0xF5B4))
        {
            return ("초");
        }
        // 촉
        else if ((chHanja >= 0xF5B5 && chHanja <= 0xF5BA))
        {
            return ("촉");
        }
        // 촌
        else if ((chHanja >= 0xF5BB && chHanja <= 0xF5BE))
        {
            return ("촌");
        }
        // 총
        else if ((chHanja >= 0xF5BF && chHanja <= 0xF5C8))
        {
            return ("총");
        }
        // 촬
        else if ((chHanja >= 0xF5C9 && chHanja <= 0xF5C9))
        {
            return ("촬");
        }
        // 최
        else if ((chHanja >= 0xF5CA && chHanja <= 0xF5CC))
        {
            return ("최");
        }
        // 추
        else if ((chHanja >= 0xF5CD && chHanja <= 0xF5E3))
        {
            return ("추");
        }
        // 축
        else if ((chHanja >= 0xF5E4 && chHanja <= 0xF5EF))
        {
            return ("축");
        }
        // 춘
        else if ((chHanja >= 0xF5F0 && chHanja <= 0xF5F2))
        {
            return ("춘");
        }
        // 출
        else if ((chHanja >= 0xF5F3 && chHanja <= 0xF5F5))
        {
            return ("출");
        }
        // 충
        else if ((chHanja >= 0xF5F6 && chHanja <= 0xF5FB))
        {
            return ("충");
        }
        // 췌
        else if ((chHanja >= 0xF5FC && chHanja <= 0xF6A1))
        {
            return ("췌");
        }
        // 취
        else if ((chHanja >= 0xF6A2 && chHanja <= 0xF6AF))
        {
            return ("취");
        }
        // 측
        else if ((chHanja >= 0xF6B0 && chHanja <= 0xF6B4))
        {
            return ("측");
        }
        // 층
        else if ((chHanja >= 0xF6B5 && chHanja <= 0xF6B5))
        {
            return ("층");
        }
        // 치
        else if ((chHanja >= 0xF6B6 && chHanja <= 0xF6CD))
        {
            return ("치");
        }
        // 칙
        else if ((chHanja >= 0xF6CE && chHanja <= 0xF6D0))
        {
            return ("칙");
        }
        // 친
        else if ((chHanja >= 0xF6D1 && chHanja <= 0xF6D1))
        {
            return ("친");
        }
        // 칠
        else if ((chHanja >= 0xF6D2 && chHanja <= 0xF6D4))
        {
            return ("칠");
        }
        // 침
        else if ((chHanja >= 0xF6D5 && chHanja <= 0xF6DD))
        {
            return ("침");
        }
        // 칩
        else if ((chHanja >= 0xF6DE && chHanja <= 0xF6DE))
        {
            return ("칩");
        }
        // 칭
        else if ((chHanja >= 0xF6DF && chHanja <= 0xF6E0))
        {
            return ("칭");
        }
        // 쾌
        else if ((chHanja >= 0xF6E1 && chHanja <= 0xF6E1))
        {
            return ("쾌");
        }
        // 타
        else if ((chHanja >= 0xF6E2 && chHanja <= 0xF6EF))
        {
            return ("타");
        }
        // 탁
        else if ((chHanja >= 0xF6F0 && chHanja <= 0xF7A1))
        {
            return ("탁");
        }
        // 탄
        else if ((chHanja >= 0xF7A2 && chHanja <= 0xF7AB))
        {
            return ("탄");
        }
        // 탈
        else if ((chHanja >= 0xF7AC && chHanja <= 0xF7AD))
        {
            return ("탈");
        }
        // 탐
        else if ((chHanja >= 0xF7AE && chHanja <= 0xF7B1))
        {
            return ("탐");
        }
        // 탑
        else if ((chHanja >= 0xF7B2 && chHanja <= 0xF7B4))
        {
            return ("탑");
        }
        // 탕
        else if ((chHanja >= 0xF7B5 && chHanja <= 0xF7B9))
        {
            return ("탕");
        }
        // 태
        else if ((chHanja >= 0xF7BA && chHanja <= 0xF7C7))
        {
            return ("태");
        }
        // 택
        else if ((chHanja >= 0xF7C8 && chHanja <= 0xF7CA))
        {
            return ("택");
        }
        // 탱
        else if ((chHanja >= 0xF7CB && chHanja <= 0xF7CB))
        {
            return ("탱");
        }
        // 터
        else if ((chHanja >= 0xF7CC && chHanja <= 0xF7CC))
        {
            return ("터");
        }
        // 토
        else if ((chHanja >= 0xF7CD && chHanja <= 0xF7D0))
        {
            return ("토");
        }
        // 통
        else if ((chHanja >= 0xF7D1 && chHanja <= 0xF7D7))
        {
            return ("통");
        }
        // 퇴
        else if ((chHanja >= 0xF7D8 && chHanja <= 0xF7DD))
        {
            return ("퇴");
        }
        // 투
        else if ((chHanja >= 0xF7DE && chHanja <= 0xF7E3))
        {
            return ("투");
        }
        // 특
        else if ((chHanja >= 0xF7E4 && chHanja <= 0xF7E5))
        {
            return ("특");
        }
        // 틈
        else if ((chHanja >= 0xF7E6 && chHanja <= 0xF7E6))
        {
            return ("틈");
        }
        // 파
        else if ((chHanja >= 0xF7E7 && chHanja <= 0xF7F6))
        {
            return ("파");
        }
        // 판
        else if ((chHanja >= 0xF7F7 && chHanja <= 0xF8A1))
        {
            return ("판");
        }
        // 팔
        else if ((chHanja >= 0xF8A2 && chHanja <= 0xF8A4))
        {
            return ("팔");
        }
        // 패 
        else if ((chHanja >= 0xF8A5 && chHanja <= 0xF8AF))
        {
            return ("패");
        }
        // 팽
        else if ((chHanja >= 0xF8B0 && chHanja <= 0xF8B3))
        {
            return ("팽");
        }
        // 퍅
        else if ((chHanja >= 0xF8B4 && chHanja <= 0xF8B4))
        {
            return ("퍅");
        }
        // 편
        else if ((chHanja >= 0xF8B5 && chHanja <= 0xF8BE))
        {
            return ("편");
        }
        // 폄
        else if ((chHanja >= 0xF8BF && chHanja <= 0xF8BF))
        {
            return ("폄");
        }
        // 평
        else if ((chHanja >= 0xF8C0 && chHanja <= 0xF8C4))
        {
            return ("평");
        }
        // 폐
        else if ((chHanja >= 0xF8C5 && chHanja <= 0xF8CE))
        {
            return ("폐");
        }
        // 포
        else if ((chHanja >= 0xF8CF && chHanja <= 0xF8EA))
        {
            return ("포");
        }
        // 폭
        else if ((chHanja >= 0xF8EB && chHanja <= 0xF8F0))
        {
            return ("폭");
        }
        // 표
        else if ((chHanja >= 0xF8F1 && chHanja <= 0xF8FE))
        {
            return ("표");
        }
        // 품
        else if ((chHanja >= 0xF9A1 && chHanja <= 0xF9A2))
        {
            return ("품");
        }
        // 풍
        else if ((chHanja >= 0xF9A3 && chHanja <= 0xF9A7))
        {
            return ("풍");
        }
        // 피
        else if ((chHanja >= 0xF9A8 && chHanja <= 0xF9AE))
        {
            return ("피");
        }
        // 필
        else if ((chHanja >= 0xF9AF && chHanja <= 0xF9B8))
        {
            return ("필");
        }
        // 핍
        else if ((chHanja >= 0xF9B9 && chHanja <= 0xF9BA))
        {
            return ("핍");
        }
        // 하
        else if ((chHanja >= 0xF9BB && chHanja <= 0xF9C8))
        {
            return ("하");
        }
        // 학
        else if ((chHanja >= 0xF9C9 && chHanja <= 0xF9CD))
        {
            return ("학");
        }
        // 한
        else if ((chHanja >= 0xF9CE && chHanja <= 0xF9DB))
        {
            return ("한");
        }
        // 할
        else if ((chHanja >= 0xF9DC && chHanja <= 0xF9DD))
        {
            return ("할");
        }
        // 함
        else if ((chHanja >= 0xF9DE && chHanja <= 0xF9E9))
        {
            return ("함");
        }
        // 합
        else if ((chHanja >= 0xF9DA && chHanja <= 0xF9F0))
        {
            return ("합");
        }
        // 항
        else if ((chHanja >= 0xF9F1 && chHanja <= 0xFAA3))
        {
            return ("항");
        }
        // 해
        else if ((chHanja >= 0xFAA4 && chHanja <= 0xFAB5))
        {
            return ("해");
        }
        // 핵
        else if ((chHanja >= 0xFAB6 && chHanja <= 0xFAB7))
        {
            return ("핵");
        }
        // 행
        else if ((chHanja >= 0xFAB8 && chHanja <= 0xFABC))
        {
            return ("행");
        }
        // 향
        else if ((chHanja >= 0xFABD && chHanja <= 0xFAC5))
        {
            return ("향");
        }
        // 허
        else if ((chHanja >= 0xFAC6 && chHanja <= 0xFAC9))
        {
            return ("허");
        }
        // 헌
        else if ((chHanja >= 0xFACA && chHanja <= 0xFACD))
        {
            return ("헌");
        }
        // 헐
        else if ((chHanja >= 0xFACE && chHanja <= 0xFACE))
        {
            return ("헐");
        }
        // 험
        else if ((chHanja >= 0xFACF && chHanja <= 0xFAD0))
        {
            return ("험");
        }
        // 혁
        else if ((chHanja >= 0xFAD1 && chHanja <= 0xFAD4))
        {
            return ("혁");
        }
        // 현
        else if ((chHanja >= 0xFAD5 && chHanja <= 0xFAE9))
        {
            return ("현");
        }
        // 혈
        else if ((chHanja >= 0xFAEA && chHanja <= 0xFAED))
        {
            return ("혈");
        }
        // 혐
        else if ((chHanja >= 0xFAEE && chHanja <= 0xFAEE))
        {
            return ("혐");
        }
        // 협
        else if ((chHanja >= 0xFAEF && chHanja <= 0xFAFA))
        {
            return ("협");
        }
        // 형
        else if ((chHanja >= 0xFAFB && chHanja <= 0xFBB0))
        {
            return ("형");
        }
        // 혜
        else if ((chHanja >= 0xFBB1 && chHanja <= 0xFBB9))
        {
            return ("혜");
        }
        // 호
        else if ((chHanja >= 0xFBBA && chHanja <= 0xFBE2))
        {
            return ("호");
        }
        // 혹
        else if ((chHanja >= 0xFBE3 && chHanja <= 0xFBE5))
        {
            return ("혹");
        }
        // 혼
        else if ((chHanja >= 0xFBE6 && chHanja <= 0xFBEB))
        {
            return ("혼");
        }
        // 홀
        else if ((chHanja >= 0xFBEC && chHanja <= 0xFBEE))
        {
            return ("홀");
        }
        // 홍
        else if ((chHanja >= 0xFBEF && chHanja <= 0xFBF8))
        {
            return ("홍");
        }
        // 화
        else if ((chHanja >= 0xFBF9 && chHanja <= 0xFCA8))
        {
            return ("화");
        }
        // 확
        else if ((chHanja >= 0xFCA9 && chHanja <= 0xFCAE))
        {
            return ("확");
        }
        // 환
        else if ((chHanja >= 0xFCAF && chHanja <= 0xFCBF))
        {
            return ("환");
        }
        // 활
        else if ((chHanja >= 0xFCC0 && chHanja <= 0xFCC4))
        {
            return ("활");
        }
        // 황
        else if ((chHanja >= 0xFCC5 && chHanja <= 0xFCDC))
        {
            return ("황");
        }
        // 회
        else if ((chHanja >= 0xFCDD && chHanja <= 0xFCF0))
        {
            return ("회");
        }
        // 획
        else if ((chHanja >= 0xFCF1 && chHanja <= 0xFCF2))
        {
            return ("획");
        }
        // 횡
        else if ((chHanja >= 0xFCF3 && chHanja <= 0xFCF5))
        {
            return ("횡");
        }
        // 효
        else if ((chHanja >= 0xFCF6 && chHanja <= 0xFDA4))
        {
            return ("효");
        }
        // 후
        else if ((chHanja >= 0xFDA5 && chHanja <= 0xFDB1))
        {
            return ("후");
        }
        // 훈
        else if ((chHanja >= 0xFDB2 && chHanja <= 0xFDBB))
        {
            return ("훈");
        }
        // 훙
        else if ((chHanja >= 0xFDBC && chHanja <= 0xFDBC))
        {
            return ("훙");
        }
        // 훤
        else if ((chHanja >= 0xFDBD && chHanja <= 0xFDC0))
        {
            return ("훤");
        }
        // 훼
        else if ((chHanja >= 0xFDC1 && chHanja <= 0xFDC3))
        {
            return ("훼");
        }
        // 휘
        else if ((chHanja >= 0xFDC4 && chHanja <= 0xFDCB))
        {
            return ("휘");
        }
        // 휴
        else if ((chHanja >= 0xFDCC && chHanja <= 0xFDD0))
        {
            return ("휴");
        }
        // 휼
        else if ((chHanja >= 0xFDD1 && chHanja <= 0xFDD3))
        {
            return ("휼");
        }
        // 흉
        else if ((chHanja >= 0xFDD4 && chHanja <= 0xFDD8))
        {
            return ("흉");
        }
        // 흑
        else if ((chHanja >= 0xFDD9 && chHanja <= 0xFDD9))
        {
            return ("흑");
        }
        // 흔
        else if ((chHanja >= 0xFDDA && chHanja <= 0xFDDD))
        {
            return ("흔");
        }
        // 흘
        else if ((chHanja >= 0xFDDE && chHanja <= 0xFDE1))
        {
            return ("흘");
        }
        // 흠
        else if ((chHanja >= 0xFDE2 && chHanja <= 0xFDE4))
        {
            return ("흠");
        }
        // 흡
        else if ((chHanja >= 0xFDE5 && chHanja <= 0xFDE8))
        {
            return ("흡");
        }
        // 흥
        else if ((chHanja >= 0xFDE9 && chHanja <= 0xFDE9))
        {
            return ("흥");
        }
        // 희
        else if ((chHanja >= 0xFDEA && chHanja <= 0xFDFD))
        {
            return ("희");
        }
        // 힐
        else if ((chHanja >= 0xFDEE && chHanja <= 0xFDFE))
        {
            return ("힐");
        }

        return (null);
    }
    public static String getUserAgent(HttpServletRequest request) {

        String userAgent = request.getHeader("User-Agent");
        
        if(userAgent.indexOf("Trident") > -1) {												// IE
        	userAgent = "ie";
    	} else if(userAgent.indexOf("Edge") > -1) {											// Edge
    		userAgent = "edge";
    	} else if(userAgent.indexOf("Chrome") > -1) {										 // Chrome	
    		userAgent = "chrome";
    	} else if(userAgent.indexOf("Whale") > -1) { 										// Naver Whale
    		userAgent = "whale";
    	} else if(userAgent.indexOf("Opera") > -1 || userAgent.indexOf("OPR") > -1) { 		// Opera
    		userAgent = "opera";
    	} else if(userAgent.indexOf("Firefox") > -1) { 										 // Firefox
    		userAgent = "firefox";
    	} else if(userAgent.indexOf("Safari") > -1 ) {	 // Safari
    		userAgent = "safari";		
    	}
        return userAgent;
    }

}
