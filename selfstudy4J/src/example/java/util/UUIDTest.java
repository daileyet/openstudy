package example.java.util;

import java.util.UUID;

import org.junit.Test;

public class UUIDTest {
	
	@Test
	public void randomUUIDTest(){
		System.out.println(UUID.randomUUID());
		System.out.println(UUID.class.getName());
	}
	
	
	@Test
	public void fromStringTest(){
		System.out.println(UUID.fromString("5b4da6cd-a03f-4c08-9864-67bb23ed1815"));
	}
}
