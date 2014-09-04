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
* @Title: QuickSort.java 
* @Package example.book.algorithms.sort.quick 
* @Description: TODO
* @author dailey  
* @date 2012-10-30
* @version V1.0   
*/
package example.book.algorithms.sort.quick;

/**
 * @author Administrator
 *
 */
public class QuickSort {

	/**
	 * 
	 */
	public QuickSort(int[] array) {
		if (array != null) {
			quickSort(array, 0, array.length - 1);
		}
	}

	/**
	 * Quick sort method
	 * @param array int[] sort array
	 * @param begin int array begin index
	 * @param end	int array end index
	 */
	void quickSort(int[] array, int begin, int end) {
		if (begin < end) {
			int p = partition(array, begin, end);
			quickSort(array, begin, p - 1);
			quickSort(array, p + 1, end);
		}
	}

	/**
	 * @param array
	 * @param begin
	 * @param end
	 * @return partition index
	 */
	private int partition(int[] array, int begin, int end) {
		int partitionVal = array[begin];
		int i = begin, j = end + 1;
		do {
			do {
				if (i < end)
					i = i + 1;
				else
					break;
			} while (array[i] < partitionVal);

			do {
				if (j > 0)
					j = j - 1;
				else
					break;
			} while (array[j] > partitionVal);

			swap(array, i, j);

		} while (i < j);

		swap(array, i, j);
		swap(array, begin, j);

		return j;
	}

	void swap(int[] array, int swapIndex1, int swapIndex2) {
		int temp = array[swapIndex1];
		array[swapIndex1] = array[swapIndex2];
		array[swapIndex2] = temp;
	}

}
