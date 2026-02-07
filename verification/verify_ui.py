from playwright.sync_api import sync_playwright

def run():
    print("Starting browser...")
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            print("Navigating to http://localhost:5173/...")
            page.goto("http://localhost:5173/")
            page.wait_for_selector("text=Reading Tracker", timeout=10000)

            print("Taking initial screenshot...")
            page.screenshot(path="verification/initial_state.png", full_page=True)

            # Find the first "Mark as Read" button (or unread button)
            # The button text is "○ Mark as Read" initially.
            print("Clicking first Mark as Read button...")
            page.click("button:has-text('Mark as Read') >> nth=0")

            # Wait a bit for transition
            page.wait_for_timeout(1000)

            print("Taking screenshot after interaction...")
            page.screenshot(path="verification/after_interaction.png", full_page=True)

        except Exception as e:
            print(f"Error: {e}")
        finally:
            browser.close()
            print("Browser closed.")

if __name__ == "__main__":
    run()
