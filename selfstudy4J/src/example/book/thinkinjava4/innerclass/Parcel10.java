package example.book.thinkinjava4.innerclass;


public class Parcel10 {
	private static class PContents extends Contents {
		private int i = 11;

		public int value() {
			return i;
		}
	}

	protected static class PDestination implements Destination {
		private String label;

		private PDestination(String whereTo) {
			label = whereTo;
		}

		public String readLabel() {
			return label;
		}
	}

	public Destination dest(String s) {
		return new PDestination(s);
	}

	public Contents cont() {
		return new PContents();
	}

	public static void main(String[] args) {
		Parcel10 p = new Parcel10();
		Contents c = p.cont();
		Contents c1=new PContents();
		Destination d = p.dest("Tanzania");
	}
}