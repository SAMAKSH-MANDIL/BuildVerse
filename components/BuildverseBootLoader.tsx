"use client";

import { useEffect, useState } from "react";

const bootLines = [
  { command: "npx buildverse@26 init", note: "opening LNCT launch gate..." },
  { command: "scan --tracks deep-tech", note: "AI, web, cyber, fintech ready" },
  { command: "sync --teams finalist-20", note: "builder arena online" },
  { command: "run finale --hours 30", note: "6 - 7 June boot complete" },
];

export default function BuildverseBootLoader({ duration = 2000 }: { duration?: number }) {
  const [isExiting, setIsExiting] = useState(false);
  const [isRemoved, setIsRemoved] = useState(false);

  useEffect(() => {
    const exitTimer = window.setTimeout(() => setIsExiting(true), duration);
    return () => window.clearTimeout(exitTimer);
  }, [duration]);

  useEffect(() => {
    if (!isExiting) {
      return;
    }

    const removeTimer = window.setTimeout(() => setIsRemoved(true), 650);
    return () => window.clearTimeout(removeTimer);
  }, [isExiting]);

  if (isRemoved) {
    return null;
  }

  return (
    <div className={`boot-loader${isExiting ? " boot-loader-exit" : ""}`} role="status" aria-live="polite">
      <div className="boot-loader-bg" />
      <div className="boot-loader-grid" />
      <div className="boot-loader-scan" />

      <div className="boot-orbit" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>

      <div className="boot-panel">
        <div className="boot-panel-top">
          <div className="boot-dots" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <p>root@buildverse-26: ~/lnct-finale</p>
        </div>

        <div className="boot-brand">
          <span>BuildVerse</span>
          <strong>Hackathon system boot</strong>
        </div>

        <div className="boot-lines">
          {bootLines.map((line, index) => (
            <div className="boot-line" key={line.command} style={{ animationDelay: `${index * 0.42}s` }}>
              <p>
                <span>buildverse</span> <em>$</em> {line.command}
              </p>
              <small>{line.note}</small>
            </div>
          ))}
        </div>

        <div className="boot-progress">
          <div>
            <span>Boot progress</span>
            <strong>Ready to build</strong>
            <span>100%</span>
          </div>
          <i />
        </div>
      </div>

      <p className="boot-footer">KLIC-AIIC x LNCT Hackathon Club x HighKernel</p>
    </div>
  );
}
