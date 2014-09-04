package example.java.util.concurrent.tool;

import java.util.Random;
import java.util.concurrent.BrokenBarrierException;
import java.util.concurrent.CyclicBarrier;

public class CyclicBarrierDemo2 {

	static class TestContext {
		final Random random = new Random();
		final int RALLYCOUNT = 3;

		final CyclicBarrier barrier = new CyclicBarrier(10, new Runnable() {
			int count = 0;// �������ϵ�Ĵ���

			@Override
			public void run() {
				count++;
				if (count < RALLYCOUNT) {

					new Thread(new Runnable() {
						@Override
						public void run() {
							barrier.reset();//����Barrier
						}
					}).start();

				}
				System.out.println("Ŀ�ĵ�" + count + "�������.");

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
										.getName() + " ��" + count + "�γ�����.");
								Thread.sleep(random.nextInt(10) * 1000);
								System.out.println(Thread.currentThread()
										.getName() + " ����Ŀ�ĵ�" + count);
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
