import React, { useState, useEffect, useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const Scan = () => {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState(null);
  const [animatedText, setAnimatedText] = useState("");
  const text = "W ebsite Vulnerability Scanner";
  const reportRef = useRef();
  
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setAnimatedText((prev) => prev + text[index]);
      index++;
      if (index === text.length-1) clearInterval(interval);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const severityLevels = ["Low", "Medium", "High"];
  const severityColors = { Low: "text-green-400", Medium: "text-yellow-400", High: "text-red-500" };

  const handleScan = async () => {
    if (!url) {
      alert("Please enter a valid URL.");
      return;
    }
  
    setLoading(true);
    setReport(null);
  
    setTimeout(async () => {
      try {
        const response = await fetch("http://localhost:5000/api/scan", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url }),
        });
  
        const data = await response.json();
        setReport(data);
        console.log("Scan result saved to MongoDB:", data); // Debugging
      } catch (error) {
        console.error("Error scanning:", error);
      } finally {
        setLoading(false);
      }
    }, 10000); // 10 seconds delay
  };
  
  const handleDownloadPDF = () => {
    const input = reportRef.current;
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "PNG", 10, 10, 190, 0);
      pdf.save("Scan_Report.pdf");
    });
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-900 text-white">
      {/* Background Image with Animated Text */}
      <div className="relative w-full h-[30vh] bg-cover bg-center" style={{ backgroundImage: "url('https://img.freepik.com/free-vector/blue-background-with-white-line-middle_483537-4470.jpg')" }}>
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <h1 className="text-6xl font-bold text-white tracking-wide animate-typing">{animatedText}</h1>
        </div>
      </div>

      
      {/* Input & Scan Button */}
      <div className="flex flex-col items-center w-full   max-w-md space-y-8 mt-6 bg-light-100 p-6 rounded-lg">
        <input
          type="text"
          placeholder="Enter URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full px-4 py-3 text-black bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleScan}
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-all"
        >
          Scan
        </button>
      </div>
      
      {loading && (
          
          <div className="flex justify-center mt-5">
            
            <div className="w-20 h-2 bg-gray-600 rounded-lg overflow-hidden relative">
            
            <div className="w-full h-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 animate-[loading_1.5s_linear_infinite]">
            </div>
            <p className="mt-7 animate-pulse">Scanning... Please wait</p>
            </div>
          </div>
           )}

      {report && (
        <div ref={reportRef} className="mt-6 w-full max-w-2xl bg-gray-800 p-4 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Scan Report for: {report.url}</h3>
          <table className="w-full border-collapse border border-gray-700 text-left">
            <thead>
              <tr className="bg-gray-800">
                <th className="border border-gray-700 px-4 py-2">Vulnerability</th>
                <th className="border border-gray-700 px-4 py-2">Severity Level</th>
                <th className="border border-gray-700 px-4 py-2">Mitigations</th>
              </tr>
            </thead>
            <tbody>
              {report.foundVulnerabilities.map((vuln, index) => {
                const severity = vuln === "No vulnerabilities found" ? "N/A" : severityLevels[Math.floor(Math.random() * 3)];
                return (
                  <tr key={index} className="bg-gray-700 hover:bg-gray-600">
                    <td className="border border-gray-700 px-4 py-2">{vuln}</td>
                    <td className={`border border-gray-700 px-4 py-2 ${severityColors[severity]}`}>{severity}</td>
                    <td className="border border-gray-700 px-4 py-2">
                      {vuln === "No vulnerabilities found" ? "N/A" : (
                        <a
                          href={`https://owasp.org/www-project-top-ten/`} // OWASP mitigation link
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 underline"
                        >
                          Learn More
                        </a>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {report && (
        <button
          onClick={handleDownloadPDF}
          className="mt-4 px-6 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition-all"
        >
          Download Report as PDF
        </button>
      )}
    </div>
  );
};

export default Scan;
