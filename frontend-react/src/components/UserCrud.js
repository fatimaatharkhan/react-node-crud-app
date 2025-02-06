import { useEffect, useState } from "react";
import { getUsers, getUser, createUser, updateUser, deleteUser } from "../services/userService";

const UserCrud = () => {
    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState({ name: "", email: "", age: "" });
    const [editingUser, setEditingUser] = useState(null);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        const { data } = await getUsers();
        setUsers(data);
    };

    const handleCreateUser = async (e) => {
        e.preventDefault();
        if (newUser.name && newUser.email) {
            await createUser(newUser);
            fetchUsers();
            setNewUser({ name: "", email: "", age: "" }); // Clear input fields
        }
    };

    const handleEditUser = async (id) => {
        const { data } = await getUser(id);
        setEditingUser({ ...data }); // Pre-fill form with data to edit
    };

    const handleUpdateUser = async (e) => {
        e.preventDefault();
        if (editingUser.name && editingUser.email) {
            await updateUser(editingUser._id, editingUser);
            fetchUsers();
            setEditingUser(null); // Close the edit form
        }
    };

    const handleDelete = async (id) => {
        await deleteUser(id);
        fetchUsers();
    };

    const handleCancelEdit = () => {
        setEditingUser(null); // Close the edit form
        setNewUser({ name: "", email: "", age: "" }); // Reset new user form
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (editingUser) {
            setEditingUser((prev) => ({ ...prev, [name]: value }));
        } else {
            setNewUser((prev) => ({ ...prev, [name]: value }));
        }
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {/* First Row */}
            <div style={{ display: "flex" }}>
                {/* First Column: User List Heading */}
                <div style={{paddingLeft: "10px", width: "40.00%" }}>
                    <h3>User List</h3>
                </div>

                {/* Second Column: Add User Button */}
                <div style={{ width: "33.33%", textAlign: "center", marginTop: "30px" }}>
                    <button
                        style={{ padding: "10px", cursor: "pointer" }}
                        onClick={() => {
                            setEditingUser(null);
                            setNewUser({ name: "", email: "", age: "" });
                        }}
                    >
                        Add User
                    </button>
                </div>
            </div>

            {/* Second Row */}
            <div style={{ display: "flex" }}>
                {/* First Column: User List */}
                <div style={{ width: "66.66%" }}>
                    <table border="1" style={{ width: "100%" }}>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Age</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user._id}>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.age}</td>
                                    <td>
                                        <button onClick={() => handleEditUser(user._id)}>Edit</button>
                                        <button onClick={() => handleDelete(user._id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Second Column: Add/Edit Form */}
                <div style={{ width: "33.33%", paddingLeft: "20px", marginTop: "-76px" }}>
                    <h3>{editingUser ? "Edit User" : "Add New User"}</h3>
                    <form onSubmit={editingUser ? handleUpdateUser : handleCreateUser}>
                        <label>
                            Name:
                            <input
                                type="text"
                                name="name"
                                value={editingUser ? editingUser.name : newUser.name}
                                onChange={handleInputChange}
                            />
                        </label>
                        <br />
                        <label>
                            Email:
                            <input
                                type="email"
                                name="email"
                                value={editingUser ? editingUser.email : newUser.email}
                                onChange={handleInputChange}
                            />
                        </label>
                        <br />
                        <label>
                            Age:
                            <input
                                type="text"
                                name="age"
                                value={editingUser ? editingUser.age : newUser.age}
                                onChange={handleInputChange}
                            />
                        </label>
                        <br />
                        <button type="submit">{editingUser ? "Update User" : "Submit"}</button>
                        <button type="button" onClick={handleCancelEdit}>
                            Cancel
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UserCrud;
