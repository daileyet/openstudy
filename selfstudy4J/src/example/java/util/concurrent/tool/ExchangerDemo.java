package example.java.util.concurrent.tool;

import java.util.concurrent.Exchanger;
import static example.java.util.concurrent.common.Help.next;
import static example.java.util.concurrent.common.Help.sleep;
public class ExchangerDemo {

	static class TestContext {

		final Exchanger<Substance> exchanger = new Exchanger<Substance>();

		public void testExchanger() {

			new Thread(new Runnable() {
				@Override
				public void run() {
					while (true) {
						Money money = new Money();
						System.out.println(Thread.currentThread().getName()
								+ " 准备好Money.");
						sleep(next(10) * 500);
						try {
							Substance drug = exchanger.exchange(money);
							if (drug instanceof Drug) {
								System.out.println(Thread.currentThread()
										.getName() + " 拿到了" + drug);
								sleep(1000);
								System.out.println("双方确认,交易成功.");
							} else {
								System.out.println("交易失败.");
							}
						} catch (InterruptedException e) {
							e.printStackTrace();
						}

					}
				}
			}).start();

			new Thread(new Runnable() {
				@Override
				public void run() {
					while (true) {
						Drug drug = new Drug();
						System.out.println(Thread.currentThread().getName()
								+ " 准备好Drug.");
						sleep(next(10) * 500);
						try {
							Substance money = exchanger.exchange(drug);
							if (money instanceof Money)
								System.out.println(Thread.currentThread()
										.getName() + " 拿到了" + money);
						} catch (InterruptedException e) {
							e.printStackTrace();
						}
						sleep(2000);
					}
				}
			}).start();

		}

	}

	static class Substance {

	}

	static class Money extends Substance {
		private int money = 0;
		{
			money = next(1000);
		}

		@Override
		public String toString() {
			return money + "$.";
		}
	}

	static class Drug extends Substance {
		private int weight = 0;
		{
			weight = next(10);
		}

		@Override
		public String toString() {
			return weight + "g drug.";
		}
	}

	public static void main(String[] args) {
		TestContext context = new TestContext();
		context.testExchanger();
	}
}
