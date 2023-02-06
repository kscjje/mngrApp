package egovframework.uv.base;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.mapping.BoundSql;
import org.apache.ibatis.mapping.MappedStatement;
import org.apache.ibatis.mapping.ParameterMapping;
import org.apache.ibatis.session.Configuration;
import org.egovframe.rte.psl.dataaccess.EgovAbstractMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.stereotype.Repository;

import egovframework.com.cmm.service.EgovProperties;
import egovframework.uv.model.UvMap;
import egovframework.uv.model.UvMapList;
import egovframework.uv.util.UvUtil;

@ComponentScan
@Repository("uvBaseDAO")
public class UvBaseDAO extends EgovAbstractMapper {

	private final Logger logger = LoggerFactory.getLogger(this.getClass());

	/**
	 * select
	 * 
	 * @param statementName
	 *            query statement ID
	 * @return 결과
	 * @throws Exception
	 */
	public UvMapList<UvMap> select(String statementName) throws Exception {
		UvMapList<UvMap> rs = null;
		
		try {
			statementName = changeStatementName(statementName);
			
			getSql(statementName, null);
			
			List<UvMap> listMap = getSqlSession().selectList(statementName);

			rs = toUvMap(listMap);
		} catch (Exception e) {
			throw new Exception(e);
		}
		return rs;
	}

	/**
	 * select
	 * 
	 * @param statementName
	 *            query statement ID
	 * @param ds
	 *            UvMap
	 * @return 결과
	 * @throws Exception
	 */
	public UvMapList<UvMap> select(String statementName, final UvMap ds) throws Exception {
		UvMapList<UvMap> rs = null;
		
		try {
			statementName = changeStatementName(statementName);
			
			getSql(statementName, ds);

			List<UvMap> listMap = getSqlSession().selectList(statementName, ds);

			rs = toUvMap(listMap);
		} catch (Exception e) {
			throw new Exception(e);
		}
		return rs;
	}

	/**
	 * select int
	 * 
	 * @param statementName
	 *            query statement ID
	 * @param ds
	 *            UvMap
	 * @return 결과
	 * @throws Exception
	 */
	public int selectInt(String statementName, final UvMap ds) throws Exception {
		int value = 0;
		try {
			statementName = changeStatementName(statementName);
			
			getSql(statementName, ds);

			value = ((Integer) getSqlSession().selectOne(statementName, ds)).intValue();
		} catch (Exception e) {
			throw new Exception(e);
		}
		return value;
	}

	/**
	 * select int
	 * 
	 * @param statementName
	 *            query statement ID
	 * @return 결과
	 * @throws Exception
	 */
	public int selectInt(String statementName) throws Exception {
		int value = 0;
		try {
			statementName = changeStatementName(statementName);
			
			getSql(statementName, null);

			value = ((Integer) getSqlSession().selectOne(statementName)).intValue();
		} catch (Exception e) {
			throw new Exception(e);
		}
		return value;
	}

	/**
	 * select long
	 * 
	 * @param statementName
	 *            query statement ID
	 * @param ds
	 *            UvMap
	 * @return 결과
	 * @throws Exception
	 */
	public long selectLong(String statementName, final UvMap ds) throws Exception {
		long value = 0;
		try {
			statementName = changeStatementName(statementName);
			
			getSql(statementName, ds);

			value = ((Long) getSqlSession().selectOne(statementName, ds)).longValue();
		} catch (Exception e) {
			throw new Exception(e);
		}
		return value;
	}

	/**
	 * select long
	 * 
	 * @param statementName
	 *            query statement ID
	 * @return 결과
	 * @throws Exception
	 */
	public long selectLong(String statementName) throws Exception {
		long value = 0;
		try {
			statementName = changeStatementName(statementName);
			
			getSql(statementName, null);

			value = ((Long) getSqlSession().selectOne(statementName)).longValue();
		} catch (Exception e) {
			throw new Exception(e);
		}
		return value;
	}

	/**
	 * insert
	 * 
	 * @param statementName
	 *            query statement ID
	 * @return 처리 건 수
	 * @throws Exception
	 */
	public int insert(String statementName) {
		int count = 0;
		statementName = changeStatementName(statementName);
		
		getSql(statementName, null);

		count = getSqlSession().insert(statementName);
		
		return count;
	}

