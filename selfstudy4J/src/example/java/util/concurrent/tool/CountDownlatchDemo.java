package example.java.util.concurrent.tool;

import java.util.Random;
import java.util.concurrent.CountDownLatch;

public class CountDownlatchDemo {

	static class TestContext {

		public void testCountDownMultiThreadWait() {
			final CountDownLatch countLatch = new CountDownLatch(3);

			for (int i = 0; i < 10; i++) {
				new Thread(new Runnable() {
					@Override
					public void run() {
						try {
							countLatch.await();
							System.out.println(Thread.currentThread().getName()
									+ " 出发了");
						} catch (InterruptedException e) {
							e.printStackTrace();
						}
					}
				}).start();
			}
			// main thread
			for (int i = 3; i > 0; i--) {
				System.out
						.println(Thread.currentThread().getName() + " 说:" + i);
				countLatch.countDown();
				try {
					Thread.sleep(1000);
				} catch (InterruptedException e) {
					e.printStackTrace();
				}
			}
		}

		public void testCountDownWaitMultiThread() {
			final CountDownLatch countLatch = new CountDownLatch(10);
			final Random random = new Random();
//			final AtomicInteger sequence=new AtomicInteger(0);
			for (int i = 0; i < 10; i++) {
				new Thread(new Runnable() {
					@Override
					public void run() {
						try {
							Thread.sleep(random.nextInt(20) * 1000);
							countLatch.countDown();
							System.out.println(Thread.currentThread().getName()
									+ " 到达终点了,名次为:"
							+ (10-countLatch.getCount()));
							// + sequence.addAndGet(1));
						} catch (InterruptedException e) {
							e.printStackTrace();
						}
					}
				}).start();
			}
			// main thread
			try {
				countLatch.await();
				System.out.println(Thread.currentThread().getName()
						+ " 宣布比赛结束.");
			} catch (InterruptedException e) {
				e.printStackTrace();
			}

		}

	}

	public static void main(String[] args) {
		TestContext context = new TestContext();
		 context.testCountDownMultiThreadWait();
//		context.testCountDownWaitMultiThread();
	}

}
