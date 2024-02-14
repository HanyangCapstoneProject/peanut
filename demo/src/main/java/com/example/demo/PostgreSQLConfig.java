package com.example.demo;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;

import org.junit.Test;

public class PostgreSQLConfig {
    private String URL = "jdbc:postgresql://localhost:5432/postgres";
    private String USERNAME = "username"; //postgresql 계정
    private String PASSWORD = "password"; //비밀번호

    @Test
    public void ConnectionTest() throws Exception{
        Connection con = DriverManager.getConnection(URL,USERNAME,PASSWORD); //db 연결
        System.out.println(con); //연결 정보 출력
        Statement pre = con.createStatement();
        ResultSet rs = pre.executeQuery("select * from member");

        if (rs.next()) {
            System.out.println(rs);
            System.out.println(rs.getString("user_id"));
        }
    }
}
