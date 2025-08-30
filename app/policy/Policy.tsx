import React from "react";
import { styles } from "../styles/style";

type Props = {};

const Policy = (props: Props) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 text-black dark:text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 md:p-8 border border-gray-100 dark:border-gray-700">
        <div className="text-center mb-8">
          <h1 className={`${styles.title} !text-center pt-2 mb-4`}>
            Platform Terms and Conditions
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        <div className="space-y-8">
          <section className="border-l-4 border-blue-500 pl-4">
            <h2 className="text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
            <p className="text-[16px] font-Poppins leading-8">
              By accessing or using iLEARNIT, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you must not use our platform. These terms apply to all students, lecturers, and visitors who access our services.
            </p>
          </section>

          <section className="border-l-4 border-purple-500 pl-4">
            <h2 className="text-2xl font-bold mb-4">2. User Accounts</h2>
            <p className="text-[16px] font-Poppins leading-8">
              To access certain features of iLEARNIT, you must register for an account using your valid university credentials. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account. You agree to immediately notify us of any unauthorized use of your account or any other security breaches.
            </p>
          </section>

          <section className="border-l-4 border-green-500 pl-4">
            <h2 className="text-2xl font-bold mb-4">3. Acceptable Use</h2>
            <p className="text-[16px] font-Poppins leading-8">
              You agree to use iLEARNIT solely for educational purposes in accordance with Adekunle Ajasin University&apos;s academic policies. You must not use the platform to distribute unauthorized materials, harass others, or engage in any illegal activities. Any content you upload must be your original work or properly attributed to the original source.
            </p>
          </section>

          <section className="border-l-4 border-yellow-500 pl-4">
            <h2 className="text-2xl font-bold mb-4">4. Intellectual Property</h2>
            <p className="text-[16px] font-Poppins leading-8">
              All course materials, content, and resources provided on iLEARNIT are the property of Adekunle Ajasin University or its licensors and are protected by copyright laws. While you may access and use these materials for your personal education, you may not distribute, modify, or commercialize any content without explicit written permission from the university.
            </p>
          </section>

          <section className="border-l-4 border-red-500 pl-4">
            <h2 className="text-2xl font-bold mb-4">5. Privacy and Data Protection</h2>
            <p className="text-[16px] font-Poppins leading-8">
              iLEARNIT collects and processes personal data in accordance with our Privacy Policy and applicable data protection regulations. We implement appropriate security measures to protect your information but cannot guarantee absolute security. By using our platform, you consent to the collection and use of your data as described in our Privacy Policy.
            </p>
          </section>

          <section className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl font-bold mb-4">6. Limitation of Liability</h2>
            <p className="text-[16px] font-Poppins leading-8">
              iLEARNIT and Adekunle Ajasin University shall not be liable for any indirect, incidental, special, or consequential damages resulting from your use or inability to use the platform. While we strive to provide accurate and up-to-date information, we do not warrant that the content is error-free or that the platform will be available without interruption.
            </p>
          </section>

          <section className="border-l-4 border-pink-500 pl-4">
            <h2 className="text-2xl font-bold mb-4">7. Modifications to Terms</h2>
            <p className="text-[16px] font-Poppins leading-8">
              We reserve the right to modify these Terms and Conditions at any time. Any changes will be effective immediately upon posting on the platform. Your continued use of iLEARNIT after any modifications constitutes your acceptance of the revised terms. We encourage you to periodically review this page for the latest information on our terms of use.
            </p>
          </section>

          <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg mt-8">
            <h3 className="text-xl font-bold mb-4 text-center">Contact Information</h3>
            <p className="text-[16px] font-Poppins leading-8 text-center">
              If you have any questions about these Terms and Conditions, please contact us at:<br />
              <span className="font-semibold">support@ilearnit.aaua.edu.ng</span> or visit the ICT Help Desk at Adekunle Ajasin University, Akungba-Akoko.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Policy;