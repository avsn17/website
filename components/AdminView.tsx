"use client";

import { useState } from "react";
import type { ShopItem } from "@/lib/store";

export default function AdminView({
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
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("decor");

  if (!isAdmin) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price) return;

    const newItem: ShopItem = {
      id: `custom-${Date.now()}`,
      name,
      price: parseFloat(price) || 0,
      description,
      category,
    };

    onAdd(newItem);
    setName("");
    setPrice("");
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
          <label className="block text-sm font-medium mb-1">Price ($)</label>
          <input
            type="number"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full p-2 border rounded text-black"
            placeholder="29.99"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 border rounded text-black"
          >
            <option value="decor">Decor</option>
            <option value="plants">Plants</option>
            <option value="tools">Tools</option>
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
                  {item.name} - ${item.price} ({item.category})
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
