import React, { useState } from 'react';

const ManageCategories = ({ categories, setCategories }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState('');
  const [editDescription, setEditDescription] = useState('');

  const handleAdd = async () => {
    if (!name.trim()) return;

    const newCategory = {
      id: Date.now(),
      name,
      description
    };

    try {
      const response = await fetch('http://localhost:5001/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCategory)
      });

      if (!response.ok) throw new Error('Failed to add category');

      const savedCategory = await response.json();
      setCategories([...categories, savedCategory]);
      setName('');
      setDescription('');
    } catch (error) {
      console.error('Error adding category:', error.message);
      alert('Failed to add category. Please try again.');
    }
  };

  const handleDelete = (id) => {
    setCategories(categories.filter(cat => cat.id !== id));
    // Optionally send DELETE request to server
  };

  const startEdit = (category) => {
    setEditingId(category.id);
    setEditName(category.name);
    setEditDescription(category.description);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditName('');
    setEditDescription('');
  };

  const saveEdit = (id) => {
    const updatedCategories = categories.map(cat =>
      cat.id === id ? { ...cat, name: editName, description: editDescription } : cat
    );
    setCategories(updatedCategories);
    setEditingId(null);

    // Optionally send PATCH request to backend:
    // fetch(`http://localhost:5001/categories/${id}`, {...})
  };

  return (
    <div className="admin-table">
      <h3>Manage Categories</h3>

      <div style={{ marginBottom: '1rem' }}>
        <input
          placeholder="Category Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ marginRight: '10px' }}
        />
        <input
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ marginRight: '10px' }}
        />
        <button onClick={handleAdd}>Add Category</button>
      </div>

      <table>
        <thead>
          <tr><th>Name</th><th>Description</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {categories.map((cat) => (
            <tr key={cat.id}>
              <td>
                {editingId === cat.id ? (
                  <input
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                  />
                ) : (
                  cat.name
                )}
              </td>
              <td>
                {editingId === cat.id ? (
                  <input
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                  />
                ) : (
                  cat.description
                )}
              </td>
              <td>
                {editingId === cat.id ? (
                  <>
                    <button onClick={() => saveEdit(cat.id)}>Save</button>
                    <button onClick={cancelEdit}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => startEdit(cat)}>Edit</button>
                    <button onClick={() => handleDelete(cat.id)}>Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageCategories;
