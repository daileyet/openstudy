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
* @Title: FindSerializableClass.java 
* @Package example.book.thinkinjava4.serializable 
* @Description: TODO
* @author dailey  
* @date 2012-10-30
* @version V1.0   
*/
package example.book.thinkinjava4.serializable.finder;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.ObjectInputStream;

import org.junit.Test;

import junit.framework.Assert;

/**
 * @author dailey
 *
 */
public class FindSerializableClass {

	@Test
	public void testFindSerializaleClazz() {
		//read object
		ObjectInputStream ois = null;
		try {
			ois = new ObjectInputStream(new FileInputStream(
					"example.book.thinkinjava4.serializable.SimpleSerializeTest.ser"));
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		try {
			Object object = ois.readObject();
			Assert.assertNotNull(object);
			System.out.println(object.getClass().toString());
		} catch (IOException e) {
			Assert.fail("Should throw ClassNotFoundException");
		} catch (ClassNotFoundException e) {
			
		}

	}

}
