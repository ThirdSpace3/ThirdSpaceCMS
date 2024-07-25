import React, { useState, useEffect } from "react";
import Footer from "../../components/website/Footer";
import NavBar from "../../components/website/NavBar";
import { db, getDocs, collection } from "../../firebaseConfig";
import './legal.css';

export default function PrivacyPolicy() {
  const [hasStepData, setHasStepData] = useState(false); // State to track if stepData is available
  const [hasWalletData, setHasWalletData] = useState(false);
  const [accounts, setAccounts] = useState([]);
  console.log(accounts);

  const checkWalletData = async () => {
    const userAccount = sessionStorage.getItem("userAccount");
    if (userAccount) {
      const docRef = collection(db, "projects", userAccount, "projectData");
      const docSnap = await getDocs(docRef);
      if (!docSnap.empty) {
        // Check if the snapshot is not empty
        setHasWalletData(true);
        let userData = [];
        docSnap.forEach((doc) => {
          userData.push(doc.data());
        });
        console.log(userData);
        if (userData.length > 0) {
          // Check if userData is present
          setHasStepData(true);
        }
      } else {
        setHasWalletData(false);
      }
      setAccounts([userAccount]);
    }
  };

  return (
    <>
      <NavBar
        checkWalletData={checkWalletData}
        hasWalletData={hasWalletData}
        accounts={accounts}
        setAccounts={setAccounts}
      />
      <div className="privacy-policy">
        <h1 className="main-title">Privacy Policy</h1>
        <p className="legal-text">Last updated: June 18, 2024</p>
        <p className="legal-text">
          This Privacy Policy describes Our policies and procedures on the
          collection, use and disclosure of Your information when You use the
          Service and tells You about Your privacy rights and how the law
          protects You.
        </p>
        <p className="legal-text">
          We use Your Personal data to provide and improve the Service. By using
          the Service, You agree to the collection and use of information in
          accordance with this Privacy Policy. This Privacy Policy has been
          created with the help of the{" "}
          <a
            href="https://www.termsfeed.com/privacy-policy-generator/"
            target="_blank"
          >
            Privacy Policy Generator
          </a>
          .
        </p>
        <h2 className="legal-title">Interpretation and Definitions</h2>
        <h3 className="sublegal-title">Interpretation</h3>
        <p className="legal-text">
          The words of which the initial letter is capitalized have meanings
          defined under the following conditions. The following definitions
          shall have the same meaning regardless of whether they appear in
          singular or in plural.
        </p>
        <h3 className="sublegal-title">Definitions</h3>
        <p className="legal-text">For the purposes of this Privacy Policy:</p>
        <ul className="legal-list">
          <li className="legal-list-item">
            <p className="legal-text">
              <strong>Account</strong> means a unique account created for You to
              access our Service or parts of our Service.
            </p>
          </li>
          <li className="legal-list-item">
            <p className="legal-text">
              <strong>Affiliate</strong> means an entity that controls, is
              controlled by or is under common control with a party, where
              "control" means ownership of 50% or more of the shares, equity
              interest or other securities entitled to vote for election of
              directors or other managing authority.
            </p>
          </li>
          <li className="legal-list-item">
            <p className="legal-text">
              <strong>Company</strong> (referred to as either "the Company",
              "We", "Us" or "Our" in this Agreement) refers to Third Space, 198D
              route de Neuville 01390 Saint André de Corcy.
            </p>
          </li>
          <li className="legal-list-item">
            <p className="legal-text">
              <strong>Cookies</strong> are small files that are placed on Your
              computer, mobile device or any other device by a website,
              containing the details of Your browsing history on that website
              among its many uses.
            </p>
          </li>
          <li className="legal-list-item">
            <p className="legal-text">
              <strong>Country</strong> refers to: France
            </p>
          </li>
          <li className="legal-list-item">
            <p className="legal-text">
              <strong>Device</strong> means any device that can access the
              Service such as a computer, a cellphone or a digital tablet.
            </p>
          </li>
          <li className="legal-list-item">
            <p className="legal-text">
              <strong>Personal Data</strong> is any information that relates to
              an identified or identifiable individual.
            </p>
          </li>
          <li className="legal-list-item">
            <p className="legal-text">
              <strong>Service</strong> refers to the Website.
            </p>
          </li>
          <li className="legal-list-item">
            <p className="legal-text">
              <strong>Service Provider</strong> means any natural or legal
              person who processes the data on behalf of the Company. It refers
              to third-party companies or individuals employed by the Company to
              facilitate the Service, to provide the Service on behalf of the
              Company, to perform services related to the Service or to assist
              the Company in analyzing how the Service is used.
            </p>
          </li>
          <li className="legal-list-item">
            <p className="legal-text">
              <strong>Usage Data</strong> refers to data collected
              automatically, either generated by the use of the Service or from
              the Service infrastructure itself (for example, the duration of a
              page visit).
            </p>
          </li>
          <li className="legal-list-item">
            <p className="legal-text">
              <strong>Website</strong> refers to Third Space, accessible from{" "}
              <a
                href="https://3rd-space.io/"
                rel="external nofollow noopener"
                target="_blank"
              >
                https://3rd-space.io/
              </a>
            </p>
          </li>
          <li className="legal-list-item">
            <p className="legal-text">
              <strong>You</strong> means the individual accessing or using the
              Service, or the company, or other legal entity on behalf of which
              such individual is accessing or using the Service, as applicable.
            </p>
          </li>
        </ul>
        <h2 className="legal-title">
          Collecting and Using Your Personal Data
        </h2>
        <h3 className="sublegal-title">Types of Data Collected</h3>
        <h4 className="subsublegal-title">Personal Data</h4>
        <p className="legal-text">
          While using Our Service, We may ask You to provide Us with certain
          personally identifiable information that can be used to contact or
          identify You. Personally identifiable information may include, but is
          not limited to:
        </p>
        <ul className="legal-list">
          <li className="legal-list-item">Usage Data</li>
        </ul>
        <h4 className="subsublegal-title">Usage Data</h4>
        <p className="legal-text">
          Usage Data is collected automatically when using the Service.
        </p>
        <p className="legal-text">
          Usage Data may include information such as Your Device's Internet
          Protocol address (e.g. IP address), browser type, browser version, the
          pages of our Service that You visit, the time and date of Your visit,
          the time spent on those pages, unique device identifiers and other
          diagnostic data.
        </p>
        <p className="legal-text">
          When You access the Service by or through a mobile device, We may
          collect certain information automatically, including, but not limited
          to, the type of mobile device You use, Your mobile device unique ID,
          the IP address of Your mobile device, Your mobile operating system,
          the type of mobile Internet browser You use, unique device identifiers
          and other diagnostic data.
        </p>
        <p className="legal-text">
          We may also collect information that Your browser sends whenever You
          visit our Service or when You access the Service by or through a
          mobile device.
        </p>
        <h4 className="subsublegal-title">
          Tracking Technologies and Cookies
        </h4>
        <p className="legal-text">
          We use Cookies and similar tracking technologies to track the activity
          on Our Service and store certain information. Tracking technologies
          used are beacons, tags, and scripts to collect and track information
          and to improve and analyze Our Service. The technologies We use may
          include:
        </p>
        <ul className="legal-list">
          <li className="legal-list-item">
            <p className="legal-text">
              <strong>Cookies or Browser Cookies.</strong> A cookie is a small
              file placed on Your Device. You can instruct Your browser to
              refuse all Cookies or to indicate when a Cookie is being sent.
              However, if You do not accept Cookies, You may not be able to use
              some parts of our Service. Unless you have adjusted Your browser
              setting so that it will refuse Cookies, our Service may use
              Cookies.
            </p>
          </li>
          <li className="legal-list-item">
            <p className="legal-text">
              <strong>Web Beacons.</strong> Certain sections of our Service and
              our emails may contain small electronic files known as web beacons
              (also referred to as clear gifs, pixel tags, and single-pixel
              gifs) that permit the Company, for example, to count users who
              have visited those pages or opened an email and for other related
              website statistics (for example, recording the popularity of a
              certain section and verifying system and server integrity).
            </p>
          </li>
        </ul>
        <p className="legal-text">
          Cookies can be "Persistent" or "Session" Cookies. Persistent Cookies
          remain on Your personal computer or mobile device when You go offline,
          while Session Cookies are deleted as soon as You close Your web
          browser. You can learn more about cookies on{" "}
          <a
            href="https://www.termsfeed.com/blog/cookies/#What_Are_Cookies"
            target="_blank"
          >
            TermsFeed website
          </a>{" "}
          article.
        </p>
        <p className="legal-text">
          We use both Session and Persistent Cookies for the purposes set out
          below:
        </p>
        <ul className="legal-list">
          <li className="legal-list-item">
            <p className="legal-text">
              <strong>Necessary / Essential Cookies</strong>
            </p>
            <p className="legal-text">Type: Session Cookies</p>
            <p className="legal-text">Administered by: Us</p>
            <p className="legal-text">
              Purpose: These Cookies are essential to provide You with services
              available through the Website and to enable You to use some of its
              features. They help to authenticate users and prevent fraudulent
              use of user accounts. Without these Cookies, the services that You
              have asked for cannot be provided, and We only use these Cookies
              to provide You with those services.
            </p>
          </li>
          <li className="legal-list-item">
            <p className="legal-text">
              <strong>Cookies Policy / Notice Acceptance Cookies</strong>
            </p>
            <p className="legal-text">Type: Persistent Cookies</p>
            <p className="legal-text">Administered by: Us</p>
            <p className="legal-text">
              Purpose: These Cookies identify if users have accepted the use of
              cookies on the Website.
            </p>
          </li>
          <li className="legal-list-item">
            <p className="legal-text">
              <strong>Functionality Cookies</strong>
            </p>
            <p className="legal-text">Type: Persistent Cookies</p>
            <p className="legal-text">Administered by: Us</p>
            <p className="legal-text">
              Purpose: These Cookies allow us to remember choices You make when
              You use the Website, such as remembering your login details or
              language preference. The purpose of these Cookies is to provide
              You with a more personal experience and to avoid You having to
              re-enter your preferences every time You use the Website.
            </p>
          </li>
        </ul>
        <p className="legal-text">
          For more information about the cookies we use and your choices
          regarding cookies, please visit our Cookies Policy or the Cookies
          section of our Privacy Policy.
        </p>
        <h3 className="sublegal-title">Use of Your Personal Data</h3>
        <p className="legal-text">
          The Company may use Personal Data for the following purposes:
        </p>
        <ul className="legal-list">
          <li className="legal-list-item">
            <p className="legal-text">
              <strong>To provide and maintain our Service</strong>, including to
              monitor the usage of our Service.
            </p>
          </li>
          <li className="legal-list-item">
            <p className="legal-text">
              <strong>To manage Your Account:</strong> to manage Your
              registration as a user of the Service. The Personal Data You
              provide can give You access to different functionalities of the
              Service that are available to You as a registered user.
            </p>
          </li>
          <li className="legal-list-item">
            <p className="legal-text">
              <strong>For the performance of a contract:</strong> the
              development, compliance and undertaking of the purchase contract
              for the products, items or services You have purchased or of any
              other contract with Us through the Service.
            </p>
          </li>
          <li className="legal-list-item">
            <p className="legal-text">
              <strong>To contact You:</strong> To contact You by email,
              telephone calls, SMS, or other equivalent forms of electronic
              communication, such as a mobile application's push notifications
              regarding updates or informative communications related to the
              functionalities, products or contracted services, including the
              security updates, when necessary or reasonable for their
              implementation.
            </p>
          </li>
          <li className="legal-list-item">
            <p className="legal-text">
              <strong>To provide You</strong> with news, special offers and
              general information about other goods, services and events which
              we offer that are similar to those that you have already purchased
              or enquired about unless You have opted not to receive such
              information.
            </p>
          </li>
          <li className="legal-list-item">
            <p className="legal-text">
              <strong>To manage Your requests:</strong> To attend and manage
              Your requests to Us.
            </p>
          </li>
          <li className="legal-list-item">
            <p className="legal-text">
              <strong>For business transfers:</strong> We may use Your
              information to evaluate or conduct a merger, divestiture,
              restructuring, reorganization, dissolution, or other sale or
              transfer of some or all of Our assets, whether as a going concern
              or as part of bankruptcy, liquidation, or similar proceeding, in
              which Personal Data held by Us about our Service users is among
              the assets transferred.
            </p>
          </li>
          <li className="legal-list-item">
            <p className="legal-text">
              <strong>For other purposes</strong>: We may use Your information
              for other purposes, such as data analysis, identifying usage
              trends, determining the effectiveness of our promotional campaigns
              and to evaluate and improve our Service, products, services,
              marketing and your experience.
            </p>
          </li>
        </ul>
        <p className="legal-text">
          We may share Your personal information in the following situations:
        </p>
        <ul className="legal-list">
          <li className="legal-list-item">
            <strong>With Service Providers:</strong> We may share Your personal
            information with Service Providers to monitor and analyze the use of
            our Service, to contact You.
          </li>
          <li className="legal-list-item">
            <strong>For business transfers:</strong> We may share or transfer
            Your personal information in connection with, or during negotiations
            of, any merger, sale of Company assets, financing, or acquisition of
            all or a portion of Our business to another company.
          </li>
          <li className="legal-list-item">
            <strong>With Affiliates:</strong> We may share Your information with
            Our affiliates, in which case we will require those affiliates to
            honor this Privacy Policy. Affiliates include Our parent company and
            any other subsidiaries, joint venture partners or other companies
            that We control or that are under common control with Us.
          </li>
          <li className="legal-list-item">
            <strong>With business partners:</strong> We may share Your
            information with Our business partners to offer You certain
            products, services or promotions.
          </li>
          <li className="legal-list-item">
            <strong>With other users:</strong> when You share personal
            information or otherwise interact in the public areas with other
            users, such information may be viewed by all users and may be
            publicly distributed outside.
          </li>
          <li className="legal-list-item">
            <strong>With Your consent</strong>: We may disclose Your personal
            information for any other purpose with Your consent.
          </li>
        </ul>
        <h3 className="sublegal-title">Retention of Your Personal Data</h3>
        <p className="legal-text">
          The Company will retain Your Personal Data only for as long as is
          necessary for the purposes set out in this Privacy Policy. We will
          retain and use Your Personal Data to the extent necessary to comply
          with our legal obligations (for example, if we are required to retain
          your data to comply with applicable laws), resolve disputes, and
          enforce our legal agreements and policies.
        </p>
        <p className="legal-text">
          The Company will also retain Usage Data for internal analysis
          purposes. Usage Data is generally retained for a shorter period of
          time, except when this data is used to strengthen the security or to
          improve the functionality of Our Service, or We are legally obligated
          to retain this data for longer time periods.
        </p>
        <h3 className="sublegal-title">Transfer of Your Personal Data</h3>
        <p className="legal-text">
          Your information, including Personal Data, is processed at the
          Company's operating offices and in any other places where the parties
          involved in the processing are located. It means that this information
          may be transferred to — and maintained on — computers located outside
          of Your state, province, country or other governmental jurisdiction
          where the data protection laws may differ than those from Your
          jurisdiction.
        </p>
        <p className="legal-text">
          Your consent to this Privacy Policy followed by Your submission of
          such information represents Your agreement to that transfer.
        </p>
        <p className="legal-text">
          The Company will take all steps reasonably necessary to ensure that
          Your data is treated securely and in accordance with this Privacy
          Policy and no transfer of Your Personal Data will take place to an
          organization or a country unless there are adequate controls in place
          including the security of Your data and other personal information.
        </p>
        <h3 className="sublegal-title">Delete Your Personal Data</h3>
        <p className="legal-text">
          You have the right to delete or request that We assist in deleting the
          Personal Data that We have collected about You.
        </p>
        <p className="legal-text">
          Our Service may give You the ability to delete certain information
          about You from within the Service.
        </p>
        <p className="legal-text">
          You may update, amend, or delete Your information at any time by
          signing in to Your Account, if you have one, and visiting the account
          settings section that allows you to manage Your personal information.
          You may also contact Us to request access to, correct, or delete any
          personal information that You have provided to Us.
        </p>
        <p className="legal-text">
          Please note, however, that We may need to retain certain information
          when we have a legal obligation or lawful basis to do so.
        </p>
        <h3 className="sublegal-title">Disclosure of Your Personal Data</h3>
        <h4 className="subsublegal-title">Business Transactions</h4>
        <p className="legal-text">
          If the Company is involved in a merger, acquisition or asset sale,
          Your Personal Data may be transferred. We will provide notice before
          Your Personal Data is transferred and becomes subject to a different
          Privacy Policy.
        </p>
        <h4 className="subsublegal-title">Law enforcement</h4>
        <p className="legal-text">
          Under certain circumstances, the Company may be required to disclose
          Your Personal Data if required to do so by law or in response to valid
          requests by public authorities (e.g. a court or a government agency).
        </p>
        <h4 className="subsublegal-title">Other legal requirements</h4>
        <p className="legal-text">
          The Company may disclose Your Personal Data in the good faith belief
          that such action is necessary to:
        </p>
        <ul className="legal-list">
          <li className="legal-list-item">Comply with a legal obligation</li>
          <li className="legal-list-item">
            Protect and defend the rights or property of the Company
          </li>
          <li className="legal-list-item">
            Prevent or investigate possible wrongdoing in connection with the
            Service
          </li>
          <li className="legal-list-item">
            Protect the personal safety of Users of the Service or the public
          </li>
          <li className="legal-list-item">Protect against legal liability</li>
        </ul>
        <h3 className="sublegal-title">Security of Your Personal Data</h3>
        <p className="legal-text">
          The security of Your Personal Data is important to Us, but remember
          that no method of transmission over the Internet, or method of
          electronic storage is 100% secure. While We strive to use commercially
          acceptable means to protect Your Personal Data, We cannot guarantee
          its absolute security.
        </p>
        <h2 className="legal-title">Children's Privacy</h2>
        <p className="legal-text">
          Our Service does not address anyone under the age of 13. We do not
          knowingly collect personally identifiable information from anyone
          under the age of 13. If You are a parent or guardian and You are aware
          that Your child has provided Us with Personal Data, please contact Us.
          If We become aware that We have collected Personal Data from anyone
          under the age of 13 without verification of parental consent, We take
          steps to remove that information from Our servers.
        </p>
        <p className="legal-text">
          If We need to rely on consent as a legal basis for processing Your
          information and Your country requires consent from a parent, We may
          require Your parent's consent before We collect and use that
          information.
        </p>
        <h2 className="legal-title">Links to Other Websites</h2>
        <p className="legal-text">
          Our Service may contain links to other websites that are not operated
          by Us. If You click on a third party link, You will be directed to
          that third party's site. We strongly advise You to review the Privacy
          Policy of every site You visit.
        </p>
        <p className="legal-text">
          We have no control over and assume no responsibility for the content,
          privacy policies or practices of any third party sites or services.
        </p>
        <h2 className="legal-title">Changes to this Privacy Policy</h2>
        <p className="legal-text">
          We may update Our Privacy Policy from time to time. We will notify You
          of any changes by posting the new Privacy Policy on this page.
        </p>
        <p className="legal-text">
          We will let You know via email and/or a prominent notice on Our
          Service, prior to the change becoming effective and update the "Last
          updated" date at the top of this Privacy Policy.
        </p>
        <p className="legal-text">
          You are advised to review this Privacy Policy periodically for any
          changes. Changes to this Privacy Policy are effective when they are
          posted on this page.
        </p>
        <h2 className="legal-title">Contact Us</h2>
        <p className="legal-text">
          If you have any questions about this Privacy Policy, You can contact
          us:
        </p>
        <ul className="legal-list">
          <li className="legal-list-item">
            By visiting this page on our website:{" "}
            <a
              href="https://3rd-space.io/#/privacy-policy"
              rel="external nofollow noopener"
              target="_blank"
            >
              https://3rd-space.io/privacy-policy
            </a>
          </li>
        </ul>
      </div>
      <Footer />
    </>
  );
}
