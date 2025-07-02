import React, { useState } from "react";
import { getNames } from "country-list";

export default function PropertyAddress({ onClose, onSave }) {
  const countries = getNames();

  const [formValues, setFormValues] = useState({
    propertyName: "",
    unitCount: "",
    website: "",
    country: "",
    street: "",
    apt: "",
    city: "",
    state: "",
    zip: "",
  });

  const handleChange = (field) => (e) => {
    setFormValues((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleSubmit = () => {
    onSave(formValues); // Pass data back to parent
  };

  return (
    <form>
      <div className="grid sm:grid-cols-3 grid-cols-1 gap-[16px]">
        <Input label="Property name as identifier" required placeholder="Dallas apartments complex" value={formValues.propertyName} onChange={handleChange("propertyName")} />
        <Input label="Total apartment unit" type="number" required placeholder="50" value={formValues.unitCount} onChange={handleChange("unitCount")} />
        <Input label="Property website" optional type="url" placeholder="https://" value={formValues.website} onChange={handleChange("website")} />

        <Dropdown label="Country/Region" required options={countries} value={formValues.country} onChange={handleChange("country")} />
        <Input label="Street address" required placeholder="111 Austin Ave" value={formValues.street} onChange={handleChange("street")} />
        <Input label="Apt, suit, unit" type="number" placeholder="123" value={formValues.apt} onChange={handleChange("apt")} />
        <Input label="City/Town" required placeholder="Dallas" value={formValues.city} onChange={handleChange("city")} />
        <Dropdown label="State/Territory" required options={countries} value={formValues.state} onChange={handleChange("state")} />
        <Input label="Zip code" required placeholder="75061" value={formValues.zip} onChange={handleChange("zip")} />
      </div>

      <div className="col-span-2 border-t-[1px] border-[#E0E0E0] flex justify-end mt-[16px] pb-[16px]">
        <button
          type="button"
          onClick={handleSubmit}
          className="mt-[16px] bg-[#316EED] hover:bg-blue-700 text-white px-[24px] py-[14px] text-[16px] rounded-[12px] font-[700]"
        >
          Add
        </button>
      </div>
    </form>
  );
}

// ----- Reusable subcomponents -----

function Input({ label, placeholder, required, optional, ...props }) {
  return (
    <div className="flex flex-col">
      <label className="text-[16px] font-[600] mb-1">
        {label}
        {required && <span className="text-red-500">*</span>}
        {optional && <span className="text-[#6F6C6A]"> (optional)</span>}
      </label>
      <input
        className="border appearance-none focus:outline-none focus:border-blue-500 border-[#E0E0E0] h-[48px] rounded-[12px] font-[600] text-[16px] text-[#6F6C6A] px-3 py-2"
        placeholder={placeholder}
        {...props}
      />
    </div>
  );
}

function Dropdown({ label, options = [], required, ...props }) {
  return (
    <div className="flex flex-col">
      <label className="text-[16px] font-[600] mb-1">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative w-full">
        <select
          className="w-full h-[48px] pr-[38px] pl-4 rounded-[12px] border border-[#E0E0E0] bg-white text-[#6F6C6A] text-[16px] font-[500] appearance-none focus:outline-none focus:border-blue-500"
          {...props}
        >
          <option value="">Choose</option>
          {options.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
        <div className="pointer-events-none absolute right-[10px] top-1/2 -translate-y-1/2">
          <svg className="w-4 h-4 text-[#6F6C6A]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>
  );
}
