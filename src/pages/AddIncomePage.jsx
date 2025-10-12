// import React, { useState, useEffect } from 'react';
// import Calculator from '../components/calculator';
// import { addIncome, getIncomes, deleteIncome, updateIncome } from '../api';
// import { useSnackbar } from 'notistack';
// import BackToTop from "../components/BackToTop";   

// function AddIncomePage() {
//   const [incomeTitle, setIncomeTitle] = useState('');
//   const [desc, setDesc] = useState('');
//   const [amount, setAmount] = useState('');
//   const [source, setSource] = useState('');
//   const [incomes, setIncomes] = useState([]);
//   const [editingId, setEditingId] = useState(null);

//   const { enqueueSnackbar } = useSnackbar();

//   useEffect(() => {
//     (async () => {
//       try {
//         const data = await getIncomes();
//         setIncomes(data || []);
//       } catch (err) {
//         console.error('❌ Error fetching incomes:', err);
//         enqueueSnackbar('Failed to fetch incomes', { variant: 'error' });
//       }
//     })();
//   }, [enqueueSnackbar]);

//   const resetForm = () => {
//     setIncomeTitle('');
//     setDesc('');
//     setAmount('');
//     setSource('');
//     setEditingId(null);
//   };

//   const buildPayload = () => {
//     const payload = {
//       title: incomeTitle,
//       desc,
//       amount: amount !== '' ? Number(amount) : undefined,
//       source_names: source ? [source] : undefined,
//     };
//     Object.keys(payload).forEach(
//       (k) => (payload[k] === undefined || payload[k] === '') && delete payload[k]
//     );
//     return payload;
//   };

//   const handleFormSubmit = async (e) => {
//     e.preventDefault();

//     // ✅ Validation
//     if (!incomeTitle || !amount || Number(amount) <= 0) {
//       enqueueSnackbar('Please enter all fields correctly', { variant: 'warning' });
//       return;
//     }
//     if (incomeTitle.length > 50) {
//       enqueueSnackbar('Title cannot exceed 50 characters', { variant: 'error' });
//       return;
//     }
//     if (desc.length > 50) {
//       enqueueSnackbar('Description cannot exceed 50 characters', { variant: 'error' });
//       return;
//     }

//     try {
//       if (editingId !== null) {
//         const updated = await updateIncome(editingId, buildPayload());
//         setIncomes((prev) => prev.map((x) => (x.id === editingId ? updated : x)));
//         enqueueSnackbar('Income updated successfully ✅', { variant: 'success' });
//         resetForm();
//       } else {
//         const created = await addIncome(buildPayload());
//         setIncomes((prev) => [...prev, created]);
//         enqueueSnackbar('Income added successfully 🎉', { variant: 'success' });
//         resetForm();
//       }
//     } catch (err) {
//       console.error('❌ Save/update error:', err);
//       enqueueSnackbar(err?.detail || 'Failed to save income', { variant: 'error' });
//     }
//   };

//   const handleEdit = (incomeId) => {
//     const inc = incomes.find((x) => x.id === incomeId);
//     if (!inc) return;
//     setIncomeTitle(inc.title || '');
//     setDesc(inc.desc || '');
//     setAmount(String(inc.amount ?? ''));
//     setSource(inc.source || inc.source_names?.[0] || '');
//     setEditingId(incomeId);
//   };

//   const handleDelete = async (incomeId) => {
//     try {
//       await deleteIncome(incomeId);
//       setIncomes((prev) => prev.filter((inc) => inc.id !== incomeId));
//       if (editingId === incomeId) resetForm();
//       enqueueSnackbar('Income deleted 🗑️', { variant: 'info' });
//     } catch (error) {
//       console.error('Error deleting income:', error);
//       enqueueSnackbar(error?.detail || 'Failed to delete income', { variant: 'error' });
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {/* Form */}
//           <form onSubmit={handleFormSubmit} className="space-y-4">
//             <h2 className="text-2xl font-semibold text-center mb-2">
//               {editingId !== null ? 'Edit Income' : 'Add New Income'}
//             </h2>

//             {/* Title */}
//             <div>
//               <input
//                 type="text"
//                 placeholder="Income Title"
//                 value={incomeTitle}
//                 maxLength={50}
//                 onChange={(e) => setIncomeTitle(e.target.value)}
//                 className="w-full p-2 border rounded"
//               />
//               <p className="text-xs text-gray-500 text-right">
//                 {incomeTitle.length}/50
//               </p>
//             </div>

