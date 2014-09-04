package example.nosql.neodatis;

import java.util.Date;
import java.util.LinkedList;
import java.util.List;

import org.junit.Test;
import org.neodatis.odb.ODB;
import org.neodatis.odb.ODBFactory;
import org.neodatis.odb.Objects;

public class SportDAO {
	static final String ODB_NAME = "d:\\odb-dailey.bak";

//	@Test
	public void createIndex(){
		ODB odb = ODBFactory.open(ODB_NAME);
		odb.getClassRepresentation(Sport.class).addIndexOn("sport-index", new String[]{"name"}, true);
		odb.close();
	}
	
//	@Test
	public void removeIndex(){
		ODB odb = ODBFactory.open(ODB_NAME);
		odb.getClassRepresentation(Sport.class).deleteIndex("sport-index", true);
		odb.close();
	}
	
	@Test
	public void store() {
//		OdbConfiguration.setUseCache(false);

		ODB odb = null;
		try {
			odb = ODBFactory.open(ODB_NAME);
			List<Sport> list=createObjets();
			for(Sport sport:list){
				odb.store(sport);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}finally{
			if (odb != null) {
				odb.close();
			}
		}
	}

	private List<Sport> createObjets(){
		List<Sport> list=new LinkedList<Sport>();
		for(int i=1;i<100;i++){
			Sport sport=new Sport("Basketball"+i);
			sport.setDate(new Date());
			sport.setOld(i);
			list.add(sport);
		}
		return list;
	}
	
//	@Test
	public void def(){
		ODB odb = ODBFactory.open(ODB_NAME+"_temp");
		odb.defragmentTo(ODB_NAME);
		odb.close();
	}
	
//	@Test
	public void delete(){
		ODB odb = ODBFactory.open(ODB_NAME);
		Objects<Sport> objects=odb.getObjects(Sport.class,false);
		for(Sport sport:objects){
			odb.delete(sport);
		}
		odb.close();
	}
	
//	@Test
	public void get() {
		ODB odb = ODBFactory.open(ODB_NAME);
		Objects<Sport> sports = odb.getObjects(Sport.class,false);
		while (sports.hasNext()) {
		}
		odb.close();
	}
	

}