	/**
	 * insert
	 * 
	 * @param statementName
	 *            query statement ID
	 * @param ds
	 *            UvMap
	 * @return 실행 건 수
	 * @throws Exception
	 */
	public int insert(String statementName, final UvMap ds) throws Exception {
		int count = 0;
		try {
			statementName = changeStatementName(statementName);
			
			getSql(statementName, ds);

			count = getSqlSession().insert(statementName, ds);
		} catch (Exception e) {
			throw new Exception(e);
		}
		return count;
	}

	/**
	 * insert
	 * 
	 * @param statementName
	 *            query statement ID
	 * @param ds
	 *            UvMap
	 * @return 실행 건 수
	 * @throws Exception
	 */
	public UvMap insertReturnKey(String statementName, UvMap ds, final String KEY_NAME) throws Exception {
		UvMap rs = new UvMap();

		int count = 0;
		int KEY_VALUE = 0;

		try {
			statementName = changeStatementName(statementName);
			
			getSql(statementName, ds);

			ds.put(KEY_NAME, null);

			count = getSqlSession().insert(statementName, ds);
			KEY_VALUE = UvUtil.sTOi(ds.get(KEY_NAME).toString());

			rs.setInt("count", count);
			rs.setInt(KEY_NAME, KEY_VALUE);
			rs.setProcessCnt(count);
		} catch (Exception e) {
			e.printStackTrace();
			throw new Exception(e);
		}
		return rs;
	}

	public UvMap callProcedure(String statementName, final UvMap ds) throws Exception {
		int count = 0;

		try {
			statementName = changeStatementName(statementName);
			
			getSql(statementName, ds);

			count = getSqlSession().insert(statementName, ds);
			
			ds.setInt("count", count);
			ds.setProcessCnt(count);
		} catch (Exception e) {
			e.printStackTrace();
			throw new Exception(e);
		}
		return ds;
	}
	
	/**
	 * update
	 * 
	 * @param statementName
	 *            query statement ID
	 * @return 실행 건 수
	 * @throws Exception
	 */
	public int update(String statementName) {
		int count = 0;
		statementName = changeStatementName(statementName);
		
		getSql(statementName, null);

		count = getSqlSession().update(statementName);
		return count;
	}

	/**
	 * update
	 * 
	 * @param statementName
	 *            query statement ID
	 * @param ds
	 *            UvMap
	 * @return 실행 건 수
	 * @throws Exception
	 */
	public int update(String statementName, final UvMap ds) throws Exception {
		int count = 0;
		try {
			statementName = changeStatementName(statementName);
			
			getSql(statementName, ds);

			count = getSqlSession().update(statementName, ds);
		} catch (Exception e) {
			throw new Exception(e);
		}
		return count;
	}

	/**
	 * delete
	 * 
	 * @param statementName
	 *            query statement ID
	 * @return 실행 건 수
	 * @throws Exception
	 */
	public int delete(String statementName) {
		int count = 0;
		statementName = changeStatementName(statementName);
		
		getSql(statementName, null);

		count = getSqlSession().delete(statementName);
		return count;
	}

	/**
	 * delete
	 * 
	 * @param statementName
	 *            query statement ID
	 * @param ds
	 *            UvMap
	 * @return 실행 건 수
	 * @throws Exception
	 */
	public int delete(String statementName, final UvMap ds) throws Exception {
		int count = 0;
		try {
			statementName = changeStatementName(statementName);
			
			getSql(statementName, ds);

			count = getSqlSession().delete(statementName, ds);
		} catch (Exception e) {
			throw new Exception(e);
		}
		return count;
	}

