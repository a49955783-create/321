import { useState, useEffect } from "react";
import Image from "next/image";

export default function Home() {
  const [form, setForm] = useState({
    receiverName: "",
    receiverCode: "",
    deputyName: "",
    deputyCode: "",
    managerName: "",
    managerCode: "",
  });
  const [result, setResult] = useState("");
  const [dragActive, setDragActive] = useState(false);

  useEffect(() => {
    const { receiverName, receiverCode, deputyName, deputyCode, managerName, managerCode } = form;
    if (!receiverName && !deputyName && !managerName) {
      setResult("");
      return;
    }

    const text = `📌 استلام العمليات\nالمستلم: ${receiverName} ${receiverCode}\nالنائب: ${deputyName} ${deputyCode}\nمسؤول الفترة: ${managerName} ${managerCode}`;
    setResult(text);
  }, [form]);

  const copyResult = () => {
    navigator.clipboard.writeText(result);
    alert("✅ تم نسخ النتيجة!");
  };

  const handleImage = (file) => {
    console.log("📂 تم رفع الصورة:", file.name);
    // لاحقًا يمكن تضيف OCR هنا
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files?.[0]) handleImage(e.dataTransfer.files[0]);
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen p-4 bg-[#0b0f17] text-white relative">
      {/* شعار و عنوان */}
      <div className="flex items-center space-x-2 mb-6">
        <Image src="/logo.png" alt="شعار الشرطة" width={60} height={60} />
        <h1 className="text-2xl font-bold">تحديث مركز عمليات الشرطة</h1>
      </div>

      {/* النتيجة */}
      <div className="w-full max-w-4xl bg-[#141924] p-6 rounded-2xl shadow-lg border border-[#1e2331] mb-6">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-semibold">النتيجة النهائية</h2>
          <button
            onClick={copyResult}
            className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded-lg text-sm"
          >
            نسخ النتيجة
          </button>
        </div>
        <textarea
          readOnly
          value={result}
          placeholder="سيتم توليد النتيجة هنا..."
          className="w-full h-36 bg-[#0b0f17] text-white p-3 rounded-lg border border-[#222839] resize-none"
        />
        <p className="text-xs text-gray-400 mt-1">
          المستلم يُحسب ضمن العدد ولا يُعرض ضمن قائمة الميدان.
        </p>
      </div>

      {/* الحقول */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl">
        {[
          { label: "المستلم", name: "receiver" },
          { label: "النائب", name: "deputy" },
          { label: "مسؤول الفترة", name: "manager" },
        ].map((role) => (
          <div
            key={role.name}
            className="bg-[#141924] p-4 rounded-2xl border border-[#1e2331]"
          >
            <label className="text-sm text-gray-300 block mb-1">
              الاسم — {role.label}
            </label>
            <input
              type="text"
              placeholder="الاسم"
              value={form[`${role.name}Name`]}
              onChange={(e) =>
                setForm({ ...form, [`${role.name}Name`]: e.target.value })
              }
              className="w-full bg-[#0b0f17] text-white border border-[#222839] rounded-lg p-2 mb-2"
            />
            <label className="text-sm text-gray-300 block mb-1">الكود</label>
            <input
              type="text"
              placeholder="الكود"
              value={form[`${role.name}Code`]}
              onChange={(e) =>
                setForm({ ...form, [`${role.name}Code`]: e.target.value })
              }
              className="w-full bg-[#0b0f17] text-white border border-[#222839] rounded-lg p-2"
            />
          </div>
        ))}
      </div>

      {/* رفع الصورة */}
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        onDragEnter={() => setDragActive(true)}
        onDragLeave={() => setDragActive(false)}
        className={`mt-6 w-full max-w-4xl h-24 border-2 border-dashed rounded-xl flex items-center justify-center cursor-pointer text-gray-400 transition ${
          dragActive ? "border-blue-400 bg-[#0e1320]" : "border-[#2a2f3e]"
        }`}
      >
        <p>
          📎 اسحب وأفلت صورة هنا أو الصقها بـ <b>Ctrl+V</b> لاستخراج الأسماء
          والكودات.
        </p>
      </div>
    </div>
  );
}
