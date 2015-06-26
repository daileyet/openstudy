package example.java.nio;

import java.io.File;
import java.io.IOException;
import java.io.RandomAccessFile;
import java.nio.MappedByteBuffer;
import java.nio.channels.FileChannel;
import java.nio.channels.FileChannel.MapMode;
import java.util.Arrays;
import java.util.Date;

import example.crypto.DAESer;

public class MappedByteBufferDemo {
	private static String  showByteArray(byte[] data){
		if(null == data){
			return null;
		}
		StringBuilder sb = new StringBuilder("{");
		for(byte b:data){
			sb.append(b).append(",");
		}
		sb.deleteCharAt(sb.length()-1);
		sb.append("}");
		return sb.toString();
	}
	public static void main(String[] args) throws Exception {
		final String MARK_EOF = "CRYPT@OPENTHINKS";
		final String MARK_XOR = "CRYPT@OPENTHINKS";
		final byte[] BYTE_MARK_XOR = MARK_XOR.getBytes();
		final  DAESer daeSer = new DAESer("123456");
		
		File file = new File("D:\\20140915_143801.jpg");
		file =new File("D:\\bookmark.html");
		long fileSize = file.length();
		System.out.println("File length: "+ fileSize/1024 +"KB");
		System.out.println("File modify date: "+ new Date(file.lastModified()));
		RandomAccessFile randomFile = new RandomAccessFile(file, "rw");
		FileChannel fileChannel = randomFile.getChannel();
		MappedByteBuffer mappedByteBuffer =  fileChannel.map(MapMode.READ_ONLY, fileSize-32, 32);
		byte[] buffer = new byte[32];
		mappedByteBuffer.get(buffer);
		byte[] decryptMarked;
		try {
			decryptMarked = daeSer.decrypt(buffer);
		} catch (Exception e) {
			decryptMarked = new byte[]{0};
		}
		String endEOF = new String(decryptMarked);
		System.out.println("32bytes : "+showByteArray(buffer));
		System.out.println("32bytes=>string : "+endEOF);
		if(MARK_EOF.equals(endEOF)){
			System.out.println("This file has been encrypt by OPENTHINKS AES");
			System.out.println("Decrypt...");
			//go to first
			byte[] header = new byte[32];
			mappedByteBuffer =  fileChannel.map(MapMode.READ_WRITE, 0, 32);
			mappedByteBuffer.get(header);
			byte[] encryptXOR = daeSer.encrypt(BYTE_MARK_XOR);
			for(int i=0;i<32;i++){
				header[i] = (byte) (header[i] ^ encryptXOR[i]);
				mappedByteBuffer.put(i, header[i]);
			}
			mappedByteBuffer.force();
			mappedByteBuffer.clear();
			//go to last
			byte[] ender = new byte[32];
			mappedByteBuffer =  fileChannel.map(MapMode.READ_WRITE, fileSize-32, 32);
			mappedByteBuffer.get(ender);
			for(int i=0;i<ender.length;i++){
				mappedByteBuffer.put(i, (byte)0);
			}
			mappedByteBuffer.force();
			mappedByteBuffer.clear();
			
			System.out.println("Decrypt by OPENTHINKS AES completed!");
		}
		else{
			System.out.println("This file has not been encrypt by OPENTHINKS AES");
			System.out.println("Encypt...");
			byte[] marked =MARK_EOF.getBytes();
			byte[] encryptMarked = daeSer.encrypt(marked);
			randomFile.seek(fileSize);
			randomFile.write(encryptMarked);
			//go to first
			byte[] header = new byte[32];
			mappedByteBuffer =  fileChannel.map(MapMode.READ_WRITE, 0, 32);
			mappedByteBuffer.get(header);
			byte[] encryptXOR = daeSer.encrypt(BYTE_MARK_XOR);
			for(int i=0;i<32;i++){
				header[i] = (byte) (header[i] ^ encryptXOR[i]);
				mappedByteBuffer.put(i, header[i]);
			}
			mappedByteBuffer.force();
			mappedByteBuffer.clear();
			System.out.println("Encypt by OPENTHINKS AES completed!");
		}
		randomFile.close();
	}
	
}
