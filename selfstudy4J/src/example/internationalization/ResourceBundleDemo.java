package example.internationalization;

import java.text.MessageFormat;
import java.util.Locale;
import java.util.ResourceBundle;

public class ResourceBundleDemo {

	public static void main(String[] args) {
		ResourceBundle resource=ResourceBundle.getBundle("source/i18n/myContext",Locale.UK);
		String value=resource.getString("1000");
		System.out.println(value);
		System.out.println(resource.getString("1001"));
		System.out.println(MessageFormat.format(resource.getString("1001"),
				"Hello", "World"));
	}
	
	
}
