// import React from 'react';
// import Calculator from './calculator';

// function AddExpenseForm({
//   expenseTitle,
//   desc,
//   amount,
//   budget,
//   date,
//   category,
//   editIndex,
//   setExpenseTitle,
//   setAmount,
//   setDesc,
//   setDate,
//   setBudget,
//   setCategory,
//   handleFormSubmit
// }) {
//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
//       {/* Form Section */}
//       <form
//         onSubmit={handleFormSubmit}
//         className="bg-white p-4 rounded-lg shadow w-full space-y-4"
//       >
//         <input
//           type="text"
//           placeholder="Expense Title"
//           value={expenseTitle}
//           onChange={(e) => setExpenseTitle(e.target.value)}
//           className="w-full p-2 border rounded"
//         />
//         <input
//           type="text"
//           placeholder="Description"
//           value={desc}
//           onChange={(e) => setDesc(e.target.value)}
//           className="w-full p-2 border rounded"
//         />
//         <input
//           type="number"
//           placeholder="Amount"
//           value={amount}
//           onChange={(e) => setAmount(e.target.value)}
//           className="w-full p-2 border rounded"
//         />
//         <input
//           type="number"
//           placeholder="Budget"
//           value={budget}
//           onChange={(e) => setBudget(e.target.value)}
//           className="w-full p-2 border rounded"
//         />
//         <input
//           type="date"
//           value={date}
//           onChange={(e) => setDate(e.target.value)}
//           className="w-full p-2 border rounded"
//         />
//         <select
//           value={category}
//           onChange={(e) => setCategory(e.target.value)}
//           className="w-full p-2 border rounded"
//         >
//           <option value="">Select Category</option>
//           <option value="Food">Food</option>
//           <option value="Travel">Travel</option>
//           <option value="Shopping">Shopping</option>
//           <option value="Utilities">Utilities</option>
//           <option value="Entertainment">Entertainment</option>
//           <option value="Health">Health</option>
//           <option value="Education">Education</option>
//           <option value="Bills">Bills</option>
//           <option value="Savings">Savings</option>
//           <option value="Groceries">Groceries</option>
//           <option value="Rent">Rent</option>
//           <option value="Other">Other</option>
//         </select>
//         <button
//           type="submit"
//           className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
//         >
//           {editIndex !== null ? 'Update Expense' : 'Add Expense'}
//         </button>
//       </form>

//       {/* Calculator Section */}
//       <div className="bg-white p-4 rounded-lg shadow w-full">
//         <Calculator />
//       </div>
//     </div>
//   );
// }

// export default AddExpenseForm;






// import React, { useState, useEffect } from 'react';
// import Calculator from './calculator';
// import { addExpense, getExpenses } from './api';

// const ExpensePage = () => {
//   const [expenses, setExpenses] = useState([]);
//   const [expensetitle, setExpensetitle] = useState('');
//   const [desc, setDesc] = useState('');
//   const [amount, setAmount] = useState('');
//   const [budget, setBudget] = useState('');
//   const [category, setCategory] = useState('');
//   const [editIndex, setEditIndex] = useState(null);

//   useEffect(() => {
//     fetchExpenses();
//   }, []);

//   const fetchExpenses = async () => {
//     try {
//       const response = await getExpenses();
//       setExpenses(response.data);
//     } catch (error) {
//       console.error('Error fetching expenses:', error);
//     }
//   };

//   const handleFormSubmit = async (e) => {
//   e.preventDefault();
//   try {
//     await addExpense({
//       title: expensetitle,
//       desc,
//       amount: Number(amount),
//       budget: Number(budget),
//       category_names: [category] // wrap in array
//     });

//     setExpensetitle('');
//     setDesc('');
//     setAmount('');
//     setBudget('');
//     setCategory('');
//     setEditIndex(null);

//     fetchExpenses();
//   } catch (error) {
//     console.error('Error adding expense:', error);
//   }
// };


//   return (
//     <div className="p-4">
//       <AddExpenseForm
//         expensetitle={expensetitle}
//         desc={desc}
//         amount={amount}
//         budget={budget}
//         category={category}
//         editIndex={editIndex}
//         setExpensetitle={setExpensetitle}
//         setAmount={setAmount}
//         setDesc={setDesc}
//         setBudget={setBudget}
//         setCategory={setCategory}
//         handleFormSubmit={handleFormSubmit}
//       />

//       <div className="mt-6">
//         <h2 className="text-xl font-bold">Expenses List</h2>
//         <ul>
//           {expenses.map((exp, index) => (
//             <li key={index}>
//               {exp.title} - ₹{exp.amount}
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// function AddExpenseForm({
//   expensetitle,
//   desc,
//   amount,
//   budget,
//   category,
//   editIndex,
//   setExpensetitle,
//   setAmount,
//   setDesc,
//   setBudget,
//   setCategory,
//   handleFormSubmit
  
// }) 
// {
//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
//       <form
//   onSubmit={(e) => {
//     console.log("🚀 Form submitted");
//     handleFormSubmit(e);
//   }}
//   className="bg-white p-4 rounded-lg shadow w-full space-y-4"
// >

