package example.java.util.concurrent.tool;

import java.util.Random;
import java.util.concurrent.BrokenBarrierException;
import java.util.concurrent.CyclicBarrier;

public class CyclicBarrierDemo2 {

	static class TestContext {
		final Random random = new Random();
		final int RALLYCOUNT = 3;

		final CyclicBarrier barrier = new CyclicBarrier(10, new Runnable() {
			int count = 0;// 到达屏障点的次数

			@Override
			public void run() {
				count++;
				if (count < RALLYCOUNT) {

					new Thread(new Runnable() {
						@Override
						public void run() {
							barrier.reset();//重置Barrier
						}
					}).start();

				}
				System.out.println("目的地" + count + "集结完毕.");

			}
		});

		public void goRallyPoint() {

			for (int i = 0; i < 10; i++) {

				new Thread(new Runnable() {
					@Override
					public void run() {
						for (int count = 1; count <= RALLYCOUNT; count++) {
							try {
								System.out.println(Thread.currentThread()
										.getName() + " 第" + count + "次出发了.");
								Thread.sleep(random.nextInt(10) * 1000);
								System.out.println(Thread.currentThread()
										.getName() + " 到达目的地" + count);
								barrier.await();
							} catch (InterruptedException e) {
								e.printStackTrace();
							} catch (BrokenBarrierException e) {
								e.printStackTrace();
							}

						}

					}
				}).start();

			}

		}
	}

	public static void main(String[] args) {
		TestContext context = new TestContext();
		context.goRallyPoint();
	}
}
