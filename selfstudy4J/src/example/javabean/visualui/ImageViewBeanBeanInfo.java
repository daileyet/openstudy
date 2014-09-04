package example.javabean.visualui;

import java.awt.Image;
import java.beans.IntrospectionException;
import java.beans.PropertyDescriptor;
import java.beans.SimpleBeanInfo;

public class ImageViewBeanBeanInfo extends SimpleBeanInfo {

	@Override
	public PropertyDescriptor[] getPropertyDescriptors() {
		return propertyDescriptors;
	}

	private PropertyDescriptor[] propertyDescriptors = null;

	public ImageViewBeanBeanInfo() {
		try {
			propertyDescriptors = new PropertyDescriptor[] { new PropertyDescriptor(
					"fileName", ImageViewBean.class) };
		} catch (IntrospectionException e) {
			propertyDescriptors = null;
		}
		iconColor32 = loadImage("image/java.GIF");
	}

	@Override
	public Image getIcon(int iconKind) {
		return iconColor32;
	}

	private Image iconColor32;

}
