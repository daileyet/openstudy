package example.java.util.concurrent.common;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Random;

public class Help {
	static final Random RANDOM = new Random();
	static final DateFormat DATEFORMAT = new SimpleDateFormat("HH:mm:ss.SSS");

	public static void sleep(long millis) {
		try {
			Thread.sleep(millis);
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
	}

	public static void printList(List<?> list) {
		System.out.println("List size:" + list.size());
		for (Object object : list) {
			System.out.println(object.toString());
		}
		System.out.println();
	}

	public static int next(int t) {
		return RANDOM.nextInt(t);
	}

	public static String now() {
		return DATEFORMAT.format(new Date());
	}
	
}
