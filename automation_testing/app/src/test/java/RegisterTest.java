
import org.openqa.selenium.WebDriver;
import io.github.bonigarcia.wdm.WebDriverManager;
import org.junit.jupiter.api.*;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

import static org.junit.jupiter.api.Assertions.assertEquals;


public class RegisterTest {
    private static ChromeDriver driver;

    @BeforeAll
    static void launchBrowser() {
        WebDriverManager.chromedriver().setup();
        driver = new ChromeDriver();
    }

    // Your tests will go here!
    @Test
    void shouldPrintPageTitle() {
        driver.get("http://localhost:3000/");
        System.out.println(driver.getTitle());
    }

    @Test
    public void userCanClickPleaseRegisterLinkAndRegisterWithValidDetails() throws InterruptedException {
        driver.get("http://localhost:3000/");
//        driver.manage().window().setSize(new Dimension(1744, 1009));
        driver.findElement(By.linkText("Please Register")).click();
        driver.findElement(By.id("email")).click();
        driver.findElement(By.id("email")).sendKeys("test1@email.com");
        driver.findElement(By.id("username")).click();
        driver.findElement(By.id("username")).sendKeys("test1");
        driver.findElement(By.id("password")).click();
        driver.findElement(By.id("password")).sendKeys("1234");
        driver.findElement(By.id("submit")).click();
        Thread.sleep(5000);
        //WebElement loginPage = driver.findElement(By.cssSelector("Sign in to your account"));
        assertEquals("Sign in to your account", driver.findElement(By.cssSelector("h1")).getText());
    }

//    @Test
//    public void userAttemptsRegisterWithUsernameThatAlreadyExistsAndThrowsErrorMessage() throws InterruptedException {
//        driver.get("http://localhost:3000/");
//        driver.findElement(By.linkText("Please Register")).click();
//        driver.findElement(By.id("email")).click();
//        driver.findElement(By.id("email")).sendKeys("test2@email.com");
//        driver.findElement(By.id("username")).click();
//        driver.findElement(By.id("username")).sendKeys("test1");
//        driver.findElement(By.id("password")).click();
//        driver.findElement(By.id("password")).sendKeys("1234");
//        driver.findElement(By.id("submit")).click();
//        Thread.sleep(5000);
//        assertEquals("username is already in use", driver.findElement(By.cssSelector("h1")).getText());
//    }

    @AfterAll
    static void closeBrowser() {
        driver.quit();
    }
}
