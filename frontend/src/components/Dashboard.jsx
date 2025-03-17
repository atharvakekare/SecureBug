import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaInstagram, FaXTwitter, FaEnvelope } from "react-icons/fa6";

const Dashboard = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleScanClick = () => {
    const scanSection = document.getElementById("scan-section");
    scanSection.classList.add("slide-animation");
    setTimeout(() => navigate("/scan"), 1000);
  };

  return (
    <div className="relative min-h-screen bg-gray-950 text-white">
      {/* Sidebar */}
      <div className={`fixed top-0 left-0 h-full bg-gray-900 w-64 p-5 transform ${menuOpen ? "translate-x-0" : "-translate-x-64"} transition-transform z-50`}>
        <button onClick={() => setMenuOpen(false)} className="text-xl mb-5">✖</button>
        <ul>
          <li className="p-3 hover:bg-gray-700 cursor-pointer" onClick={() => navigate("/about")}>About</li>
          <li className="p-3 hover:bg-gray-700 cursor-pointer" onClick={() => navigate("/privacy")}>Privacy</li>
          <li className="p-3 hover:bg-gray-700 cursor-pointer" onClick={() => navigate("/profile")}>Profile</li>
          <li className="p-3 hover:bg-gray-700 cursor-pointer" onClick={() => navigate("/logs")}>Logs</li>
          <li className="p-3 hover:bg-gray-700 cursor-pointer" onClick={() => navigate("/contact")}>Contact Us</li>
        </ul>
      </div>

      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full bg-gray-900 p-4 flex justify-between items-center z-40">
        <button onClick={() => setMenuOpen(true)} className="text-3xl">☰</button>
        <FaUser className="text-2xl" />
      </nav>

      {/* Hero Section */}
      <div className="relative h-[95vh] flex items-center justify-center bg-cover bg-center text-white text-5xl font-bold" style={{ backgroundImage: "url('https://img.freepik.com/free-vector/blue-background-with-white-line-middle_483537-4470.jpg')" }}>
        <div className=" bg-opacity-50 p-6 rounded-lg">Welcome to Cyber Security Dashboard</div>
      </div>

      <div className="max-w-7xl mx-auto p-10">
  {/* Title & Description */}
  <div className="text-center mb-8">
    <h1 className="text-3xl font-bold text-gray-800">Cybersecurity Concepts</h1>
    <p className="text-lg text-gray-600 mt-2">Explore key aspects of cybersecurity, including threats, attacks, and defense mechanisms.</p>
  </div>

  {/* Grid Section */}
  <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
    {/* Box 1: Cyber Attacks */}
    <div className="p-5 bg-gray-200 shadow-lg rounded-lg hover:shadow-2xl transition relative group h-64 flex flex-col items-center">
      <img src="https://miro.medium.com/v2/resize:fit:1224/0*ErN7MyOU7wjQLSgM.jpg" alt="Cyber Attacks" className="w-full h-40 object-cover rounded" />
      <h3 className="text-lg font-bold text-gray-900 mt-3">Cyber Attacks</h3>
      <p className="text-sm text-gray-600">Understanding various cyber attacks and how they affect systems.</p>
    </div>

    {/* Box 2: Threats & Vulnerabilities */}
    <div className="p-5 bg-gray-200 shadow-lg rounded-lg hover:shadow-2xl transition relative group h-64 flex flex-col items-center">
      <img src="https://cdn.prod.website-files.com/5ff66329429d880392f6cba2/60b35a70bb78e316b039d310_XSS%20preview.jpg" alt="Threats & Vulnerabilities" className="w-full h-40 object-cover rounded" />
      <h3 className="text-lg font-bold text-gray-900 mt-3">Threats & Vulnerabilities</h3>
      <p className="text-sm text-gray-600">Identifying security risks and protecting sensitive data.</p>
    </div>

    {/* Box 3: Encryption */}
    <div className="p-5 bg-gray-200 shadow-lg rounded-lg hover:shadow-2xl transition relative group h-64 flex flex-col items-center">
      <img src="https://aspiainfotech.com/wp-content/uploads/2022/11/AdobeStock_297345586-1280x720.jpeg" alt="Encryption" className="w-full h-40 object-cover rounded" />
      <h3 className="text-lg font-bold text-gray-900 mt-3">Encryption</h3>
      <p className="text-sm text-gray-600">How encryption secures data from unauthorized access.</p>
    </div>

    {/* Box 4: Malware */}
    <div className="p-5 bg-gray-200 shadow-lg rounded-lg hover:shadow-2xl transition relative group h-64 flex flex-col items-center">
      <img src="https://images.prismic.io/guardrails-01/NzA1YWZiMzMtYzMxYS00OWJkLTg1YmMtNGMyZTcxMGI0YTgw_csrf-1024x600.jpg?auto=compress,format&rect=0,0,1024,600&w=1024&h=600" alt="Malware" className="w-full h-40 object-cover rounded" />
      <h3 className="text-lg font-bold text-gray-900 mt-3">Malware</h3>
      <p className="text-sm text-gray-600">Different types of malware and how to mitigate them.</p>
    </div>

    {/* Box 5: Firewalls */}
    <div className="p-5 bg-gray-200 shadow-lg rounded-lg hover:shadow-2xl transition relative group h-64 flex flex-col items-center">
      <img src="https://www.digitalgravity.ae/blog/wp-content/uploads/2021/09/Clickjacking-prevention.jpg" alt="Firewalls" className="w-full h-40 object-cover rounded" />
      <h3 className="text-lg font-bold text-gray-900 mt-3">Firewalls</h3>
      <p className="text-sm text-gray-600">Preventing unauthorized access through firewalls.</p>
    </div>

    {/* Box 6: Security Measures */}
    <div className="p-5 bg-gray-200 shadow-lg rounded-lg hover:shadow-2xl transition relative group h-64 flex flex-col items-center">
      <img src="https://brightsec.com/wp-content/uploads/2022/05/Slide-16_9-78-1024x576.png" alt="Security Measures" className="w-full h-40 object-cover rounded" />
      <h3 className="text-lg font-bold text-gray-900 mt-3">Security Measures</h3>
      <p className="text-sm text-gray-600">Best practices for maintaining cybersecurity.</p>
    </div>
  </div>
</div>

      {/* Scan Section */}
      <div id="scan-section" className="flex items-center p-10 relative">
        <div className="w-2/3">
          <img src="/scan-image.jpg" alt="Scan Now" className="w-full rounded-lg" />
        </div>
        <div className="w-1/3 flex justify-center">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-full text-lg shadow-lg hover:bg-blue-700 transition" onClick={handleScanClick}>
            Scan Now →
          </button>
        </div>
      </div>

      {/* About Section */}
      <div className="p-10 bg-gray-900 text-center">
        <h2 className="text-3xl font-bold mb-4">About Us</h2>
        <p className="max-w-3xl mx-auto text-lg">We provide top-notch cybersecurity solutions to safeguard your digital presence. Join us in making the internet a safer place.</p>
      </div>

      {/* Social Media & Contact */}
      <div className="p-10 bg-gray-950 text-center flex justify-center gap-6 text-3xl">
        <FaInstagram className="hover:text-pink-500 cursor-pointer" />
        <FaXTwitter className="hover:text-blue-500 cursor-pointer" />
        <FaEnvelope className="hover:text-yellow-500 cursor-pointer" />
      </div>

      {/* Animation CSS */}
      <style>{`
        .slide-animation {
          animation: slide-out 1s forwards;
        }
        @keyframes slide-out {
          from { transform: translateX(0); }
          to { transform: translateX(100%); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default Dashboard;
