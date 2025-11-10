import React from "react";

export default function EmailVerificationNotice() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <h2 className="text-2xl font-semibold text-center" style={{ color: "#E94A85" }}>
        Verification email has been sent to your Gmail address. Please verify yourself.
      </h2>
    </div>
  );
}