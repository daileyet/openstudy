/**   
 *  Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
* @Title: SimpleSerializeTest.java 
* @Package example.book.thinkinjava4.serializable 
* @Description: TODO
* @author dailey  
* @date 2012-10-30
* @version V1.0   
*/
package example.book.thinkinjava4.serializable;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.NotSerializableException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.io.Serializable;

import junit.framework.Assert;

import org.junit.Test;

/**
 * @author dailey
 *
 */
public class SimpleSerializeTest {

	@Test
	public void testNotimplementSerializable() {
		NotImplementSerializable notImplementSerializable = new NotImplementSerializable();
		ObjectOutputStream oos = null;
		try {
			oos = new ObjectOutputStream(new FileOutputStream(SimpleSerializeTest.class.getName() + ".ser"));
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		boolean isThrow = true;
		try {
			oos.writeObject(notImplementSerializable);
			oos.flush();
			oos.close();
			isThrow = false;
		} catch (IOException e) {
			Assert.assertEquals(true, e instanceof NotSerializableException);
		}
		if (isThrow == false)
			Assert.fail("Should throw NotSerializableException");
	}

	@Test
	public void tesImplementSerializable() {
		//write object
		ImplementSerializableChangeName implementSerializableChangeName = new ImplementSerializableChangeName();
		ObjectOutputStream oos = null;
		try {
			oos = new ObjectOutputStream(new FileOutputStream(SimpleSerializeTest.class.getName() + ".ser"));
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		boolean isThrow = true;
		try {
			oos.writeObject(implementSerializableChangeName);
			oos.flush();
			oos.close();
			isThrow = false;
		} catch (IOException e) {
			
		}
		if (isThrow == true)
			Assert.fail("Should not throw NotSerializableException");
		
		//read object
		ObjectInputStream ois=null;
		try {
			ois=new ObjectInputStream(new FileInputStream(SimpleSerializeTest.class.getName() + ".ser"));
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		try {
			Object object=ois.readObject();
			Assert.assertEquals(true, object instanceof ImplementSerializableChangeName);
			String actual=((ImplementSerializableChangeName)object).getName();
			Assert.assertEquals("Implement Serializable", actual);
		} catch (IOException e) {
			Assert.fail();
		} catch (ClassNotFoundException e) {
			Assert.fail();
		}
	}

}

class NotImplementSerializable {
	private String name = "No implement Serializable";

	/**
	 * @return the name
	 */
	public String getName() {
		return name;
	}

}

class ImplementSerializableChangeName implements Serializable {
	private static final long serialVersionUID = -8177349493609906433L;
	private String name = "Implement Serializable";

	/**
	 * @return the name
	 */
	public String getName() {
		return name;
	}

}