//             {/* Description */}
//             <div>
//               <input
//                 type="text"
//                 placeholder="Description"
//                 value={desc}
//                 maxLength={50}
//                 onChange={(e) => setDesc(e.target.value)}
//                 className="w-full p-2 border rounded"
//               />
//               <p className="text-xs text-gray-500 text-right">
//                 {desc.length}/50
//               </p>
//             </div>

//             <input
//               type="number"
//               placeholder="Amount"
//               value={amount}
//               onChange={(e) => setAmount(e.target.value)}
//               className="w-full p-2 border rounded"
//             />

//             <input
//               type="text"
//               placeholder="Source (e.g., Company XYZ)"
//               value={source}
//               onChange={(e) => setSource(e.target.value)}
//               className="w-full p-2 border rounded"
//             />

//             <div className="flex gap-3">
//               <button
//                 type="submit"
//                 className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700"
//               >
//                 {editingId !== null ? 'Update Income' : 'Add Income'}
//               </button>
//               <button
//                 type="button"
//                 onClick={resetForm}
//                 className="flex-1 border rounded py-2 hover:bg-gray-50"
//               >
//                 Clear
//               </button>
//             </div>
//           </form>

//           {/* Calculator */}
//           <div className="flex items-start justify-center">
//             <Calculator />
//           </div>
//         </div>

//         {/* Income List */}
//         <div className="mt-10">
//           <h3 className="text-xl font-semibold mb-3">Incomes</h3>
//           {incomes.length === 0 ? (
//             <p className="text-gray-600">No incomes to show.</p>
//           ) : (
//             <ul className="space-y-3">
//               {incomes.map((i, idx) => (
//                 <li
//                   key={i.id ?? `${i.title}-${idx}`}
//                   className="p-4 border rounded flex justify-between items-center bg-gray-50"
//                 >
//                   <div>
//                     <p className="font-bold">{i.title}</p>
//                     <p className="text-sm text-gray-600">
//                       ₹{i.amount} | {i.source || i.source_names?.join(', ')}
//                     </p>
//                     {i.desc && (
//                       <p className="text-xs text-gray-500">Desc: {i.desc}</p>
//                     )}
//                   </div>
//                   <div className="space-x-2">
//                     <button
//                       onClick={() => handleEdit(i.id)}
//                       className="px-2 py-1 text-blue-600 hover:underline"
//                     >
//                       Edit
//                     </button>
//                     <button
//                       onClick={() => handleDelete(i.id)}
//                       className="px-2 py-1 text-red-600 hover:underline"
//                     >
//                       Delete
//                     </button>
//                   </div>
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>
//       <BackToTop />
//     </div>
//   );
// }

// export default AddIncomePage;






import React, { useState, useEffect } from 'react';
import Calculator from '../components/calculator';
import { addIncome, getIncomes, deleteIncome, updateIncome } from '../api';
import { useSnackbar } from 'notistack';
import BackToTop from "../components/BackToTop";   

