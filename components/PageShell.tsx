"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

const LOADER_DURATION_MS = 1700;
const TRANSITION_DURATION = 0.55;

const PageShell = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const hasSeenLoader = sessionStorage.getItem("manuscript_loader_seen");

    if (hasSeenLoader) {
      setShowLoader(false);
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setShowLoader(false);
      sessionStorage.setItem("manuscript_loader_seen", "true");
    }, LOADER_DURATION_MS);

    return () => window.clearTimeout(timeoutId);
  }, []);

  return (
    <>
      <AnimatePresence>
        {showLoader && (
          <motion.div
            className="manuscript-loader-overlay"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.6, ease: "easeOut" } }}
          >
            <div className="manuscript-loader-core">
              <span className="manuscript-loader-emblem" aria-hidden />
              <p className="manuscript-loader-title">Intersecting Lines</p>
              <p className="manuscript-loader-subtitle">
                Unfolding the manuscript...
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid">
        <AnimatePresence initial={false}>
          <motion.div
            key={pathname}
            className="col-start-1 row-start-1"
            initial={{ opacity: 0, filter: "blur(10px)" }}
            animate={{
              opacity: 1,
              filter: "blur(0px)",
              transitionEnd: { filter: "none" },
            }}
            exit={{
              opacity: 0,
              filter: "blur(10px)",
            }}
            transition={{
              duration: TRANSITION_DURATION,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
};

export default PageShell;
