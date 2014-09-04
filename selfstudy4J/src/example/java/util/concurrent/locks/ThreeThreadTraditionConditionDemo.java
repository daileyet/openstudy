package example.java.util.concurrent.locks;

public class ThreeThreadTraditionConditionDemo {

	static class Business {
		private volatile int nextShouldrun = 1;
		private Object run1 = new Object();
		private Object run2 = new Object();
		private Object run3 = new Object();

		public synchronized void sub1(int priamry) {
			while (nextShouldrun != 1) {
				try {
					run1.wait();
				} catch (InterruptedException e) {
					e.printStackTrace();
				}
			}
			for (int i = 0; i < 20; i++) {
				System.out.println("Sub1 with " + priamry + " run " + i);
			}
			nextShouldrun = 2;
			run2.notify();
		}

		public synchronized void sub2(int subkey) {
			while (nextShouldrun != 2) {
				try {
					run2.wait();
				} catch (InterruptedException e) {
					e.printStackTrace();
				}
			}
			for (int i = 0; i < 10; i++) {
				System.out.println("Sub2 with " + subkey + " run " + i);
			}
			nextShouldrun = 3;
			run3.notify();
		}

		public synchronized void sub3(int subkey) {
			while (nextShouldrun != 3) {
				try {
					run3.wait();
				} catch (InterruptedException e) {
					e.printStackTrace();
				}
			}
			for (int i = 0; i < 5; i++) {
				System.out.println("Sub3 with " + subkey + " run " + i);
			}
			nextShouldrun = 1;
			run1.notify();
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

		for (int i = 1; i < 50; i++) {
			bus.sub1(i);
		}
	}
}
