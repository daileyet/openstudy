package example.java.util.concurrent.threadpool;

import static example.java.util.concurrent.common.Help.sleep;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.LinkedBlockingQueue;
import java.util.concurrent.ThreadPoolExecutor;
import java.util.concurrent.TimeUnit;

/**
 * 1.CachedThreadPool 
 * 2.FixedThreadPool 
 * 3.SingleThreadPool
 * 4.RejectedExecutionhandler
 * 5.ScheduledThreadPool
 * @see FutureCallableDemo,CompletionServiceDemo 
 * @author dailey_dai
 */
public class ThreadPoolExecutorDemo {

	static class TestContext {

		/**
		 * 
		 * @param service
		 *            ThreadPool
		 * @param rate
		 *            speed for add runnable to thread pool
		 * @param avgCost
		 *            every task run time cost
		 */
		void testExecutorService(ExecutorService service, long rate,
				final long avgCost) {

			for (int i=0;i<10;i++) {
				final int index=i;
				service.execute(new Runnable() {
					@Override
					public void run() {
						System.out.println(Thread.currentThread().getName()
								+ " " + System.currentTimeMillis()+" "+index);
						sleep(avgCost);
					}
				});
				sleep(rate);
			}
		}

		public void testCachedThreadPool() {
			ExecutorService service = Executors.newCachedThreadPool();
			testExecutorService(service, 0, 1000);
		}

		public void testFixedThreadPool() {
			ExecutorService service = Executors.newFixedThreadPool(100);
			testExecutorService(service, 100, 0);
		}

		public void testSingleThreadPool() {
			ExecutorService service = Executors.newSingleThreadExecutor();
			testExecutorService(service, 1000, 0);
		}
		
		public void testThreadPoolPolicy(){
			ThreadPoolExecutor service=new ThreadPoolExecutor(1,1,10,TimeUnit.SECONDS,new LinkedBlockingQueue<Runnable>(1));
			service.setRejectedExecutionHandler(new ThreadPoolExecutor.CallerRunsPolicy());
			testExecutorService(service, 0, 1000);
			
		}

	}

	public static void main(String[] args) {
		TestContext context = new TestContext();
//		context.testCachedThreadPool();
//		 context.testFixedThreadPool();
//		 context.testSingleThreadPool();
		context.testThreadPoolPolicy();
	}

}
