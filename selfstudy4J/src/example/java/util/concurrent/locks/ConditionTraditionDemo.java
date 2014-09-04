package example.java.util.concurrent.locks;

public class ConditionTraditionDemo {

	static class Business {
		private volatile int nextShouldrun = 1;

		public synchronized void sub1(int priamry) {
			while (nextShouldrun != 1) {
				try {
					this.wait();
				} catch (InterruptedException e) {
					e.printStackTrace();
				}
			}
			for (int i = 0; i < 20; i++) {
				System.out.println("Sub1 with " + priamry + " run " + i);
			}
			nextShouldrun = 2;
			this.notifyAll();
		}

		public synchronized void sub2(int subkey) {
			while (nextShouldrun != 2) {
				try {
					this.wait();
				} catch (InterruptedException e) {
					e.printStackTrace();
				}
			}
			for (int i = 0; i < 10; i++) {
				System.out.println("Sub2 with " + subkey + " run " + i);
			}
			nextShouldrun = 1;
			this.notifyAll();
		}

	}

	public static void main(String[] args) {
		final Business bus = new Business();

		new Thread(new Runnable() {
			@Override
			public void run() {
				for (int i = 1; i < 10; i++) {
					bus.sub2(i);
				}
			}
		}).start();

		for (int i = 1; i < 10; i++) {// main thread
			bus.sub1(i);
		}
	}
}
