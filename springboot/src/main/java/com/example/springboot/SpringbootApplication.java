package com.example.springboot;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.Properties;
import java.util.Scanner;

@SpringBootApplication
public class SpringbootApplication {

	private final String url = "jdbc:postgresql://34.42.99.34:5432/postgres";
	private final String user = "postgres";
	private final String password = "0000";

	/**
	 * Connect to the PostgreSQL database
	 *
	 * @return a Connection object
	 */
	public Connection task1() {
		System.out.println("=====");
		System.out.println("Test");
		System.out.println("=====");
		Connection conn = null;
		try {
			Properties props = new Properties();
			props.setProperty("user", user);
			props.setProperty("password", password);
			conn = DriverManager.getConnection(url, props);
			System.out.println("Connected to the PostgreSQL server successfully.");
		} catch (SQLException e) {
			System.out.println(e.getMessage());
		}
		System.out.println("");
		System.out.println("");

		return conn;
	}

	public void disconnect(Connection conn) {
		try {
			conn.close();
			System.out.println("Connection is closed successfully.");
		} catch (SQLException e) {
			System.out.println(e.getMessage());
		}
	}

	public void task2(Connection conn) {
		System.out.println("=====");
		System.out.println("Task2");
		System.out.println("=====");

		try {
			Statement st = null;
			String sql = null;
			st = conn.createStatement();
			sql = "SELECT id, name, dept_name, salary "
					+ "FROM instructor "
					+ "WHERE salary = (SELECT max(salary) FROM instructor) ";
			ResultSet rs = st.executeQuery(sql);
			System.out.println("info of the instructor who is receiving the highest salary:");
			System.out.println(" ID " + "\t"
					+ "  name   " + "\t"
					+ "dept_name" + "\t"
					+ "salary" + "\t");
			System.out.println("----" + "\t"
					+ "--------" + "\t"
					+ "---------" + "\t"
					+ "------");
			displayInstructor(rs);
			rs.close();
			st.close();
		} catch (SQLException e) {
			System.out.println(e.getMessage());
		}
		System.out.println("");
		System.out.println("");
	}

	public void task3(Connection conn) {
		System.out.println("=====");
		System.out.println("Task3");
		System.out.println("=====");

		try {
			Statement st;
			String sql;
			ResultSet rs = null;
			st = conn.createStatement();
			// fill in here

			// end
			System.out.println("info of instructors who are in the same department as the instructor receiving the highest salary:");
			System.out.println(" ID " + "\t"
					+ "  name   " + "\t"
					+ "dept_name" + "\t"
					+ "salary" + "\t");
			System.out.println("----" + "\t"
					+ "--------" + "\t"
					+ "---------" + "\t"
					+ "------");
			displayInstructor(rs);
			rs.close();
			st.close();
		} catch (SQLException e) {
			System.out.println(e.getMessage());
		}
		System.out.println("");
		System.out.println("");
	}

	public void task4(Connection conn) {
		System.out.println("=====");
		System.out.println("Task4");
		System.out.println("=====");

		String deptName = readDeptNameFromStdin();

		try {
			PreparedStatement pstmt = null;
			ResultSet rs;
			String SQL = "SELECT id, name, dept_name, salary "
					+ "FROM instructor "
					+ "WHERE dept_name = ?";
			// fill in here

			// end
			rs = pstmt.executeQuery();
			System.out.println("info of instructors in the department chosen by the user:");
			System.out.println(" ID " + "\t"
					+ "  name   " + "\t"
					+ "dept_name" + "\t"
					+ "salary" + "\t");
			System.out.println("----" + "\t"
					+ "--------" + "\t"
					+ "---------" + "\t"
					+ "------");
			displayInstructor(rs);
			rs.close();
			pstmt.close();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		System.out.println("");
		System.out.println("");
	}

	private String readDeptNameFromStdin() {
		String deptName;
		Scanner in=new Scanner(System.in);
		System.out.println("Enter the department name you want to get info of instructors from:");
		deptName=in.nextLine();
		System.out.println("The department name entered by the user is: " + deptName);
		in.close();
		return deptName;
	}

	private void displayInstructor(ResultSet rs) throws SQLException {
		while (rs.next()) {
			System.out.println(rs.getString(1) + "\t"   //First Column = "id"
					+ rs.getString(2) + "\t"            //Second Column = "name"
					+ rs.getString("dept_name") + "\t\t"
					+ rs.getBigDecimal("salary"));
		}
	}

	/**
	 * @param args the command line arguments
	 */
	public static void main(String[] args) {
		SpringApplication.run(SpringBootApplication.class, args);
		SpringbootApplication application = new SpringbootApplication();
		Connection conn = application.task1();

		if (conn != null) {
//			// Perform Task 2
//			application.task2(conn);
//
//			// Perform Task 3
//			application.task3(conn);
//
//			// Perform Task 4
//			application.task4(conn);

			// Disconnect from the database
			application.disconnect(conn);
		} else {
			System.out.println("Failed to connect to the database.");
		}
	}

}