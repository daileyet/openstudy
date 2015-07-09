package address.model;

import java.util.List;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
@XmlRootElement(name="persons")
public class PersonListWrapper {

	
	private List<Person> personList;
	
	@XmlElement(name="person")
	public List<Person> getPersonList() {
		return personList;
	}
	
	public void setPersonList(List<Person> personList) {
		this.personList = personList;
	}
	
}
