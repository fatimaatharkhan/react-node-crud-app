import { useState } from "react";
import { createUser } from "../services/userService";

const AddUser = () => {
    const [user, setUser] = useState({ name: "", email: "", age: "" });

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await createUser(user);
        setUser({ name: "", email: "", age: "" });
    };

    return (
        <div>
            <h2>Add User</h2>
            <form onSubmit={handleSubmit}>
                <input name="name" placeholder="Name" onChange={handleChange} value={user.name} />
                <input name="email" placeholder="Email" onChange={handleChange} value={user.email} />
                <input name="age" placeholder="Age" type="number" onChange={handleChange} value={user.age} />
                <button type="submit">Add</button>
            </form>
        </div>
    );
};

export default AddUser;
