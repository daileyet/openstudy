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
* @Title: CloneObject.java 
* @Package example.book.effecitivejava2nd.item11 
* @Description: TODO
* @author dailey_dai  
* @date Jul 4, 2012
* @version V1.0   
*/
package example.book.effecitivejava2nd.item11;


/**
 * @author dailey_dai
 *
 */
public class CloneObject extends Object {
	private String content;

	/**
	 * @param content
	 */
	public CloneObject(String content) {
		super();
		this.content = content;
	}

	/* (non-Javadoc)
	 * @see java.lang.Object#clone()
	 */
	@Override
	public Object clone() throws CloneNotSupportedException {
		//new CloneObject(this.content);
		return super.clone();
	}

	public static void main(String[] args) throws CloneNotSupportedException {
		CloneObject object1 = new CloneObject("objec1");
		Object object2 = object1.clone();
		System.out.println(object1 == object2);
		System.out.println(object1.equals(object2));
	}
}
