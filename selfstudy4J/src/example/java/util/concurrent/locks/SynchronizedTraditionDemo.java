package example.java.util.concurrent.locks;

import static example.java.util.concurrent.common.Help.sleep;

public class SynchronizedTraditionDemo {

	static class OutPuter {

		public synchronized void println(String str) {
			for (char c : str.toCharArray()) {
				System.out.print(c);
			}
			System.out.println();
			//to do other thing
		}
	}

	public static void main(String[] args) {
		final OutPuter puter = new OutPuter();

		new Thread(new Runnable() {
			@Override
			public void run() {
				while (true) {
					puter.println("abcd");
					sleep(100);
				}
			}
		}).start();

		for (;;) {
			puter.println("efgh");
			sleep(100);
		}

	}

}
