package example.java.util.concurrent.locks;

import static example.java.util.concurrent.common.Help.sleep;

import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

public class SynchronizedLockDemo {

	static class OutPuter {
		Lock lock = new ReentrantLock();

		public void println(String str) {
			lock.lock();
			try {
				for (char c : str.toCharArray()) {
					System.out.print(c);
				}
				System.out.println();
			} finally {
				lock.unlock();
			}
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
