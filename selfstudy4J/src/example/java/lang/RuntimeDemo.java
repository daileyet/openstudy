package example.java.lang;

import java.io.IOException;

public class RuntimeDemo {

	public interface Expected {
		public boolean isExpected(Object target);
	}

	private static void waitFor(Process otherProcess, Expected value)
			throws IOException, InterruptedException {
		boolean done = false;
		while (!done) {
//			try (BufferedReader reader = new BufferedReader(
//					new InputStreamReader(otherProcess.getInputStream()))) {
//				String line = "";
//				while (line != null) {
//					line = reader.readLine();
//					if (value.isExpected(line)) {
//						done = true;
//						break;
//					}
//				}
//			}
			Thread.sleep(10000);
		}
	}

	public static void main(String[] args) throws IOException,
			InterruptedException {
		Process process = Runtime.getRuntime().exec("D:\\Link\\test.bat");

		waitFor(process, new Expected() {
			@Override
			public boolean isExpected(Object target) {
				if (target == null)
					return false;
				String starget = (String) target;
				if (starget.indexOf("End") != -1)
					return true;
				return false;
			}
		});

		System.out.println("Done");
	}
}
