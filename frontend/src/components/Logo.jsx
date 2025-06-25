import React from "react";

const Logo = ({
  size = "w-10 h-10",
  className = "",
  showText = true,
  textSize = "text-xl",
  textColor = "text-white",
  variant = "normal",
  // subtitle = "Security Scanner",
}) => {
  const logoSrc =
    variant === "large" ? "/inviscan-logo-large.svg" : "/inviscan-logo.svg";

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <div className="flex items-center justify-center">
        <img src={logoSrc} alt="" className={size} />
      </div>
      {showText && (
        <div>
          <h1 className={`${textSize} font-bold ${textColor}`}>InviScan</h1>
          {/* <p className="text-xs text-purple-300">{subtitle}</p> */}
        </div>
      )}
    </div>
  );
};

export default Logo;
