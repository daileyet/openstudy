package example.internationalization;

import java.util.Locale;

import org.nuiton.i18n.I18n;
import org.nuiton.i18n.init.DefaultI18nInitializer;

public class I18nDemo {

	public static void main(String[] args) {
		//System.out.println(I18n.getDefaultLocale());
		I18n.init(new DefaultI18nInitializer("myApp"),Locale.UK);
		String ret=I18n._("1000");
		System.out.println(ret);
	}
	
	
}
