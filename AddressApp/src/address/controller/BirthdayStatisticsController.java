package address.controller;

import java.text.DateFormatSymbols;
import java.util.Locale;

import javafx.collections.FXCollections;
import javafx.collections.ObservableList;
import javafx.fxml.FXML;
import javafx.scene.chart.BarChart;
import javafx.scene.chart.CategoryAxis;
import javafx.scene.chart.XYChart;
import address.model.Person;

public class BirthdayStatisticsController {
	
	private ObservableList<String> monthNames = FXCollections
			.observableArrayList();

	@FXML
	private BarChart<String, Integer> barChart;

	@FXML
	private CategoryAxis xAxis;

	@FXML
	private void initialize() {
		String[] months = DateFormatSymbols.getInstance(Locale.ENGLISH).getMonths();
		monthNames.clear();
		monthNames.addAll(months);
		if(xAxis!=null)
		xAxis.setCategories(monthNames);
	}
	
	public void setPersonData(ObservableList<Person> personData){
		int[] monthCounts = new int[12];
		for(Person p:personData){
			int monthValue = p.getBirthday().getMonthValue();
			monthCounts[monthValue-1]++;
		}
		
		XYChart.Series<String, Integer> series =new XYChart.Series<String, Integer>();
		for(int i=0;i<monthCounts.length;i++){
			series.getData().add(new XYChart.Data<String, Integer>(monthNames.get(i),monthCounts[i]));
		}
		barChart.getData().add(series);
	}
	
	public static void main(String[] args) {
		BirthdayStatisticsController controller = new BirthdayStatisticsController();
		controller.initialize();
		for(String s:controller.monthNames){
			System.out.println(s);
		}
		
	}
}
