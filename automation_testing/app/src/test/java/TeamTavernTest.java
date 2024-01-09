import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.TakesScreenshot;
import org.openqa.selenium.chrome.ChromeDriver;
import java.io.File;
import org.openqa.selenium.OutputType;
import org.apache.commons.io.FileUtils;

public class TeamTavernTest {
    public static void main(String[] args) throws Exception{

        // Create a new instance of Selenium
        WebDriverManager.chromedriver().setup();

        // Use WebDriver to open a new instance of Chrome
        System.setProperty("webdriver.http.factory", "jdk-http-client");
        WebDriver driver = new ChromeDriver();

        // Instruct the driver to browse to the Makers website
        driver.get("http://localhost:3000/");

        // Take a screenshot of what's currently on the page,
        // and store it in a file 'makers.png' in your project root
        takeScreenshot(driver, "teamTavern.png");

        // Find the title of the webpage (the value inside the HTML
        // <title> element) and print it to the terminal
        System.out.println(driver.getTitle());

        // Close down Selenium and end the test
        driver.quit();
    }

    // Helper function for taking screenshots using WebDriver
    public static void takeScreenshot(WebDriver webdriver,String desiredPath) throws Exception{
        TakesScreenshot screenshot = ((TakesScreenshot)webdriver);
        File screenshotFile = screenshot.getScreenshotAs(OutputType.FILE);
        File targetFile = new File(desiredPath);
        FileUtils.copyFile(screenshotFile, targetFile);
    }
}
