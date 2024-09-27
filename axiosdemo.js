import React,{useEffect,useState}from 'react';
import Axios from 'axios';
const GetDemo=()=>
{
    const [users, setUsers] = useState([]);

    useEffect(() => {
        Axios.get('https://jsonplaceholder.typicode.com/users')
            .then(res => setUsers(res.data));
    }, []);

    return (
        <>
        <h1>WELCOME TO AXIOS</h1>
        <table border="1" cellPadding="10" cellSpacing="0">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user) => (
                    <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.phone}</td>
                    </tr>
                ))}
            </tbody>
        </table>
        
    </>

    )
}
export default GetDemo;