function AddIncomePage() {
  const [incomeTitle, setIncomeTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [amount, setAmount] = useState('');
  const [source, setSource] = useState('');
  const [incomes, setIncomes] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    (async () => {
      try {
        const data = await getIncomes();
        setIncomes(data || []);
      } catch (err) {
        console.error('❌ Error fetching incomes:', err);
        enqueueSnackbar('Failed to fetch incomes', { variant: 'error' });
      }
    })();
  }, [enqueueSnackbar]);

  const resetForm = () => {
    setIncomeTitle('');
    setDesc('');
    setAmount('');
    setSource('');
    setEditingId(null);
  };

  const buildPayload = () => {
    const payload = {
      title: incomeTitle,
      desc,
      amount: amount !== '' ? Number(amount) : undefined,
      source_names: source ? [source] : undefined,
    };
    Object.keys(payload).forEach(
      (k) => (payload[k] === undefined || payload[k] === '') && delete payload[k]
    );
    return payload;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!incomeTitle || !amount || Number(amount) <= 0) {
      enqueueSnackbar('Please enter all fields correctly', { variant: 'warning' });
      return;
    }
    if (incomeTitle.length > 50) {
      enqueueSnackbar('Title cannot exceed 50 characters', { variant: 'error' });
      return;
    }
    if (desc.length > 50) {
      enqueueSnackbar('Description cannot exceed 50 characters', { variant: 'error' });
      return;
    }

    try {
      if (editingId !== null) {
        const updated = await updateIncome(editingId, buildPayload());
        setIncomes((prev) => prev.map((x) => (x.id === editingId ? updated : x)));
        enqueueSnackbar('Income updated successfully ✅', { variant: 'success' });
        resetForm();
      } else {
        const created = await addIncome(buildPayload());
        setIncomes((prev) => [...prev, created]);
        enqueueSnackbar('Income added successfully 🎉', { variant: 'success' });
        resetForm();
      }
    } catch (err) {
      console.error('❌ Save/update error:', err);
      enqueueSnackbar(err?.detail || 'Failed to save income', { variant: 'error' });
    }
  };

  const handleEdit = (incomeId) => {
    const inc = incomes.find((x) => x.id === incomeId);
    if (!inc) return;
    setIncomeTitle(inc.title || '');
    setDesc(inc.desc || '');
    setAmount(String(inc.amount ?? ''));
    setSource(inc.source || inc.source_names?.[0] || '');
    setEditingId(incomeId);
  };

  const handleDelete = async (incomeId) => {
    try {
      await deleteIncome(incomeId);
      setIncomes((prev) => prev.filter((inc) => inc.id !== incomeId));
      if (editingId === incomeId) resetForm();
      enqueueSnackbar('Income deleted 🗑️', { variant: 'info' });
    } catch (error) {
      console.error('Error deleting income:', error);
      enqueueSnackbar(error?.detail || 'Failed to delete income', { variant: 'error' });
    }
  };

  return (
    <div className="min-h-screen p-8 font-serif"
    style={{ backgroundImage: "url('/vintage03.jpeg')", 
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
       }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {/* Form */}
        <form onSubmit={handleFormSubmit} className="space-y-4 max-w-3xl w-full">
          <h2 className="text-3xl font-bold mb-4 text-[#5c4b3b]">
            {editingId !== null ? 'Edit Income' : 'Add New Income'}
          </h2>

          {/* Title */}
          <div>
            <input
              type="text"
              placeholder="Income Title"
              value={incomeTitle}
              maxLength={50}
              onChange={(e) => setIncomeTitle(e.target.value)}
              className="w-full p-3 border border-[#c9b79c] rounded-md bg-[#f9f3e7]"
            />
            <p className="text-xs text-[#5c4b3b] text-right">
              {incomeTitle.length}/50
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
            type="text"
            placeholder="Source (e.g., Company XYZ)"
            value={source}
            onChange={(e) => setSource(e.target.value)}
            className="w-full p-3 border border-[#c9b79c] rounded-md bg-[#f9f3e7]"
          />

          <div className="flex gap-3">
            <button
              type="submit"
              className="flex-1 bg-[#04242fff] text-white py-2 rounded-md hover:opacity-90"
            >
              {editingId !== null ? 'Update Income' : 'Add Income'}
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
        <div>
          <Calculator />
        </div>
      </div>

      {/* Income List */}
      <div className="w-full">
        <h3 className="text-2xl font-semibold mb-4 text-[#5c4b3b]">Incomes</h3>
        {incomes.length === 0 ? (
          <p className="text-[#5c4b3b]">No incomes to show.</p>
        ) : (
          <ul className="space-y-3">
            {incomes.map((i, idx) => (
              <li
                key={i.id ?? `${i.title}-${idx}`}
                className="p-3 border border-[#c9b79c] rounded-md bg-[#f9f3e7]"
              >
                <div className="flex justify-between">
                  <span className="font-medium">{i.title}</span>
                  <span>₹{i.amount}</span>
                </div>
                <div className="text-sm text-[#5c4b3b]">
                  {i.source || i.source_names?.join(', ')}
                </div>
                {i.desc && (
                  <p className="text-xs text-[#5c4b3b]">Desc: {i.desc}</p>
                )}
                <div className="mt-2 space-x-2">
                  <button
                    onClick={() => handleEdit(i.id)}
                    className="text-[#7a6a4f] hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(i.id)}
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

export default AddIncomePage;
