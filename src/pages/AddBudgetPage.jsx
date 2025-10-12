// import React, { useState, useEffect } from 'react';
// import AddBudget from '../components/AddBudget';
// import { fetchBudgets, deleteBudget } from '../api';
// import { useSnackbar } from 'notistack';
// import BackToTop from "../components/BackToTop";

// function AddBudgetPage() {
//   const [expenseTitle, setExpenseTitle] = useState('');
//   const [desc, setDesc] = useState('');
//   const [amount, setAmount] = useState('');
//   const [fromdate, setFromDate] = useState('');
//   const [todate, setToDate] = useState('');
//   const [category, setCategory] = useState('');
//   const [editingId, setEditingId] = useState(null);

//   const [budgets, setBudgets] = useState([]);
//     const { enqueueSnackbar } = useSnackbar()
   
//   useEffect(() => {
//     (async () => {
//       try {
//         const data = await fetchBudgets();
//         setBudgets(data || []);
//       } catch (err) {
//         console.error('❌ Error fetching budgets:', err);
//         enqueueSnackbar('Failed to fetch budgets', { variant: 'error' });
//       }
//     })();
//   }, [enqueueSnackbar]);

//   const handleDelete = async (id) => {
//     try {
//       await deleteBudget(id);
//       setBudgets(budgets.filter((b) => b.id !== id));
//     } catch (err) {
//       console.error("Error deleting budget:", err);
//     }
//   };

//   const handleEdit = (budget) => {
//     setExpenseTitle(budget.title || '');
//     setDesc(budget.desc || '');
//     setAmount(budget.total_amount || '');
//     setFromDate(budget._from ? budget._from.slice(0, 10) : '');
//     setToDate(budget.to ? budget.to.slice(0, 10) : '');
//     setCategory(budget.category || '');
//     setEditingId(budget.id);
//   };

//   return (
//     <div className="p-4">
//       <AddBudget
//         expenseTitle={expenseTitle}
//         setExpenseTitle={setExpenseTitle}
//         desc={desc}
//         setDesc={setDesc}
//         amount={amount}
//         setAmount={setAmount}
//         fromdate={fromdate}
//         setFromDate={setFromDate}
//         todate={todate}
//         setToDate={setToDate}
//         category={category}
//         setCategory={setCategory}
//         editingId={editingId}
//         setEditingId={setEditingId}
//         setBudgets={setBudgets}
//       />

//       {/* Budgets List */}
//       <div className="mt-8">
//         <h2 className="text-xl font-bold mb-4">Budgets</h2>
//         {budgets.length === 0 ? (
//           <p className="text-gray-500">No budgets added yet.</p>
//         ) : (
//           <ul className="space-y-3">
//             {budgets.map((b) => (
//               <li
//                 key={b.id}
//                 className="p-4 border rounded flex justify-between items-center bg-gray-50"
//               >
//                 <div>
//                   <p className="font-bold">{b.title}</p>
//                   <p className="text-sm text-gray-600">
//                     ₹{b.total_amount ?? '-'} | {b._from?.slice(0, 10)} - {b.to?.slice(0, 10)}
//                   </p>
//                   {b.desc && <p className="text-xs text-gray-500">Desc: {b.desc}</p>}
//                 </div>
//                 <div className="space-x-2">
//                   <button
//                     onClick={() => handleEdit(b)}
//                     className="px-2 py-1 text-blue-600 hover:underline"
//                   >
//                     Edit
//                   </button>
//                   <button
//                     onClick={() => handleDelete(b.id)}
//                     className="px-2 py-1 text-red-600 hover:underline"
//                   >
//                     Delete
//                   </button>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//       <BackToTop />
//     </div>
//   );
// }

// export default AddBudgetPage;






import React, { useState, useEffect } from 'react';
import AddBudget from '../components/AddBudget';
import { fetchBudgets, deleteBudget } from '../api';
import { useSnackbar } from 'notistack';
import BackToTop from "../components/BackToTop";

function AddBudgetPage() {
  const [expenseTitle, setExpenseTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [amount, setAmount] = useState('');
  const [fromdate, setFromDate] = useState('');
  const [todate, setToDate] = useState('');
  const [category, setCategory] = useState('');
  const [editingId, setEditingId] = useState(null);

  const [budgets, setBudgets] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchBudgets();
        setBudgets(data || []);
      } catch (err) {
        console.error('❌ Error fetching budgets:', err);
        enqueueSnackbar('Failed to fetch budgets', { variant: 'error' });
      }
    })();
  }, [enqueueSnackbar]);

  const handleDelete = async (id) => {
    try {
      await deleteBudget(id);
      setBudgets(budgets.filter((b) => b.id !== id));
    } catch (err) {
      console.error("Error deleting budget:", err);
    }
  };

  const handleEdit = (budget) => {
    setExpenseTitle(budget.title || '');
    setDesc(budget.desc || '');
    setAmount(budget.total_amount || '');
    setFromDate(budget._from ? budget._from.slice(0, 10) : '');
    setToDate(budget.to ? budget.to.slice(0, 10) : '');
    setCategory(budget.category || '');
    setEditingId(budget.id);
  };

  return (
    <div className="min-h-screen p-6 font-serif"
    style={{ backgroundImage: "url('/addbudget05.jpeg')", 
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
       }}
    >
      {/* Form Section */}
        <AddBudget
          expenseTitle={expenseTitle}
          setExpenseTitle={setExpenseTitle}
          desc={desc}
          setDesc={setDesc}
          amount={amount}
          setAmount={setAmount}
          fromdate={fromdate}
          setFromDate={setFromDate}
          todate={todate}
          setToDate={setToDate}
          category={category}
          setCategory={setCategory}
          editingId={editingId}
          setEditingId={setEditingId}
          setBudgets={setBudgets}
        />

      {/* LEFT SIDE: Budgets List */}
<div className="w-full">
  <h2 className="text-2xl font-bold text-[#3b2f2f] mb-4">Budgets</h2>
  {budgets.length === 0 ? (
    <p className="text-[#5c4a3d]">No budgets added yet.</p>
  ) : (
    <div className="space-y-4 w-full">
      {budgets.map((b) => (
        <div 
          key={b.id} 
          className="w-full p-4 bg-[#f9f3e7] border border-[#c9b79c] rounded"
        >
          {/* Title and Amount on same row */}
          <div className="flex justify-between items-center">
            <p className="font-semibold text-[#3b2f2f]">{b.title}</p>
            <p className="text-[#3b2f2f] font-medium">₹{b.total_amount ?? '-'}</p>
          </div>

          {/* Dates */}
          <p className="text-sm text-[#5c4a3d]">
            {b._from?.slice(0, 10)} - {b.to?.slice(0, 10)}
          </p>

          {/* Description */}
          {b.desc && (
            <p className="text-xs text-[#7a6a58]">Desc: {b.desc}</p>
          )}

          {/* Actions */}
          <div className="space-x-3 mt-2">
            <button
              onClick={() => handleEdit(b)}
              className="text-[#4d6b3c] hover:underline"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(b.id)}
              className="text-red-700 hover:underline"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  )}
</div>
      <BackToTop />
    </div>
  );
}

export default AddBudgetPage;
