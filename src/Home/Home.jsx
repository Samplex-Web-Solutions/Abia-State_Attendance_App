import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, ChevronDown, ChevronUp } from 'lucide-react';
import img from '../assets/mockup.png';
import logo from '../assets/logoAb.png';

const DownloadModal = ({ isOpen, progress, onClose }) => (
  <AnimatePresence>
    {isOpen && (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="bg-white rounded-2xl p-8 max-w-sm w-full shadow-2xl"
        >
          <h3 className="text-xl font-bold mb-4 text-gray-800">
            {progress < 100 ? "Preparing Download..." : "Download Started!"}
          </h3>
          <div className="w-full bg-gray-100 rounded-full h-4 overflow-hidden mb-4">
            <motion.div
              className="bg-green-700 h-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-center font-bold text-green-800">{progress}%</p>
        </motion.div>
      </div>
    )}
  </AnimatePresence>
);

const LandingPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const downloadLink = import.meta.env.VITE_APP_DOWNLOAD_LINK;

  const startDownload = () => {
    setIsModalOpen(true);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            window.location.href = downloadLink;
            setIsModalOpen(false);
            setProgress(0);
          }, 800);
          return 100;
        }
        return prev + 5;
      });
    }, 100);
  };

  return (
    <div className="min-h-screen relative font-sans bg-gray-50">
      <DownloadModal isOpen={isModalOpen} progress={progress} onClose={() => setIsModalOpen(false)} />

      <nav className="sticky border-b-1 border-gray-100 mb-2 md:mb-0 top-0 z-50 px-4 bg-gray-100 md:bg-gray-50/80 backdrop-blur-md py-4 flex justify-between items-center max-w-6xl mx-auto">
        <div className="logo flex flex-row items-center gap-2">
          <img src={logo} alt="Logo" className="h-12 w-auto" />
          <span className="text-2xl font-bold text-green-800">Attendance</span>
        </div>
        <button onClick={startDownload} className="bg-green-700 text-white px-8 py-2 rounded-lg font-semibold hover:bg-green-800 transition">
          Get App
        </button>
      </nav>

      <main className="max-w-6xl mt-4 md:mt-0 mx-auto px-4 py-2 grid lg:grid-cols-2 gap-8 items-center">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <h1 className="text-3xl font-sans md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
            <span className="md:text-5xl uppercase text-3xl">Official Attendance App </span>
            <br /><span className="text-green-700 text-4xl md:text-5xl">For Abia State Civil Servants</span>
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Ensure accountability and track daily office presence. Our system helps civil servants
            perform morning check-ins and evening sign-outs, maintaining accurate records for every ministry.
          </p>
          <button onClick={startDownload} className="bg-green-700 text-white px-10 py-4 rounded-xl flex items-center gap-3 text-lg font-bold hover:shadow-xl hover:bg-green-800 transition w-full md:w-auto justify-center">
            <Download className="animate-bounce duration-500 transition-all" /> Download App
          </button>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex justify-center items-center md:w-[80%] lg:justify-end">
          <img src={img} alt="App interface" className="h-[25rem] md:h-[30rem] w-auto" />
        </motion.div>
      </main>

      <section className="py-20 px-6 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <FAQItem question="What is the purpose of this app?" answer="This platform is designed specifically for civil servants to manage their daily attendance. By requiring a morning check-in and an evening sign-out, it ensures that staff hours are accurately captured, promoting punctuality and transparency across all departments." />
          <FAQItem question="How does the sign-in/sign-out process work?" answer="Upon arrival, you use the app to perform a quick facial recognition check-in. The process is repeated for your evening sign-out. This provides a reliable, automated record that eliminates manual paperwork and potential errors." />
          <FAQItem question="Is my attendance record permanently saved?" answer="Yes. The system maintains a secure, digital history of your attendance. This allows administrators to pull accurate reports on a monthly or weekly basis, ensuring all records are kept consistent and verifiable." />
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-12 px-6 mt-12">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold mb-2 text-green-500">Attendance Management System</h3>
            <p className="text-gray-400 text-sm">Ensuring transparency and accountability in public service.</p>
          </div>
          <div className="text-sm text-gray-500">© 2026 Abia State Government. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
};

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full p-6 flex justify-between items-center text-left">
        <span className="font-bold text-green-800 text-lg">{question}</span>
        {isOpen ? <ChevronUp className="text-green-700" /> : <ChevronDown className="text-green-700" />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="px-6 pb-6 text-gray-600 leading-relaxed">
            {answer}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LandingPage;