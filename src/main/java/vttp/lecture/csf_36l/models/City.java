package vttp.lecture.csf_36l.models;

import java.sql.ResultSet;
import java.sql.SQLException;

public class City {
    private String cityName;

    private String code;

    public static City populate(ResultSet rs) throws SQLException {
        City c = new City();
        c.setCityName(rs.getString("city_name"));
        c.setCode(rs.getString("code"));
        return c;
    }

    public String getCityName() {return cityName;}
    public void setCityName(String cityName) {this.cityName = cityName;}

    public String getCode() {return code;}
    public void setCode(String code) {this.code = code;}

}