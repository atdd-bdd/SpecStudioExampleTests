package spectable.common;

import java.util.Objects;
import production.*;
import records.*;
import calculator.*;

public class RequestString {
    private static final String DNCString = "?DNC?";

    public String method;
    public String page;
    public String address;
    public String benchmark;
    public String format;

    public RequestString(String method, String page, String address, String benchmark, String format) {
        this.method = method;
        this.page = page;
        this.address = address;
        this.benchmark = benchmark;
        this.format = format;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof RequestString)) return false;
        RequestString that = (RequestString) o;
        return (DNCString.equals(method) || DNCString.equals(that.method) || Objects.equals(method, that.method))
            && (DNCString.equals(page) || DNCString.equals(that.page) || Objects.equals(page, that.page))
            && (DNCString.equals(address) || DNCString.equals(that.address) || Objects.equals(address, that.address))
            && (DNCString.equals(benchmark) || DNCString.equals(that.benchmark) || Objects.equals(benchmark, that.benchmark))
            && (DNCString.equals(format) || DNCString.equals(that.format) || Objects.equals(format, that.format));
    }

    @Override
    public int hashCode() {
        return Objects.hash(method, page, address, benchmark, format);
    }

    @Override
    public String toString() {
        return "Method=" + method + ", " + "Page=" + page + ", " + "Address=" + address + ", " + "Benchmark=" + benchmark + ", " + "Format=" + format;
    }
}
