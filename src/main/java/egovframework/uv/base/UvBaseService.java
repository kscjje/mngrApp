package egovframework.uv.base;

import java.util.List;

import javax.annotation.Resource;

import org.egovframe.rte.fdl.cmmn.EgovAbstractServiceImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.stereotype.Service;

import egovframework.uv.model.UvMap;
import egovframework.uv.model.UvMapList;

@ComponentScan
@Service("uvBaseService")
public class UvBaseService extends EgovAbstractServiceImpl {
	private final Logger logger = LoggerFactory.getLogger(this.getClass());
	
	/** BaseDAO */
    @Resource(name="uvBaseDAO")
	protected UvBaseDAO uvBaseDAO;

	/**
	 * 검색
	 * 
	 * @param ds UvDataSet
	 * @return UvMap
	 * @throws UvBaseException
	 * @throws UvDAOException
	 * @throws UvServiceException
	 */
	public UvMapList<UvMap> search(UvMap ds) throws Exception {
		UvMapList<UvMap> rs = null;

		try {
			rs = uvBaseDAO.select(ds.getString("SQL_ID"), ds);

			rs.setListCnt(uvBaseDAO.selectInt(ds.getString("SQL_ID") + "_count", ds));
			rs.setTotalCnt(rs.getListCnt());
		} catch (Exception e) {
			throw new Exception(e);
		}

		return rs;
	}
	
	/**
	 * 조회
	 * 
	 * @param ds UvDataSet
	 * @return UvMap
	 * @throws UvBaseException
	 * @throws UvDAOException
	 * @throws UvServiceException
	 */
	public UvMapList<UvMap> select(UvMap ds) throws Exception {
		UvMapList<UvMap> rs = null;

		try {
			rs = uvBaseDAO.select(ds.getString("SQL_ID"), ds);
		} catch (Exception e) {
			throw new Exception(e);
		}

		return rs;
	}

	/**
	 * 카운트
	 * 
	 * @param ds UvDataSet
	 * @return UvMap
	 * @throws UvBaseException
	 * @throws UvDAOException
	 * @throws UvServiceException
	 */
	public int count(UvMap ds) throws Exception {
		int count = 0;

		try {
			count = uvBaseDAO.selectInt(ds.getString("SQL_ID"), ds);
		} catch (Exception e) {
			throw new Exception(e);
		}

		return count;
	}

	/**
	 * 등록
	 * 
	 * @param ds UvDataSet
	 * @return UvMap
	 * @throws UvBaseException
	 * @throws UvDAOException
	 * @throws UvServiceException
	 */
	public UvMap insert(UvMap ds) throws Exception {
		UvMap rs = new UvMap();

		try {
			int count = uvBaseDAO.insert(ds.getString("SQL_ID"), ds);

			rs.setProcessCnt(count);
		} catch (Exception e) {
			throw new Exception(e);
		}

		return rs;
	}

	/**
	 * 등록
	 * 
	 * @param ds UvDataSet
	 * @return UvMap
	 * @throws UvBaseException
	 * @throws UvDAOException
	 * @throws UvServiceException
	 */
	public UvMap insertReturnKey(UvMap ds, String KEY_NAME) throws Exception {
		UvMap rs = new UvMap();

		try {
			rs = uvBaseDAO.insertReturnKey(ds.getString("SQL_ID"), ds, KEY_NAME);

			rs.setProcessCnt(rs.getInt("count"));
		} catch (Exception e) {
			throw new Exception(e);
		}

		return rs;
	}

	
	/**
	 * 수정
	 * 
	 * @param ds UvDataSet
	 * @return UvMap
	 * @throws UvBaseException
	 * @throws UvDAOException
	 * @throws UvServiceException
	 */
	public UvMap update(UvMap ds) throws Exception {
		UvMap rs = new UvMap();

		try {
			int count = uvBaseDAO.update(ds.getString("SQL_ID"), ds);

			rs.setProcessCnt(count);
		} catch (Exception e) {
			throw new Exception(e);
		}
		return rs;
	}
	
	/**
	 * 삭제
	 * 
	 * @param ds UvDataSet
	 * @return UvMap
	 * @throws UvBaseException
	 * @throws UvDAOException
	 * @throws UvServiceException
	 */
	public UvMap delete(UvMap ds) throws Exception {
		UvMap rs = new UvMap();

		try {
			int count = uvBaseDAO.delete(ds.getString("SQL_ID"), ds);

			rs.setProcessCnt(count);
		} catch (Exception e) {
			throw new Exception(e);
		}

		return rs;
	}
}
