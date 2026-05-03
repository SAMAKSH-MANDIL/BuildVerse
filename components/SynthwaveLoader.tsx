"use client";

import React, { useEffect, useState } from "react";
import HillSvg from "./synthwave/HillSvg";
import TreeSvg from "./synthwave/TreeSvg";

interface SynthwaveLoaderProps {
  duration?: number;
  onComplete?: () => void;
}

export default function SynthwaveLoader({
  duration = 4000,
  onComplete,
}: SynthwaveLoaderProps) {
  const [isHidden, setIsHidden] = useState(false);
  const [isRemoved, setIsRemoved] = useState(false);

  useEffect(() => {
    const hideTimer = setTimeout(() => {
      setIsHidden(true);
      onComplete?.();
    }, duration);
    return () => clearTimeout(hideTimer);
  }, [duration, onComplete]);

  useEffect(() => {
    if (isHidden) {
      const removeTimer = setTimeout(() => setIsRemoved(true), 800);
      return () => clearTimeout(removeTimer);
    }
  }, [isHidden]);

  if (isRemoved) return null;

  return (
    <div
      className={`synthwave-loader-wrapper ${isHidden ? "loader-hidden" : ""}`}
      aria-hidden={isHidden}
    >
      <div id="synthwave">
        {/* Stars */}
        <div id="stars">
          {Array.from({ length: 14 }, (_, i) => (
            <div key={i} id={`star${i}`} />
          ))}
        </div>

        {/* Sun */}
        <div id="sun">
          <div id="ball" />
          {Array.from({ length: 8 }, (_, i) => (
            <div key={i} id={`stripe${i}`} />
          ))}
        </div>

        {/* Hills */}
        <div id="hill">
          <HillSvg />
        </div>
        <div id="hill2">
          <HillSvg />
        </div>

        {/* Trees */}
        <div id="tree">
          <TreeSvg />
        </div>
        <div id="tree2">
          <TreeSvg />
        </div>

        {/* Fog gradient */}
        <div id="fog" />
        <div id="fog2" />

        {/* Land base */}
        <div id="land" />

        {/* Road side grids */}
        <div id="roadSide0">
          <div id="roadSideGrid0" />
        </div>
        <div id="roadSide1">
          <div id="roadSideGrid1" />
        </div>

        {/* Road center lines */}
        <div id="roadLines">
          <div id="lines">
            {Array.from({ length: 8 }, (_, i) => (
              <div key={i} id={`line${i}`} />
            ))}
          </div>
        </div>

        {/* Car */}
        <div id="car">
          {/* Windows section */}
          <div id="windowsSection">
            <div id="sunReflection" />
            <div id="window">
              <div id="logo" />
            </div>
            <div id="lightStripe0" />
            <div id="lightStripe1" />
            <div id="lightStripe2" />
            <div id="lightStripe3" />
          </div>

          {/* Lights section */}
          <div id="lightsSection">
            <div id="lights0" />
            <div id="lights1" />
            <div id="lights2">
              <div id="tailLight0">
                <div id="cageLine0" />
                <div id="cageLine1" />
                <div id="tailLight0a">
                  <div id="tailLight0b">
                    <div id="tailLight0c">
                      <div id="tailLight0d" />
                    </div>
                  </div>
                </div>
              </div>
              <div />
              <div id="tailLight1">
                <div id="cageLine0" />
                <div id="cageLine1" />
                <div id="tailLight1a">
                  <div id="tailLight1b">
                    <div id="tailLight1c">
                      <div id="tailLight1d" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bumper section */}
          <div id="bumperSection">
            <div id="bumper0" />
            <div id="bumper1"><p>DELOREAN</p></div>
            <div id="bumper2" />
            <div id="bumper3">
              {Array.from({ length: 8 }, (_, i) => (
                <div key={i} />
              ))}
            </div>
            <div id="exhaust0" />
            <div id="exhaust1" />
          </div>
        </div>

        {/* Loading text */}
        <div className="loader-text">Loading BuildVerse</div>
      </div>
    </div>
  );
}
