"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function AnnouncementBar() {
  const pathname = usePathname();
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("larch-valultmere-announcement-dismissed")) {
      setHidden(true);
    }
  }, []);

  if (pathname !== "/") return null;

  return (
    <div className="announcement" id="announcement" role="region" aria-label="Announcement" hidden={hidden}>
      <p className="announcement__text">Welcome to the new <strong>Larch Valultmere</strong>, live market data is now available for 60+ coins.</p>
      <button
        className="announcement__close"
        id="announcement-close"
        aria-label="Dismiss announcement"
        onClick={() => {
          localStorage.setItem("larch-valultmere-announcement-dismissed", "1");
          setHidden(true);
        }}
      >
        &times;
      </button>
    </div>
  );
}
