package egovframework.uv.model;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.commons.collections4.map.ListOrderedMap;
import org.json.simple.JSONObject;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;

/**
 * <pre>
 * framework.datamodel
 * UvMap.java
 * </pre>
 *
 * @author : kjyoo
 * @Date : 2018. 2. 8.
 */
public class UvMap extends ListOrderedMap {

    private static final long serialVersionUID = 6723434363565852261L;

    /**
     * 처리 건 수 (insert, update, delete)
     */
    protected int processCnt = 0;

	/*@Override
	public Object put(Object key, Object value) {
		return super.put(((String) key).toUpperCase(), value);
	}

	@Override
	public Object get(Object key) {
		return super.get(((String) key).toUpperCase());
	}*/

    /**
     * @param key
     * @param defaultValue
     * @return
     * @MethodName : getInt
     */
    public int getInt(Object key, int defaultValue) {
        try {
            int val = getInt(key);

            if (val == 0) {
                val = defaultValue;
            }

            return val;
        } catch (Exception e) {
            return defaultValue;
        }
    }

    /**
     * @param key
     * @return
     * @MethodName : getInt
     */
    public int getInt(Object key) {
        try {
            return Integer.parseInt(String.valueOf(super.get(key)));
        } catch (Exception e) {
            return 0;
        }
    }

    /**
     * @param key
     * @param defaultValue
     * @return
     * @MethodName : getLong
     */
    public long getLong(Object key, int defaultValue) {
        try {
            long val = getLong(key);

            if (val == 0) {
                val = defaultValue;
            }

            return val;
        } catch (Exception e) {
            return defaultValue;
        }
    }

    /**
     * @param key
     * @return
     * @MethodName : getLong
     */
    public long getLong(Object key) {
        try {
            return Long.parseLong(String.valueOf(super.get(key)));
        } catch (Exception e) {
            return 0;
        }
    }

    /**
     * @param key
     * @param defaultValue
     * @return
     * @MethodName : getString
     */
    public String getString(Object key, String defaultValue) {
        try {
            String val = getString(key);

            if (val == "") {
                val = defaultValue;
            }

            return val;
        } catch (Exception e) {
            return defaultValue;
        }
    }

    /**
     * @param key
     * @return
     * @MethodName : getString
     */
    public String getString(Object key) {
        try {
            return String.valueOf(super.get(key));
        } catch (Exception e) {
            return "";
        }

		/*
		try {
			return (String) super.get(key);
		} catch (Exception e) {
			return "";
		}
		*/
    }

    /**
     * @param key
     * @return
     * @MethodName : getDate
     */
    public String getDate(Object key) {
        try {
            Timestamp ts = (Timestamp) super.get(key);
            SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
            return dateFormat.format(ts);
        } catch (Exception e) {
            return "";
        }
    }

    /**
     * @param key
     * @param defaultValue
     * @return
     * @MethodName : getDate
     */
    public String getDate(Object key, String defaultValue) {
        try {
            String val = getDate(key);

            if (val == "") {
                val = defaultValue;
            }

            return val;
        } catch (Exception e) {
            return defaultValue;
        }
    }

    /**
     * @param key
     * @return
     * @MethodName : getDateTime
     */
    public String getDateTime(Object key) {
        try {
            Timestamp ts = (Timestamp) super.get(key);
            SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            return dateFormat.format(ts);
        } catch (Exception e) {
            return "";
        }
    }

    /**
     * @param key
     * @param defaultValue
     * @return
     * @MethodName : getDateTime
     */
    public String getDateTime(Object key, String defaultValue) {
        try {
            String val = getDateTime(key);

            if (val == "") {
                val = defaultValue;
            }

            return val;
        } catch (Exception e) {
            return defaultValue;
        }
    }

    /**
     * @param processCnt
     * @MethodName : setProcessCnt
     */
    public void setProcessCnt(int processCnt) {
        this.processCnt = processCnt;
    }

    /**
     * @param key
     * @param value
     * @return
     * @MethodName : setString
     */
    public Object setString(Object key, String value) {
        return super.put(key, value);
    }

    /**
     * @param key
     * @param value
     * @return
     * @MethodName : setInt
     */
    public Object setInt(Object key, int value) {
        return super.put(key, value);
    }

    /**
     * @param key
     * @param value
     * @return
     * @MethodName : setLong
     */
    public Object setLong(Object key, long value) {
        return super.put(key, value);
    }

    /**
     * @param key
     * @param value
     * @return
     * @MethodName : setValue
     */
    public Object setValue(Object key, Object value) {
        return super.put(key, value);
    }

    /**
     * @param key
     * @return
     * @MethodName : getValue
     */
    public Object getValue(Object key) {
        return super.get(key);
    }

    /**
     * @param key
     * @return
     * @MethodName : getValues
     */
    public String[] getValues(Object key) {
        String[] result = new String[0];

        try {
            if (super.get(key) == null) {
                result = new String[0];
            } else if (super.get(key) instanceof Object[]) {
                result = (String[]) super.get(key);
            } else {
                result = new String[]{(String) super.get(key)};
            }
        } catch (Exception e) {
        }

        return result;
    }

    /**
     * @return
     * @MethodName : getProcessCnt
     */
    public int getProcessCnt() {
        return processCnt;
    }

    public String toJson() {
        try {
            ObjectMapper mapper = new ObjectMapper();

            // pretty print
            String json = mapper.writerWithDefaultPrettyPrinter().writeValueAsString(this);

            //JSONObject jsonObject = new JSONObject();
            //String json = jsonObject.toJSONString(this);

            return json;
        } catch (Exception e) {
            return "";
        }
    }
}