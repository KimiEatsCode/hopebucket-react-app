import React from "react";
import { Link } from "react-router-dom";

function PrivacyPolicy() {
  return (
    <div className="privacy-policy">
      <h2>Privacy Policy for HopeBucket</h2>
      <p><strong>Last updated: February 8, 2026</strong></p>

      <h3>Introduction</h3>
      <p>
        HopeBucket ("the App") is a daily gratitude and hope journaling app developed by Sarah Rettig.
        Your privacy is important to us, and this policy explains how the App handles your information.
      </p>

      <h3>Information We Collect</h3>
      <p><strong>We do not collect any personal information.</strong></p>
      <p>
        The App does not require you to create an account, log in, or provide any personal details
        such as your name, email address, phone number, or location.
      </p>

      <h4>Locally Stored Data</h4>
      <p>The only data the App stores is:</p>
      <ul>
        <li><strong>Hope list entries</strong>: The text you enter as your daily hope items.</li>
        <li><strong>Date tracking</strong>: The current date, used to reset your list daily.</li>
      </ul>
      <p>
        This data is stored <strong>exclusively on your device</strong> using local storage (AsyncStorage).
        It is never transmitted to any external server, cloud service, or third party.
      </p>

      <h3>Data Sharing</h3>
      <p><strong>We do not share any data with third parties.</strong></p>
      <p>
        Since the App does not collect or transmit any data, there is nothing to share.
        Your hope list entries remain entirely on your device.
      </p>

      <h3>Third-Party Services</h3>
      <p>
        The App does not use any third-party analytics, advertising, tracking, or crash reporting services.
      </p>
      <p>
        The App contains a link to <a href="https://pixabay.com" target="_blank" rel="noopener noreferrer">Pixabay</a>,
        an external website. If you choose to follow this link, you will leave the App and be subject to
        Pixabay's own privacy policy. We are not responsible for the privacy practices of external websites.
      </p>

      <h3>Clipboard Access</h3>
      <p>
        The App includes a feature that allows you to copy your hope list to your device's clipboard
        for sharing purposes. This action is initiated only by you and does not transmit any data externally.
      </p>

      <h3>Data Security</h3>
      <p>
        Because all data is stored locally on your device and is never transmitted over the internet,
        your information is protected by your device's built-in security measures (such as device passcode,
        biometric authentication, and encryption).
      </p>

      <h3>Data Retention and Deletion</h3>
      <p>Your hope list data is stored on your device until:</p>
      <ul>
        <li>The App is uninstalled, which removes all locally stored data.</li>
        <li>The daily reset clears your list at midnight each day (the previous day's entries are replaced).</li>
      </ul>
      <p>You have full control over your data at all times.</p>

      <h3>Children's Privacy</h3>
      <p>
        The App does not knowingly collect any personal information from anyone, including children
        under the age of 13. Since no personal data is collected, the App is suitable for users of all ages.
      </p>

      <h3>Changes to This Privacy Policy</h3>
      <p>
        We may update this Privacy Policy from time to time. Any changes will be reflected by updating
        the "Last updated" date at the top of this policy. We encourage you to review this Privacy Policy periodically.
      </p>

      <h3>Contact Us</h3>
      <p>
        If you have any questions or concerns about this Privacy Policy, please contact us at:
      </p>
      <p><strong>Email:</strong> sarahkimirettig@gmail.com</p>

      <h3>Summary</h3>
      <ul>
        <li>No personal data is collected</li>
        <li>No accounts or sign-ups required</li>
        <li>All data is stored locally on your device</li>
        <li>No analytics, ads, or tracking</li>
        <li>No data is shared with third parties</li>
        <li>Uninstalling the App removes all stored data</li>
      </ul>

      <div className="text-center mt-4 mb-4">
        <Link to="/" className="btn btn-primary" style={{ backgroundColor: "#1650AC", border: "none", borderRadius: "10px" }}>
          Back to HopeBucket
        </Link>
      </div>
    </div>
  );
}

export default PrivacyPolicy;
