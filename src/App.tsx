import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const feedbackUrl = import.meta.env.VITE_BASE_URL;
  const OAuthUrl = `${feedbackUrl}/oauth/canvas/initiate?canvas_instance_url=https://learnwise.instructure.com`;
  const sessionCheckUrl = `${feedbackUrl}/api/auth/session`;

  const [sessionCheckResult, setSessionCheckResult] = useState<string | null>(
    null
  );

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const oauthDomain = new URL(OAuthUrl).origin;
      if (event.origin === oauthDomain) {
        localStorage.setItem("feedbackJwtToken", event.data);
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [OAuthUrl]);

  const openOAuthWindow = () => {
    const popup = window.open(OAuthUrl, "oauthPopup", "width=600,height=600");
    if (popup) popup.focus();
  };

  const checkSession = async () => {
    try {
      const feedbackJwtToken = localStorage.getItem("feedbackJwtToken");
      const response = await fetch(sessionCheckUrl, {
        headers: {
          Authorization: `Bearer ${feedbackJwtToken}`,
        },
      });
      const data = await response.json();
      setSessionCheckResult(data.success ? "Authorized" : "Not Authorized");
    } catch {
      setSessionCheckResult("Error");
    }
  };

  return (
    <>
      <div>
        <button onClick={openOAuthWindow}>Open OAuth</button>
        <button onClick={checkSession}>Check Session</button>
        {sessionCheckResult && <p>Session Check: {sessionCheckResult}</p>}
      </div>
    </>
  );
}

export default App;
