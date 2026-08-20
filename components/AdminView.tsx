"use client";

import { useState } from "react";

type ShopItem = {
  id: string;
  name: string;
  cost: number;
  description: string;
  kind: string;
};

export function AdminView({
  isAdmin,
  customItems,
  onAdd,
  onRemove,
}: {
  isAdmin: boolean;
  customItems: ShopItem[];
  onAdd: (item: ShopItem) => void;
  onRemove: (id: string) => void;
}) {
  const [name, setName] = useState("");
  const [cost, setCost] = useState("");
  const [description, setDescription] = useState("");
  const [kind, setKind] = useState("plant");

  if (!isAdmin) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !cost) return;

    const newItem: ShopItem = {
      id: `custom-${Date.now()}`,
      name,
      cost: parseInt(cost, 10) || 0,
      description,
      kind,
    };

    onAdd(newItem);
    setName("");
    setCost("");
    setDescription("");
  };

  return (
    <div className="p-4 border rounded-lg bg-card text-card-foreground shadow-sm my-4">
      <h3 className="text-lg font-bold mb-3">Admin Panel - Add Custom Item</h3>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="block text-sm font-medium mb-1">Item Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded text-black"
            placeholder="e.g. Glowing Lotus"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Cost (coins)</label>
          <input
            type="number"
            min="1"
            value={cost}
            onChange={(e) => setCost(e.target.value)}
            className="w-full p-2 border rounded text-black"
            placeholder="40"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Kind</label>
          <select
            value={kind}
            onChange={(e) => setKind(e.target.value)}
            className="w-full p-2 border rounded text-black"
          >
            <option value="plant">Plant</option>
            <option value="companion">Companion</option>
            <option value="backdrop">Backdrop</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded text-black"
            placeholder="Item description..."
            rows={2}
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors"
        >
          Add Item
        </button>
      </form>

      {customItems.length > 0 && (
        <div className="mt-6">
          <h4 className="font-semibold mb-2">Custom Items</h4>
          <ul className="space-y-2">
            {customItems.map((item) => (
              <li
                key={item.id}
                className="flex justify-between items-center p-2 bg-muted/50 rounded"
              >
                <span>
                  {item.name} - {item.cost} coins ({item.kind})
                </span>
                <button
                  onClick={() => onRemove(item.id)}
                  className="text-red-500 hover:text-red-700 text-sm"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default AdminView;
