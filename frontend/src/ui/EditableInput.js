import React, { useState } from 'react';

export function EditableInput() {
  // State to manage input value
  const [inputValue, setInputValue] = useState('hello');

  return (
    <input
      className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#0d161b] focus:outline-0 focus:ring-0 border border-[#cfdee7] bg-slate-50 focus:border-[#cfdee7] h-14 placeholder:text-[#4c7b9a] p-[15px] text-base font-normal leading-normal"
      value={inputValue} // Controlled value from state
      onChange={(e) => setInputValue(e.target.value)} // Update state on change
      placeholder="Type something..." // Placeholder when empty
    />
  );
}