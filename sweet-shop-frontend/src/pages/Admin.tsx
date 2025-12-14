import React, { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, Package, X, Save, Search } from "lucide-react";
import {
  addSweet,
  updateSweet,
  deleteSweet,
  getSweets,
} from "../services/sweet";
import { restockSweet } from "../services/inventory";
interface Sweet {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  image: string;
}

interface AdminProps {
  sweets: Sweet[];
  setSweets: (sweets: Sweet[]) => void;
}

const categoryColors: Record<string, string> = {
  chocolate: "bg-blue-400",
  gummy: "bg-orange-400",
  lollipop: "bg-purple-400",
  candy: "bg-cyan-400",
  cake: "bg-green-400",
  cookie: "bg-purple-300",
};

const Admin: React.FC<AdminProps> = ({ sweets, setSweets }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit" | "restock">("add");
  const [selectedSweet, setSelectedSweet] = useState<Sweet | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "chocolate",
    stock: "",
    image: "",
  });
  const [restockAmount, setRestockAmount] = useState("");
  const refreshSweets = async () => {
    const res = await getSweets();
    setSweets(res.data);
  };

  const filteredSweets = sweets.filter(
    (sweet) =>
      sweet.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sweet.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openAddModal = () => {
    setModalMode("add");
    setFormData({
      name: "",
      description: "",
      price: "",
      category: "chocolate",
      stock: "",
      image: "",
    });
    setShowModal(true);
  };

  const openEditModal = (sweet: Sweet) => {
    setModalMode("edit");
    setSelectedSweet(sweet);
    setFormData({
      name: sweet.name,
      description: sweet.description,
      price: sweet.price.toString(),
      category: sweet.category,
      stock: sweet.stock.toString(),
      image: sweet.image,
    });
    setShowModal(true);
  };

  const openRestockModal = (sweet: Sweet) => {
    setModalMode("restock");
    setSelectedSweet(sweet);
    setRestockAmount("");
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedSweet(null);
    setRestockAmount("");
  };

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();

  //   if (modalMode === 'restock' && selectedSweet) {
  //     const amount = parseInt(restockAmount);
  //     if (isNaN(amount) || amount <= 0) {
  //       alert('Please enter a valid restock amount');
  //       return;
  //     }

  //     const updatedSweets = sweets.map(s =>
  //       s.id === selectedSweet.id
  //         ? { ...s, stock: s.stock + amount }
  //         : s
  //     );
  //     setSweets(updatedSweets);
  //     alert(`Successfully restocked ${selectedSweet.name} by ${amount} units!`);
  //     closeModal();
  //     return;
  //   }

  //   const price = parseFloat(formData.price);
  //   const stock = parseInt(formData.stock);

  //   if (isNaN(price) || price <= 0) {
  //     alert('Please enter a valid price');
  //     return;
  //   }

  //   if (isNaN(stock) || stock < 0) {
  //     alert('Please enter a valid stock amount');
  //     return;
  //   }

  //   if (modalMode === 'add') {
  //     const newSweet: Sweet = {
  //       id: Math.max(...sweets.map(s => s.id)) + 1,
  //       name: formData.name,
  //       description: formData.description,
  //       price: price,
  //       category: formData.category,
  //       stock: stock,
  //       image: formData.image || formData.name.charAt(0).toUpperCase()
  //     };
  //     setSweets([...sweets, newSweet]);
  //     alert('Sweet added successfully!');
  //   } else if (modalMode === 'edit' && selectedSweet) {
  //     const updatedSweets = sweets.map(s =>
  //       s.id === selectedSweet.id
  //         ? {
  //             ...s,
  //             name: formData.name,
  //             description: formData.description,
  //             price: price,
  //             category: formData.category,
  //             stock: stock,
  //             image: formData.image || formData.name.charAt(0).toUpperCase()
  //           }
  //         : s
  //     );
  //     setSweets(updatedSweets);
  //     alert('Sweet updated successfully!');
  //   }

  //   closeModal();
  // };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // RESTOCK
    if (modalMode === "restock" && selectedSweet) {
      const amount = Number(restockAmount);

      if (!amount || amount <= 0) {
        alert("Enter valid restock amount");
        return;
      }

      await restockSweet(selectedSweet.id, amount);
      await refreshSweets();
      closeModal();
      return;
    }

    const price = parseFloat(formData.price);
    const stock = parseInt(formData.stock);

    if (isNaN(price) || price <= 0) {
      alert("Please enter a valid price");
      return;
    }

    if (isNaN(stock) || stock < 0) {
      alert("Please enter a valid stock amount");
      return;
    }

    // ADD
    if (modalMode === "add") {
      await addSweet({
        name: formData.name,
        description: formData.description,
        price,
        category: formData.category,
        stock,
        image: formData.image || formData.name.charAt(0).toUpperCase(),
      });
    }

    // EDIT
    if (modalMode === "edit" && selectedSweet) {
      await updateSweet(selectedSweet.id, {
        name: formData.name,
        description: formData.description,
        price,
        category: formData.category,
        stock,
        image: formData.image || formData.name.charAt(0).toUpperCase(),
      });
    }

    await refreshSweets();
    closeModal();
  };
  const handleDelete = async (sweet: Sweet) => {
    if (window.confirm(`Are you sure you want to delete ${sweet.name}?`)) {
      await deleteSweet(sweet.id);
      await refreshSweets();
    }
  };

  const getLowStockCount = () =>
    sweets.filter((s) => s.stock <= 5 && s.stock > 0).length;
  const getOutOfStockCount = () => sweets.filter((s) => s.stock === 0).length;
  const getTotalValue = () =>
    sweets.reduce((sum, s) => sum + s.price * s.stock, 0).toFixed(2);

  return (
    <div className="min-h-screen bg-gray-900 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-white text-4xl font-bold mb-2">
            Admin Dashboard
          </h1>
          <p className="text-gray-400">Manage your sweet inventory</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Products</p>
                <p className="text-white text-3xl font-bold mt-1">
                  {sweets.length}
                </p>
              </div>
              <div className="bg-blue-500/20 p-3 rounded-lg">
                <Package className="w-6 h-6 text-blue-400" />
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Low Stock</p>
                <p className="text-yellow-400 text-3xl font-bold mt-1">
                  {getLowStockCount()}
                </p>
              </div>
              <div className="bg-yellow-500/20 p-3 rounded-lg">
                <Package className="w-6 h-6 text-yellow-400" />
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Out of Stock</p>
                <p className="text-red-400 text-3xl font-bold mt-1">
                  {getOutOfStockCount()}
                </p>
              </div>
              <div className="bg-red-500/20 p-3 rounded-lg">
                <Package className="w-6 h-6 text-red-400" />
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Value</p>
                <p className="text-green-400 text-3xl font-bold mt-1">
                  ${getTotalValue()}
                </p>
              </div>
              <div className="bg-green-500/20 p-3 rounded-lg">
                <Package className="w-6 h-6 text-green-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Search and Add Button */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search sweets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-800 text-white pl-12 pr-4 py-3 rounded-lg border border-gray-700 focus:border-pink-500 focus:outline-none transition-colors"
            />
          </div>
          <button
            onClick={openAddModal}
            className="bg-gradient-to-r from-pink-500 to-pink-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-pink-600 hover:to-pink-700 transition-all flex items-center gap-2 justify-center"
          >
            <Plus className="w-5 h-5" />
            Add New Sweet
          </button>
        </div>

        {/* Products Table */}
        <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-900/50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Stock
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {filteredSweets.map((sweet) => (
                  <tr
                    key={sweet.id}
                    className="hover:bg-gray-900/30 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`${
                            categoryColors[sweet.category]
                          } w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold text-xl`}
                        >
                          {sweet.image}
                        </div>
                        <div>
                          <p className="text-white font-medium">{sweet.name}</p>
                          <p className="text-gray-400 text-sm">
                            {sweet.description.substring(0, 40)}...
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-gray-700 text-gray-300">
                        {sweet.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-white font-semibold">
                      ${sweet.price}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${
                          sweet.stock === 0
                            ? "bg-red-500/20 text-red-400"
                            : sweet.stock <= 5
                            ? "bg-yellow-500/20 text-yellow-400"
                            : "bg-green-500/20 text-green-400"
                        }`}
                      >
                        <div
                          className={`w-2 h-2 rounded-full ${
                            sweet.stock === 0
                              ? "bg-red-400"
                              : sweet.stock <= 5
                              ? "bg-yellow-400"
                              : "bg-green-400"
                          }`}
                        ></div>
                        {sweet.stock} units
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openRestockModal(sweet)}
                          className="p-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors"
                          title="Restock"
                        >
                          <Package className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => openEditModal(sweet)}
                          className="p-2 bg-yellow-500/20 text-yellow-400 rounded-lg hover:bg-yellow-500/30 transition-colors"
                          title="Edit"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(sweet)}
                          className="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800 rounded-xl border border-gray-700 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-700 flex items-center justify-between">
                <h2 className="text-white text-2xl font-bold">
                  {modalMode === "add" && "Add New Sweet"}
                  {modalMode === "edit" && "Edit Sweet"}
                  {modalMode === "restock" && "Restock Sweet"}
                </h2>
                <button
                  onClick={closeModal}
                  className="p-2 text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6">
                {modalMode === "restock" ? (
                  <>
                    <div className="mb-6 p-4 bg-gray-900 rounded-lg">
                      <p className="text-gray-400 text-sm mb-1">
                        Current Stock
                      </p>
                      <p className="text-white text-3xl font-bold">
                        {selectedSweet?.stock} units
                      </p>
                      <p className="text-gray-400 text-sm mt-1">
                        {selectedSweet?.name}
                      </p>
                    </div>

                    <div className="mb-6">
                      <label className="block text-gray-300 text-sm font-medium mb-2">
                        Restock Amount
                      </label>
                      <input
                        type="number"
                        value={restockAmount}
                        onChange={(e) => setRestockAmount(e.target.value)}
                        className="w-full bg-gray-900 text-white px-4 py-3 rounded-lg border border-gray-700 focus:border-pink-500 focus:outline-none transition-colors"
                        placeholder="Enter amount to add"
                        min="1"
                        required
                      />
                    </div>

                    {restockAmount && (
                      <div className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                        <p className="text-green-400 text-sm">
                          New stock will be:{" "}
                          {(selectedSweet?.stock || 0) +
                            parseInt(restockAmount || "0")}{" "}
                          units
                        </p>
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-gray-300 text-sm font-medium mb-2">
                          Name *
                        </label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          className="w-full bg-gray-900 text-white px-4 py-3 rounded-lg border border-gray-700 focus:border-pink-500 focus:outline-none transition-colors"
                          placeholder="Sweet name"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-gray-300 text-sm font-medium mb-2">
                          Category *
                        </label>
                        <select
                          value={formData.category}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              category: e.target.value,
                            })
                          }
                          className="w-full bg-gray-900 text-white px-4 py-3 rounded-lg border border-gray-700 focus:border-pink-500 focus:outline-none transition-colors"
                          required
                        >
                          <option value="chocolate">Chocolate</option>
                          <option value="gummy">Gummy</option>
                          <option value="lollipop">Lollipop</option>
                          <option value="candy">Candy</option>
                          <option value="cake">Cake</option>
                          <option value="cookie">Cookie</option>
                        </select>
                      </div>
                    </div>

                    <div className="mb-4">
                      <label className="block text-gray-300 text-sm font-medium mb-2">
                        Description *
                      </label>
                      <textarea
                        value={formData.description}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            description: e.target.value,
                          })
                        }
                        className="w-full bg-gray-900 text-white px-4 py-3 rounded-lg border border-gray-700 focus:border-pink-500 focus:outline-none transition-colors"
                        placeholder="Sweet description"
                        rows={3}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <label className="block text-gray-300 text-sm font-medium mb-2">
                          Price ($) *
                        </label>
                        <input
                          type="number"
                          step="0.01"
                          value={formData.price}
                          onChange={(e) =>
                            setFormData({ ...formData, price: e.target.value })
                          }
                          className="w-full bg-gray-900 text-white px-4 py-3 rounded-lg border border-gray-700 focus:border-pink-500 focus:outline-none transition-colors"
                          placeholder="0.00"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-gray-300 text-sm font-medium mb-2">
                          Stock *
                        </label>
                        <input
                          type="number"
                          value={formData.stock}
                          onChange={(e) =>
                            setFormData({ ...formData, stock: e.target.value })
                          }
                          className="w-full bg-gray-900 text-white px-4 py-3 rounded-lg border border-gray-700 focus:border-pink-500 focus:outline-none transition-colors"
                          placeholder="0"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-gray-300 text-sm font-medium mb-2">
                          Image Letter
                        </label>
                        <input
                          type="text"
                          maxLength={1}
                          value={formData.image}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              image: e.target.value.toUpperCase(),
                            })
                          }
                          className="w-full bg-gray-900 text-white px-4 py-3 rounded-lg border border-gray-700 focus:border-pink-500 focus:outline-none transition-colors"
                          placeholder="A"
                        />
                      </div>
                    </div>
                  </>
                )}

                <div className="flex gap-4 mt-6">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="flex-1 bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-600 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-pink-500 to-pink-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-pink-600 hover:to-pink-700 transition-all flex items-center justify-center gap-2"
                  >
                    <Save className="w-5 h-5" />
                    {modalMode === "add" && "Add Sweet"}
                    {modalMode === "edit" && "Update Sweet"}
                    {modalMode === "restock" && "Confirm Restock"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
