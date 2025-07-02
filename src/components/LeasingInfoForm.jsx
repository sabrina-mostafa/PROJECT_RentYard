import React, { useState } from "react";
import { getNames } from 'country-list';

const countryList = {
  '+880': 'BD',
  '+1': 'US',
  '+91': 'IN',
  '+44': 'GB',
  '+81': 'JP',
  '+61': 'AU',
};

export default function LeasingInfoForm({ onClose, onSave }) {
  const countries = getNames();
  const [sameAsProperty, setSameAsProperty] = useState(false);
  const [selectedDial, setSelectedDial] = useState('+880');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const [formValues, setFormValues] = useState({
    managerName: '',
    phone: '+880',
    email: '',
    street: '',
    apt: '',
    city: '',
    state: '',
    zip: ''
  });

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

  const handleSelect = (dial) => {
    setSelectedDial(dial);
    setFormValues((prev) => ({ ...prev, phone: dial + ' ' }));
    setDropdownOpen(false);
  };

  const handleChange = (field) => (e) => {
    setFormValues((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    if (!value.startsWith(selectedDial)) {
      setFormValues((prev) => ({ ...prev, phone: selectedDial + ' ' }));
    } else {
      setFormValues((prev) => ({ ...prev, phone: value }));
    }
  };

  const handleSubmit = () => {
    onSave(formValues);
  };

  return (
    <form className="grid grid-cols-2 gap-x-4 gap-y-4">
      <div className="flex flex-col sm:col-span-1 col-span-2">
        <label className="text-[16px] font-[600] mb-1">
          Leasing manager name<span className="text-red-500">*</span>
        </label>
        <input
          value={formValues.managerName}
          onChange={handleChange('managerName')}
          className="border appearance-none focus:outline-none focus:border-blue-500 border-[#E0E0E0] h-[48px] rounded-[12px] font-[600] text-[16px] text-[#6F6C6A] px-3 py-2"
          placeholder="Alex Johan"
        />
      </div>

      <div className="flex flex-col sm:col-span-1 col-span-2">
        <label className="text-[16px] font-[600] mb-1">
          Leasing manager Phone number<span className="text-red-500">*</span>
        </label>
        <div className="flex relative">
          <div className="relative w-[60px]">
            <button
              type="button"
              onClick={toggleDropdown}
              className="w-full h-[48px] border border-[#E0E0E0] bg-white rounded-l-[12px] flex items-center justify-center focus:outline-none relative pl-1 pr-6"
            >
              <img
                src={`https://flagsapi.com/${countryList[selectedDial]}/flat/64.png`}
                alt="flag"
                className="w-[24px] h-[20px] object-cover rounded-sm"
              />
              <div className="pointer-events-none absolute right-[6px] top-1/2 -translate-y-1/2">
                <svg
                  className="w-4 h-4 font-[600] text-[16px] text-[#6F6C6A]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </button>
            {dropdownOpen && (
              <ul className="absolute z-10 mt-1 w-full bg-white border border-[#E0E0E0] rounded shadow max-h-[180px] overflow-y-auto">
                {Object.entries(countryList).map(([dial, iso]) => (
                  <li
                    key={dial}
                    onClick={() => handleSelect(dial)}
                    className="cursor-pointer p-2 hover:bg-gray-100 flex justify-center"
                  >
                    <img
                      src={`https://flagsapi.com/${iso}/flat/64.png`}
                      alt={dial}
                      className="w-6 h-4 object-cover rounded-sm"
                    />
                  </li>
                ))}
              </ul>
            )}
          </div>
          <input
            type="tel"
            value={formValues.phone}
            onChange={handlePhoneChange}
            className="w-[calc(100%-48px)] h-[48px] px-4 rounded-r-[12px] border-t border-r border-b border-[#E0E0E0] bg-white focus:outline-none focus:border-blue-500 placeholder:text-[#6F6C6A] text-[16px]"
            placeholder="Phone number"
          />
        </div>
      </div>

      <div className="flex flex-col col-span-2">
        <label className="text-[16px] font-[600] mb-1">
          Leasing manager email<span className="text-red-500">*</span>
        </label>
        <div className="grid sm:grid-cols-2 gap-x-4 gap-y-[8px] ">
          <input
            type="email"
            value={formValues.email}
            onChange={handleChange('email')}
            className="border appearance-none focus:outline-none focus:border-blue-500 font-[600] text-[16px] text-[#6F6C6A] border-[#E0E0E0] h-[48px] rounded-[12px] px-3 py-2"
            placeholder="leasing@rentyard.com"
          />
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="sameAsAddress"
              checked={sameAsProperty}
              onChange={(e) => setSameAsProperty(e.target.checked)}
            />
            <label htmlFor="sameAsAddress" className="text-sm">
              Address (same as property)
            </label>
          </div>
        </div>
      </div>

      {!sameAsProperty && (
        <>
          <div className="grid sm:grid-cols-3 gap-[14px] col-span-2">
            <div className="flex flex-col w-[100%] ">
              <label className="text-[16px] font-[600] mb-1">
                Street address<span className="text-red-500">*</span>
              </label>
              <input
                value={formValues.street}
                onChange={handleChange('street')}
                className="border appearance-none focus:outline-none focus:border-blue-500 border-[#E0E0E0] h-[48px] rounded-[12px] font-[600] text-[16px] text-[#6F6C6A] px-3 py-2"
                placeholder="111 Austin Ave"
              />
            </div>
            <div className="flex flex-col w-[100%]">
              <label className="text-[16px] font-[600] mb-1">Apt, suit, unit</label>
              <input
                type="number"
                value={formValues.apt}
                onChange={handleChange('apt')}
                className="border appearance-none focus:outline-none focus:border-blue-500 font-[600] text-[16px] text-[#6F6C6A] border-[#E0E0E0] h-[48px] rounded-[12px] px-3 py-2"
                placeholder="123"
              />
            </div>
            <div className="flex flex-col w-[100%]">
              <label className="text-[16px] font-[600] mb-1">
                City/Town<span className="text-red-500">*</span>
              </label>
              <input
                value={formValues.city}
                onChange={handleChange('city')}
                className="border appearance-none focus:outline-none focus:border-blue-500 font-[600] text-[16px] text-[#6F6C6A] border-[#E0E0E0] h-[48px] rounded-[12px] px-3 py-2"
                placeholder="Dallas"
              />
            </div>
          </div>

          <div className="flex flex-col sm:col-span-1 col-span-2">
            <label className="text-[16px] font-[600] mb-1">State/Territory</label>
            <div className="relative w-full">
              <select
                value={formValues.state}
                onChange={handleChange('state')}
                className="w-full h-[48px] pr-[38px] pl-4 rounded-[12px] border border-[#E0E0E0] bg-white font-[600] text-[16px] text-[#6f6c6a8e] appearance-none focus:outline-none focus:border-blue-500"
              >
                <option value="">Choose state</option>
                {countries.map((country) => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute right-[10px] top-1/2 -translate-y-1/2">
                <svg className="w-4 h-4 text-[#6F6C6A]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:col-span-1 col-span-2">
            <label className="text-[16px] font-[600] mb-1">
              Zip code<span className="text-red-500">*</span>
            </label>
            <input
              value={formValues.zip}
              onChange={handleChange('zip')}
              className="border appearance-none focus:outline-none focus:border-blue-500 font-[600] text-[16px] text-[#6F6C6A] border-[#E0E0E0] h-[48px] rounded-[12px] px-3 py-2"
              placeholder="75061"
            />
          </div>
        </>
      )}

      <div className="col-span-2 border-t-[1px] border-[#E0E0E0] flex justify-end pb-[16px]">
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
