import React from 'react';
import BackToTop from "../components/BackToTop";

const About = () => {
  return (
    <div
      className="min-h-screen font-serif p-8"
      style={{
        backgroundImage: "url('/about01.webp')", 
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="max-w-5xl mx-auto p-8">
        
        <h1 className="text-4xl font-bold text-center mb-8 text-[#5c4a32]">
          About Our Expense Tracker
        </h1>

        {/* Intro */}
        <p className="text-lg leading-relaxed text-[#5c4a32] mb-6">
          Managing your personal finances has never been easier. Our Expense Tracker
          helps you stay in control of your spending habits by tracking and categorizing
          expenses quickly and effortlessly.
        </p>

        {/* Why Use Section */}
        <h2 className="text-2xl font-semibold mb-3 mt-6 text-[#5c4a32]">Why Use Our Expense Tracker?</h2>
        <ul className="list-disc list-inside space-y-2 text-lg text-[#5c4a32]">
          <li><strong>Track Daily Spending:</strong> Add expenses instantly with categories like Food, Travel, Shopping, and more.</li>
          <li><strong>Sorting & Filtering:</strong> Review by date, amount, or category for detailed insights.</li>
          <li><strong>Smart Calculator:</strong> Perform quick calculations while adding expenses.</li>
          <li><strong>Local Storage:</strong> Data stays safe in your browser even after refreshing.</li>
          <li><strong>Simple Interface:</strong> Clean and user-friendly layout that works on all devices.</li>
        </ul>

        {/* How It Works */}
        <h2 className="text-2xl font-semibold mb-3 mt-6 text-[#5c4a32]">How It Works</h2>
        <ol className="list-decimal list-inside space-y-2 text-lg text-[#5c4a32]">
          <li>Enter expense details including title, amount, date, and category.</li>
          <li>Use the built-in calculator before finalizing an entry.</li>
          <li>Sort and filter to analyze your expenses easily.</li>
          <li>Edit or delete entries anytime for accuracy.</li>
        </ol>

        {/* Goal */}
        <h2 className="text-2xl font-semibold mb-3 mt-6 text-[#5c4a32]">Our Goal</h2>
        <p className="text-lg leading-relaxed text-[#5c4a32]">
          We aim to help you become financially aware and responsible by providing
          a practical tool that simplifies money management. Whether you’re a student,
          a professional, or managing a household, this tracker supports your budgeting goals.
        </p>

       {/* Features Section */}
        <section className="mt-10">
          <h2 className="text-2xl font-semibold mb-4 text-[#5c4a32]">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-xl font-semibold mb-2 text-[#5c4a32]">Track Daily Expenses</h3>
              <p className="text-[#5c4a32]">Log your spending and monitor where your money goes.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2 text-[#5c4a32]">View Monthly Reports</h3>
              <p className="text-[#5c4a32]">Get summaries to analyze and improve your budgeting habits.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2 text-[#5c4a32]">Built-in Calculator</h3>
              <p className="text-[#5c4a32]">Perform quick calculations directly within the app.</p>
            </div>
          </div>
        </section>

        {/* Why Choose Section */}
        <section className="mt-10">
          <h2 className="text-2xl font-semibold mb-4 text-[#5c4a32]">Why Choose Us?</h2>
          <ul className="list-disc list-inside space-y-2 text-lg text-[#5c4a32]">
            <li>Simple, intuitive design with no learning curve</li>
            <li>Fast, responsive interface for desktop and mobile</li>
            <li>Works offline with localStorage</li>
            <li>Completely free — no hidden charges</li>
            <li>Actively maintained and improved based on feedback</li>
          </ul>
        </section>
      </div>
      <BackToTop />
    </div>
  );
};

export default About;
