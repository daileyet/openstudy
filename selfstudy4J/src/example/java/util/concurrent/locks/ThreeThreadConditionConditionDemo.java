package example.java.util.concurrent.locks;

import java.util.concurrent.locks.Condition;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

public class ThreeThreadConditionConditionDemo {

	static class Business {
		private int nextShouldrun = 1;
		private Lock lock = new ReentrantLock();
		private Condition condition1 = lock.newCondition();
		private Condition condition2 = lock.newCondition();
		private Condition condition3 = lock.newCondition();

		public void sub1(int priamry) {
			lock.lock();
			try {
				while (nextShouldrun != 1) {
					try {
						condition1.await();
					} catch (InterruptedException e) {
						e.printStackTrace();
					}
				}
				for (int i = 0; i < 20; i++) {
					System.out.println("Sub1 with " + priamry + " run " + i);
				}
				nextShouldrun = 2;
				condition2.signal();
			} finally {
				lock.unlock();
			}
		}

		public void sub2(int subkey) {
			lock.lock();
			try {
				while (nextShouldrun != 2) {
					try {
						condition2.await();
					} catch (InterruptedException e) {
						e.printStackTrace();
					}
				}
				for (int i = 0; i < 10; i++) {
					System.out.println("Sub2 with " + subkey + " run " + i);
				}
				nextShouldrun = 3;
				condition3.signal();
			} finally {
				lock.unlock();
			}
		}

		public void sub3(int subkey) {
			lock.lock();
			try {
				while (nextShouldrun != 3) {
					try {
						condition3.await();
					} catch (InterruptedException e) {
						e.printStackTrace();
					}
				}
				for (int i = 0; i < 5; i++) {
					System.out.println("Sub3 with " + subkey + " run " + i);
				}
				nextShouldrun = 1;
				condition1.signal();
			} finally {
				lock.unlock();
			}
		}

	}

	public static void main(String[] args) {
		final Business bus = new Business();

		new Thread(new Runnable() {
			@Override
			public void run() {
				for (int i = 1; i < 50; i++) {
					bus.sub3(i);
				}
			}
		}).start();

		new Thread(new Runnable() {
			@Override
			public void run() {
				for (int i = 1; i < 50; i++) {
					bus.sub2(i);
				}
			}
		}).start();

		for (int i = 1; i < 50; i++) {// main thread
			bus.sub1(i);
		}
	}
}
