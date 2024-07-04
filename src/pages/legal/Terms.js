import React, { useState, useEffect } from "react";
import Footer from "../../components/website/Footer";
import './legal.css';
import NavBar from "../../components/website/NavBar";
import { db, getDocs, collection } from "../../firebaseConfig";
export default function Terms() {
  const [hasStepData, setHasStepData] = useState(false); // State to track if stepData is available
  const [hasWalletData, setHasWalletData] = useState(false);
  const [accounts, setAccounts] = useState([]);
  console.log(accounts);
  // localStorage.clear();
  // sessionStorage.clear(); 
  // Clearing the entire session storage
  const checkWalletData = async () => {
    const userAccount = sessionStorage.getItem("userAccount");
    if (userAccount) {
      const docRef = collection(db, 'projects', userAccount, 'projectData');
      const docSnap = await getDocs(docRef);
      if (!docSnap.empty) { // Check if the snapshot is not empty
        setHasWalletData(true);
        let userData = [];
        docSnap.forEach((doc) => {
          userData.push(doc.data());
        });
        console.log(userData);
        if (userData.length > 0) { // Check if userData is present
          setHasStepData(true);
        }
        // navigate("/dashboard"); // Redirect to dashboard if wallet data exists
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
      <div className="terms-of-use">
        <h1 className="main-title">Terms of Use</h1>

        <h2 className="legal-title">1 General</h2>
        <h3 className="sublegal-title">1.1</h3>
        <p className="legal-text">
          These terms of use and privacy (hereinafter the Terms of Use) regulate the conditions of use of 
          the Services located on website <a href="https://3rd-space.io/">https://3rd-space.io/</a> and on its subdomains (hereinafter the 
          Services).
        </p>
        <h3 className="sublegal-title">1.2</h3>
        <p className="legal-text">
          User can use the Services only after agreeing with the Terms of Use.
        </p>
        <h3 className="sublegal-title">1.3</h3>
        <p className="legal-text">
          By accepting these Terms of Use, it forms a legally binding contract between User and Operator. 
          These Terms of Use are applied for regulating the relations between the User and Operator, except 
          in cases where special terms have been concluded between the User and Operator. In such instance 
          the Terms of Use are applied for cases the special terms do not cover.
        </p>

        <h2 className="legal-title">2 Definitions</h2>
        <h3 className="sublegal-title">2.1</h3>
        <p className="legal-text"><strong>Content</strong> - data, texts, files etc added by the User</p>
        <h3 className="sublegal-title">2.2</h3>
        <p className="legal-text"><strong>Operator</strong> - Pauline Mila-Alonso, registry code -, address -</p>
        <h3 className="sublegal-title">2.3</h3>
        <p className="legal-text"><strong>Services</strong> - SaaS services based on the Website</p>
        <h3 className="sublegal-title">2.4</h3>
        <p className="legal-text"><strong>Special Terms</strong> - agreement between Operator and User by which Terms of Use are specified, 
          amended or supplemented.
        </p>
        <h3 className="sublegal-title">2.5</h3>
        <p className="legal-text"><strong>Terms of Use</strong> - standard terms of use for using Service and Website</p>
        <h3 className="sublegal-title">2.6</h3>
        <p className="legal-text"><strong>User</strong> - natural or legal person who is registered user of the Service</p>
        <h3 className="sublegal-title">2.7</h3>
        <p className="legal-text"><strong>Website</strong> - <a href="https://3rd-space.io/">https://3rd-space.io/</a> and its subdomains with their content</p>

        <h2 className="legal-title">3 Using the Services</h2>
        <h3 className="sublegal-title">3.1</h3>
        <p className="legal-text">
          Operator may amend the Terms of Use unilaterally at any time by publishing the amendments at 
          the Website. Operator will inform the registered users of the amendments in the Terms of Use at 
          the Website and via email or in-app notification before the amendments enter into force. If a User 
          does not accept the amendments, he/she is entitled to cease using the Services before the 
          amendments enter into force. If a User continues to use the Services after the amendments have 
          entered into force, it is considered that he/she has accepted the respective amendments to the 
          Terms of Use.
        </p>
        <h3 className="sublegal-title">3.2</h3>
        <p className="legal-text">
          The user represents by creating a user account at the Website that all the information and 
          representations provided by its are correct: it is private person with full legal capacity (at least 18 
          years of age) or that it has all rights and authorizations for procuring the Services on behalf of the 
          user. The aforementioned representations are presumed to be accurate and Operator is not obliged 
          to verify these.
        </p>
        <h3 className="sublegal-title">3.3</h3>
        <p className="legal-text">
          User is obliged to ensure that the Services is in accordance with its needs.
        </p>
        <h3 className="sublegal-title">3.4</h3>
        <p className="legal-text">
          Services may only be used to the extent and purposes for which the Services is created for and for 
          which similar services are usually used for. User is obliged to use Services in accordance with the 
          Terms of Use and the tutorials of the Services.
        </p>
        <h3 className="sublegal-title">3.5</h3>
        <p className="legal-text">
          User is obliged to immediately notify Operator of abuse of its account, the loss of its password or 
          its falling into possession of third parties. In the aforementioned case, Operator shall do anything 
          reasonably expected in order to renew the password, limit the access to the account or delete the 
          account.
        </p>

        <h2 className="legal-title">4 User's Content</h2>
        <h3 className="sublegal-title">4.1</h3>
        <p className="legal-text">
          User ensures that all of the Content added to the Website is in accordance with the Terms of Use 
          and legal acts and that the User has all necessary permissions and approvals to add the Content to 
          the Website. User is prohibited to add to the Website any Content that contains viruses etc that 
          damage or disturb regular functioning of the Website or Services.
        </p>
        <h3 className="sublegal-title">4.2</h3>
        <p className="legal-text">
          User is aware of and agrees that the Content is stored in Operator's or its service provider's server 
          and the User gives to Operator all necessary rights for that.
        </p>
        <h3 className="sublegal-title">4.3</h3>
        <p className="legal-text">
          Operator takes all reasonable security measures in order to protect Content from unauthorized 
          persons and malware and to ensure the preservation and confidentiality of the Content.
        </p>
        <h3 className="sublegal-title">4.4</h3>
        <p className="legal-text">
          Operator will protect the confidentiality of the Content with at least reasonable care, will not use 
          Content for any purpose outside the scope of this Terms of Use and will not disclose Content to 
          any third party (except third party service providers) and will limit access to Content to its 
          employees, contractors, advisors and agents. Upon notice to the other party, the party may disclose 
          Content if required to do so under law, statute, rule or regulation or legal process.
        </p>

        <h2 className="legal-title">5 Client Support</h2>
        <h3 className="sublegal-title">5.1</h3>
        <p className="legal-text">User can communicate with client support:</p>
        <ul className="legal-list">
          <li className="legal-list-item">e-mail;</li>
          <li className="legal-list-item">Discord.</li>
        </ul>
        <h3 className="sublegal-title">5.2</h3>
        <p className="legal-text">
          Operator will strive to reply to all requests received by the client support within reasonable time, 
          but will not guarantee that the requests are replied to within certain time or that the requests receive 
          answers satisfactory to the inquirer.
        </p>

        <h2 className="legal-title">6 Maintenance</h2>
        <h3 className="sublegal-title">6.1</h3>
        <p className="legal-text">
          The Operator reserves the right to optimize and develop the Services further. In case of significant 
          changes in the Services, Operator will send Users a timely notification.
        </p>
        <h3 className="sublegal-title">6.2</h3>
        <p className="legal-text">
          If using the Website or Services is disturbed due to a disturbance or malfunction, Operator will do 
          anything reasonably possible in order to eliminate the disturbance or malfunction as soon as 
          possible, but no later than 48 hours after finding out the error.
        </p>
        <h3 className="sublegal-title">6.3</h3>
        <p className="legal-text">
          The Operator maintains the right to temporarily restrict the access to the Website and Services if 
          it is needed for maintenance, development or updates.
        </p>

        <h2 className="legal-title">7 Fees and Payments</h2>
        <h3 className="sublegal-title">7.1</h3>
        <p className="legal-text">
          The prices of Services at the Website are provided in USDC. All fees are exclusive of taxes, which 
          Operator will charge if applicable.
        </p>
        <h3 className="sublegal-title">7.2</h3>
        <p className="legal-text">
          It is possible to pay for the Services with:
        </p>
        <ul className="legal-list">
          <li className="legal-list-item">$SOL;</li>
          <li className="legal-list-item">$BTC;</li>
          <li className="legal-list-item">$ETH;</li>
          <li className="legal-list-item">$USDC.</li>
        </ul>
        <h3 className="sublegal-title">7.3</h3>
        <p className="legal-text">
          User can subscribe to the Services based on either monthly or yearly prepayment subscription, 
          which provides access to the Services for the duration of the subscription period covered by the 
          prepayment.
        </p>
        <h3 className="sublegal-title">7.4</h3>
        <p className="legal-text">
          The subscription is renewed automatically at the end of the subscription period, unless User has 
          cancelled the subscription before the end of the current subscription period.
        </p>
        <h3 className="sublegal-title">7.5</h3>
        <p className="legal-text">
          User is aware that Operator may use third party service providers to process payments and agrees 
          to disclose their payment information to such third party.
        </p>
        <h3 className="sublegal-title">7.6</h3>
        <p className="legal-text">
          Operator is not obliged to refund already made prepayments.
        </p>
        <h3 className="sublegal-title">7.7</h3>
        <p className="legal-text">
          If the User violates the obligation of payment for at least 14 days, Operator has the right to limit 
          access to the Services.
        </p>
        <h3 className="sublegal-title">7.8</h3>
        <p className="legal-text">
          Operator maintains the right to change the prices of Services. Prices of the Services change in the 
          beginning of the next subscription period after the changing of the price. Operator will inform the 
          subscribing Users of the changes in the prices a reasonable time ahead.
        </p>

        <h2 className="legal-title">8 Intellectual Property</h2>
        <h3 className="sublegal-title">8.1</h3>
        <p className="legal-text">
          User has the right to use Services in accordance with the Terms of Use for the purposes for which 
          the Service is intended. User does not have and will not obtain any intellectual property rights to 
          the Service or to the Website.
        </p>
        <h3 className="sublegal-title">8.2</h3>
        <p className="legal-text">
          The Website, Services and its content, such as texts, images, information on the products, 
          trademarks and signs shall remain the property of the Operator or its co-operation partners and 
          protected by copyright law and international copyright agreements as well as other legislation on 
          intellectual property rights and registrations.
        </p>
        <h3 className="sublegal-title">8.3</h3>
        <p className="legal-text">
          All intellectual property rights to the Website, Services and content (such as copyright, registered 
          and unregistered trademark and design rights, domain names, patents, database rights and trade 
          secrets) as well as the goodwill generated by their use shall remain the property of the Operator or 
          its cooperation partners. The Operator does not grant the User any direct or indirect rights to any 
          intellectual property rights.
        </p>
        <h3 className="sublegal-title">8.4</h3>
        <p className="legal-text">
          The User may not change, copy, process, make extracts of, transmit, add to other databases or 
          make available to the public the Services or the Website or its parts, or use the intellectual property 
          rights concerning the Services or the Website in any other way without the prior written consent 
          from the Operator. The Services, the Website or any of their parts may not be sold, rented, licensed, 
          interfaced with a system of the User or third parties, or used by any programs that overload or 
          interfere with the work of the Services or Website or distort the contents, without the prior written 
          consent from the Operator.
        </p>
        <h3 className="sublegal-title">8.5</h3>
        <p className="legal-text">
          The works published on the Website and protected with copyright may be used by the User publicly 
          without the consent of Operator only by referring to Operator as the source of the works.
        </p>
        <h3 className="sublegal-title">8.6</h3>
        <p className="legal-text">
          Website may contain references or links to third party websites. The Operator does not control the 
          linked sites in any way, nor does the Operator monitor or check the contents of the linked sites. 
          The Operator is not liable for the contents, correctness, reliability or data security of the linked 
          sites.
        </p>

        <h2 className="legal-title">9 Personal Data</h2>
        <h3 className="sublegal-title">9.1</h3>
        <p className="legal-text">
          Operator shall process the following personal data of the User (hereinafter the Personal Data):
        </p>
        <ul className="legal-list">
          <li className="legal-list-item">Wallet address.</li>
        </ul>
        <h3 className="sublegal-title">9.2</h3>
        <p className="legal-text">
          Operator processes Personal Data in order to register User for the Services, contact User, verify 
          User's right to access Website and Services, improve Website and Services, provide User with 
          information about the Services.
        </p>
        <h3 className="sublegal-title">9.3</h3>
        <p className="legal-text">
          The User may inspect its Personal Data at any time and make corrections or request their deletion, 
          unless the law provides otherwise. The User provides its consent for processing of personal data 
          to the extent described in Terms of Use with the objective to ensure the quality and accessibility 
          of the Services and also to expand, improve, personalize and otherwise develop the Services.
        </p>
        <h3 className="sublegal-title">9.4</h3>
        <p className="legal-text">
          Operator processes the User's Personal Data in accordance with the requirements of the Personal 
          Data Protection Act.
        </p>
        <h3 className="sublegal-title">9.5</h3>
        <p className="legal-text">
          Controller of the Personal Data is Pauline Mila-Alonso, registry code -, address -.
        </p>
        <h3 className="sublegal-title">9.6</h3>
        <p className="legal-text">
          Operator collects and records personal data in electronic format and makes extracts also in other 
          format if necessary.
        </p>
        <h3 className="sublegal-title">9.7</h3>
        <p className="legal-text">
          Operator shall not forward, sell or disclose the data of the User to third parties without the prior 
          written consent from the User, except in instances provided in the Terms of Use.
        </p>
        <h3 className="sublegal-title">9.8</h3>
        <p className="legal-text">
          Operator is entitled to forward the personal data to Operator group companies and cooperation 
          partners.
        </p>
        <h3 className="sublegal-title">9.9</h3>
        <p className="legal-text">
          Operator is not obliged to preserve the Personal Data of the Users.
        </p>
        <h3 className="sublegal-title">9.10</h3>
        <p className="legal-text">
          The User is entitled, at any time, to withdraw his/her consent for processing of Personal Data, to 
          request termination of the processing of Personal Data and deletion of the collected Personal Data, 
          and closing of user account. For that the User shall forward respective application to the Client 
          Support or to e-mail. Withdrawal of consent shall not have retroactive effect.
        </p>
        <h3 className="sublegal-title">9.11</h3>
        <p className="legal-text">
          Operator shall promptly notify User of any facts known to the Operator concerning any accidental 
          or unauthorized disclosure or use, or accidental or unauthorized loss, damage or destruction of 
          Personal Data by any current or former employee, contractor or agent of the Operator or by any 
          other person or third party. Operator shall;
        </p>
        <ul className="legal-list">
          <li className="legal-list-item">
            9.11.1 cooperate fully with User in the event of any accidental or unauthorized disclosure or use, or 
            accidental or unauthorized loss, damage or destruction of Personal Data by any current or former 
            employee, contractor or agent of Operator or by any other person or third party, to limit the 
            unauthorized disclosure or use, seek the return of any Personal Data, and assist in providing notice 
            if requested by User; and
          </li>
          <li className="legal-list-item">
            9.11.2 upon termination or expiration of the Terms of Use for whatever reason, or upon request by User, 
            Operator shall immediately cease to process the Personal Data and shall promptly return to User 
            all such Personal Data, or destroy the same, in accordance with such instructions as may be given 
            by User at that time. The obligations set forth in these data processing requirements shall remain 
            in force notwithstanding termination or expiration of this Terms of Use.
          </li>
        </ul>

        <h2 className="legal-title">10 Cookies</h2>
        <h3 className="sublegal-title">10.1</h3>
        <p className="legal-text">
          Cookies are small text files that can be conveyed to the User's device via the Website. Cookies or 
          other corresponding techniques may be used to collect information on the User's use of the 
          Website and Services and the User's device via the Website. Such information may include from 
          what page the User has entered the Website the browser the User is using, or the sections of the 
          Website the User has been browsing and the dates and times thereof.
        </p>
        <h3 className="sublegal-title">10.2</h3>
        <p className="legal-text">
          Cookies enable the processing of information related to Website and Services. The information 
          obtained enables the functioning of the Website and Services to be analyzed and improved to 
          provide the User with a better and more individualized experience. The information collected may 
          also be used to target marketing likely to correspond to the interests of the User within and outside 
          the Website and Services, for example, by utilizing retargeting.
        </p>
        <h3 className="sublegal-title">10.3</h3>
        <p className="legal-text">
          The User may prevent the use of cookies by changing the User's browser settings. The User should 
          note, however, that the removal of cookies or blocking their use may have a detrimental effect on 
          the use of the Website and Services or its specific sections or functions or even entirely prevent 
          such use.
        </p>
        <h3 className="sublegal-title">10.4</h3>
        <p className="legal-text">
          While using the Website and Services or in the course of interactive communication the Operator 
          may use various technologies which collect information regarding the access and use of the Website 
          and Services. Such information may include also information regarding the usage of the Website 
          and Services, details of performed inquiries, technological data (IP address, connection devices, 
          operation system) and other similar information.
        </p>
        <h3 className="sublegal-title">10.5</h3>
        <p className="legal-text">
          User is aware of and consents that Operator has the right to generate anonymized data, i.e. data 
          created by User that are de-identified in a way that it is impossible to tie to a specific User and from 
          which all identifying characteristics have been removed (including the data of the device, IP 
          addresses and cookie ID). Operator shall use the anonymized data for the development and 
          improvement of the Website and the Services.
        </p>

        <h2 className="legal-title">11 Legal Remedies of Operator</h2>
        <h3 className="sublegal-title">11.1</h3>
        <p className="legal-text">
          Operator is not obligated to check the Contents uploaded by Users onto the Website (if any), nor 
          User activities on the Website. Operator is also not obligated to monitor User activity, information 
          or the Contents they add to or transfer via the Website, store in cache memory, or save. At the 
          same time, Operator is obligated under the Information Society Services Act to inform competent 
          supervisory agencies of possible illegal activity or of the information provided, and identify the 
          Users to whom it is providing the service of data storage.
        </p>
        <h3 className="sublegal-title">11.2</h3>
        <p className="legal-text">
          If a User breaches the obligations in these Terms of Use, the good practice of the Website, or the 
          legislation, Operator shall have the right to:
        </p>
        <ul className="legal-list">
          <li className="legal-list-item">11.2.1 eliminate the violation or unlawful Contents;</li>
          <li className="legal-list-item">11.2.2 request the elimination of the violation and require that the conduct or the Contents be brought 
            into conformity with the Terms of Use, good practice or legal acts;</li>
          <li className="legal-list-item">11.2.3 temporarily restrict the User's access to the Services or Website or any of its parts, including close 
            the User's account temporarily;</li>
          <li className="legal-list-item">11.2.4 restrict the rights of use of the User.</li>
        </ul>
        <h3 className="sublegal-title">11.3</h3>
        <p className="legal-text">
          It the violation by the User is repeated or material in some other way, Operator has the right to:
        </p>
        <ul className="legal-list">
          <li className="legal-list-item">11.3.1 permanently forbid the User from using the respective part of the Website or the Services, 
            including to delete the User's account;</li>
          <li className="legal-list-item">11.3.2 terminate the contract with the User without notice.</li>
        </ul>
        <h3 className="sublegal-title">11.4</h3>
        <p className="legal-text">
          Operator may restore the Contents that were removed from the Website due to a complaint or re-
          establish access to them if Operator is presented with convincing evidence of the compliance of 
          the Contents to the Terms of Use, good practice, or legal acts.
        </p>

        <h2 className="legal-title">12 Termination</h2>
        <h3 className="sublegal-title">12.1</h3>
        <p className="legal-text">
          User is entitled to unilaterally terminate the contract without cause at any moment:
        </p>
        <ul className="legal-list">
          <li className="legal-list-item">a. by informing by e-mail;</li>
          <li className="legal-list-item">b. by informing on the Website.</li>
        </ul>
        <h3 className="sublegal-title">12.2</h3>
        <p className="legal-text">
          Operator is entitled to terminate the contract with the User without cause by informing the User 
          by e-mail or via the Website or Service 30 days before the termination of the contract.
        </p>
        <h3 className="sublegal-title">12.3</h3>
        <p className="legal-text">
          Operator is entitled to terminate the contract immediately without prior notice if:
        </p>
        <ul className="legal-list">
          <li className="legal-list-item">12.3.1 User has submitted false information about it;</li>
          <li className="legal-list-item">12.3.2 User has not used Services continuously for at least a year;</li>
          <li className="legal-list-item">12.3.3 person who has used Services in the name of the User does not have the User's authorization;</li>
          <li className="legal-list-item">12.3.4 User is in any other way in violation with the Terms of Use.</li>
        </ul>

        <h2 className="legal-title">13 Limitation of Liability</h2>
        <h3 className="sublegal-title">13.1</h3>
        <p className="legal-text">
          Operator and its agents make no representations or warranties about suitability, reliability, 
          availability, timeliness, security or accuracy of the Services and all Services and content are provided 
          “as is” without warranty or condition of any kind. Operator disclaims all warranties and conditions 
          of any kind, whether expressed, implied or statutory, with regards to the Services, including all 
          implied warranties or conditions of merchantability, fitness for a particular purpose, title and non-
          infringement. The Operator shall not be expressis verbis responsible for the damage and other 
          consequences that have arisen due to the following reasons:
        </p>
        <ul className="legal-list">
          <li className="legal-list-item">13.1.1 the Services or Website does not function or functions improperly in some web browsers;</li>
          <li className="legal-list-item">13.1.2 User has added Content to the Website which is not in compliance with or not being processed in 
            compliance with the Terms of Use, good practice or legislation;</li>
          <li className="legal-list-item">13.1.3 changes is legal acts and in their interpretations, their impacts on the Users and implementing those 
            changes in the Services, unless it is obligatory to the Operator under the law or a court decision 
            made regarding the Operator;</li>
          <li className="legal-list-item">13.1.4 force majeure and other faults and disturbances not caused or affected by the Operator which 
            prevent the User from using the Website or Services;</li>
          <li className="legal-list-item">13.1.5 errors, damages or settings that are unsuited for the use of the Services or Website;</li>
          <li className="legal-list-item">13.1.6 delays, disruptions or failures in the use of the Services or Website due to maintenance or 
            development works;</li>
          <li className="legal-list-item">13.1.7 processing data by third persons to whom the User has given the consent to forward the data by 
            the Operator;</li>
          <li className="legal-list-item">13.1.8 disruptions and failures in third party systems that affect the functioning and availability of the 
            Services and Website</li>
          <li className="legal-list-item">13.1.9 loss of the User's password or its falling into the possession of unauthorized third party or its use 
            by unauthorized third party.</li>
        </ul>
        <h3 className="sublegal-title">13.2</h3>
        <p className="legal-text">
          To the extent permitted by law, in no event shall either party be liable for any indirect, incidental, 
          punitive, or consequential damages, or loss of profits, revenue, data or business opportunity. 
          Except for the User's liability for payment of fees, obligations according to the indemnification 
          clauses and under User's liability for violation of the Operator intellectual property rights, if, 
          notwithstanding the other terms of the contract, either party is determined to have any liability to 
          the other party or any third party. Parties agree that the aggregate liability of the party will be limited 
          to total amounts User has actually paid for the Services in the twelve (12) month period preceding 
          the event giving rise to a claim.
        </p>
        <h3 className="sublegal-title">13.3</h3>
        <p className="legal-text">
          Operator shall not be liable for the management of the User's account, including any offenses 
          committed using the Website or Services, irrespective if it was committed by a person authorized 
          to use of the Website or Services or not.
        </p>
        <h3 className="sublegal-title">13.4</h3>
        <p className="legal-text">
          While the Operator takes all reasonable steps to ensure a fast and reliable service, it does not 
          guarantee that the use of this Website and Services will be interruption or error free and will not 
          be responsible for any disruption, loss of or corruption of any material in transit, or loss of or 
          corruption of material or data when downloaded onto any computer system.
        </p>
        <h3 className="sublegal-title">13.5</h3>
        <p className="legal-text">
          The Operator may assign or transfer any of its rights or subcontract any of its obligations under 
          these Terms of Use to any third party. The User may not assign or transfer any of the rights or sub 
          contract any of the obligations under these Terms of Use except with the specific permission in 
          writing of the Operator.
        </p>
        <h3 className="sublegal-title">13.6</h3>
        <p className="legal-text">
          Force Majeure – neither party will be responsible for failure or delay of performance if caused by 
          an act of war, hostility, or sabotage, natural disaster, electrical, internet, or telecommunication 
          outage that is not caused by the obligated party. Each party will use reasonable efforts to mitigate 
          the effect of a force majeure event.
        </p>

        <h2 className="legal-title">14 Applicable Law and Dispute Settlement</h2>
        <h3 className="sublegal-title">14.1</h3>
        <p className="legal-text">
          The present Terms of Use is governed by the laws of France.
        </p>
        <h3 className="sublegal-title">14.2</h3>
        <p className="legal-text">
          Any complaints must first be registered with the Operator's client support using the email provided 
          above. The User should first contact the Operator with a view to obtaining an amicable solution.
        </p>
        <h3 className="sublegal-title">14.3</h3>
        <p className="legal-text">
          Any disputes shall be settled under the laws of France by the courts of France, which have sole 
          jurisdiction unless there is a mandatory statutory provision to the contrary.
        </p>
        <h3 className="sublegal-title">14.4</h3>
        <p className="legal-text">
          The Website and Services and the Terms of Use have been designed for use within France. Whilst 
          the Operator is happy to consider requests for Products from other countries, the Operator 
          gives no warranty, express or implied, that the use of the Website and Services or the placing of 
          any order through the Website and Services from other countries complies with any applicable laws 
          or regulations of such other county. Accordingly, any Products or promotions not permitted under 
          other local law are not offered to the Users from such countries.
        </p>
      </div>
      <Footer />
    </>
  );
}
