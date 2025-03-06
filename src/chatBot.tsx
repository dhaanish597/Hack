import { useEffect } from "react";

const Chatbot: React.FC = () => {
  useEffect(() => {
    // Set up chatbot configuration
    (window as any).chtlConfig = {
      chatbotId: "4689851614",
      display: "fullscreen",
    };

    // Create script element for chatbot
    const script = document.createElement("script");
    script.async = true;
    script.id = "chatling-embed-script";
    script.dataset.id = "4689851614";
    script.dataset.display = "fullscreen";
    script.type = "text/javascript";
    script.src = "https://chatling.ai/js/embed.js";

    document.body.appendChild(script);

    return () => {
      // Cleanup the script when the component unmounts
      document.body.removeChild(script);
    };
  }, []);

  return <></>;
};

export default Chatbot;
