import io.github.bonigarcia.wdm.WebDriverManager;
import org.junit.jupiter.api.*;
import org.openqa.selenium.By;
import org.openqa.selenium.chrome.ChromeDriver;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

public class MyAccountTest {
    private static ChromeDriver driver;

    @BeforeAll
    static void launchBrowser() {
        WebDriverManager.chromedriver().setup();
    }

    @BeforeEach
    void loadHomepage() {
        driver = new ChromeDriver();
        driver.get("http://localhost:3000/myAccount");
    }

    @Test
    public void onMyAccountClickLogOut() throws InterruptedException {
        driver.findElement(By.cssSelector("li.logout-option")).click();
        Thread.sleep(5000);
        assertTrue(driver.getCurrentUrl().contains("http://localhost:3000/"));
    }

    @Test
    public void onMyAccountClickNewBet() throws InterruptedException {
        driver.get("http://localhost:3000/");
        driver.findElement(By.linkText("Please Register")).click();
        driver.findElement(By.id("email")).click();
        driver.findElement(By.id("email")).sendKeys("test3@email.com");
        driver.findElement(By.id("username")).click();
        driver.findElement(By.id("username")).sendKeys("test3");
        driver.findElement(By.id("password")).click();
        driver.findElement(By.id("password")).sendKeys("12345678$");
        driver.findElement(By.id("submit")).click();
        Thread.sleep(5000);
        driver.findElement(By.id("email")).click();
        driver.findElement(By.id("email")).sendKeys("test3@email.com");
        driver.findElement(By.id("password")).click();
        driver.findElement(By.id("password")).sendKeys("12345678$");
        driver.findElement(By.id("submit")).click();
        Thread.sleep(5000);
        driver.findElement(By.cssSelector("a[href='/userlist']")).click();
        assertTrue(driver.getCurrentUrl().contains("http://localhost:3000/userlist"));
    }
    @AfterEach
    void closeBrowser() {
        driver.quit();
    }
}
