import Image from "next/image";
import { useEffect, useState } from "react";

export default function Intro() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  return visible ? (
    <div className="fixed inset-0 bg-[#0b0f17] flex items-center justify-center z-50">
      <Image
        src="/logo.png"
        alt="شعار الشرطة"
        width={200}
        height={200}
        className="drop-shadow-[0_0_20px_rgba(100,180,255,0.8)] transition-all"
      />
    </div>
  ) : null;
}
