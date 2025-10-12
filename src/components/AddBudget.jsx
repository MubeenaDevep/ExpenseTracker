import React from 'react';
import Calculator from './calculator';
import { addBudget, updateBudget, fetchBudgets } from '../api';
import { useSnackbar } from 'notistack';

function AddBudget({
  expenseTitle,
  desc,
  amount,
  fromdate,
  todate,
  category,
  setExpenseTitle,
  setAmount,
  setDesc,
  setFromDate,
  setToDate,
  setCategory,
  editingId,
  setEditingId,
  setBudgets,
  validateForm,
}) {
  const { enqueueSnackbar } = useSnackbar();

  const buildPayload = () => ({
    title: expenseTitle,
    desc,
    _from: fromdate ? `${fromdate}T00:00:00Z` : null,
    to: todate ? `${todate}T23:59:59Z` : null,
    total_amount: Number(amount),
  });

  const clearForm = () => {
    setExpenseTitle('');
    setDesc('');
    setAmount('');
    setFromDate('');
    setToDate('');
    setCategory('');
    setEditingId(null);
    enqueueSnackbar('Form cleared', { variant: 'info' });
  };

  const localValidate = () => {
    if (!expenseTitle || !amount || Number(amount) <= 0) {
      enqueueSnackbar('Title and a positive amount are required', { variant: 'warning' });
      return false;
    }
    if (expenseTitle.length > 50) {
      enqueueSnackbar('Title cannot exceed 50 characters', { variant: 'error' });
      return false;
    }
    if (desc.length > 50) {
      enqueueSnackbar('Description cannot exceed 50 characters', { variant: 'error' });
      return false;
    }
    if (fromdate && todate && fromdate > todate) {
      enqueueSnackbar('From date cannot be after To date', { variant: 'warning' });
      return false;
    }
    return true;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const isValid = typeof validateForm === 'function' ? validateForm() : localValidate();
    if (!isValid) return;

    const payload = buildPayload();

    try {
      if (editingId) {
        const updated = await updateBudget(editingId, payload);
        setBudgets((prev) => prev.map((b) => (b.id === editingId ? updated : b)));
        enqueueSnackbar('Budget updated successfully', { variant: 'success' });
      } else {
        const created = await addBudget(payload);
        setBudgets((prev) => [...prev, created]);
        enqueueSnackbar('Budget added successfully', { variant: 'success' });
      }

      try {
        const fresh = await fetchBudgets();
        if (Array.isArray(fresh)) setBudgets(fresh);
      } catch {}

      clearForm();
    } catch (error) {
      console.error('❌ Error saving budget:', error);
      const message =
        error?.detail ||
        error?.message ||
        (editingId ? 'Failed to update budget.' : 'Failed to add budget.');
      enqueueSnackbar(message, { variant: 'error' });
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 p-6 min-h-screen font-serif">
      {/* Form Section */}
      <form onSubmit={handleFormSubmit} className="space-y-4">
        <h2 className="text-2xl font-bold text-[#3b2f2f] mb-4">
          {editingId ? 'Edit Budget' : 'Add New Budget'}
        </h2>

        {/* Title */}
        <div>
          <input
            type="text"
            placeholder="Budget Title"
            value={expenseTitle}
            maxLength={50}
            onChange={(e) => setExpenseTitle(e.target.value)}
            className="w-full p-2 bg-[#faf3e0] border border-[#c9b79c] rounded text-[#3b2f2f]"
          />
          <p className="text-xs text-[#5c4a3d] text-right">{expenseTitle.length}/50</p>
        </div>

        {/* Description */}
        <div>
          <input
            type="text"
            placeholder="Description"
            value={desc}
            maxLength={50}
            onChange={(e) => setDesc(e.target.value)}
            className="w-full p-2 bg-[#faf3e0] border border-[#c9b79c] rounded text-[#3b2f2f]"
          />
          <p className="text-xs text-[#5c4a3d] text-right">{desc.length}/50</p>
        </div>

        {/* Dates */}
        <input
          type="date"
          value={fromdate}
          onChange={(e) => setFromDate(e.target.value)}
          className="w-full p-2 bg-[#faf3e0] border border-[#c9b79c] rounded text-[#3b2f2f]"
        />
        <input
          type="date"
          value={todate}
          onChange={(e) => setToDate(e.target.value)}
          className="w-full p-2 bg-[#faf3e0] border border-[#c9b79c] rounded text-[#3b2f2f]"
        />

        {/* Amount */}
        <input
          type="number"
          placeholder="Total Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-2 bg-[#faf3e0] border border-[#c9b79c] rounded text-[#3b2f2f]"
        />

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            type="submit"
            className="flex-1 bg-[#4d6b3c] text-white py-2 rounded hover:bg-[#3b5530]"
          >
            {editingId ? 'Update Budget' : 'Add Budget'}
          </button>
          <button
            type="button"
            onClick={clearForm}
            className="flex-1 bg-[#faf3e0] border border-[#c9b79c] text-[#3b2f2f] rounded hover:bg-[#e6d3b3]"
          >
            Clear
          </button>
        </div>
      </form>

      {/* Calculator Section */}
      <div>
        <Calculator />
      </div>
    </div>
  );
}

export default AddBudget;
