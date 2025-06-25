import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  MagnifyingGlassIcon,
  WrenchScrewdriverIcon,
  ChartBarIcon,
  CpuChipIcon,
  ShieldCheckIcon,
  BoltIcon,
  SparklesIcon,
  RocketLaunchIcon,
  DocumentTextIcon,
  ChatBubbleLeftRightIcon,
} from "@heroicons/react/24/outline";
import Button from "../components/Button";
import Logo from "../components/Logo";

const LandingPage = () => {
  const [isVisible, setIsVisible] = useState(false);

  const features = [
    {
      icon: MagnifyingGlassIcon,
      title: "Smart Vulnerability Scanning",
      description:
        "Vulnerability detection with Selenium, BeautifulSoup, and more",
      gradient: "from-purple-500 to-pink-500",
      stats: "Scanner",
      details: "Detect known & unknown threats with real-time scanning",
    },
    {
      icon: CpuChipIcon,
      title: "AI Threat Detection",
      description: "Machine learning classifies and prioritizes threats",
      gradient: "from-blue-500 to-purple-500",
      stats: "Real-time Analysis",
      details:
        "Continuous learning system with misconfiguration detection and behavioral analysis",
    },
    {
      icon: WrenchScrewdriverIcon,
      title: "Auto Patching",
      description: "Automated fixes with GitHub Actions",
      gradient: "from-green-500 to-blue-500",
      stats: "Instant Fixes",
      details:
        "One-click rollback, complete patch history, and CI/CD integration",
    },
    {
      icon: DocumentTextIcon,
      title: "Smart Reports",
      description: "Severity-based reporting with actionable insights",
      gradient: "from-yellow-500 to-orange-500",
      stats: "PDF Export",
      details:
        "Executive summaries, severity badges, and detailed fix suggestions",
    },
    // {
    //   icon: ChatBubbleLeftRightIcon,
    //   title: "AI Assistant",
    //   description: "Security expert powered by advanced LLM",
    //   gradient: "from-pink-500 to-red-500",
    //   stats: "24/7 Support",
    //   details:
    //     "Get vulnerability explanations and prevention strategies instantly",
    // },
    {
      icon: ShieldCheckIcon,
      title: "Enterprise Ready",
      description: "Secure, scalable architecture",
      gradient: "from-indigo-500 to-purple-500",
      stats: "99.9% Uptime",
      details: "Flask/FastAPI backend with MongoDB and horizontal scaling",
    },
  ];

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-purple-900/20 relative overflow-x-hidden">
      <div className="fixed inset-0">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-purple-900/10"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-purple-800/10"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/5 via-transparent to-pink-900/5 animate-gradient-shift"></div>
      </div>
      <header
        className={`relative z-40 px-8 py-6 transition-all duration-1000 ${
          isVisible ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0"
        }`}
      >
        {" "}
        <nav className="flex justify-between items-center max-w-7xl mx-auto">
          {" "}
          <Logo
            className="group"
            textSize="text-2xl"
            textColor="text-white group-hover:text-purple-300 transition-colors duration-300"
            showText={true}
          />
          <div className="hidden md:flex space-x-8">
            {[
              { name: "Home", href: "#home" },
              { name: "Features", href: "#features" },
              { name: "Team", href: "#team" },
              { name: "About", href: "#about" },
              { name: "Contact", href: "#contact" },
            ].map((item, index) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-300 hover:text-white transition-all duration-300 hover:scale-105 relative group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-500 group-hover:w-full transition-all duration-300"></span>
              </a>
            ))}
          </div>
          <div className="flex-col items-center hidden md:flex">
            <img
              src="https://cyberhackathon.bihar.gov.in/logo-cyber-hackathon-2025.png"
              alt="InviScan Logo"
              className="w-20 h-20"
            />
          </div>
        </nav>
      </header>
      <section
        id="home"
        className="relative z-30 px-8 py-20 min-h-screen flex items-center"
      >
        <div className="max-w-7xl mx-auto text-center">
          <div
            className={`space-y-8 transition-all duration-1000 delay-300 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <div className="relative">
              <h1 className="text-6xl lg:text-8xl font-bold text-white leading-tight">
                Secure Your Web App with
                <br />
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-600 bg-clip-text text-transparent animate-gradient-shift">
                  Scanning
                </span>
              </h1>
              <div className="absolute -top-4 -right-4 text-2xl animate-bounce">
                <SparklesIcon className="w-8 h-8 text-purple-400" />
              </div>
            </div>
            <p className="text-xl lg:text-2xl text-gray-300 max-w-3xl mx-auto">
              Detect. Patch. Prevent. All in One Tool.
              <br />
              <span className="text-purple-300 font-semibold">
                Next-generation cybersecurity at your fingertips
              </span>
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
              <Link to="/app/new-scan" className="group">
                <Button
                  size="xl"
                  className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transform group-hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-purple-500/50 relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
                  <RocketLaunchIcon className="w-5 h-5 mr-2 group-hover:animate-bounce" />
                  Start Scanning
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      {/* Features Section - Modern Interactive Design */}
      <section
        id="features"
        className="relative z-30 px-8 py-32 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto">
          {/* Enhanced Section Header */}
          <div className="text-center mb-32">
            <div className="inline-block">
              <span className="text-sm font-semibold text-purple-400 bg-purple-500/10 px-4 py-2 rounded-full border border-purple-500/20 mb-6 inline-block">
                ✨ Powerful Features
              </span>
            </div>
            <h2 className="text-6xl lg:text-7xl font-black text-white mb-8 tracking-tight">
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-600 bg-clip-text text-transparent">
                Next-Gen Security
              </span>
            </h2>
            <p className="text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Revolutionary platform that transforms how you approach
              cybersecurity
            </p>

            {/* Animated Underline */}
            <div className="flex justify-center mt-8">
              <div className="w-32 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse"></div>
            </div>
          </div>

          {/* Interactive Features Grid */}
          <div className="space-y-40">
            {features.map((feature, index) => (
              <div key={index} className="group relative">
                {/* Background Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 via-pink-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 rounded-3xl blur-3xl"></div>

                <div
                  className={`grid lg:grid-cols-12 gap-12 items-center min-h-[60vh] relative ${
                    index % 2 === 0 ? "" : "lg:grid-flow-col-dense"
                  }`}
                >
                  {/* Feature Content */}
                  <div
                    className={`lg:col-span-6 space-y-8 ${
                      index % 2 === 0 ? "lg:col-start-1" : "lg:col-start-7"
                    }`}
                  >
                    {/* Feature Badge & Stats */}
                    <div className="flex items-center space-x-6">
                      <div
                        className={`w-20 h-20 bg-gradient-to-r ${feature.gradient} rounded-3xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-2xl`}
                      >
                        <feature.icon className="w-10 h-10 text-white" />
                      </div>
                      <div className="flex flex-col space-y-2">
                        <span className="text-lg font-bold text-purple-400 bg-purple-500/20 px-4 py-2 rounded-full border border-purple-500/30">
                          {feature.stats}
                        </span>
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                            {index + 1}
                          </div>
                          <span className="text-sm text-gray-500 font-medium">
                            Feature {index + 1}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Feature Title */}
                    <h3 className="text-5xl lg:text-6xl font-black text-white leading-none tracking-tight group-hover:text-purple-300 transition-colors duration-500">
                      {feature.title}
                    </h3>

                    {/* Feature Description */}
                    <p className="text-2xl text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-500">
                      {feature.description}
                    </p>

                    {/* Feature Details */}
                    <p className="text-lg text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-500">
                      {feature.details}
                    </p>
                  </div>

                  {/* Enhanced Feature Visualization */}
                  <div
                    className={`lg:col-span-6 relative ${
                      index % 2 === 0 ? "lg:col-start-7" : "lg:col-start-1"
                    }`}
                  >
                    <div className="relative group/viz">
                      {/* Multiple Layer Background Effects */}
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-10 rounded-[3rem] blur-3xl transform group-hover:scale-110 transition-all duration-1000`}
                      ></div>
                      <div
                        className={`absolute inset-0 bg-gradient-to-tr ${feature.gradient} opacity-5 rounded-[3rem] blur-2xl transform group-hover:scale-105 transition-all duration-700 delay-200`}
                      ></div>

                      {/* Main Visual Container */}
                      <div className="relative bg-gradient-to-br from-gray-900/95 to-gray-800/80 backdrop-blur-xl rounded-[3rem] p-12 border border-purple-500/30 group-hover:border-purple-400/60 transition-all duration-500 shadow-2xl group-hover:shadow-purple-500/20 min-h-[400px] flex items-center justify-center">
                        {/* Animated Border */}
                        <div className="absolute inset-0 rounded-[3rem] p-0.5 bg-gradient-to-r from-purple-500/50 via-pink-500/50 to-purple-500/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                          <div className="w-full h-full bg-gradient-to-br from-gray-900/95 to-gray-800/80 rounded-[3rem]"></div>
                        </div>

                        {/* Central Icon Display */}
                        <div className="relative z-10 text-center">
                          <div
                            className={`w-48 h-48 bg-gradient-to-r ${feature.gradient} rounded-[2rem] flex items-center justify-center transform group-hover:rotate-6 group-hover:scale-110 transition-all duration-700 shadow-2xl mb-8 mx-auto`}
                          >
                            <feature.icon className="w-24 h-24 text-white" />
                          </div>

                          {/* Feature Metrics */}
                          <div className="grid grid-cols-2 gap-6 text-center">
                            <div className="bg-purple-500/10 rounded-2xl p-4 border border-purple-500/20">
                              <div className="text-2xl font-bold text-white mb-1">
                                99.9%
                              </div>
                              <div className="text-sm text-gray-400">
                                Accuracy
                              </div>
                            </div>
                            <div className="bg-pink-500/10 rounded-2xl p-4 border border-pink-500/20">
                              <div className="text-2xl font-bold text-white mb-1">
                                &lt;1s
                              </div>
                              <div className="text-sm text-gray-400">
                                Response
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Progress Line Connector */}
                {index < features.length - 1 && (
                  <div className="flex justify-center mt-20 mb-20">
                    <div className="w-px h-20 bg-gradient-to-b from-purple-500/50 to-transparent"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Team Section - Redesigned with Matangi Font */}
      <section id="team" className="relative z-30 px-8 py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          {/* Enhanced Section Header */}
          <div className="text-center mb-32">
            <div className="inline-block">
              <span className="text-sm font-semibold text-red-400 bg-red-500/10 px-4 py-2 rounded-full border border-red-500/20 mb-6 inline-block">
                🔒 Elite Squad
              </span>
            </div>
            <h2
              className="text-6xl lg:text-7xl font-black text-white mb-8 tracking-tight"
              style={{ fontFamily: "Matangi, cursive" }}
            >
              Meet Team
              <br />
              <span className="bg-gradient-to-r from-red-400 via-red-500 to-red-600 bg-clip-text text-transparent">
                ACCESS DENIED
              </span>
            </h2>
            <p className="text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Elite Cybersecurity Engineers building the future of web security
            </p>

            {/* Animated underline */}
            <div className="flex justify-center mt-8">
              <div className="w-32 h-1 bg-gradient-to-r from-red-500 to-pink-500 rounded-full animate-pulse"></div>
            </div>
          </div>{" "}
          {/* Team Members - Real Team with Better Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-8 mb-24">
            {" "}
            {[
              {
                name: "PRINCE KUMAR VISHWAKARMA",
                avatar:
                  "https://avatars.githubusercontent.com/prince-kumar-vishwakarma?v=4",
                gradient: "from-yellow-400 to-orange-500",
                borderColor: "border-yellow-400",
                github: "prince-kumar-vishwakarma",
              },
              {
                name: "PAVAN KUMAR VISHWAKARMA",
                avatar:
                  "https://avatars.githubusercontent.com/Pavan-Kumar-Vishwakarma?v=4",
                gradient: "from-green-400 to-emerald-500",
                borderColor: "border-emerald-400",
                github: "Pavan-Kumar-Vishwakarma",
              },
              {
                name: "ABHISHEK KUMAR",
                avatar:
                  "https://avatars.githubusercontent.com/Abhishek12890551?v=4",
                gradient: "from-blue-400 to-blue-600",
                borderColor: "border-blue-400",
                github: "Abhishek12890551",
              },
              {
                name: "JAYANTIKA PRATIK",
                avatar: "https://avatars.githubusercontent.com/u/147483927?v=4",
                gradient: "from-amber-400 to-orange-500",
                borderColor: "border-amber-400",
                github: "jayantika-pratik",
              },
              {
                name: "MUSKAN KUMARI",
                avatar:
                  "https://avatars.githubusercontent.com/muskankumari82672?v=4",
                gradient: "from-red-400 to-pink-500",
                borderColor: "border-red-400",
                github: "muskankumari82672",
              },
            ].map((member, index) => (
              <div key={index} className="group relative">
                {/* Background glow effect */}
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${member.gradient} opacity-5 group-hover:opacity-15 transition-opacity duration-1000 rounded-3xl blur-3xl transform group-hover:scale-110`}
                ></div>{" "}
                <div
                  className={`relative bg-gradient-to-br from-gray-900/95 to-gray-800/80 backdrop-blur-xl rounded-3xl p-8 border-2 ${member.borderColor}/30 group-hover:${member.borderColor}/60 transition-all duration-500 shadow-2xl group-hover:shadow-lg hover:scale-105 h-[360px] flex flex-col`}
                >
                  {/* Animated border glow */}
                  <div
                    className={`absolute inset-0 rounded-3xl p-0.5 bg-gradient-to-r ${member.gradient} opacity-0 group-hover:opacity-30 transition-opacity duration-500`}
                  >
                    <div className="w-full h-full bg-gradient-to-br from-gray-900/95 to-gray-800/80 rounded-3xl"></div>
                  </div>{" "}
                  <div className="relative z-10 text-center flex-1 flex flex-col justify-center space-y-6">
                    {/* Member Avatar */}
                    <div className="relative">
                      <div
                        className={`w-32 h-32 rounded-full mx-auto overflow-hidden border-4 ${member.borderColor} transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-2xl`}
                      >
                        <img
                          src={member.avatar}
                          alt={member.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.style.display = "none";
                            e.target.nextSibling.style.display = "flex";
                          }}
                        />
                        <div
                          className={`w-full h-full bg-gradient-to-r ${member.gradient} flex items-center justify-center text-4xl text-white font-bold`}
                          style={{ display: "none" }}
                        >
                          {member.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                      </div>
                    </div>
                    {/* Member Name */}
                    <div className="space-y-4">
                      <h3
                        className={`text-xl font-black text-transparent bg-gradient-to-r ${member.gradient} bg-clip-text group-hover:scale-105 transition-transform duration-300 leading-tight`}
                        style={{ fontFamily: "Matangi, cursive" }}
                      >
                        {member.name}
                      </h3>

                      {/* Visual separator */}
                      <div
                        className={`w-20 h-1 bg-gradient-to-r ${member.gradient} mx-auto rounded-full opacity-70 group-hover:opacity-100 transition-opacity duration-300`}
                      ></div>
                    </div>{" "}
                    {/* GitHub Link */}
                    <div className="mt-auto px-2">
                      <a
                        href={`https://github.com/${member.github}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center justify-center text-gray-300 hover:text-transparent hover:bg-gradient-to-r ${member.gradient} hover:bg-clip-text transition-all duration-300 group-hover:scale-105 p-3 rounded-xl bg-gray-800/40 hover:bg-gray-700/60 border border-gray-700/40 hover:border-transparent hover:shadow-xl backdrop-blur-sm w-12 h-12 mx-auto`}
                      >
                        <svg
                          className="w-6 h-6 group-hover:animate-pulse"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.30.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* About Section - Redesigned */}
      <section id="about" className="relative z-30 px-8 py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          {/* Enhanced Section Header */}
          <div className="text-center mb-32">
            <div className="inline-block">
              <span className="text-sm font-semibold text-blue-400 bg-blue-500/10 px-4 py-2 rounded-full border border-blue-500/20 mb-6 inline-block">
                🚀 Innovation
              </span>
            </div>
            <h2
              className="text-6xl lg:text-7xl font-black text-white mb-8 tracking-tight"
              style={{ fontFamily: "Matangi, cursive" }}
            >
              About
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-blue-600 bg-clip-text text-transparent">
                InviScan AI
              </span>
            </h2>
            <p className="text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Revolutionizing cybersecurity with cutting-edge artificial
              intelligence
            </p>

            {/* Animated underline */}
            <div className="flex justify-center mt-8">
              <div className="w-32 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-16 mb-32">
            {/* Left Column - Mission & Vision */}
            <div className="space-y-12">
              {/* Mission */}
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-purple-600/5 to-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 rounded-3xl blur-3xl"></div>

                <div className="relative bg-gradient-to-br from-gray-900/95 to-gray-800/80 backdrop-blur-xl rounded-3xl p-8 border border-blue-500/30 group-hover:border-blue-400/60 transition-all duration-500 shadow-2xl">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                      <svg
                        className="w-8 h-8 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-3xl font-bold text-white group-hover:text-blue-300 transition-colors duration-500">
                      Our Mission
                    </h3>
                  </div>
                  <p className="text-lg text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-500">
                    To democratize cybersecurity by making advanced
                    vulnerability detection and automated patching accessible to
                    every organization, regardless of size or technical
                    expertise.
                  </p>
                </div>
              </div>

              {/* Vision */}
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 via-pink-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 rounded-3xl blur-3xl"></div>

                <div className="relative bg-gradient-to-br from-gray-900/95 to-gray-800/80 backdrop-blur-xl rounded-3xl p-8 border border-purple-500/30 group-hover:border-purple-400/60 transition-all duration-500 shadow-2xl">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                      <svg
                        className="w-8 h-8 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-3xl font-bold text-white group-hover:text-purple-300 transition-colors duration-500">
                      Our Vision
                    </h3>
                  </div>
                  <p className="text-lg text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-500">
                    A world where cybersecurity threats are proactively
                    identified and resolved before they can cause harm, powered
                    by intelligent automation and continuous learning.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column - Technology Stack */}
            <div className="relative">
              <div className="group relative">
                {/* Background effects */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-pink-600/10 opacity-60 rounded-3xl blur-3xl transform group-hover:scale-110 transition-all duration-1000"></div>

                <div className="relative bg-gradient-to-br from-gray-900/95 to-gray-800/80 backdrop-blur-xl rounded-3xl p-8 border border-blue-500/30 group-hover:border-blue-400/60 transition-all duration-500 shadow-2xl min-h-[500px]">
                  <div className="text-center mb-8">
                    <h3
                      className="text-4xl font-bold text-white mb-4 group-hover:text-blue-300 transition-colors duration-500"
                      style={{ fontFamily: "Matangi, cursive" }}
                    >
                      <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                        Technology Stack
                      </span>
                    </h3>
                    <p className="text-gray-300 text-lg">
                      Built with cutting-edge technologies
                    </p>
                  </div>{" "}
                  {/* Technology Grid */}
                  <div className="grid grid-cols-2 gap-6">
                    {[
                      {
                        name: "AI/ML",
                        icon: "🤖",
                        color: "from-blue-400 to-blue-600",
                        desc: "Advanced algorithms",
                        type: "emoji",
                      },
                      {
                        name: "React",
                        icon: "⚛️",
                        color: "from-cyan-400 to-cyan-600",
                        desc: "Modern UI",
                        type: "emoji",
                      },
                      {
                        name: "Python",
                        color: "from-slate-600 to-slate-800",
                        desc: "Backend power",
                        type: "svg",
                      },
                      {
                        name: "MongoDB",
                        color: "from-slate-700 to-gray-900",
                        desc: "Data storage",
                        type: "svg",
                      },
                      {
                        name: "FastAPI",
                        icon: "⚡",
                        color: "from-emerald-600 to-teal-700",
                        desc: "High performance",
                        type: "emoji",
                      },
                      {
                        name: "Docker",
                        icon: "🐳",
                        color: "from-blue-400 to-blue-600",
                        desc: "Containerization",
                        type: "emoji",
                      },
                    ].map((tech, index) => (
                      <div
                        key={index}
                        className="bg-gradient-to-br from-gray-800/60 to-gray-700/40 rounded-2xl p-4 border border-gray-600/30 hover:border-blue-400/50 transition-all duration-300 hover:scale-105 group/tech"
                      >
                        <div
                          className={`w-12 h-12 bg-gradient-to-r ${tech.color} rounded-xl flex items-center justify-center text-2xl mb-3 mx-auto transform group-hover/tech:rotate-12 transition-transform duration-300`}
                        >
                          {tech.type === "emoji" ? (
                            tech.icon
                          ) : tech.name === "Python" ? (
                            <svg
                              className="w-8 h-8"
                              viewBox="0 0 24 24"
                              fill="none"
                            >
                              <path
                                d="M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.17l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05-.05-1.23.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.26-.02.21-.01h5.09l.69-.05.59-.14.5-.21.41-.28.33-.32.27-.35.2-.36.15-.36.1-.35.07-.32.04-.28.02-.21V6.07h2.09l.14.01zm-6.47 14.25c-.28 0-.52.09-.73.26-.2.18-.3.42-.3.73 0 .28.1.52.3.73.21.2.45.3.73.3.28 0 .52-.1.73-.3.2-.21.3-.45.3-.73 0-.31-.1-.55-.3-.73-.21-.17-.45-.26-.73-.26zm6.36 0c-.28 0-.52.09-.73.26-.2.18-.3.42-.3.73 0 .28.1.52.3.73.21.2.45.3.73.3.28 0 .52-.1.73-.3.2-.21.3-.45.3-.73 0-.31-.1-.55-.3-.73-.21-.17-.45-.26-.73-.26z"
                                fill="currentColor"
                              />
                              <path
                                d="M12.74 2.32c-.31 0-.58.13-.78.35-.2.22-.3.51-.3.85v2.79c0 .37-.15.7-.43.97-.28.27-.63.42-1.01.42H7.42c-.38 0-.73.15-1.01.42-.28.27-.43.6-.43.97v2.79c0 .34.1.63.3.85.2.22.47.35.78.35h2.79c.38 0 .73.15 1.01.42.28.27.43.6.43.97v2.79c0 .34.1.63.3.85.2.22.47.35.78.35.31 0 .58-.13.78-.35.2-.22.3-.51.3-.85v-2.79c0-.37.15-.7.43-.97.28-.27.63-.42 1.01-.42h2.79c.38 0 .73-.15 1.01-.42.28-.27.43-.6.43-.97V8.61c0-.34-.1-.63-.3-.85-.2-.22-.47-.35-.78-.35h-2.79c-.38 0-.73-.15-1.01-.42-.28-.27-.43-.6-.43-.97V4.23c0-.34-.1-.63-.3-.85-.2-.22-.47-.35-.78-.35z"
                                fill="url(#python-gradient)"
                              />
                              <defs>
                                <linearGradient
                                  id="python-gradient"
                                  x1="0%"
                                  y1="0%"
                                  x2="100%"
                                  y2="100%"
                                >
                                  <stop offset="0%" stopColor="#3776ab" />
                                  <stop offset="100%" stopColor="#ffd43b" />
                                </linearGradient>
                              </defs>
                            </svg>
                          ) : tech.name === "MongoDB" ? (
                            <svg
                              className="w-8 h-8"
                              viewBox="0 0 24 24"
                              fill="none"
                            >
                              <path
                                d="M17.193 9.555c-1.264-5.58-4.252-7.414-4.573-8.115-.28-.394-.53-.954-.735-1.44-.036.495-.055.685-.523 1.184-.723.566-4.438 3.682-4.74 10.02-.282 5.912 4.27 9.435 4.888 9.884l.07.05A73.49 73.49 0 0111.91 24h.481c.114-1.032.284-2.056.51-3.07.417-.296.604-.463.85-.693a11.342 11.342 0 003.639-8.464c.01-.814-.103-1.662-.197-2.218zm-5.336 8.195s0-8.291.275-8.29c.213 0 .49 10.695.49 10.695-.381-.045-.765-1.76-.765-2.405z"
                                fill="#4FAA41"
                              />
                              <path
                                d="M12.012 24.585c0-.45.013-.9.038-1.349l.382-11.688-.012-.701a5.405 5.405 0 01-.565.302 4.69 4.69 0 00-.395.302v12.782c.187.1.375.201.552.352z"
                                fill="#6CAD3E"
                              />
                            </svg>
                          ) : null}
                        </div>
                        <h4 className="text-white font-semibold text-center mb-1 group-hover/tech:text-blue-300 transition-colors duration-300">
                          {tech.name}
                        </h4>
                        <p className="text-gray-400 text-xs text-center group-hover/tech:text-gray-300 transition-colors duration-300">
                          {tech.desc}
                        </p>
                      </div>
                    ))}{" "}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Key Features Section */}
          <div className="relative">
            {/* Background glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-purple-600/5 to-blue-600/5 rounded-3xl blur-3xl"></div>

            <div className="relative bg-gradient-to-br from-gray-900/95 to-gray-800/80 backdrop-blur-xl rounded-3xl p-12 border border-blue-500/30">
              <div className="text-center mb-12">
                <h3
                  className="text-4xl font-bold text-white mb-4"
                  style={{ fontFamily: "Matangi, cursive" }}
                >
                  <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    Why Choose InviScan AI?
                  </span>
                </h3>
                <p className="text-gray-300 text-lg">
                  Experience the future of cybersecurity
                </p>
              </div>{" "}
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    title: "  Detection",
                    description:
                      "Advanced machine learning algorithms detect vulnerabilities with 99.9% accuracy",
                    icon: "🧠",
                    gradient: "from-blue-500 to-cyan-500",
                  },
                  {
                    title: "Automated Patching",
                    description:
                      "Instant vulnerability fixes with GitHub Actions integration and rollback capabilities",
                    icon: "🔧",
                    gradient: "from-purple-500 to-pink-500",
                  },
                  {
                    title: "Real-time Monitoring",
                    description:
                      "24/7 continuous monitoring with instant alerts and comprehensive reporting",
                    icon: "📊",
                    gradient: "from-green-500 to-emerald-500",
                  },
                ].map((feature, index) => (
                  <div key={index} className="text-center group relative">
                    <div className="bg-gradient-to-br from-gray-800/60 to-gray-700/40 rounded-2xl p-8 border border-gray-600/30 group-hover:border-blue-400/50 transition-all duration-300 group-hover:scale-105">
                      <div
                        className={`w-20 h-20 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center text-3xl mb-6 mx-auto transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}
                      >
                        {feature.icon}
                      </div>
                      <h4
                        className="text-2xl font-bold text-white mb-4 group-hover:text-blue-300 transition-colors duration-300"
                        style={{ fontFamily: "Matangi, cursive" }}
                      >
                        {feature.title}
                      </h4>
                      <p className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>{" "}
      </section>
      {/* Contact Section - Redesigned */}
      <section
        id="contact"
        className="relative z-30 px-8 py-32 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto relative">
          {/* Enhanced Section Header */}
          <div className="text-center mb-20">
            <div className="inline-block mb-6">
              <span className="text-sm font-semibold text-purple-400 bg-purple-500/10 px-4 py-2 rounded-full border border-purple-500/20">
                💬 Let's Connect
              </span>
            </div>
            <h2
              className="text-6xl lg:text-7xl font-black text-white mb-8 tracking-tight"
              style={{ fontFamily: "Matangi, cursive" }}
            >
              Get In
              <br />
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                Touch
              </span>
            </h2>
            <p className="text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-8">
              Ready to revolutionize your cybersecurity? Let's discuss how
              InviScan AI can transform your digital protection strategy.
            </p>

            {/* Animated underline */}
            <div className="flex justify-center">
              <div className="w-32 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse"></div>
            </div>
          </div>

          {/* Main Contact Grid */}
          <div className="grid lg:grid-cols-2 gap-16 mb-20">
            {/* Left Column - Contact Methods */}
            <div className="space-y-8">
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 via-pink-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 rounded-3xl blur-3xl"></div>

                <div className="relative bg-gradient-to-br from-gray-900/95 to-gray-800/80 backdrop-blur-xl rounded-3xl p-8 border border-purple-500/30 group-hover:border-purple-400/60 transition-all duration-500 shadow-2xl">
                  <h3
                    className="text-3xl font-bold text-white mb-8 group-hover:text-purple-300 transition-colors duration-500"
                    style={{ fontFamily: "Matangi, cursive" }}
                  >
                    Contact Methods
                  </h3>

                  <div className="space-y-6">
                    {[
                      {
                        icon: "📧",
                        title: "Email",
                        content: "team@inviscan.ai",
                        action: "mailto:team@inviscan.ai",
                        description:
                          "Get in touch via email for detailed discussions",
                        gradient: "from-blue-500 to-cyan-500",
                      },
                      {
                        icon: "💬",
                        title: "Discord",
                        content: "AccessDenied#2025",
                        action: "#",
                        description: "Join our community for real-time support",
                        gradient: "from-purple-500 to-pink-500",
                      },
                      {
                        icon: "🐙",
                        title: "GitHub",
                        content: "github.com/access-denied",
                        action: "https://github.com",
                        description: "Explore our open-source contributions",
                        gradient: "from-green-500 to-emerald-500",
                      },
                    ].map((contact, index) => (
                      <a
                        key={index}
                        href={contact.action}
                        className="flex items-center p-6 bg-gradient-to-br from-gray-800/60 to-gray-700/40 rounded-2xl border border-gray-600/30 hover:border-purple-400/50 transition-all duration-300 hover:scale-105 group/contact"
                      >
                        <div
                          className={`w-16 h-16 bg-gradient-to-r ${contact.gradient} rounded-2xl flex items-center justify-center text-2xl mr-6 transform group-hover/contact:scale-110 group-hover/contact:rotate-6 transition-all duration-500`}
                        >
                          {contact.icon}
                        </div>
                        <div className="flex-1">
                          <h4 className="text-xl font-bold text-white mb-1 group-hover/contact:text-purple-300 transition-colors duration-300">
                            {contact.title}
                          </h4>
                          <p className="text-purple-400 font-medium mb-2 group-hover/contact:text-purple-300 transition-colors duration-300">
                            {contact.content}
                          </p>
                          <p className="text-sm text-gray-400 group-hover/contact:text-gray-300 transition-colors duration-300">
                            {contact.description}
                          </p>
                        </div>
                        <div className="text-purple-400 group-hover/contact:text-purple-300 transition-colors duration-300">
                          <svg
                            className="w-6 h-6 transform group-hover/contact:translate-x-1 transition-transform duration-300"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - CTA and Additional Info */}
            <div className="space-y-8">
              {/* Main CTA */}
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-pink-600/10 opacity-60 rounded-3xl blur-3xl transform group-hover:scale-110 transition-all duration-1000"></div>

                <div className="relative bg-gradient-to-br from-gray-900/95 to-gray-800/80 backdrop-blur-xl rounded-3xl p-8 border border-blue-500/30 group-hover:border-blue-400/60 transition-all duration-500 shadow-2xl">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-4xl mb-6 mx-auto transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-700">
                      🚀
                    </div>
                    <h3
                      className="text-3xl font-bold text-white mb-4 group-hover:text-blue-300 transition-colors duration-500"
                      style={{ fontFamily: "Matangi, cursive" }}
                    >
                      Start Your Journey
                    </h3>
                    <p className="text-lg text-gray-300 mb-8 leading-relaxed group-hover:text-gray-200 transition-colors duration-500">
                      Experience the power of AI-driven cybersecurity. Try
                      InviScan AI today and see the difference intelligent
                      protection makes.
                    </p>

                    <Link to="/app" className="inline-block group/button">
                      <Button
                        size="xl"
                        className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transform hover:scale-110 transition-all duration-500 shadow-2xl hover:shadow-purple-500/50 text-lg px-12 py-4 group-hover/button:animate-pulse"
                      >
                        <span className="flex items-center space-x-3">
                          <span>Try InviScan AI Now</span>
                          <svg
                            className="w-6 h-6 transform group-hover/button:translate-x-1 transition-transform duration-300"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M13 7l5 5m0 0l-5 5m5-5H6"
                            />
                          </svg>
                        </span>
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>{" "}
      </section>{" "}
      {/* Footer - Minimal Design */}
      <footer className="relative z-30 px-8 py-12 bg-gradient-to-t from-black via-gray-900/95 to-transparent">
        <div className="max-w-6xl mx-auto">
          {/* Simplified Footer Content */}{" "}
          <div className="mt-8 pt-6 border-t border-gray-800/50">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              {/* Left: Brand Info */}{" "}
              <Logo
                size="w-8 h-8"
                textSize="text-lg"
                textColor="text-white"
                subtitle="  Security"
              />
              {/* Center: Navigation Links */}
              <div className="flex items-center space-x-8 text-sm">
                <a
                  href="#about"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  About
                </a>
                <a
                  href="#contact"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  Contact
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  Privacy
                </a>
              </div>
              {/* Right: Copyright */}
              <div className="text-sm text-gray-400">© 2025 InviScan AI</div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
