package example.java.nio;

import java.io.File;
import java.io.IOException;
import java.io.RandomAccessFile;
import java.nio.MappedByteBuffer;
import java.nio.channels.FileChannel;
import java.nio.channels.FileChannel.MapMode;
import java.util.Arrays;
import java.util.Date;
import java.util.concurrent.Callable;
import java.util.concurrent.CompletionService;
import java.util.concurrent.ExecutorCompletionService;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;

import example.crypto.DAESer;

public class MappedByteBufferDemo {

	public static void main(String[] args) throws Exception {
		final int MIX_LEN = 32;
		final String MARK_XOR = "CRYPT@OPENTHINKS";
		final byte[] BYTE_MARK_XOR = MARK_XOR.getBytes();
		final DAESer daeSer = new DAESer("123456");
		final File file = new File("D:\\mypicture.jpg");
		final RandomAccessFile randomFile = new RandomAccessFile(file, "rw");
		final FileChannel fileChannel = randomFile.getChannel();
		final byte[] encryptXOR = daeSer.encrypt(BYTE_MARK_XOR);
		final int BLOCK_SPACE = 1;
		// file = new File("D:\\bookmark.html");
		long fileSize = file.length();
		System.out.println("File length: " + fileSize / 1024 + "KB");
		System.out
				.println("File modify date: " + new Date(file.lastModified()));
		
		long file_block_count = fileSize / MIX_LEN;
		final ExecutorService executorService =Executors.newCachedThreadPool();
		final CompletionService<String> competeService = new ExecutorCompletionService<String>(
				executorService);
		
		for (int blockNum = 0; blockNum < file_block_count;) {
			int blockStart = blockNum * MIX_LEN;
			competeService.submit(new Callable<String>() {
				@Override
				public String call() throws Exception {
					mixFileBlock(MIX_LEN,blockStart,encryptXOR,fileChannel);
					return "SUCCESS on "+blockStart;
				}
			});
			
			blockNum = blockNum + BLOCK_SPACE;
		}
		long s_t = new Date().getTime();
		for(int blockNum = 0; blockNum < file_block_count;){
			Future<String> future = competeService.take();
			//System.out.println(future.get());
			blockNum = blockNum + BLOCK_SPACE;
		}
		long e_t = new Date().getTime();
		System.out.println(e_t-s_t);
		executorService.shutdown();
		randomFile.close();
	}

	private static void mixFileBlock(final int MIX_LEN,
			final int MIXED_START_POSITION, final byte[] encryptXOR,
			FileChannel fileChannel) throws Exception {
		MappedByteBuffer mappedByteBuffer = fileChannel.map(MapMode.READ_WRITE,
				MIXED_START_POSITION, MIX_LEN);
		byte[] header = new byte[MIX_LEN];
		mappedByteBuffer.get(header);
		for (int i = 0; i < header.length; i++) {
			header[i] = (byte) (header[i] ^ encryptXOR[i]);
			mappedByteBuffer.put(i, header[i]);
		}
		mappedByteBuffer.force();
		mappedByteBuffer.clear();
	}

}
