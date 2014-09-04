package example.nosql.neodatis;

import java.util.Date;


public class Sport {
	private String name=null;
	private int old;
	private Date date=null;
	
	public Sport() {
	}
	
	public Sport(String name) {
		this.name=name;
	}

	
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
	
	public Date getDate() {
		return date;
	}
	
	public void setDate(Date date) {
		this.date = date;
	}
	
	public int getOld() {
		return old;
	}
	
	public void setOld(int old) {
		this.old = old;
	}


}
