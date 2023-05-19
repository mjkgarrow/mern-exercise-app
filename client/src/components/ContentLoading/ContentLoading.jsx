import React from "react";
import "./ContentLoading.css";

export default function ContentLoading() {
    return (
        <div className="content-loading">
            <div className="content-loading-spinner"></div>
            <div className="content-loading-message">Loading content...</div>
        </div>
    );
}