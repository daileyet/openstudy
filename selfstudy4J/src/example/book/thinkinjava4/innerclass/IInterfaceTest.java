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
* @Title: IInterfaceTest.java 
* @Package example.book.thinkinjava4.innerclass 
* @Description: TODO
* @author dailey  
* @date 2012-10-31
* @version V1.0   
*/
package example.book.thinkinjava4.innerclass;

import java.lang.reflect.Modifier;

/**
 * @author dailey
 *
 */
public class IInterfaceTest {

	
	/**
	 * @param args
	 */
	public static void main(String[] args) {
		Class<IInterface.Inner> clz=IInterface.Inner.class;
		System.out.println(Modifier.toString(clz.getModifiers()));

	}

}