	/**
	 * UvMap 파라메터를 HashMap<String,String> 형태로 변환
	 * 
	 * @param ds
	 *            UvMap
	 * @return HashMap
	 */
	private HashMap<String, Object> toHashMap1(UvMap ds) {
		HashMap<String, Object> hashMap = new HashMap<String, Object>();

		List<String> keys = ds.keyList();
		Object keyValue = null;
		for (String key : keys) {
			try {
				keyValue = ds.getValue(key);
				if (keyValue instanceof String) {
					String value = ds.getString(key);
					if (UvUtil.isNotNull(value)) {
						hashMap.put(key, value);
					}
				} else if (keyValue instanceof Integer) {
					hashMap.put(key, new Integer(ds.getInt(key)));
				} else if (keyValue instanceof Long) {
					hashMap.put(key, new Long(ds.getLong(key)));
				} else {
					hashMap.put(key, ds.getValue(key));
				}
			} catch (Exception e) {
				// ignore exception
			}
		}

		return hashMap;
	}

	/**
	 * List<HashMap> 타입으로 받아온 쿼리 실행 결과를 UvMapList으로 변환
	 * 
	 * @param listMap
	 *            쿼리 실행 결과
	 * @return UvMapList<UvMap> 타입의 실행 결과
	 * @throws Exception
	 */
	protected UvMapList<UvMap> toUvMap(List<UvMap> listMap) throws Exception {
		UvMapList<UvMap> rs = new UvMapList<UvMap>();

		try {
			for (UvMap map : listMap) {
				rs.add(map);
			}
		} catch (Exception e) {
			throw new Exception(e);
		}

		return rs;
	}
	
	/**
	 * delete
	 * 
	 * @param statementName
	 *            query statement ID
	 * @param ds
	 *            UvMap
	 * @return 실행 건 수
	 * @throws Exception
	 */
	public long getSeq(String SEQ_NAME) throws Exception {
		long value = 0;
		try {
			value = ((Long) getSqlSession().selectOne("UvBaseDAO.getSeq", SEQ_NAME)).longValue();
		} catch (Exception e) {
			throw new Exception(e);
		}
		return value;
	}

	public String getStringFromCLOB(java.sql.Clob clob) {
		StringBuffer sbf = new StringBuffer();
		java.io.Reader br = null;
		char[] buf = new char[1024];
		int readcnt;
		try {
			br = clob.getCharacterStream();
			while ((readcnt = br.read(buf, 0, 1024)) != -1) {
				sbf.append(buf, 0, readcnt);
			}
		} catch (Exception e) {
			// logger.error("Failed to create String object from CLOB", e);
		} finally {
			if (br != null)
				try {
					br.close();
				} catch (IOException e) {
					// logger.error("Failed to close BufferedReader object", e);
				}
		}
		return sbf.toString();
	}

	public String getSql(String statementName, UvMap ds) {
		String rtn = "";
		
//		Configuration configuration = getSqlSession().getConfiguration();
//		MappedStatement ms = configuration.getMappedStatement(statementName);
//
//		logger.debug("==> Resource : " + ms.getResource());
//		logger.debug("==> statementName : " + statementName);
//		
//		if (logger.isDebugEnabled()) {
//			if (ds == null) ds = new UvMap();
//			
//			if ("true".equals(EgovProperties.getProperty("planB.SqlDebug"))) {
//				Map<String, Object> params = toHashMap(ds);
//				BoundSql boundSql = ms.getBoundSql(params);
//				rtn = boundSql.getSql();
//				
//				StringBuilder sql = new StringBuilder(rtn);
//				
//				for (ParameterMapping param : boundSql.getParameterMappings()) {
//					String property = param.getProperty();
//					int index = sql.indexOf("?");
//					
//					Object value = params.get(property);
//					
//					boolean num_flag = true;
//					
//					if (value instanceof String) {
//						num_flag = false;
//					}
//					
//					if (num_flag) {
//						sql.replace(index, index + 1, params.get(property) + "");
//					} else {
//						sql.replace(index, index + 1, "'" + params.get(property) + "'");
//					}
//				}
//				
//				rtn = sql.toString();
//				
//				logger.debug("==> SQL : " + rtn);
//			}
//		}
		return (rtn);
	}
	
	public String changeStatementName(String statementName) {		
		//statementName = UvUtil.replaceStr(statementName, ".", "_" + UvUtil.toNotNull(EgovProperties.getProperty("Globals.DbType")) + ".");
		
		return statementName;
	}
}
