import React, { useState, useEffect } from "react";
import Calculator from "../components/calculator";
import { addExpense, getExpenses, deleteExpense, updateExpense } from "../api";
import { useSnackbar } from "notistack";
import BackToTop from "../components/BackToTop";

function AddExpensePage() {
  const [expenseTitle, setExpenseTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [amount, setAmount] = useState("");
  const [budget, setBudget] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [expenses, setExpenses] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    (async () => {
      try {
        const data = await getExpenses();
        setExpenses(data || []);
      } catch (err) {
        console.error("❌ Error fetching expenses:", err);
        enqueueSnackbar("Failed to fetch expenses", { variant: "error" });
      }
    })();
  }, [enqueueSnackbar]);

  const resetForm = () => {
    setExpenseTitle("");
    setDesc("");
    setAmount("");
    setBudget("");
    setDate("");
    setCategory("");
    setEditingId(null);
  };

  const buildPayload = () => {
    const payload = {
      title: expenseTitle,
      desc,
      amount: amount !== "" ? Number(amount) : undefined,
      budget: budget !== "" ? Number(budget) : undefined,
      category_names: category ? [category] : undefined,
      date: date || undefined,
    };
    Object.keys(payload).forEach(
      (k) => (payload[k] === undefined || payload[k] === "") && delete payload[k]
    );
    return payload;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!expenseTitle || !amount || !category || Number(amount) <= 0) {
      enqueueSnackbar("Please enter all fields correctly", { variant: "warning" });
      return;
    }
    if (expenseTitle.length > 50) {
      enqueueSnackbar("Title cannot exceed 50 characters", { variant: "error" });
      return;
    }
    if (desc.length > 50) {
      enqueueSnackbar("Description cannot exceed 50 characters", { variant: "error" });
      return;
    }

    try {
      if (editingId !== null) {
        const updated = await updateExpense(editingId, buildPayload());
        setExpenses((prev) => prev.map((x) => (x.id === editingId ? updated : x)));
        enqueueSnackbar("Expense updated successfully ✅", { variant: "success" });
        resetForm();
      } else {
        const created = await addExpense(buildPayload());
        setExpenses((prev) => [...prev, created]);
        enqueueSnackbar("Expense added successfully 🎉", { variant: "success" });
        resetForm();
      }
    } catch (err) {
      console.error("❌ Save/update error:", err);
      enqueueSnackbar(err?.detail || "Failed to save expense", { variant: "error" });
    }
  };

  const handleEdit = (expenseId) => {
    const exp = expenses.find((x) => x.id === expenseId);
    if (!exp) return;
    setExpenseTitle(exp.title || exp.expenseTitle || "");
    setDesc(exp.desc || "");
    setAmount(String(exp.amount ?? ""));
    setBudget(String(exp.budget ?? ""));
    setCategory(exp.category || exp.category_names?.[0] || "");
    setDate(exp.date || "");
    setEditingId(expenseId);
  };

  const handleDelete = async (expenseId) => {
    try {
      await deleteExpense(expenseId);
      setExpenses((prev) => prev.filter((exp) => exp.id !== expenseId));
      if (editingId === expenseId) resetForm();
      enqueueSnackbar("Expense deleted 🗑️", { variant: "info" });
    } catch (error) {
      console.error("Error deleting expense:", error);
      enqueueSnackbar(error?.detail || "Failed to delete expense", { variant: "error" });
    }
  };

  return (
    <div
      className="min-h-screen p-8 font-serif"
      style={{ backgroundImage: "url('/vintage02.avif')", 
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
       }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {/* Form */}
        <form onSubmit={handleFormSubmit} className="space-y-4 max-w-3xl w-full">
          <h2 className="text-3xl font-bold mb-4 text-[#5c4b3b]">
            {editingId !== null ? "Edit Expense" : "Add New Expense"}
          </h2>

          {/* Title */}
          <div>
            <input
              type="text"
              placeholder="Expense Title"
              value={expenseTitle}
              maxLength={50}
              onChange={(e) => setExpenseTitle(e.target.value)}
              className="w-full p-3 border border-[#c9b79c] rounded-md bg-[#f9f3e7]"
            />
            <p className="text-xs text-[#5c4b3b] text-right">
              {expenseTitle.length}/50
            </p>
          </div>

          {/* Description */}
          <div>
            <input
              type="text"
              placeholder="Description"
              value={desc}
              maxLength={50}
              onChange={(e) => setDesc(e.target.value)}
              className="w-full p-3 border border-[#c9b79c] rounded-md bg-[#f9f3e7]"
            />
            <p className="text-xs text-[#5c4b3b] text-right">{desc.length}/50</p>
          </div>

          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-3 border border-[#c9b79c] rounded-md bg-[#f9f3e7]"
          />
          <input
            type="number"
            placeholder="Budget"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            className="w-full p-3 border border-[#c9b79c] rounded-md bg-[#f9f3e7]"
          />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-3 border border-[#c9b79c] rounded-md bg-[#f9f3e7]"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-3 border border-[#c9b79c] rounded-md bg-[#f9f3e7]"
          >
            <option value="">Select Category</option>
            <option value="Food">Food</option>
            <option value="Travel">Travel</option>
            <option value="Shopping">Shopping</option>
            <option value="Utilities">Utilities</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Health">Health</option>
            <option value="Education">Education</option>
            <option value="Bills">Bills</option>
            <option value="Savings">Savings</option>
            <option value="Groceries">Groceries</option>
            <option value="Rent">Rent</option>
            <option value="Other">Other</option>
          </select>

          <input
            type="text"
            placeholder="Or add new category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-3 border border-[#c9b79c] rounded-md bg-[#f9f3e7]"
          />

          <div className="flex gap-3">
            <button
              type="submit"
              className="flex-1 bg-[#7a6a4f] text-white py-2 rounded-md hover:opacity-90"
            >
              {editingId !== null ? "Update Expense" : "Add Expense"}
            </button>
            <button
              type="button"
              onClick={resetForm}
              className="flex-1 border border-[#c9b79c] bg-[#f9f3e7] py-2 rounded-md hover:opacity-80"
            >
              Clear
            </button>
          </div>
        </form>

        {/* Calculator */}
        <div className="max-w-3xl w-full">
          <Calculator />
        </div>
      </div>

      {/* Expense List */}
      <div className="w-full">
        <h3 className="text-2xl font-semibold mb-4 text-[#5c4b3b]">Expenses</h3>
        {filteredExpenses.length === 0 ? (
          <p className="text-[#5c4b3b]">No expenses to show.</p>
        ) : (
          <ul className="space-y-3">
            {filteredExpenses.map((e, idx) => (
              <li
                key={e.id ?? `${e.title}-${idx}`}
                className="p-3 border border-[#c9b79c] rounded-md bg-[#f9f3e7]"
              >
                <div className="flex justify-between">
                  <span className="font-medium">{e.title || e.expenseTitle}</span>
                  <span>₹{e.amount}</span>
                </div>
                <div className="text-sm text-[#5c4b3b]">
                  Budget: ₹{e.budget} | {e.date} |{" "}
                  {e.category || e.category_names?.join(", ")}
                </div>
                {e.desc && (
                  <p className="text-xs text-[#5c4b3b]">Desc: {e.desc}</p>
                )}
                <div className="mt-2 space-x-2">
                  <button
                    onClick={() => handleEdit(e.id)}
                    className="text-[#7a6a4f] hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(e.id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <BackToTop />
    </div>
  );
}

export default AddExpensePage;
