import { useState } from "react";

export default function UnitTable({ units, setUnits }) {
  const [editingIndex, setEditingIndex] = useState(null);
  const [newUnit, setNewUnit] = useState({
    name: "",
    code: "",
    status: "",
    location: "",
    partner: ""
  });

  const handleInputChange = (index, field, value) => {
    const updated = [...units];
    updated[index][field] = value;
    setUnits(updated);
  };

  const handleAddRow = () => {
    setUnits([...units, { name: "", code: "", status: "", location: "", partner: "" }]);
  };

  const handleDelete = (index) => {
    const updated = units.filter((_, i) => i !== index);
    setUnits(updated);
  };

  const handlePartnerAdd = (index) => {
    const partnerName = prompt("اكتب اسم الشريك + الكود:");
    if (partnerName) {
      const updated = [...units];
      updated[index].partner = partnerName;
      setUnits(updated);
    }
  };

  return (
    <div className="table-container mt-6 overflow-x-auto">
      <table className="min-w-full text-center text-sm">
        <thead className="bg-policeBlue text-white">
          <tr>
            <th className="px-3 py-2">الاسم</th>
            <th className="px-3 py-2">الكود</th>
            <th className="px-3 py-2">الحالة</th>
            <th className="px-3 py-2">الموقع</th>
            <th className="px-3 py-2">شريك</th>
            <th className="px-3 py-2">إجراءات</th>
          </tr>
        </thead>
        <tbody>
          {units.map((unit, index) => (
            <tr key={index} className="border-b border-gray-700 hover:bg-gray-800">
              <td className="px-2 py-2">
                <input
                  type="text"
                  value={unit.name}
                  onChange={(e) => handleInputChange(index, "name", e.target.value)}
                  placeholder="الاسم"
                />
              </td>
              <td className="px-2 py-2">
                <input
                  type="text"
                  value={unit.code}
                  onChange={(e) => handleInputChange(index, "code", e.target.value)}
                  placeholder="الكود"
                />
              </td>
              <td className="px-2 py-2">
                <select
                  value={unit.status}
                  onChange={(e) => handleInputChange(index, "status", e.target.value)}
                >
                  <option value="">اختر</option>
                  <option value="في الخدمة">في الخدمة</option>
                  <option value="مشغول">مشغول</option>
                  <option value="خارج الخدمة">خارج الخدمة</option>
                  <option value="مشغول - تدريب">مشغول - تدريب</option>
                  <option value="مشغول - اختبار">مشغول - اختبار</option>
                </select>
              </td>
              <td className="px-2 py-2">
                <select
                  value={unit.location}
                  onChange={(e) => handleInputChange(index, "location", e.target.value)}
                >
                  <option value="">اختر</option>
                  <option value="الشمال">الشمال</option>
                  <option value="الجنوب">الجنوب</option>
                  <option value="الشرق">الشرق</option>
                  <option value="الوسط">الوسط</option>
                  <option value="الغرب">الغرب</option>
                  <option value="ساندي">ساندي</option>
                  <option value="بوليتو">بوليتو</option>
                </select>
              </td>
              <td className="px-2 py-2">
                <button
                  onClick={() => handlePartnerAdd(index)}
                  className="bg-green-600 px-2 py-1 rounded hover:bg-green-500"
                >
                  + إضافة شريك
                </button>
                {unit.partner && (
                  <div className="text-xs text-gray-300 mt-1">{unit.partner}</div>
                )}
              </td>
              <td className="px-2 py-2 space-x-2">
                <button
                  onClick={() => handleDelete(index)}
                  className="bg-red-600 px-2 py-1 rounded hover:bg-red-500"
                >
                  حذف
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="text-center mt-4">
        <button
          onClick={handleAddRow}
          className="bg-accentBlue text-white px-4 py-2 rounded-lg shadow-glow hover:bg-blue-500"
        >
          + إضافة سطر جديد
        </button>
      </div>
    </div>
  );
}
