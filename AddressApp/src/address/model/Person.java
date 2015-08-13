package address.model;

import java.time.LocalDate;

import javax.xml.bind.annotation.adapters.XmlJavaTypeAdapter;

import address.util.LocalDateAdapter;
import javafx.beans.property.IntegerProperty;
import javafx.beans.property.ObjectProperty;
import javafx.beans.property.SimpleIntegerProperty;
import javafx.beans.property.SimpleObjectProperty;
import javafx.beans.property.SimpleStringProperty;
import javafx.beans.property.StringProperty;

public class Person {
	private final StringProperty firstName;
	private final StringProperty lastName;
	private final StringProperty street;
	private final IntegerProperty postalCode;
	private final StringProperty city;
	private final ObjectProperty<LocalDate> birthday;

	public Person() {
		this(null,null);
	}

	public Person(String firstName, String lastName) {
		this.firstName = new SimpleStringProperty(firstName);
        this.lastName = new SimpleStringProperty(lastName);

        // Some initial dummy data, just for convenient testing.
        this.street = new SimpleStringProperty("some street");
        this.postalCode = new SimpleIntegerProperty(1234);
        this.city = new SimpleStringProperty("some city");
        this.birthday = new SimpleObjectProperty<LocalDate>(LocalDate.of(1999, 2, 21));
	}

	public final StringProperty firstNameProperty() {
		return this.firstName;
	}

	public final java.lang.String getFirstName() {
		return this.firstNameProperty().get();
	}

	public final void setFirstName(final java.lang.String firstName) {
		this.firstNameProperty().set(firstName);
	}

	public final StringProperty lastNameProperty() {
		return this.lastName;
	}

	public final java.lang.String getLastName() {
		return this.lastNameProperty().get();
	}

	public final void setLastName(final java.lang.String lastName) {
		this.lastNameProperty().set(lastName);
	}

	public final StringProperty streetProperty() {
		return this.street;
	}

	public final java.lang.String getStreet() {
		return this.streetProperty().get();
	}

	public final void setStreet(final java.lang.String street) {
		this.streetProperty().set(street);
	}

	public final IntegerProperty postalCodeProperty() {
		return this.postalCode;
	}

	public final int getPostalCode() {
		return this.postalCodeProperty().get();
	}

	public final void setPostalCode(final int postalCode) {
		this.postalCodeProperty().set(postalCode);
	}

	public final StringProperty cityProperty() {
		return this.city;
	}

	public final java.lang.String getCity() {
		return this.cityProperty().get();
	}

	public final void setCity(final java.lang.String city) {
		this.cityProperty().set(city);
	}

	public final ObjectProperty<LocalDate> birthdayProperty() {
		return this.birthday;
	}

	@XmlJavaTypeAdapter(LocalDateAdapter.class)
	public final java.time.LocalDate getBirthday() {
		return this.birthdayProperty().get();
	}

	public final void setBirthday(final java.time.LocalDate birthday) {
		this.birthdayProperty().set(birthday);
	}
	
	
}
