import { useEffect, useState } from "react";
import { getUser, updateUser } from "../services/userService";
import { useNavigate, useParams } from "react-router-dom";

const EditUser = () => {
    const [user, setUser] = useState({ name: "", email: "", age: "" });
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetchUser();
    }, []);

    const fetchUser = async () => {
        const { data } = await getUser(id);
        setUser(data);
    };

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await updateUser(id, user);
        navigate("/");
    };

    return (
        <div>
            <h2>Edit User</h2>
            <form onSubmit={handleSubmit}>
                <input name="name" placeholder="Name" onChange={handleChange} value={user.name} required />
                <input name="email" placeholder="Email" onChange={handleChange} value={user.email} required />
                <input name="age" placeholder="Age" type="number" onChange={handleChange} value={user.age} required />
                <button type="submit">Update</button>
            </form>
        </div>
    );
};

export default EditUser;
