import org.openqa.selenium.WebDriver;
import io.github.bonigarcia.wdm.WebDriverManager;
import org.junit.jupiter.api.*;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import java.io.File;
import java.time.Duration;
import java.util.concurrent.TimeUnit;

public class LoginTest {
    private static ChromeDriver driver;

    @BeforeAll
    static void launchBrowser() {
        WebDriverManager.chromedriver().setup();
    }

    @BeforeEach
    void loadHomepage() {
        driver = new ChromeDriver();
        driver.get("http://localhost:3000/");
    }

    //Valid login
    @Test
    public void LoginValidCredentials() throws InterruptedException {
        //driver.get("http://localhost:3000/");
        driver.findElement(By.linkText("Please Register")).click();
        driver.findElement(By.id("email")).click();
        driver.findElement(By.id("email")).sendKeys("test1@email.com");
        driver.findElement(By.id("username")).click();
        driver.findElement(By.id("username")).sendKeys("test1");
        driver.findElement(By.id("password")).click();
        driver.findElement(By.id("password")).sendKeys("12345678$");
        driver.findElement(By.id("submit")).click();
        Thread.sleep(2000);
        driver.findElement(By.id("email")).click();
        driver.findElement(By.id("email")).sendKeys("test1@email.com");
        driver.findElement(By.id("password")).click();
        driver.findElement(By.id("password")).sendKeys("12345678$");
        driver.findElement(By.id("submit")).click();
        Thread.sleep(2000);
        assertEquals("test1 's Wagers", driver.findElement(By.cssSelector("h1")).getText());

    }


    //Invalid login with email address - leaving it empty
    @Test
    public void invalidLoginWithEmptyEmailAddress() {
        //driver.get("http://localhost:3000/");
        driver.findElement(By.linkText("Sign in")).click();
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        WebElement passwordField = wait.until(ExpectedConditions.elementToBeClickable(By.id("password")));
        //driver.findElement(By.id("password")).click();
        passwordField.click();
        passwordField.sendKeys("12345678$");
        //driver.findElement(By.id("submit")).click();
        WebElement submitButton = wait.until(ExpectedConditions.elementToBeClickable(By.id("submit")));
        submitButton.click();
        assertTrue(driver.getCurrentUrl().contains("http://localhost:3000/login"));
    }



    //Invalid login with password - leaving it empty
    @Test
    public void invalidLoginWithEmptyPassword() throws InterruptedException {
        //driver.get("http://localhost:3000/");
        driver.findElement(By.linkText("Sign in")).click();
        Thread.sleep(2000);
        driver.findElement(By.id("email")).click();
        driver.findElement(By.id("email")).sendKeys("test1@email.com");
        driver.findElement(By.id("submit")).click();
        assertTrue(driver.getCurrentUrl().contains("http://localhost:3000/login"));
    }

    //Invalid login with both fields empty
    @Test
    public void invalidLoginWithAllEmptyFields() throws InterruptedException {
        //driver.get("http://localhost:3000/");
        driver.findElement(By.linkText("Sign in")).click();
        Thread.sleep(2000);
        driver.findElement(By.id("submit")).click();
        assertTrue(driver.getCurrentUrl().contains("http://localhost:3000/login"));
    }

    //Clicking on the register link takes you to /signup
    @Test
    public void clickOnRegisterLinkFromLoginWorks() {
        //driver.get("http://localhost:3000/");
        driver.findElement(By.linkText("Sign in")).click();
        driver.findElement(By.linkText("Register")).click();
        assertTrue(driver.getCurrentUrl().contains("http://localhost:3000/signup"));
    }


    @AfterEach
    void closeBrowser() {
        driver.quit();
    }
}
