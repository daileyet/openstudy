package example.java.util.concurrent.tool;

import java.util.Date;
import java.util.Random;
import java.util.concurrent.BrokenBarrierException;
import java.util.concurrent.CyclicBarrier;

public class CyclicBarrierDemo {

	static class RandomCreateorControl {
		private int[][] randomMatrix;
		public static final int ROW_NUM = 10;
		public static final int COL_NUM = 1000;
		private final long startMils;
		private Random r = new Random();
		private final CyclicBarrier barrier = new CyclicBarrier(ROW_NUM,
				new Runnable() {
					@Override
					public void run() {
						System.out.println("Multi thread Complete use:"
								+ (new Date().getTime() - startMils));
						// for(int[] row:randomMatrix){
						// for(int val:row){
						// System.out.print(val+" ");
						// }
						// System.out.println();
						// }
					}
				});

		public int nextInt() {
			return r.nextInt(ROW_NUM * COL_NUM);
		}

		public RandomCreateorControl() {
			initRandomMatrix();
			startMils = new Date().getTime();
		}

		private void initRandomMatrix() {
			randomMatrix = new int[10][100];
		}

		public void set(int row, int[] rowVal) {
			randomMatrix[row] = rowVal;
		}

		public CyclicBarrier getBarrier() {
			return barrier;
		}
	}

	static class RandomCreateor implements Runnable {
		private int sequnece;
		private RandomCreateorControl control;

		public RandomCreateor(int sequence, RandomCreateorControl control) {
			this.sequnece = sequence;
			this.control = control;
		}

		@Override
		public void run() {

			int[] sequenceRandom = new int[RandomCreateorControl.COL_NUM];
			for (int i = 0; i < sequenceRandom.length; i++) {
				sequenceRandom[i] = control.nextInt();
			}
			control.set(sequnece, sequenceRandom);
//			System.out.println("Matrix row:" + sequnece + " has been ok.");
			try {
				control.getBarrier().await();
			} catch (InterruptedException e) {
				e.printStackTrace();
			} catch (BrokenBarrierException e) {
				e.printStackTrace();
			}

		}
	}

	public static void main(String[] args) {
		RandomCreateorControl control = new RandomCreateorControl();
		for (int i = 0; i < RandomCreateorControl.ROW_NUM; i++) {
			new Thread(new RandomCreateor(i, control)).start();
		}

		int[][] randomMatrix = new int[RandomCreateorControl.ROW_NUM][RandomCreateorControl.COL_NUM];
		long startMils = new Date().getTime();
		Random r = new Random();
		for (int i = 0; i < RandomCreateorControl.ROW_NUM; i++) {
			for (int j = 0; j < RandomCreateorControl.COL_NUM; j++) {
				randomMatrix[i][j] = r.nextInt(RandomCreateorControl.COL_NUM
						* RandomCreateorControl.ROW_NUM);
			}
		}
		System.out.println("Single thread Complete use:"
				+ (new Date().getTime() - startMils));
	}
}
