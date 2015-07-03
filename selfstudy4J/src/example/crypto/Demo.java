package example.crypto;

import example.crypto.DAESer.KeyWrapper;

public class Demo {

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
		
//		testAES();
		
		testXOR();
	}

	private static void testAES() throws Exception {
		DAESer daeSer = new DAESer();
		String key ="123456";
		daeSer.setKey(key);
		byte[] keys = KeyWrapper.getInstance().valueOf(key);
		System.out.println("密钥: byte[]:"+showByteArray(keys));
		byte[] data = "openthinks12345".getBytes();
		System.out.println("明文长度:"+data.length);
		byte[] encryptData = daeSer.encrypt(data);
		System.out.println("加密后数据长度:"+encryptData.length);
		System.out.println("加密后数据: byte[]:"+showByteArray(encryptData));
		System.out.println();
		
		byte[] decryptData = daeSer.decrypt(encryptData);
		System.out.println("解密后数据长度:"+decryptData.length);
		System.out.println("解密后数据: byte[]:"+showByteArray(decryptData));
		System.out.println("解密后数据: string:"+new String(decryptData));
	}
	
	static void testXOR(){
		String data = "这是一段测试文本";
		String XOR = "CRYPT@OPENTHINKS";
		String XOR2 = "CRYPT2OPENTHINKS";
		byte[] byteData = data.getBytes();
		byte[] byteXOR = XOR.getBytes();
		byte[] byteXOR2 = XOR2.getBytes();
		
		System.out.println(showByteArray(byteXOR));
		
		
		for(int i=0;i<16;i++){
			byteData[i] = (byte) (byteData[i] ^ byteXOR[i]);
		}
		System.out.println("异或后数据: byte[]:"+showByteArray(byteData));
		System.out.println("异或后数据: string:"+new String(byteData));
		System.out.println();
		
		for(int i=0;i<16;i++){
			byteData[i] = (byte) (byteData[i] ^ byteXOR2[i]);
		}
		System.out.println("再次异或后数据: byte[]:"+showByteArray(byteData));
		System.out.println("再次异或后数据: string:"+new String(byteData));
		System.out.println();
	}
	
}
