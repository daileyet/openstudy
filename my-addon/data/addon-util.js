function getBase64Image(img) {
	try {
		var canvas = document.createElement('canvas');
		canvas.width = img.width;
		canvas.height = img.height;
		var ctx = canvas.getContext('2d');
		ctx.drawImage(img, 0, 0);
		var imgType = img.src.match(/\.(jpg|jpeg|png|gif)$/i);
		if (imgType && imgType.length) {
			imgType = imgType[1].toLowerCase() == 'jpg' ? 'jpeg' : imgType[1].toLowerCase();
		} else {
			throw 'Invalid image type for canvas encoder: ' + img.src;
		}
		return canvas.toDataURL('image/' + imgType);
	} catch (e) {
		console && console.log(e);
		return 'error';
	}
}