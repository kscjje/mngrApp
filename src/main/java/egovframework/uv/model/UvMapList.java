package egovframework.uv.model;

import org.json.simple.JSONArray;

import java.util.ArrayList;

/**
 * <pre>
 * framework.datamodel
 * UvMapList.java
 * </pre>
 *
 * @author : joyun
 * @Date : 2018. 2. 8.
 */
public class UvMapList<UvMap> extends ArrayList<UvMap> {
    protected int listCnt;

    protected int totalCnt;

    /**
     * @param listCnt
     * @MethodName : setListCnt
     */
    public void setListCnt(int listCnt) {
        this.listCnt = listCnt;
    }

    /**
     * @param listCnt
     * @MethodName : setListCnt
     */
    public void setListCnt(long listCnt) {
        this.listCnt = (int) listCnt;
    }

    /**
     * @return
     * @MethodName : getListCnt
     */
    public int getListCnt() {
        return listCnt;
    }

    /**
     * @param totalCnt
     * @MethodName : setTotalCnt
     */
    public void setTotalCnt(int totalCnt) {
        this.totalCnt = totalCnt;
    }

    /**
     * @param totalCnt
     * @MethodName : setTotalCnt
     */
    public void setTotalCnt(long totalCnt) {
        this.totalCnt = (int) totalCnt;
    }

    /**
     * @return
     * @MethodName : getTotalCnt
     */
    public int getTotalCnt() {
        return totalCnt;
    }

    /**
     * @return
     * @MethodName : toJson
     */
    public String toJson() {
        JSONArray jsonArray = new JSONArray();
        String json = jsonArray.toJSONString(this);

        return json;
    }
}