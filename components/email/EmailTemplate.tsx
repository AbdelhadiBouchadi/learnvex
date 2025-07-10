import React from "react";

interface EmailTemplateProps {
  firstName: string;
  otp: string;
}

export const EmailTemplate: React.FC<EmailTemplateProps> = ({
  firstName,
  otp,
}) => {
  return (
    <div
      style={{
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        maxWidth: "600px",
        margin: "0 auto",
        backgroundColor: "#ffffff",
        padding: "0",
      }}
    >
      {/* Header */}
      <div
        style={{
          backgroundColor: "#1e40af",
          padding: "40px 32px",
          textAlign: "center",
          borderRadius: "8px 8px 0 0",
        }}
      >
        <h1
          style={{
            color: "#ffffff",
            fontSize: "28px",
            fontWeight: "700",
            margin: "0",
            letterSpacing: "-0.5px",
          }}
        >
          LearnVex
        </h1>
        <p
          style={{
            color: "#bfdbfe",
            fontSize: "16px",
            margin: "8px 0 0 0",
            fontWeight: "400",
          }}
        >
          Your Learning Platform
        </p>
      </div>

      {/* Main Content */}
      <div
        style={{
          padding: "48px 32px",
          backgroundColor: "#ffffff",
        }}
      >
        <div
          style={{
            textAlign: "center",
            marginBottom: "32px",
          }}
        >
          <div
            style={{
              width: "80px",
              height: "80px",
              backgroundColor: "#f0f9ff",
              borderRadius: "50%",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 24px",
              border: "2px solid #e0f2fe",
            }}
          >
            <svg
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#1e40af"
              strokeWidth="2"
            >
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
          </div>

          <h2
            style={{
              color: "#1e293b",
              fontSize: "24px",
              fontWeight: "600",
              margin: "0 0 16px 0",
              lineHeight: "1.2",
            }}
          >
            Verify Your Email Address
          </h2>

          <p
            style={{
              color: "#64748b",
              fontSize: "16px",
              lineHeight: "1.6",
              margin: "0 0 32px 0",
            }}
          >
            Hi {firstName}, welcome to LearnVex! Please use the verification
            code below to confirm your email address and complete your account
            setup.
          </p>
        </div>

        {/* OTP Code */}
        <div
          style={{
            backgroundColor: "#f8fafc",
            border: "2px solid #e2e8f0",
            borderRadius: "12px",
            padding: "32px 24px",
            textAlign: "center",
            margin: "0 0 32px 0",
          }}
        >
          <p
            style={{
              color: "#475569",
              fontSize: "14px",
              fontWeight: "600",
              margin: "0 0 16px 0",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
            }}
          >
            Your Verification Code
          </p>

          <div
            style={{
              backgroundColor: "#ffffff",
              border: "2px solid #1e40af",
              borderRadius: "8px",
              padding: "20px",
              margin: "0 auto",
              display: "inline-block",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
            }}
          >
            <span
              style={{
                color: "#1e40af",
                fontSize: "32px",
                fontWeight: "700",
                letterSpacing: "8px",
                fontFamily: 'Monaco, "Lucida Console", monospace',
              }}
            >
              {otp}
            </span>
          </div>

          <p
            style={{
              color: "#6b7280",
              fontSize: "14px",
              margin: "16px 0 0 0",
              lineHeight: "1.5",
            }}
          >
            This code will expire in <strong>10 minutes</strong>
          </p>
        </div>

        {/* Instructions */}
        <div
          style={{
            backgroundColor: "#fef3c7",
            border: "1px solid #fcd34d",
            borderRadius: "8px",
            padding: "16px 20px",
            margin: "0 0 32px 0",
          }}
        >
          <p
            style={{
              color: "#92400e",
              fontSize: "14px",
              margin: "0",
              lineHeight: "1.5",
            }}
          >
            <strong>Security tip:</strong> Never share this code with anyone.
            LearnVex will never ask for your verification code via phone or
            email.
          </p>
        </div>

        {/* Support */}
        <div
          style={{
            textAlign: "center",
          }}
        >
          <p
            style={{
              color: "#6b7280",
              fontSize: "14px",
              lineHeight: "1.6",
              margin: "0 0 16px 0",
            }}
          >
            If you didn't request this verification code, please ignore this
            email or contact our support team.
          </p>

          <a
            href="mailto:support@learnvex.com"
            style={{
              color: "#1e40af",
              fontSize: "14px",
              fontWeight: "600",
              textDecoration: "none",
              padding: "8px 16px",
              border: "1px solid #1e40af",
              borderRadius: "6px",
              display: "inline-block",
              backgroundColor: "#ffffff",
              transition: "all 0.2s ease",
            }}
          >
            Contact Support
          </a>
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          backgroundColor: "#f8fafc",
          padding: "32px",
          textAlign: "center",
          borderTop: "1px solid #e2e8f0",
        }}
      >
        <p
          style={{
            color: "#6b7280",
            fontSize: "14px",
            margin: "0 0 16px 0",
            lineHeight: "1.6",
          }}
        >
          This email was sent to verify your account on LearnVex. If you have
          any questions, please don't hesitate to reach out to our support team.
        </p>

        <div
          style={{
            borderTop: "1px solid #e2e8f0",
            paddingTop: "16px",
            marginTop: "16px",
          }}
        >
          <p
            style={{
              color: "#9ca3af",
              fontSize: "12px",
              margin: "0",
              lineHeight: "1.5",
            }}
          >
            © 2024 LearnVex. All rights reserved.
            <br />
            This is an automated email, please do not reply.
          </p>
        </div>
      </div>
    </div>
  );
};
