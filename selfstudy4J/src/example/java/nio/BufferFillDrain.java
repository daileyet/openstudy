/*
 * @(#) BufferFillDrain.java Aug 15, 2012 10:14:26 AM
 *
 * Copyright 2012 Rockwell Automation, Inc. All rights reserved.
 * Rockwell Automation PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */package example.java.nio;

import java.nio.CharBuffer;

/**
 * TODO Please enter the description of this type. This is mandatory!
 * <p>
 * @author dailey_dai, Aug 15, 2012 10:14:26 AM
 */
public class BufferFillDrain {
	private static String[] strings = { "A random string value", "The product of an infinite number of monkeys",
			"Help me!", "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", "BBBBBBBBBBBBBBBBBBBBBBB" };
	private static int index = 0;

	public static void main(String[] args) {
		CharBuffer buffer = CharBuffer.allocate(100);
		while (fillBuffer(buffer)) {
			buffer.flip();
			drainBuffer(buffer);
			buffer.clear();
		}

	}

	/**
	 * @param buffer
	 */
	private static void drainBuffer(CharBuffer buffer) {
		while (buffer.hasRemaining()) {
			System.out.print(buffer.get());
		}
		System.out.println();

	}

	/**
	 * @param buffer
	 * @return
	 */
	private static boolean fillBuffer(CharBuffer buffer) {
		if (index >= strings.length) {
			return (false);
		}
		String string = strings[index++];
		for (int i = 0; i < string.length(); i++) {
			buffer.put(string.charAt(i));
		}
		return true;
	}

}
