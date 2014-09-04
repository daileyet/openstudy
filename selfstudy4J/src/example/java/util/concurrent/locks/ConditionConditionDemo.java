package example.java.util.concurrent.locks;

import java.util.concurrent.locks.Condition;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

public class ConditionConditionDemo {

	class Business {
		private int nextShouldrun = 1;
		private Lock lock = new ReentrantLock();
		private Condition condition = lock.newCondition();

		public void sub1(int priamry) {
			lock.lock();
			try {
				while (nextShouldrun != 1) {
					try {
						condition.await();
					} catch (InterruptedException e) {
						e.printStackTrace();
					}
				}
				for (int i = 0; i < 30; i++) {
					System.out.println("Sub1 with " + priamry + " run " + i);
				}
				nextShouldrun = 2;
				condition.signal();
			} finally {
				lock.unlock();
			}
		}

		public void sub2(int subkey) {
			lock.lock();
			try {
				while (nextShouldrun != 2) {
					try {
						condition.await();
					} catch (InterruptedException e) {
						e.printStackTrace();
					}
				}
				for (int i = 0; i < 20; i++) {
					System.out.println("Sub2 with " + subkey + " run " + i);
				}
				nextShouldrun = 1;
				condition.signal();
			} finally {
				lock.unlock();
			}
		}

	}

	public void comunication() {
		final Business bus = new Business();

		new Thread(new Runnable() {
			@Override
			public void run() {
				for (int i = 1; i < 50; i++) {
					bus.sub2(i);
				}
			}
		}).start();

		for (int i = 1; i < 50; i++) {
			bus.sub1(i);
		}
	}

	public static void main(String[] args) {
		ConditionConditionDemo testCase = new ConditionConditionDemo();
		testCase.comunication();
	}
}