//         <input
//           type="text"
//           placeholder="Expense Title"
//           value={expensetitle}
//           onChange={(e) => setExpensetitle(e.target.value)}
//           className="w-full p-2 border rounded"
//         />
//         <input
//           type="text"
//           placeholder="Description"
//           value={desc}
//           onChange={(e) => setDesc(e.target.value)}
//           className="w-full p-2 border rounded"
//         />
//         <input
//           type="number"
//           placeholder="Amount"
//           value={amount}
//           onChange={(e) => setAmount(e.target.value)}
//           className="w-full p-2 border rounded"
//         />
//         <input
//           type="number"
//           placeholder="Budget"
//           value={budget}
//           onChange={(e) => setBudget(e.target.value)}
//           className="w-full p-2 border rounded"
//         />
//         <select
//           value={category}
//           onChange={(e) => setCategory(e.target.value)}
//           className="w-full p-2 border rounded"
//         >
//           <option value="">Select Category</option>
//           <option value="Food">Food</option>
//           <option value="Travel">Travel</option>
//           <option value="Shopping">Shopping</option>
//           <option value="Utilities">Utilities</option>
//           <option value="Entertainment">Entertainment</option>
//           <option value="Health">Health</option>
//           <option value="Education">Education</option>
//           <option value="Bills">Bills</option>
//           <option value="Savings">Savings</option>
//           <option value="Groceries">Groceries</option>
//           <option value="Rent">Rent</option>
//           <option value="Other">Other</option>
//         </select>
//         <button
//           type="submit"
//           className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
//         >
//           {editIndex !== null ? 'Update Expense' : 'Add Expense'}
//         </button>
//       </form>

//       <div className="bg-white p-4 rounded-lg shadow w-full">
//         <Calculator />
//       </div>
//     </div>
//   );
// }

// export default ExpensePage;







import React, { useState, useEffect } from 'react';
import Calculator from './calculator';
import { addExpense, getExpenses } from './api';

const ExpensePage = () => {
  const [expenses, setExpenses] = useState([]);
  const [expensetitle, setExpensetitle] = useState('');
  const [desc, setDesc] = useState('');
  const [amount, setAmount] = useState('');
  const [budget, setBudget] = useState('');
  const [category, setCategory] = useState('');
  const [editIndex, setEditIndex] = useState(null);

  // Fetch expenses from backend
  const fetchExpenses = async () => {
    console.log("📥 Fetching expenses...");
    try {
      const data = await getExpenses(); // already returns data
      console.log("✅ Expenses received:", data);
      setExpenses(data);
    } catch (error) {
      console.error('❌ Error fetching expenses:', error);
    }
  };

  useEffect(() => {
    console.log("💡 ExpensePage mounted");
    fetchExpenses();
  }, []);

  // Handle form submit
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log("🚀 Form submitted");

    const payload = {
      title: expensetitle,
      desc,
      amount,
      budget,
      category
    };

    console.log("📤 Sending payload:", payload);

    try {
      await addExpense(payload);
      console.log("✅ Expense added successfully");

      // Clear form
      setExpensetitle('');
      setDesc('');
      setAmount('');
      setBudget('');
      setCategory('');
      setEditIndex(null);

      // Refresh list
      fetchExpenses();
    } catch (error) {
      console.error('❌ Error adding expense:', error);
    }
  };

  return (
    <div className="min-h-screen bg-[#faf3e0] p-6 font-serif">
      <AddExpenseForm
        expensetitle={expensetitle}
        desc={desc}
        amount={amount}
        budget={budget}
        category={category}
        editIndex={editIndex}
        setExpensetitle={setExpensetitle}
        setAmount={setAmount}
        setDesc={setDesc}
        setBudget={setBudget}
        setCategory={setCategory}
        handleFormSubmit={handleFormSubmit}
      />

      <div className="mt-6">
        <h2 className="text-xl font-bold">Expenses List</h2>
        <ul>
          {expenses.map((exp, index) => (
            <li key={index}>
              {exp.title} - ₹{exp.amount}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

function AddExpenseForm({
  expensetitle,
  desc,
  amount,
  budget,
  category,
  editIndex,
  setExpensetitle,
  setAmount,
  setDesc,
  setBudget,
  setCategory,
  handleFormSubmit
}) {
  console.log("🛠 AddExpenseForm rendered");

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
      <form
        onSubmit={(e) => {
          console.log("🔥 onSubmit triggered");
          handleFormSubmit(e);
        }}
        className="bg-white p-4 rounded-lg shadow w-full space-y-4"
      >
        <input
          type="text"
          placeholder="Expense Title"
          value={expensetitle}
          onChange={(e) => setExpensetitle(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          placeholder="Budget"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-2 border rounded"
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
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {editIndex !== null ? 'Update Expense' : 'Add Expense'}
        </button>
      </form>

      <div className="bg-white p-4 rounded-lg shadow w-full">
        <Calculator />
      </div>
    </div>
  );
}

export default ExpensePage;





