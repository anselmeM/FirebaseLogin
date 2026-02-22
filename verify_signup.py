from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        try:
            # Navigate to signup page
            page.goto("http://localhost:8080/signup.html")

            # Wait for content to load
            page.wait_for_selector("form#signup-form")

            # Check for the helper text
            helper_text = page.locator("#password-hint")
            print(f"Helper text visible: {helper_text.is_visible()}")
            print(f"Helper text content: {helper_text.text_content()}")

            # Check aria-describedby
            password_input = page.locator("#password")
            aria_describedby = password_input.get_attribute("aria-describedby")
            print(f"aria-describedby: {aria_describedby}")

            # Take screenshot
            page.screenshot(path="signup_verification.png", full_page=True)
            print("Screenshot saved to signup_verification.png")

        except Exception as e:
            print(f"Error: {e}")
        finally:
            browser.close()

if __name__ == "__main__":
    run()
